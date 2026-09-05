/* ============================================
   AI helpers: tries Puter.js first (free, no
   API key needed for the visitor), and falls
   back to a Cloudflare Worker proxy (which holds
   the real OpenRouter key server-side) if Puter
   fails or times out.

   Requires this still in your HTML:
   <script src="https://js.puter.com/v2/"></script>

   No API key goes in this file — it lives safely
   in your Cloudflare Worker's secret settings.
   ============================================ */

const WORKER_PROXY_URL = "https://study-invaders-proxy.nazminawen21.workers.dev/";
// Listed in priority order — if the first is rate-limited/down, OpenRouter
// automatically tries the next one for us.
const OPENROUTER_MODELS = [
  "google/gemma-4-31b-it:free",
  "google/gemma-4-26b-a4b-it:free",
  "google/gemma-3-12b-it:free"
];
const PUTER_TIMEOUT_MS = 8000; // give Puter this long before giving up and falling back

// Strips stray markdown code fences the model sometimes adds, then parses.
function parseJsonResponse(raw){
  const cleaned = raw
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/, '')
    .replace(/```$/, '')
    .trim();
  return JSON.parse(cleaned);
}

// Rejects if `promise` doesn't settle within `ms` — needed because a broken
// Puter sign-in can hang indefinitely instead of throwing.
function withTimeout(promise, ms, label){
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms))
  ]);
}

/* ---------- Puter.js path (primary) ---------- */

function extractResponseText(response){
  if(typeof response === 'string') return response;
  if(response?.message?.content){
    const content = response.message.content;
    if(typeof content === 'string') return content;
    if(Array.isArray(content) && content[0]?.text) return content[0].text;
  }
  if(response?.text) return response.text;
  return String(response);
}

async function uploadNoteAndGetUrl(note){
  const byteChars = atob(note.content);
  const byteNumbers = new Array(byteChars.length);
  for(let i = 0; i < byteChars.length; i++) byteNumbers[i] = byteChars.charCodeAt(i);
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: note.mimeType });

  const uploaded = await puter.fs.write(note.name, blob);
  return await puter.fs.getReadURL(uploaded.path);
}

async function askAIViaPuter(prompt, note, model){
  if(typeof puter === 'undefined'){
    throw new Error('Puter.js script did not load');
  }
  let response;
  if(note.isText){
    const fullPrompt = prompt + "\n\nNOTES CONTENT:\n" + note.content;
    response = await puter.ai.chat(fullPrompt, { model });
  } else {
    const fileUrl = await uploadNoteAndGetUrl(note);
    response = await puter.ai.chat(prompt, fileUrl, { model });
  }
  const rawText = extractResponseText(response);
  return parseJsonResponse(rawText);
}

// Retries a fetch once or twice on a 429 (rate limit) with a short delay —
// the free model's shared pool can get briefly congested under load.
async function fetchWithRetry(url, options, maxRetries = 2){
  for(let attempt = 0; attempt <= maxRetries; attempt++){
    const response = await fetch(url, options);
    if(response.status !== 429 || attempt === maxRetries) return response;
    await new Promise(resolve => setTimeout(resolve, 2000 * (attempt + 1)));
  }
}

/* ---------- OpenRouter path (fallback) ---------- */

async function askAIViaOpenRouter(prompt, note){
  const contentParts = [{ type: 'text', text: prompt }];

  if(note.isText){
    contentParts[0].text += "\n\nNOTES CONTENT:\n" + note.content;
  } else {
    const dataUrl = `data:${note.mimeType};base64,${note.content}`;
    if(note.mimeType === 'application/pdf'){
      contentParts.push({
        type: 'file',
        file: { filename: note.name, file_data: dataUrl }
      });
    } else {
      contentParts.push({
        type: 'image_url',
        image_url: { url: dataUrl }
      });
    }
  }

  const requestBody = {
    models: OPENROUTER_MODELS,
    messages: [{ role: 'user', content: contentParts }],
    response_format: { type: 'json_object' }
  };

  // For PDFs, explicitly request the FREE text-extraction engine.
  // Without this, OpenRouter can default to a paid OCR engine, which
  // fails/errors on accounts with no funded credits.
  if(!note.isText && note.mimeType === 'application/pdf'){
    requestBody.plugins = [{ id: 'file-parser', pdf: { engine: 'pdf-text' } }];
  }

  const response = await fetchWithRetry(WORKER_PROXY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  if(!response.ok){
    const errText = await response.text();
    throw new Error(`AI proxy error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const rawText = data?.choices?.[0]?.message?.content;
  if(!rawText) throw new Error('No response text from AI proxy');

  return parseJsonResponse(rawText);
}

/* ---------- Public entry point ---------- */

// Same signature as before, so index.html / learn.html don't need to change.
async function askAI(prompt, note, model = 'google/gemini-3.5-flash'){
  try {
    return await withTimeout(askAIViaPuter(prompt, note, model), PUTER_TIMEOUT_MS, 'Puter');
  } catch (err){
    console.warn('Puter AI unavailable, falling back to proxy:', err);
    return await askAIViaOpenRouter(prompt, note);
  }
}
