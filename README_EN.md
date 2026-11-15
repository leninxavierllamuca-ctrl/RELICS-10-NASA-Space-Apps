# RELICS 10.0 | Explorers of the Forgotten

## Final integrated edition

This package preserves the nine original missions, 675 quiz questions, games, simulators and multiplayer server. It adds nine local documentary videos and a separate **3D Assembly Lab** featuring four interactive educational reconstructions: space probe, Apollo-style launcher, six-wheel rover and the **Apollo 11 Eagle lunar module**. The former satellite CAD source files remain in the archive for reproducibility but are no longer the fourth 3D tab. Educational 3D geometry is a conceptual reconstruction, not historical NASA engineering CAD. The video redistribution permissions of some third parties remain unverified; see `docs/CREDITOS_Y_PERMISOS_VIDEOS.md` and `docs/LABORATORIO_3D_Y_DERECHOS.md`.

The augmented `index.html` needs its accompanying `web/assets/` and `web/videos/` folders. Extract the whole ZIP before opening it; the bare index file is no longer fully standalone.

An independent educational prototype for the NASA Space Apps Challenge in Sangolquí, Ecuador, centered on **Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars**.

## Run

Open the standalone `index.html` in a modern mobile or desktop browser. It includes the JavaScript, data, **nine interactive simulators**, a preserved previous arcade, and **675 questions** (25 per mission and difficulty). Some Android browsers do not execute downloaded HTML directly; serve it via HTTP if needed. The Android Studio sources in `android/RELICS-Android/` can build a WebView APK, but **no compiled APK is included**.

For a shared leaderboard, install Node.js 18+, run `node servidor/server.js` and connect to `/ws`. Up to 12 participants per room; scores are shared in real time. This is **not** an authoritative anti-cheat competition nor synchronized collaborative game board. Public Internet play requires deployment and HTTPS/WSS.

Every mission, quiz, end screen and legacy arcade includes an **Exit or Home** path. Escape also navigates back. On mobile, use touch controls.

## Educational design

Nine missions: Apollo 11 Eagle, Apollo 17 LRV, ALSEP, Sojourner, Opportunity, InSight, Ingenuity, Dawn, and Pioneer 10. The first seven cover the core Moon/Mars challenge; Dawn and Pioneer are optional exploration-history extras. Each has a distinct task, illustrative gameplay model, three selectable levels, question explanations, XP and leaderboard.

**Do not confuse models with authentic NASA telemetry.** The numerical game values are hypothetical unless explicitly labeled as NASA data. The ALSEP station data is manually transcribed from NASA History and processed reproducibly with `datos/pipeline_alsep.py`; see `datos/alsep_derivado.json`. Every question includes a source URL, although the numerical exercise values are authored for teaching and may repeat formula types.

## Evidence and ethics

The project credits NASA sources and the teammate's three contributed HTML experiences. See `CREDITOS_COLABORACION.md`. AI assistance was used for code and writing. The product does not claim NASA affiliation or use generated art as historical photography. The open-source license applies to original code; publication permission for contributed files must be confirmed.

## Review and outstanding work

Web UI, navigation and question-bank structure passed automated tests at desktop/mobile viewports, and the WebSocket server passed a two-client local test. Android package, live public links, source media loading, security of online scores, usability testing with real learners and a public repository are **still unverified or not complete**. See `docs/AUDITORIA_RUBRICA.md` for a criterion-by-criterion review and submission penalties.
