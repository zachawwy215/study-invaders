/* ============================================
   Shared language system for Study Invaders.
   English + Bahasa Malaysia, with a first-visit
   picker and a persistent toggle button.
   ============================================ */

const TRANSLATIONS = {
  en: {
    // Language popup
    langPopupTitle: "Choose your language",
    langPopupSubtitle: "You can change this anytime from the button in the corner.",
    englishBtn: "English",
    malayBtn: "Bahasa Malaysia",
    switchLangConfirm: "Switching language will restart this page. Continue?",

    // index.html
    missionRecall: "MISSION: RECALL",
    tagline: "Defend your grade. Shoot the right answer.",
    callsignLabel: "Callsign (your name)",
    callsignPlaceholder: "e.g. Alex Tan",
    missionNotesLabel: "Mission notes",
    uploadPrompt: "Tap to upload your teacher's notes",
    uploadHint: "PDF, image, or text file",
    puterNotice1: "One extra step: when you hit Play, a window will pop up asking you to sign in with a free Puter account. That's what powers the AI part — it only takes a few seconds, and you only do it once on this device.",
    puterNotice2: "f Puter ever says your account is low on balance, just go to Puter, delete your Puter account and create a new account. You can use the same email for this.",
    playBtn: "PLAY",
    missingCallsign: "your callsign",
    missingNotes: "your notes",
    missingTemplate: "Enter {items} before launching.",
    uploadingStatus: "Uploading transmission...",
    fileReadError: "Couldn't read that file — try a different one.",
    loading1: "Getting the spaceship ready...",
    loading2: "Tiny crew is loading the ammo...",
    loading3: "Waking up the radar operator...",
    loading4: "Briefing the alien scouts...",
    loading5: "Polishing the laser cannons...",
    loading6: "Decoding your teacher's secrets...",
    loading7: "Teaching the UFOs their lines...",
    loading8: "Double-checking the star map...",
    transmissionFailed: "Transmission failed: ",
    lowBalanceHint: " — If this mentions a low balance, try signing out of Puter and signing back in with a different account.",
    retryBtn: "Try again",
    creditFooter: "Made by Computer System Operation · Sarawak Skills Sri Aman",

    // learn.html
    missionBriefing: "MISSION BRIEFING",
    sourceLabel: "Source: ",
    backBtn: "← Back",
    agentLabel: "Agent:",
    summaryTitle: "SUMMARY",
    highlightsTitle: "HIGHLIGHTS",
    keywordsTitle: "KEYWORDS",
    launchMissionBtn: "LAUNCH MISSION >",

    // play.html
    missionDefend: "MISSION: DEFEND",
    menuBtn: "← Menu",
    leaveMissionConfirm: "Leave this mission? Your progress on this playthrough will be lost.",
    chooseDifficulty: "Choose your mission difficulty",
    easyName: "EASY",
    easyDesc: "10 questions",
    normalName: "NORMAL",
    normalDesc: "15 questions",
    hardName: "HARD",
    hardDesc: "20 questions",
    endlessName: "ENDLESS",
    endlessDesc: "Survive as long as you can",
    playLoading1: "Loading ammo crates...",
    playLoading2: "Painting decoy UFOs...",
    playLoading3: "Calibrating the targeting laser...",
    playLoading4: "Recruiting good UFOs for defense...",
    playLoading5: "Sharpening quiz questions...",
    playLoading6: "Testing the ejector seat (kidding)...",
    playLoading7: "Fueling up the rocket...",
    playLoading8: "Scrambling the alien decoys...",
    questionCounterTemplate: "Question {n} / {total}",
    controlHint: "Move: A/D or mouse · Shoot: Space or click",
    scoreLabel: "Score: ",
    correctLine1: "Yay! Thank you, Agent!",
    correctLine2: "Nailed it!",
    correctLine3: "The good UFOs cheer!",
    correctLine4: "Correct — Earth is safe a little longer!",
    wrongLine1: "Ha! Wrong! Time to invade Earth!",
    wrongLine2: "Oof, that one got away.",
    wrongLine3: "The bad UFO cackles...",
    wrongLine4: "Not quite, Agent.",
    rightAnswerWas: "The right answer was: ",
    missionPrepFailed: "Mission prep failed: ",
    missionComplete: "MISSION COMPLETE",
    missionFailed: "MISSION FAILED",
    scoreTemplate: "Score: {score} — {correct}/{total} correct",
    seeResultsBtn: "SEE RESULTS >",

    // results.html
    missionResults: "MISSION RESULTS",
    startOverBtn: "← Start over",
    noResultsMsg: "No mission results yet — play a round first and your results will show up here.",
    backToTitleBtn: "BACK TO TITLE",
    statusComplete: "COMPLETE",
    statusFailed: "FAILED",
    subtopicBreakdownTitle: "SUBTOPIC BREAKDOWN",
    strongLabel: "✔ STRONG",
    weakLabel: "⚠ WEAK",
    practiceLabel: "~ PRACTICE",
    correctOfTemplate: "{correct}/{total} correct",
    shareTitle: "SHARE WITH YOUR TEACHER",
    copyBtnText: "📋 Copy Report",
    downloadBtnText: "⬇ Download .txt",
    copiedFeedback: "Copied! Paste it into an email or message to your teacher.",
    copyFailedFeedback: "Couldn't copy automatically — try the download button instead.",
    playAgainBtn: "Play Again",
    reportHeader: "STUDY INVADERS — MISSION REPORT",
    reportAgent: "Agent: ",
    reportSource: "Source notes: ",
    reportDate: "Date: ",
    reportScore: "Score: ",
    reportCorrectSuffix: " correct",
    reportStatus: "Mission status: ",
    reportBreakdownHeader: "SUBTOPIC BREAKDOWN",
    reportNoSubtopic: "(no subtopic data)",

    // AI prompt language instruction
    aiLanguageName: "English"
  },

  ms: {
    // Language popup
    langPopupTitle: "Pilih bahasa anda",
    langPopupSubtitle: "Anda boleh menukar ini bila-bila masa melalui butang di penjuru.",
    englishBtn: "English",
    malayBtn: "Bahasa Malaysia",
    switchLangConfirm: "Menukar bahasa akan memulakan semula halaman ini. Teruskan?",

    // index.html
    missionRecall: "MISI: INGAT KEMBALI",
    tagline: "Pertahankan gred anda. Tembak jawapan yang betul.",
    callsignLabel: "Nama samaran (nama anda)",
    callsignPlaceholder: "cth. Alex Tan",
    missionNotesLabel: "Nota misi",
    uploadPrompt: "Ketik untuk muat naik nota guru anda",
    uploadHint: "Fail PDF, imej, atau teks",
    puterNotice1: "Satu langkah tambahan: apabila anda tekan Main, tetingkap akan muncul meminta anda log masuk dengan akaun Puter percuma. Itulah yang menggerakkan bahagian AI — hanya mengambil masa beberapa saat, dan anda hanya perlu buat sekali sahaja pada peranti ini.",
    puterNotice2: "Jika Puter menyatakan baki akaun anda rendah, log keluar dan log masuk semula dengan e-mel lain untuk mendapatkan akaun baharu.",
    playBtn: "MAIN",
    missingCallsign: "nama samaran anda",
    missingNotes: "nota anda",
    missingTemplate: "Masukkan {items} sebelum melancarkan misi.",
    uploadingStatus: "Memuat naik transmisi...",
    fileReadError: "Tidak dapat membaca fail itu — cuba fail lain.",
    loading1: "Menyediakan kapal angkasa...",
    loading2: "Krew kecil sedang memuatkan peluru...",
    loading3: "Mengejutkan operator radar...",
    loading4: "Memberi taklimat kepada peninjau makhluk asing...",
    loading5: "Menggilap meriam laser...",
    loading6: "Menyahkod rahsia guru anda...",
    loading7: "Mengajar UFO dialog mereka...",
    loading8: "Menyemak semula peta bintang...",
    transmissionFailed: "Transmisi gagal: ",
    lowBalanceHint: " — Jika ini menyebut baki rendah, cuba log keluar dari Puter dan log masuk semula dengan akaun lain.",
    retryBtn: "Cuba lagi",
    creditFooter: "Dibuat oleh Computer System Operation · Sarawak Skills Sri Aman",

    // learn.html
    missionBriefing: "TAKLIMAT MISI",
    sourceLabel: "Sumber: ",
    backBtn: "← Kembali",
    agentLabel: "Ejen:",
    summaryTitle: "RINGKASAN",
    highlightsTitle: "PERKARA PENTING",
    keywordsTitle: "KATA KUNCI",
    launchMissionBtn: "LANCAR MISI >",

    // play.html
    missionDefend: "MISI: PERTAHANAN",
    menuBtn: "← Menu",
    leaveMissionConfirm: "Tinggalkan misi ini? Kemajuan anda dalam permainan ini akan hilang.",
    chooseDifficulty: "Pilih tahap kesukaran misi anda",
    easyName: "MUDAH",
    easyDesc: "10 soalan",
    normalName: "SEDERHANA",
    normalDesc: "15 soalan",
    hardName: "SUKAR",
    hardDesc: "20 soalan",
    endlessName: "TANPA HAD",
    endlessDesc: "Bertahan selama yang anda mampu",
    playLoading1: "Memuatkan peti peluru...",
    playLoading2: "Mengecat UFO umpan...",
    playLoading3: "Menentukur laser sasaran...",
    playLoading4: "Merekrut UFO baik untuk pertahanan...",
    playLoading5: "Mengasah soalan kuiz...",
    playLoading6: "Menguji kerusi pelontar (bergurau)...",
    playLoading7: "Mengisi bahan api roket...",
    playLoading8: "Mengumpulkan umpan makhluk asing...",
    questionCounterTemplate: "Soalan {n} / {total}",
    controlHint: "Gerak: A/D atau tetikus · Tembak: Space atau klik",
    scoreLabel: "Skor: ",
    correctLine1: "Yay! Terima kasih, Ejen!",
    correctLine2: "Tepat sekali!",
    correctLine3: "UFO baik bersorak!",
    correctLine4: "Betul — Bumi selamat buat sementara waktu!",
    wrongLine1: "Ha! Salah! Masa untuk menyerang Bumi!",
    wrongLine2: "Aduh, yang itu terlepas.",
    wrongLine3: "UFO jahat ketawa...",
    wrongLine4: "Tidak tepat, Ejen.",
    rightAnswerWas: "Jawapan yang betul ialah: ",
    missionPrepFailed: "Persediaan misi gagal: ",
    missionComplete: "MISI SELESAI",
    missionFailed: "MISI GAGAL",
    scoreTemplate: "Skor: {score} — {correct}/{total} betul",
    seeResultsBtn: "LIHAT KEPUTUSAN >",

    // results.html
    missionResults: "KEPUTUSAN MISI",
    startOverBtn: "← Mula semula",
    noResultsMsg: "Belum ada keputusan misi — mainkan satu pusingan dahulu dan keputusan anda akan dipaparkan di sini.",
    backToTitleBtn: "KEMBALI KE TAJUK",
    statusComplete: "SELESAI",
    statusFailed: "GAGAL",
    subtopicBreakdownTitle: "PECAHAN SUBTOPIK",
    strongLabel: "✔ KUAT",
    weakLabel: "⚠ LEMAH",
    practiceLabel: "~ LATIHAN",
    correctOfTemplate: "{correct}/{total} betul",
    shareTitle: "KONGSI DENGAN GURU ANDA",
    copyBtnText: "📋 Salin Laporan",
    downloadBtnText: "⬇ Muat Turun .txt",
    copiedFeedback: "Disalin! Tampal ke dalam e-mel atau mesej kepada guru anda.",
    copyFailedFeedback: "Tidak dapat menyalin secara automatik — cuba butang muat turun.",
    playAgainBtn: "Main Semula",
    reportHeader: "STUDY INVADERS — LAPORAN MISI",
    reportAgent: "Ejen: ",
    reportSource: "Nota sumber: ",
    reportDate: "Tarikh: ",
    reportScore: "Skor: ",
    reportCorrectSuffix: " betul",
    reportStatus: "Status misi: ",
    reportBreakdownHeader: "PECAHAN SUBTOPIK",
    reportNoSubtopic: "(tiada data subtopik)",

    // AI prompt language instruction
    aiLanguageName: "Bahasa Malaysia"
  }
};

function getLang(){
  return localStorage.getItem('si_lang');
}
function setLang(lang){
  localStorage.setItem('si_lang', lang);
}
function currentLang(){
  return getLang() || 'en';
}

// Returns a translated string. Supports {placeholder} substitution via a
// second argument, e.g. t('scoreTemplate', {score: 10, correct: 2, total: 8}).
function t(key, vars){
  const lang = currentLang();
  let str = (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS.en[key] || key;
  if(vars){
    Object.keys(vars).forEach(k => {
      str = str.replace(`{${k}}`, vars[k]);
    });
  }
  return str;
}

function applyStaticTranslations(){
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
}

// Injects the small persistent language toggle button (top-right, every page).
// beforeSwitch: optional function returning false to cancel the switch
// (used on play.html to confirm before losing an in-progress game).
function injectLanguageToggle(beforeSwitch){
  let btn = document.getElementById('langToggleBtn');
  if(btn){
    // Already exists (e.g. created before the popup was answered) — just
    // refresh its label/title to match whatever language is now active.
    btn.textContent = currentLang() === 'ms' ? '🌐 EN' : '🌐 BM';
    btn.title = currentLang() === 'ms' ? 'Switch to English' : 'Tukar ke Bahasa Malaysia';
    return;
  }
  btn = document.createElement('button');
  btn.id = 'langToggleBtn';
  btn.className = 'langToggleBtn';
  btn.type = 'button';
  btn.textContent = currentLang() === 'ms' ? '🌐 EN' : '🌐 BM';
  btn.title = currentLang() === 'ms' ? 'Switch to English' : 'Tukar ke Bahasa Malaysia';
  btn.addEventListener('click', () => {
    if(typeof beforeSwitch === 'function' && !beforeSwitch()) return;
    setLang(currentLang() === 'ms' ? 'en' : 'ms');
    location.reload();
  });
  document.body.appendChild(btn);
}

// Shown once, only if no language has ever been chosen on this device.
function showLanguagePopupIfNeeded(onDone, toggleGuard){
  if(getLang()){
    if(onDone) onDone();
    return;
  }
  const overlay = document.createElement('div');
  overlay.className = 'modalOverlay';
  overlay.id = 'langPopup';
  overlay.innerHTML = `
    <div class="cabinet" style="max-width:380px; text-align:center;">
      <h2 style="margin-bottom:10px;">Choose your language / Pilih bahasa anda</h2>
      <p style="font-size:15px;color:var(--ink-dim);margin-bottom:20px;line-height:1.5;">
        You can change this anytime from the button in the corner.<br>
        Anda boleh menukar ini bila-bila masa melalui butang di penjuru.
      </p>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <button class="btnPrimary ready" id="langChooseEn" type="button">English</button>
        <button class="btnPrimary ready" id="langChooseMs" type="button">Bahasa Malaysia</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  function choose(lang){
    setLang(lang);
    overlay.remove();
    applyStaticTranslations();
    injectLanguageToggle(toggleGuard);
    if(onDone) onDone();
  }
  document.getElementById('langChooseEn').addEventListener('click', () => choose('en'));
  document.getElementById('langChooseMs').addEventListener('click', () => choose('ms'));
}

// Call once per page: shows the popup on first-ever visit, otherwise just
// applies the stored language immediately. `onReady` runs once the language
// is definitely known (either already stored, or just chosen). `toggleGuard`
// is an optional function returning false to cancel a language switch (used
// on play.html to confirm before losing an in-progress game).
function initI18n(onReady, toggleGuard){
  applyStaticTranslations();
  injectLanguageToggle(toggleGuard);
  showLanguagePopupIfNeeded(onReady, toggleGuard);
}
