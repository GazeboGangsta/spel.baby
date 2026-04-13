# spell.baby — Design Spec

**Project:** spell.baby — Old-school geocities/Flash-era fan page for "The Elf From Outer Space" album by Yesbellis & The Spells  
**Purpose:** Novelty/joke page referenced on The Nat Zeroes DND podcast. The site IS the joke — someone hears the URL on the podcast, visits it, and gets hit with full 2003 internet energy.  
**Domain:** spell.baby (pointed at GitHub Pages later)  
**Repo:** GazeboGangsta/spel.baby

---

## 1. Entry Point — Fake Flash Loading Screen

The first thing visitors see is a black screen with a fake Macromedia Flash loading bar.

- Black background, centred content
- Flash lightning bolt icon or similar
- Text: `Loading yesbellis_page.swf ...`
- Progress bar with intentionally jerky movement:
  - Pauses at ~42% for a beat
  - Jumps to ~78%
  - Crawls the rest of the way
  - Total duration: ~3 seconds
- Small text below: `Macromedia Flash Player 6.0 r21`
- Once "loaded", the main page snaps in (no smooth fade — abrupt, like real Flash)

## 2. Page Layout

Single page, fixed-width 800px, centred. No responsive design — on mobile you scroll sideways like it's 2003.

### Background
Tiled repeating dark starfield/sparkle pattern behind the entire page body.

### Structure (top to bottom)

#### 2.1 Header
- Band name: `⚔ YESBELLIS SPELL ⚔` in Times New Roman, yellow with magenta text-shadow
- Subtitle: `~*~ ThE eLf FrOm OuTeR sPaCe ~*~` in cyan, alternating caps
- Visitor counter: fake, in a green-on-black monospace display with inset border (hardcoded number like `000847` or slowly incrementing via JS)

#### 2.2 Status Bar
- Single line below header: `★ last updated: march 2026 ★ best viewed 800x600 ★ IE 6.0 ★`
- Magenta Comic Sans, tiny font size

#### 2.3 Two-Column Content Area

**Left Sidebar (~200px)**
- Album front art (`album_front.png`) with ridge border
- Character stats block:
  - Race: High Elf
  - Class: Bard (Lv.14)
  - Alignment: Chaotic Horny
  - Mood: ✨ Bardic ✨
  - Status: Touring the Material Plane
- "ADD TO PARTY" button (non-functional, styled with outset border and yellow text)

**Main Content (right, flexible)**

Sections in order, each in a bordered box with gradient section title bar:

1. **~*~ AbOuT mE ~*~** — In-character bio. Placeholder for now, will be provided later. RaWrXD energy, Comic Sans, written in first person as Yesbellis.

2. **~*~ YeSbElLiS mUsIc PlAyEr ~*~** — The centrepiece. See section 3 below.

3. **~*~ DiScOgRaPhY ~*~** — Album title "THE ELF FROM OUTER SPACE (2026)" in yellow, numbered tracklist below.

4. **~*~ GuEsTbOoK ~*~** — Fake comments from fictional visitors with scene-kid usernames. Placeholder entries for now, real content provided later. Format: username, date, message.

5. **~*~ LiNkS ~*~** — Fake links styled as cyan underlined text: "My Guild's Page", "Cool MIDI Archive", "Elven Webring" — these go nowhere (href="#").

#### 2.4 Footer
- "Powered by THE NAT ZEROES" banner — links to thenatzeroes.com. Styled as an outset-bordered badge.
- "🚧 this page is always under construction 🚧" in yellow
- "© 2026 yesbellis spell. made in Microsoft FrontPage 2003." in tiny grey monospace

## 3. Music Player

Styled as a homemade geocities "Flash embed". Actually functional — plays real audio using HTML5 Audio API under the skin.

### Appearance
- Outer container: ridge border, black background
- Title: `~*~ YeSbElLiS mUsIc PlAyEr ~*~` in yellow Comic Sans
- Display area: inset-bordered black box with cyan marquee-scrolling track names (real `<marquee>` tag, not CSS animation)
- Three buttons with mismatched neon colours, outset borders, Comic Sans:
  - `PLAY!!` — magenta background
  - `NEXT` — cyan background
  - `STOP` — yellow background
- Below buttons: `requires Macromedia Flash Player 6` in tiny grey monospace

### Behaviour
- Plays all 4 tracks in order, starting with "The Elf From Outer Space":
  1. The Elf From Outer Space
  2. Barmaid's Bosom
  3. Grog For My Dog
  4. The Tavern of Tragedy
- PLAY starts/resumes playback
- NEXT skips to next track (wraps to track 1 after track 4)
- STOP stops playback and resets to track 1
- Marquee updates to show current track name when playing
- No autoplay (browsers block it anyway)

### Audio Files
Located in `Yesbellis and the Spells Songs/` directory. Files will need to be referenced with URL-encoded paths or moved to a cleaner directory structure during implementation.

## 4. Visual Design Rules

These are deliberate choices to achieve authentic low-quality early-web aesthetics:

### Fonts
- **Primary:** Comic Sans MS — body text, buttons, navigation
- **Headings:** Times New Roman — page title, section titles (with text-shadow)
- **Technical/monospace:** Courier New — visitor counter, Flash version text, footer credits

### Colours
- **Background:** Black (#000) with tiled starfield pattern
- **Primary text:** Light grey (#ccc)
- **Heading text:** Yellow (#ff0) with magenta (#f0f) text-shadow
- **Accent 1:** Magenta/hot pink (#ff00ff / #ff69b4)
- **Accent 2:** Cyan (#00ffff)
- **Accent 3:** Neon green (#00ff00) — used sparingly for visitor counter, loading text
- **These colours deliberately clash.** That's the point.

### Borders
Heavy use of CSS `ridge`, `outset`, and `inset` borders. Grey tones (#666, #999). These are the hallmark of bad early-web table-based layouts.

### Text Formatting
- Section headers use aLtErNaTiNg CaPs wrapped in `~*~ tildes ~*~`
- Liberal use of ★ stars ★ and ⚔ swords ⚔ as decorative separators
- Real `<marquee>` HTML tags for scrolling text

### Layout
- Fixed 800px width, not responsive
- Table-like structure using CSS (but semantically, flex/grid is fine — the visitor can't view source)
- Visible borders on everything — nothing floats in unmarked space

## 5. Custom Cursor

The Nat Zeroes d20 logo used as a custom cursor site-wide.

- Source: `logos/favicon-32x32.png` (swap for SVG if one is provided later)
- Applied via CSS: `cursor: url('logos/favicon-32x32.png'), auto` (relative path — works on both custom domain and GitHub Pages project path)
- Applied to `body` element so it's everywhere
- Links get `cursor: url('logos/favicon-32x32.png'), pointer` to maintain the custom cursor on hover

## 6. Tech Stack

- **Pure HTML/CSS/JS** — no frameworks, no build tools, no npm. Geocities didn't have a package.json.
- **HTML5 Audio API** — for music playback behind the fake Flash player skin
- **GitHub Pages** — static file hosting
- **Custom domain** — spell.baby pointed at GitHub Pages (configured later by user)
- **Zero dependencies** — `index.html`, `css/style.css`, `js/main.js`, and asset files

## 7. File Structure

```
spellbaby/
├── index.html                          # Single page — everything lives here
├── css/
│   └── style.css                       # All styles
├── js/
│   └── main.js                        # Loading screen logic, audio player, visitor counter
├── assets/
│   └── images/
│       ├── starfield-bg.png           # Tiled background (to be created)
│       └── under-construction.gif     # Classic "under construction" GIF (to be sourced)
├── logos/
│   ├── favicon-32x32.png              # Custom cursor source + favicon
│   └── (other logo sizes)
├── Yesbellis and the Spells Songs/
│   ├── album_front.png
│   ├── album_rear.png
│   ├── The Elf From Outer Space - Yesbellis & the Spells.mp3
│   ├── Barmaid's Bosom - Yesbellis & the Spells.mp3
│   ├── Grog For My Dog - Yesbellis & the Spells.mp3
│   └── The Tavern of Tragedy - Yesbellis & the Spells.mp3
└── .gitignore
```

## 8. Content Placeholders

The following content will be provided by the user later and should use placeholder text for now:

- **About Me bio** — placeholder in-character text, to be replaced
- **Guestbook entries** — placeholder scene-kid comments, to be replaced
- **Character stats** — current values are best guesses, may be updated

## 9. Out of Scope

- Responsive/mobile design — intentionally absent
- Accessibility — this is a novelty page, not a production app
- SEO — if Google indexes it, great, but it's not a goal
- Analytics — no tracking
- Multiple pages — single page only
- Real guestbook functionality — all entries are hardcoded
- Autoplay — browsers block it, don't fight it
