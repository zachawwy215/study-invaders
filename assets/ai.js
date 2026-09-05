/* ============================================
   AI helpers: tries Puter.js first (free, no
   API key needed for the visitor), and falls
   back to a direct Gemini API call if Puter
   fails or times out.

   Requires BOTH of these still in your HTML:
   <script src="https://js.puter.com/v2/"></script>

   ⚠️ Put your own free Gemini API key below —
   used only as the fallback path.
   Get one at: https://aistudio.google.com/apikey
   ============================================ */

const GEMINI_API_KEY = "AQ.Ab8RN6IhASY741PT4HNcZSOn6we2jCQml3VPil0oaUx8uLP5Qw";
const GEMINI_MODEL = "gemini-2.5-flash"; // free-tier eligible, stable as of Sept 2026
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

/* ---------- Direct Gemini API path (fallback) ---------- */

async function askAIViaGemini(prompt, note){
  const parts = [];

  if(note.isText){
    parts.push({ text: prompt + "\n\nNOTES CONTENT:\n" + note.content });
  } else {
    // note.content is already base64 — Gemini accepts it inline directly.
    parts.push({ text: prompt });
    parts.push({ inline_data: { mime_type: note.mimeType, data: note.content } });
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [{ role: 'user', parts }],
        generationConfig: { responseMimeType: 'application/json' }
      })
    }
  );

  if(!response.ok){
    const errText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if(!rawText) throw new Error('No response text from Gemini API');

  return parseJsonResponse(rawText);
}

/* ---------- Public entry point ---------- */

// Same signature as before, so index.html / learn.html don't need to change.
async function askAI(prompt, note, model = 'google/gemini-3.5-flash'){
  try {
    return await withTimeout(askAIViaPuter(prompt, note, model), PUTER_TIMEOUT_MS, 'Puter');
  } catch (err){
    console.warn('Puter AI unavailable, falling back to direct Gemini API:', err);
    return await askAIViaGemini(prompt, note);
  }
}
