/* ============================================
   Shared Puter.js AI helpers.
   Assumes the Puter script (https://js.puter.com/v2/)
   is already loaded on the page before this runs.
   ============================================ */

// Puter.js can return the AI response in a couple of different shapes
// depending on which underlying model handled the request — this pulls
// the plain text out of whichever shape shows up.
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

// Uploads a note's base64 content to Puter's cloud storage and returns a
// URL that can be handed to puter.ai.chat() for image/PDF analysis.
async function uploadNoteAndGetUrl(note){
  const byteChars = atob(note.content);
  const byteNumbers = new Array(byteChars.length);
  for(let i = 0; i < byteChars.length; i++) byteNumbers[i] = byteChars.charCodeAt(i);
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: note.mimeType });

  const uploaded = await puter.fs.write(note.name, blob);
  return await puter.fs.getReadURL(uploaded.path);
}

// Runs a prompt against a note (text or file) and returns parsed JSON.
async function askAI(prompt, note, model = 'google/gemini-3.5-flash'){
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
/* ============================================
   Shared Puter.js AI helpers.
   Assumes the Puter script (https://js.puter.com/v2/)
   is already loaded on the page before this runs.
   ============================================ */

// Puter.js can return the AI response in a couple of different shapes
// depending on which underlying model handled the request — this pulls
// the plain text out of whichever shape shows up.
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

// Uploads a note's base64 content to Puter's cloud storage and returns a
// URL that can be handed to puter.ai.chat() for image/PDF analysis.
async function uploadNoteAndGetUrl(note){
  const byteChars = atob(note.content);
  const byteNumbers = new Array(byteChars.length);
  for(let i = 0; i < byteChars.length; i++) byteNumbers[i] = byteChars.charCodeAt(i);
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: note.mimeType });

  const uploaded = await puter.fs.write(note.name, blob);
  return await puter.fs.getReadURL(uploaded.path);
}

// Runs a prompt against a note (text or file) and returns parsed JSON.
async function askAI(prompt, note, model = 'google/gemini-3.5-flash'){
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
