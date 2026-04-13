# spell.baby Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page geocities/Flash-era novelty website for the album "The Elf From Outer Space" by Yesbellis & The Spells, hosted on GitHub Pages at spell.baby.

**Architecture:** Single HTML page with one CSS file and one JS file. No frameworks, no build tools. The page shows a fake Flash loading screen, then reveals a geocities-style profile page with a functional music player skinned as a homemade Flash embed. All static files served from GitHub Pages.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, HTML5 Audio API, GitHub Pages

**Spec:** `docs/superpowers/specs/2026-04-13-spell-baby-design.md`

---

## File Map

| File | Responsibility |
|------|---------------|
| `index.html` | All page structure — loading screen, header, sidebar, content sections, footer |
| `css/style.css` | All styles — loading screen, geocities layout, player, custom cursor |
| `js/main.js` | Loading screen animation, audio player logic, visitor counter |
| `assets/images/starfield-bg.png` | Tiled dark starfield background (generated as a tiny repeating tile) |

Existing files (no changes needed):
- `Yesbellis and the Spells Songs/*.mp3` — 4 audio tracks
- `Yesbellis and the Spells Songs/album_front.png` — album art for sidebar
- `logos/favicon-32x32.png` — custom cursor + favicon

---

## Task 1: Create the starfield background tile

**Files:**
- Create: `assets/images/starfield-bg.png`

This is a tiny repeating tile (64x64px or similar) with a dark background and a few scattered bright pixels to simulate stars. We'll generate it with a small inline JS canvas script run once locally.

- [ ] **Step 1.1: Generate the starfield tile**

Create a small Node.js script to generate the tile. Run it once, save the output, delete the script.

Create file `generate-starfield.js`:

```js
const { createCanvas } = require('canvas');
// If 'canvas' npm package isn't available, we'll create the tile manually.
// Alternative: create it as a base64 data URI directly in CSS.
```

Actually — simpler approach. We'll embed a tiny starfield as a CSS-only radial-gradient pattern. No image file needed. This is more authentic to the era anyway (tiled background patterns were often tiny).

Create `assets/images/starfield-bg.png` as a 100x100 pixel dark image with scattered white/blue dots. The simplest way on Windows without dependencies:

Use Python (available on most systems) or just create the pattern in CSS. Let's use CSS since we have zero dependencies:

```css
body {
  background-color: #000;
  background-image:
    radial-gradient(1px 1px at 20px 30px, #fff, transparent),
    radial-gradient(1px 1px at 40px 70px, #aaf, transparent),
    radial-gradient(1px 1px at 50px 10px, #fff, transparent),
    radial-gradient(1px 1px at 80px 50px, #ccf, transparent),
    radial-gradient(1px 1px at 10px 80px, #fff, transparent),
    radial-gradient(1px 1px at 70px 20px, #aaf, transparent),
    radial-gradient(1px 1px at 60px 90px, #fff, transparent),
    radial-gradient(1px 1px at 30px 60px, #ccf, transparent),
    radial-gradient(1px 1px at 90px 40px, #fff, transparent);
  background-size: 100px 100px;
}
```

This creates a repeating 100x100 tile of stars with no image file. Skip creating the PNG entirely.

- [ ] **Step 1.2: Commit**

```bash
git add css/style.css
git commit -m "feat: add CSS starfield background pattern"
```

---

## Task 2: Build the fake Flash loading screen

**Files:**
- Modify: `index.html` — add loading screen HTML
- Modify: `css/style.css` — add loading screen styles
- Modify: `js/main.js` — add loading screen animation logic

- [ ] **Step 2.1: Add loading screen HTML to index.html**

Replace the entire contents of `index.html` with the loading screen markup and a hidden main page container. The main page content sections will be added in later tasks.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Yesbellis Spell - The Elf From Outer Space</title>
  <link rel="icon" type="image/png" sizes="32x32" href="logos/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="logos/favicon-16x16.png">
  <link rel="apple-touch-icon" href="logos/apple-touch-icon.png">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <!-- FAKE FLASH LOADING SCREEN -->
  <div id="loading-screen">
    <div id="loading-content">
      <div id="flash-icon">⚡</div>
      <div id="loading-text">Loading yesbellis_page.swf ...</div>
      <div id="progress-outer">
        <div id="progress-inner"></div>
      </div>
      <div id="loading-percent">0% complete</div>
      <div id="flash-version">Macromedia Flash Player 6.0 r21</div>
    </div>
  </div>

  <!-- MAIN PAGE (hidden until loading finishes) -->
  <div id="main-page" style="display: none;">
    <!-- Content added in subsequent tasks -->
  </div>

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2.2: Add loading screen CSS to style.css**

Replace the entire contents of `css/style.css`:

```css
/* ============================================
   spell.baby — Yesbellis Spell
   The Elf From Outer Space
   "best viewed in Internet Explorer 6.0"
   ============================================ */

/* --- RESET --- */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* --- CUSTOM CURSOR --- */
body {
  cursor: url('logos/favicon-32x32.png'), auto;
}
a, button, .clickable {
  cursor: url('logos/favicon-32x32.png'), pointer;
}

/* --- STARFIELD BACKGROUND --- */
body {
  background-color: #000;
  background-image:
    radial-gradient(1px 1px at 20px 30px, #fff, transparent),
    radial-gradient(1px 1px at 40px 70px, #aaf, transparent),
    radial-gradient(1px 1px at 50px 10px, #fff, transparent),
    radial-gradient(1px 1px at 80px 50px, #ccf, transparent),
    radial-gradient(1px 1px at 10px 80px, #fff, transparent),
    radial-gradient(1px 1px at 70px 20px, #aaf, transparent),
    radial-gradient(1px 1px at 60px 90px, #fff, transparent),
    radial-gradient(1px 1px at 30px 60px, #ccf, transparent),
    radial-gradient(1px 1px at 90px 40px, #fff, transparent);
  background-size: 100px 100px;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  color: #ccc;
  font-size: 12px;
}

/* --- LOADING SCREEN --- */
#loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

#loading-content {
  text-align: center;
}

#flash-icon {
  font-size: 48px;
  color: #888;
  margin-bottom: 16px;
}

#loading-text {
  color: #0f0;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  margin-bottom: 12px;
}

#progress-outer {
  width: 300px;
  height: 18px;
  background: #222;
  border: 2px inset #444;
  margin: 0 auto 8px;
}

#progress-inner {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #ff00ff, #ff69b4);
  transition: width 0.1s linear;
}

#loading-percent {
  color: #888;
  font-family: 'Courier New', monospace;
  font-size: 10px;
  margin-bottom: 12px;
}

#flash-version {
  color: #555;
  font-family: 'Courier New', monospace;
  font-size: 8px;
}
```

Note: The `cursor` property appears in two `body` blocks above. During implementation, merge them into one `body` rule.

- [ ] **Step 2.3: Add loading screen animation JS**

Replace the entire contents of `js/main.js`:

```js
// ============================================
// spell.baby — Yesbellis Spell
// The Elf From Outer Space
// "made in Microsoft FrontPage 2003"
// ============================================

(function () {
  // --- FAKE FLASH LOADING SCREEN ---
  var loadingScreen = document.getElementById('loading-screen');
  var progressBar = document.getElementById('progress-inner');
  var percentText = document.getElementById('loading-percent');
  var mainPage = document.getElementById('main-page');

  // Jerky progress: [targetPercent, durationMs]
  var stages = [
    [15, 400],
    [28, 300],
    [42, 500],  // pause here
    [42, 600],  // hold at 42%
    [78, 200],  // jump!
    [85, 400],
    [92, 300],
    [97, 200],
    [100, 300]
  ];

  var currentStage = 0;

  function runStage() {
    if (currentStage >= stages.length) {
      // Loading "complete" — snap to main page
      loadingScreen.style.display = 'none';
      mainPage.style.display = 'block';
      return;
    }
    var target = stages[currentStage][0];
    var duration = stages[currentStage][1];
    progressBar.style.width = target + '%';
    percentText.textContent = target + '% complete';
    currentStage++;
    setTimeout(runStage, duration);
  }

  // Start the loading animation
  setTimeout(runStage, 500);
})();
```

- [ ] **Step 2.4: Open index.html in a browser and verify**

Open `index.html` directly in a browser (or use a local server). Verify:
- Black screen with ⚡ icon appears
- Progress bar fills jerkily over ~3 seconds
- Pauses at 42%, jumps to 78%
- After completion, loading screen disappears and blank main page shows

- [ ] **Step 2.5: Commit**

```bash
git add index.html css/style.css js/main.js
git commit -m "feat: add fake Flash loading screen with jerky progress bar"
```

---

## Task 3: Build the page header, status bar, and layout skeleton

**Files:**
- Modify: `index.html` — add header, status bar, two-column layout containers
- Modify: `css/style.css` — add header, status bar, and layout styles

- [ ] **Step 3.1: Add header and layout HTML inside the main-page div**

Replace the `<!-- Content added in subsequent tasks -->` comment inside `#main-page` with:

```html
    <!-- HEADER -->
    <div id="header">
      <h1>⚔ YESBELLIS SPELL ⚔</h1>
      <div id="subtitle">~*~ ThE eLf FrOm OuTeR sPaCe ~*~</div>
      <div id="visitor-counter">
        You are visitor #<span id="visitor-num">000847</span>
      </div>
    </div>

    <!-- STATUS BAR -->
    <div id="status-bar">
      ★ last updated: march 2026 ★ best viewed 800x600 ★ IE 6.0 ★
    </div>

    <!-- TWO-COLUMN CONTENT -->
    <div id="content-area">
      <div id="sidebar">
        <!-- Sidebar content added in Task 4 -->
      </div>
      <div id="main-content">
        <!-- Main sections added in Tasks 5-8 -->
      </div>
    </div>

    <!-- FOOTER (added in Task 9) -->
```

- [ ] **Step 3.2: Add header, status bar, and layout CSS**

Append to `css/style.css`:

```css
/* --- MAIN PAGE CONTAINER --- */
#main-page {
  width: 800px;
  margin: 0 auto;
}

/* --- HEADER --- */
#header {
  background: linear-gradient(180deg, #1a0033 0%, #000 100%);
  border: 3px ridge #666;
  padding: 20px;
  text-align: center;
}

#header h1 {
  color: #ff0;
  font-family: 'Times New Roman', serif;
  font-size: 28px;
  text-shadow: 2px 2px #f0f;
  letter-spacing: 3px;
}

#subtitle {
  color: #0ff;
  font-size: 12px;
  margin-top: 6px;
}

#visitor-counter {
  background: #111;
  border: 2px inset #444;
  display: inline-block;
  padding: 3px 10px;
  margin-top: 10px;
  color: #0f0;
  font-family: 'Courier New', monospace;
  font-size: 11px;
}

/* --- STATUS BAR --- */
#status-bar {
  background: #1a0020;
  text-align: center;
  padding: 4px;
  color: #f0f;
  font-size: 8px;
  border-left: 3px ridge #666;
  border-right: 3px ridge #666;
}

/* --- TWO-COLUMN LAYOUT --- */
#content-area {
  display: flex;
  border: 3px ridge #666;
  border-top: none;
}

#sidebar {
  width: 200px;
  min-width: 200px;
  background: #0a000f;
  border-right: 2px ridge #666;
  padding: 8px;
}

#main-content {
  flex: 1;
  padding: 8px;
  background: #050008;
}
```

- [ ] **Step 3.3: Verify in browser**

Open in browser. After loading screen, verify:
- Header with yellow title and magenta shadow
- Cyan subtitle in alternating caps
- Green visitor counter
- Magenta status bar
- Two-column layout visible (empty but structured)

- [ ] **Step 3.4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add page header, status bar, and two-column layout"
```

---

## Task 4: Build the sidebar

**Files:**
- Modify: `index.html` — add sidebar content
- Modify: `css/style.css` — add sidebar styles

- [ ] **Step 4.1: Add sidebar HTML**

Replace `<!-- Sidebar content added in Task 4 -->` with:

```html
        <img src="Yesbellis and the Spells Songs/album_front.png" alt="The Elf From Outer Space - Album Art" id="album-art">

        <div id="char-stats">
          <div class="stat-row"><strong>Race:</strong> High Elf</div>
          <div class="stat-row"><strong>Class:</strong> Bard (Lv.14)</div>
          <div class="stat-row"><strong>Alignment:</strong> Chaotic Horny</div>
          <div class="stat-row"><strong>Mood:</strong> ✨ Bardic ✨</div>
          <div class="stat-row"><strong>Status:</strong> Touring the Material Plane</div>
        </div>

        <div id="add-to-party">⚔ ADD TO PARTY ⚔</div>
```

- [ ] **Step 4.2: Add sidebar CSS**

Append to `css/style.css`:

```css
/* --- SIDEBAR --- */
#album-art {
  width: 100%;
  border: 2px ridge #999;
  display: block;
  margin-bottom: 8px;
}

#char-stats {
  color: #ff69b4;
  font-size: 9px;
  line-height: 1.8;
}

.stat-row {
  border-bottom: 1px dotted #333;
  padding: 2px 0;
}

#add-to-party {
  margin-top: 10px;
  border: 2px outset #666;
  padding: 6px;
  text-align: center;
  color: #ff0;
  font-size: 10px;
  background: #1a0020;
}

#add-to-party:hover {
  background: #2a0040;
}
```

- [ ] **Step 4.3: Verify in browser**

Check sidebar shows album art, character stats with dotted borders, and the ADD TO PARTY button.

- [ ] **Step 4.4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add sidebar with album art, character stats, and party button"
```

---

## Task 5: Build the About Me section

**Files:**
- Modify: `index.html` — add About Me section
- Modify: `css/style.css` — add section box styles (reused by all content sections)

- [ ] **Step 5.1: Add About Me HTML and shared section styles**

Replace `<!-- Main sections added in Tasks 5-8 -->` with:

```html
        <!-- ABOUT ME -->
        <div class="section-box">
          <div class="section-title">~*~ AbOuT mE ~*~</div>
          <div class="section-content">
            hi im yesbellis!! im a bard from beyond the stars and i play songs that make dragons weep and taverns explode!! currently touring the material plane looking for gigs and quests. if u like my music sign my guestbook!! rawr XD<br><br>
            fav weapon: my lute (its also a battleaxe lol)<br>
            fav spell: vicious mockery (bc words hurt more than swords!!)<br>
            fav food: tavern mystery meat idc what it is<br><br>
            ★ PLACEHOLDER - real bio coming soon ★
          </div>
        </div>

        <!-- Music Player added in Task 6 -->
        <!-- Discography added in Task 7 -->
        <!-- Guestbook added in Task 8 -->
        <!-- Links added in Task 8 -->
```

- [ ] **Step 5.2: Add section box CSS**

Append to `css/style.css`:

```css
/* --- CONTENT SECTIONS (shared) --- */
.section-box {
  border: 2px ridge #666;
  margin-bottom: 8px;
  background: #0a0012;
}

.section-title {
  background: linear-gradient(90deg, #330033, #000);
  color: #ff0;
  font-family: 'Times New Roman', serif;
  font-size: 12px;
  padding: 4px 8px;
  border-bottom: 1px solid #444;
  text-shadow: 1px 1px #f0f;
}

.section-content {
  padding: 8px;
  font-size: 10px;
  color: #ccc;
  line-height: 1.6;
}
```

- [ ] **Step 5.3: Verify in browser**

Check About Me section appears with gradient title bar, placeholder bio text, geocities styling.

- [ ] **Step 5.4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add About Me section with placeholder bio"
```

---

## Task 6: Build the music player

This is the centrepiece. A homemade geocities-looking "Flash player" that actually plays audio.

**Files:**
- Modify: `index.html` — add player HTML
- Modify: `css/style.css` — add player styles
- Modify: `js/main.js` — add audio player logic

- [ ] **Step 6.1: Add music player HTML**

Replace `<!-- Music Player added in Task 6 -->` with:

```html
        <!-- MUSIC PLAYER -->
        <div id="player-box">
          <div id="player-title">~*~ YeSbElLiS mUsIc PlAyEr ~*~</div>
          <div id="player-display">
            <div id="now-playing-label">NOW PLAYING:</div>
            <marquee id="track-marquee" scrollamount="3">★ click PLAY!! to start the music ★</marquee>
          </div>
          <div id="player-buttons">
            <button class="player-btn btn-play" onclick="playerPlay()">PLAY!!</button>
            <button class="player-btn btn-next" onclick="playerNext()">NEXT</button>
            <button class="player-btn btn-stop" onclick="playerStop()">STOP</button>
          </div>
          <div id="flash-req">requires Macromedia Flash Player 6</div>
        </div>
```

- [ ] **Step 6.2: Add player CSS**

Append to `css/style.css`:

```css
/* --- MUSIC PLAYER --- */
#player-box {
  border: 3px ridge #666;
  background: #000;
  padding: 8px;
  margin-bottom: 8px;
}

#player-title {
  color: #ff0;
  font-size: 12px;
  text-align: center;
  margin-bottom: 8px;
  text-shadow: 1px 1px #f0f;
}

#player-display {
  background: #111;
  border: 2px inset #444;
  padding: 6px;
  margin-bottom: 8px;
}

#now-playing-label {
  color: #ff00ff;
  font-size: 10px;
  text-align: center;
  margin-bottom: 4px;
}

#track-marquee {
  color: #0ff;
  font-size: 10px;
  display: block;
}

#player-buttons {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 6px;
}

.player-btn {
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  font-size: 10px;
  padding: 4px 12px;
  border: 2px outset;
  color: #000;
  font-weight: bold;
}

.btn-play {
  background: #ff00ff;
  border-color: #ff69b4;
}

.btn-next {
  background: #00ffff;
  border-color: #66ffff;
}

.btn-stop {
  background: #ff0;
  border-color: #ffff66;
}

.player-btn:active {
  border-style: inset;
}

#flash-req {
  color: #555;
  font-family: 'Courier New', monospace;
  font-size: 7px;
  text-align: center;
}
```

- [ ] **Step 6.3: Add audio player JS**

Append to `js/main.js` (after the loading screen IIFE):

```js
// --- MUSIC PLAYER ---
var tracks = [
  {
    title: 'The Elf From Outer Space',
    src: 'Yesbellis and the Spells Songs/The Elf From Outer Space - Yesbellis & the Spells.mp3'
  },
  {
    title: "Barmaid's Bosom",
    src: "Yesbellis and the Spells Songs/Barmaid's Bosom - Yesbellis & the Spells.mp3"
  },
  {
    title: 'Grog For My Dog',
    src: 'Yesbellis and the Spells Songs/Grog For My Dog - Yesbellis & the Spells.mp3'
  },
  {
    title: 'The Tavern of Tragedy',
    src: 'Yesbellis and the Spells Songs/The Tavern of Tragedy - Yesbellis & the Spells.mp3'
  }
];

var currentTrack = 0;
var audio = new Audio();
var isPlaying = false;
var marquee = document.getElementById('track-marquee');

function updateMarquee() {
  var text = '';
  for (var i = 0; i < tracks.length; i++) {
    if (i === currentTrack) {
      text += '▶ ' + tracks[i].title + ' ◀';
    } else {
      text += '★ ' + tracks[i].title;
    }
    text += ' ★ ';
  }
  marquee.textContent = text;
}

function playerPlay() {
  if (!isPlaying) {
    audio.src = tracks[currentTrack].src;
    audio.play();
    isPlaying = true;
    updateMarquee();
  } else if (audio.paused) {
    audio.play();
  }
}

function playerNext() {
  currentTrack = (currentTrack + 1) % tracks.length;
  audio.src = tracks[currentTrack].src;
  if (isPlaying) {
    audio.play();
  }
  updateMarquee();
}

function playerStop() {
  audio.pause();
  audio.currentTime = 0;
  currentTrack = 0;
  isPlaying = false;
  marquee.textContent = '★ click PLAY!! to start the music ★';
}

// Auto-advance to next track when current one ends
audio.addEventListener('ended', function () {
  currentTrack = (currentTrack + 1) % tracks.length;
  audio.src = tracks[currentTrack].src;
  audio.play();
  updateMarquee();
});
```

- [ ] **Step 6.4: Verify in browser**

Open in browser (must use a local server for audio — `python -m http.server 8000` or similar). Verify:
- Player displays with correct geocities styling
- PLAY!! button starts "The Elf From Outer Space"
- Marquee updates to show current track
- NEXT skips through all 4 tracks, wrapping at the end
- STOP resets to track 1 and shows idle text
- Tracks auto-advance when one finishes

- [ ] **Step 6.5: Commit**

```bash
git add index.html css/style.css js/main.js
git commit -m "feat: add functional music player with geocities Flash skin"
```

---

## Task 7: Build the Discography section

**Files:**
- Modify: `index.html` — add Discography section

- [ ] **Step 7.1: Add Discography HTML**

Replace `<!-- Discography added in Task 7 -->` with:

```html
        <!-- DISCOGRAPHY -->
        <div class="section-box">
          <div class="section-title">~*~ DiScOgRaPhY ~*~</div>
          <div class="section-content">
            <div style="color: #ff0; font-size: 11px; margin-bottom: 4px;">THE ELF FROM OUTER SPACE (2026)</div>
            <div style="margin-left: 10px; color: #aaa; font-size: 10px; line-height: 1.8;">
              1. Barmaid's Bosom<br>
              2. The Elf From Outer Space<br>
              3. Grog For My Dog<br>
              4. The Tavern of Tragedy
            </div>
          </div>
        </div>
```

- [ ] **Step 7.2: Verify in browser**

Check discography section appears with yellow album title and numbered tracklist.

- [ ] **Step 7.3: Commit**

```bash
git add index.html
git commit -m "feat: add Discography section with tracklist"
```

---

## Task 8: Build the Guestbook, Links section

**Files:**
- Modify: `index.html` — add Guestbook and Links sections

- [ ] **Step 8.1: Add Guestbook and Links HTML**

Replace `<!-- Guestbook added in Task 8 -->` and `<!-- Links added in Task 8 -->` with:

```html
        <!-- GUESTBOOK -->
        <div class="section-box">
          <div class="section-title">~*~ GuEsTbOoK ~*~</div>
          <div class="section-content">
            <div class="gb-entry">
              <span class="gb-name">xX_DarkPaladin69_Xx</span>
              <span class="gb-date">02/14/2026</span><br>
              <span class="gb-msg">omg ur music is sooo good!! barmaid's bosom made me cry lol. rawr XD</span>
            </div>
            <div class="gb-entry">
              <span class="gb-name">~*elfgrrl*~</span>
              <span class="gb-date">01/28/2026</span><br>
              <span class="gb-msg">i luv ur page!! how did u make the player?? teach me!! &lt;333</span>
            </div>
            <div class="gb-entry">
              <span class="gb-name">Gr0g_L0rd_420</span>
              <span class="gb-date">12/15/2025</span><br>
              <span class="gb-msg">grog for my dog is a BANGER. my actual dog started howling lmaooo</span>
            </div>
            <div class="gb-entry">
              <span class="gb-name">★ PLACEHOLDER ★</span>
              <span class="gb-date">00/00/0000</span><br>
              <span class="gb-msg">placeholder guestbook entry - real entries coming soon!!</span>
            </div>
          </div>
        </div>

        <!-- LINKS -->
        <div class="section-box">
          <div class="section-title">~*~ LiNkS ~*~</div>
          <div class="section-content" style="text-align: center;">
            ★ <a href="#" class="geocities-link">My Guild's Page</a>
            ★ <a href="#" class="geocities-link">Cool MIDI Archive</a>
            ★ <a href="#" class="geocities-link">Elven Webring</a> ★
          </div>
        </div>
```

- [ ] **Step 8.2: Add guestbook and link CSS**

Append to `css/style.css`:

```css
/* --- GUESTBOOK --- */
.gb-entry {
  border-bottom: 1px dotted #333;
  padding: 4px 0;
  font-size: 9px;
  margin-bottom: 4px;
}

.gb-name {
  color: #f0f;
  font-weight: bold;
}

.gb-date {
  color: #555;
  font-size: 8px;
  margin-left: 6px;
}

.gb-msg {
  color: #ccc;
}

/* --- LINKS --- */
.geocities-link {
  color: #0ff;
  text-decoration: underline;
  font-size: 10px;
}

.geocities-link:hover {
  color: #f0f;
}
```

- [ ] **Step 8.3: Verify in browser**

Check guestbook entries display with pink names, grey dates, and dotted borders. Check links section shows cyan underlined links that turn pink on hover.

- [ ] **Step 8.4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add Guestbook and Links sections"
```

---

## Task 9: Build the footer

**Files:**
- Modify: `index.html` — add footer
- Modify: `css/style.css` — add footer styles

- [ ] **Step 9.1: Add footer HTML**

Replace `<!-- FOOTER (added in Task 9) -->` with:

```html
    <!-- FOOTER -->
    <div id="footer">
      <a href="https://thenatzeroes.com" target="_blank" id="nat-zeroes-banner">
        ⚡ Powered by THE NAT ZEROES ⚡
      </a>
      <div id="under-construction">🚧 this page is always under construction 🚧</div>
      <div id="footer-credits">© 2026 yesbellis spell. made in Microsoft FrontPage 2003.</div>
    </div>
```

- [ ] **Step 9.2: Add footer CSS**

Append to `css/style.css`:

```css
/* --- FOOTER --- */
#footer {
  background: #111;
  border: 3px ridge #666;
  border-top: none;
  padding: 12px;
  text-align: center;
}

#nat-zeroes-banner {
  border: 2px outset #555;
  display: inline-block;
  padding: 6px 16px;
  background: #1a1a1a;
  color: #888;
  font-family: Tahoma, sans-serif;
  font-size: 10px;
  text-decoration: none;
}

#nat-zeroes-banner:hover {
  background: #2a2a2a;
  color: #fff;
}

#under-construction {
  color: #ff0;
  font-size: 9px;
  margin-top: 8px;
}

#footer-credits {
  color: #444;
  font-family: 'Courier New', monospace;
  font-size: 7px;
  margin-top: 6px;
}
```

- [ ] **Step 9.3: Verify in browser**

Check footer shows "Powered by THE NAT ZEROES" as a clickable badge linking to thenatzeroes.com, the under construction banner, and FrontPage credits.

- [ ] **Step 9.4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: add footer with Nat Zeroes banner and construction notice"
```

---

## Task 10: Final polish and push

**Files:**
- Modify: `css/style.css` — fix cursor path merging, any final tweaks
- All files — final review

- [ ] **Step 10.1: Merge the duplicate body rules in CSS**

The CSS currently has two `body` blocks (one for cursor, one for starfield). Merge them into a single block. The final `body` rule should be:

```css
body {
  cursor: url('logos/favicon-32x32.png'), auto;
  background-color: #000;
  background-image:
    radial-gradient(1px 1px at 20px 30px, #fff, transparent),
    radial-gradient(1px 1px at 40px 70px, #aaf, transparent),
    radial-gradient(1px 1px at 50px 10px, #fff, transparent),
    radial-gradient(1px 1px at 80px 50px, #ccf, transparent),
    radial-gradient(1px 1px at 10px 80px, #fff, transparent),
    radial-gradient(1px 1px at 70px 20px, #aaf, transparent),
    radial-gradient(1px 1px at 60px 90px, #fff, transparent),
    radial-gradient(1px 1px at 30px 60px, #ccf, transparent),
    radial-gradient(1px 1px at 90px 40px, #fff, transparent);
  background-size: 100px 100px;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  color: #ccc;
  font-size: 12px;
}
```

- [ ] **Step 10.2: Full browser test**

Open with a local server (`python -m http.server 8000`). Walk through the entire experience:
1. Fake Flash loading screen appears and fills over ~3 seconds
2. Main page snaps in — no smooth transition
3. Header shows band name, subtitle, visitor counter
4. Status bar shows "best viewed 800x600"
5. Sidebar shows album art, stats, party button
6. About Me section with placeholder bio
7. Music player — test PLAY, NEXT, STOP, auto-advance
8. Discography with tracklist
9. Guestbook with placeholder entries
10. Links section with cyan links
11. Footer with Nat Zeroes link, under construction, FrontPage credits
12. Custom d20 cursor visible everywhere
13. Starfield background tiles behind the page

- [ ] **Step 10.3: Commit any fixes**

```bash
git add -A
git commit -m "fix: merge CSS body rules, final polish"
```

- [ ] **Step 10.4: Push to GitHub**

```bash
git push origin master
```

- [ ] **Step 10.5: Set up GitHub Pages deployment**

Create the GitHub Actions workflow for static site deployment:

Create file `.github/workflows/static.yml`:

```yaml
name: Deploy static content to Pages

on:
  push:
    branches: ["master"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

```bash
git add .github/workflows/static.yml
git commit -m "ci: add GitHub Pages deployment workflow"
git push origin master
```

- [ ] **Step 10.6: Verify deployment**

Wait 1-2 minutes for GitHub Actions to run, then visit:
- https://gazebogangsta.github.io/spel.baby/

Verify the full site works on GitHub Pages (audio paths resolve, cursor works, etc).

---

## Summary

| Task | What it builds | Files |
|------|---------------|-------|
| 1 | Starfield background (CSS-only) | `css/style.css` |
| 2 | Fake Flash loading screen | `index.html`, `css/style.css`, `js/main.js` |
| 3 | Header, status bar, layout skeleton | `index.html`, `css/style.css` |
| 4 | Sidebar (album art, stats, party button) | `index.html`, `css/style.css` |
| 5 | About Me section | `index.html`, `css/style.css` |
| 6 | Functional music player | `index.html`, `css/style.css`, `js/main.js` |
| 7 | Discography section | `index.html` |
| 8 | Guestbook + Links sections | `index.html`, `css/style.css` |
| 9 | Footer with Nat Zeroes banner | `index.html`, `css/style.css` |
| 10 | Final polish, push, deploy | All files, `.github/workflows/static.yml` |
