# ORIENTAL BRUTALISMO.

[ SYSTEM.DOC // REV.03 ] | Master reference. One file, the whole system.

Japanese editorial brutalism in a dark UI. Bento Grid, negative space ('Ma'), heavy typography with a dry full stop and **a single primary color** (the Hanko).

---

## 0. HOW TO USE THIS FILE

1. **To decide anything in the UI**, find the section and copy the value. Do not invent.
2. **For AI** (Claude, Cursor, Copilot, v0): paste section **19. MASTER PROMPT** at the start of the project. It contains everything the AI needs to get it right the first time.
3. **For code**: `tokens/tokens.json` is the single source. `tokens/tokens.css` holds the variables. The values in this file and in the JSON must be identical; if they diverge, the JSON wins.
4. **For graphic pieces**: `node tools/make-asset.mjs` (section 16) and the Remotion compositions (section 13).
5. **Golden rule:** when in doubt, **remove** an element. If the screen is full, remove until only what matters is left; emptiness is the design.

---

## 1. IDENTITY

### In one sentence
An avant-garde Japanese design magazine, printed in exposed concrete and smoked glass, running as a system.

### The 5 non-negotiables
1. **Charcoal background, never pure black.** `#090a0f`.
2. **One primary color** (magenta `#980281`) on **one** focus per screen.
3. **Heavy uppercase title with a full stop.** `PANEL.`
4. **Bento Grid with breathing room ('Ma').** At least one almost-empty card per screen.
5. **1px hairline**, never a shadow, to separate.

### The 4 layers
| Layer | Role | Material |
|---|---|---|
| Structure | grid, cards, borders | concrete: `#14171f` + hairline |
| Voice | title, body | Archivo Black + Space Grotesk |
| Technical | tags, coordinates, data | JetBrains Mono |
| Oriental | vertical ruler, seal | kanji in a column + Hanko |

### When to use / not to use
| Use | Do not use |
|---|---|
| dashboards, devtools, technical portfolio, software landing, repository cover, architecture presentation | children's products, retail, anything that needs emotional warmth |

---

## 2. PRIMARY COLOR, BLACK AND WHITE

### 2.1 The primary color is the identity
**Every piece of art depends on one primary color.** It is what says "this is Oriental Brutalismo". Everywhere else the palette is neutral.

| Item | Value |
|---|---|
| Primary (default) | `#980281` magenta |
| Free use | Any primary color is allowed. `#980281` is the Oriental Brutalismo primary and the default of every token, composition and asset. |
| Approved variations | amber `#F59E0B`, acid `#D4FF00` |
| `primarySoft` | primary at 12% opacity (seal background, active line) |
| `primaryGlow` | primary at 45% (rare halo) |
| `onPrimary` | `#f3ece6` on magenta; **`#090a0f`** on amber and acid (choose the one with the highest contrast) |

Primary rules:
- **At most ~5% of the visible area.** It is a highlight, not a background.
- Valid uses: the title full stop, the Hanko seal, an active status dot, the primary button, a technical underline, a highlighted chart bar, the last point of a line.
- **Never:** a section background, long text, more than one filled button per screen, the borders of every card.
- Text on magenta (`onPrimary` `#f3ece6`) has **6.7:1** (AA). On amber/acid use `#090a0f` (9.2:1 / 17:1); `#f3ece6` there gives 1.8 / 1.0 and is forbidden.
- Magenta over `canvas` has only **2.5:1** (`surface1`: 2.3:1): use it for fills, shapes and the full stop, never for small text or paragraphs. For text-size use on dark, lighten it.
- When swapping the primary, validate ≥ 3:1 against `canvas` and `surface1`.

**Swapping the primary changes the whole art.** In CSS it is one variable; in Remotion it is the `primary` prop; in scripts it is `--primary`.

```css
:root { --color-primary: #980281; }                       /* the only value to swap */
.hanko, .btn--primary, .dot--on { /* derived via color-mix */
  --primary-soft: color-mix(in srgb, var(--color-primary) 12%, transparent);
  --primary-glow: color-mix(in srgb, var(--color-primary) 45%, transparent);
}
```
```bash
node tools/make-asset.mjs --concept oriental-brutalismo --type banner --primary "#F59E0B" --png
npx remotion render src/index.ts Oriental-Intro out/a.mp4 --props='{"primary":"#F59E0B"}'
```

### 2.2 Own black and white
Never use `#000000` or `#FFFFFF`. This concept's black and white have a tint:

| Token | Value | Where |
|---|---|---|
| `black` | `#090a0f` | canvas, general background (bluish charcoal) |
| `white` | `#dedfd7` | main text, lines, title (cold bone) |

If you need "darker than the canvas" (a well, an overlay), use `rgba(9,10,15,0.8)`; for "lighter than the text" (maximum highlight), use `#eeeee6`. Never `#000`/`#fff`.

### 2.3 Full palette

| Token | Value | Use |
|---|---|---|
| `canvas` | `#090a0f` | background (surface-0) |
| `surface1` | `#14171f` | cards, panels |
| `surface2` | `#1c242c` | hover, field, inactive bar |
| `text` / `white` | `#dedfd7` | main text |
| `textMuted` | `#7e8790` | secondary, metadata |
| `hairline` | `rgba(222,223,215,0.08)` | default border |
| `hairlineStrong` | `rgba(222,223,215,0.20)` | hover border, strong divider |
| `primary` | `#980281` | identity |
| `primarySoft` | `rgba(152,2,129,0.12)` | seal/active line background |

### 2.4 Verified contrast (WCAG)
| Pair | Ratio | Verdict |
|---|---|---|
| `white` on `black` | 14.7 | AAA |
| `white` on `surface1` | 13.3 | AAA |
| `textMuted` on `canvas` | 5.4 | AA |
| `textMuted` on `surface1` | 4.9 | AA |
| `primary` on `canvas` | 4.7 | AA (text ≥ 16px) |
| `primary` on `surface1` | 4.3 | large text/icon only |
| `onPrimary` on `primary` | 3.6 | only 18px+ weight 500+ |

---

## 3. TOKENS (paste and use)

```css
:root {
  /* color */
  --color-black: #090a0f;           /* = canvas */
  --color-canvas: #090a0f;
  --color-surface1: #14171f;
  --color-surface2: #1c242c;
  --color-white: #dedfd7;           /* = text */
  --color-text: #dedfd7;
  --color-text-muted: #7e8790;
  --color-hairline: rgba(222,223,215,0.08);
  --color-hairline-strong: rgba(222,223,215,0.20);
  --color-primary: #980281;
  --color-primary-soft: rgba(152,2,129,0.12);
  --color-on-primary: #f3ece6;

  /* typography */
  --font-display: "Archivo Black", sans-serif;
  --font-body: "Space Grotesk", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  --font-jp: "Noto Sans JP", sans-serif;

  /* shape */
  --radius-card: 20px;
  --radius-control: 12px;
  --radius-pill: 999px;
  --border: 1px solid var(--color-hairline);

  /* space (4 scale) */
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-6: 24px;
  --sp-8: 32px; --sp-12: 48px; --sp-16: 64px; --sp-24: 96px;

  /* motion */
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --t-quick: 120ms; --t-medium: 240ms; --t-slow: 360ms;
}
```

### Tailwind
```js
export default {
  theme: {
    extend: {
      colors: {
        canvas: '#090a0f', surface: {1: '#14171f', 2: '#1c242c'},
        ink: {DEFAULT: '#dedfd7', muted: '#7e8790'}, primary: 'var(--color-primary)',
      },
      fontFamily: {display: ['"Archivo Black"'], body: ['"Space Grotesk"'], mono: ['"JetBrains Mono"'], jp: ['"Noto Sans JP"']},
      borderRadius: {card: '20px', control: '12px'},
      transitionTimingFunction: {oriental: 'cubic-bezier(0.22,1,0.36,1)'},
    },
  },
};
```

---

## 4. TYPOGRAPHY

| Role | Font | Weight | Rules |
|---|---|---|---|
| Display | Archivo Black | 400 (already black) | uppercase, `letter-spacing: -0.02em`, `line-height: 1`, **full stop** in the primary color |
| Body/UI | Space Grotesk | 400, 500 | `line-height: 1.5`, sentence case |
| Mono | JetBrains Mono | 400 | uppercase on labels, `letter-spacing: 0.1em` |
| Japanese | Noto Sans JP | 300 to 700 | `writing-mode: vertical-rl` |

### Scale
| Level | Size / line | Use |
|---|---|---|
| Display XL | 160–230 / 1 | cover, hero |
| Display | 64–96 / 1 | page title |
| H2 | 32–40 / 1.1 | card title (display) |
| H3 | 24 / 1.3 | subtitle (body 500) |
| Body | 18–20 / 1.5 | text |
| Small | 15–16 / 1.5 | caption |
| Mono label | 13–15 / 1 | tags, `STATUS`, indexes |

### Rules
- Every main title ends with `.` and the dot goes in the **primary**.
- At most **two display sizes** per screen.
- Card label: uppercase mono on the left + index (`01`) on the right.
- Mono prefixes: `In.`, `Git.`, `#01`, `[ 0.1.0 ]`, `[ SYSTEM.DOC // REV.03 ]`.
- Minimum body: 16px (web), 14px (secondary mobile).

---

## 5. GEOMETRY, GRID AND SPACE

### Grid
- 12 columns, `gap` 16px (dense) or 24px (default).
- Outer margins: 24px mobile, 56px desktop.
- Breakpoints: `640` (sm), `1024` (md), `1440` (lg).
- Cards of **different** sizes (5+7, 4+4+4, 3+6+3), always aligned to the grid.

### Radii
| Element | Radius |
|---|---|
| Card | 20px |
| Field, button | 12px |
| Chip, pill, toggle | 999px |
| Inner block (bars, dividers) | 0 |
| Hanko seal | 0 |
| Decorative ring | 50% |

### Space
| Context | Value |
|---|---|
| Card padding | 28px (24 mobile) |
| Between label and content | 18px |
| Between sections | 64–96px |
| Button padding | 14px 24px |
| Control height | 44px (md), 36px (sm), 52px (lg) |
| Minimum touch target | 44×44px |

---

## 6. DEPTH AND BORDERS

**No shadow.** Depth comes from tonal layer + hairline.

| Level | Treatment |
|---|---|
| 0 | `canvas` |
| 1 | `surface1` + `1px hairline` |
| 2 | `surface2` (hover, field, popover) + `1px hairlineStrong` |
| Overlay | `rgba(9,10,15,0.72)` + `backdrop-filter: blur(8px)` |

The only "effect": `translateY(-2px)` on card hover. No diffuse shadow, no glow.

---

## 7. COMPONENTS (catalog)

### 7.1 Button
```css
.btn { height: 44px; padding: 0 24px; border-radius: 12px; border: 1px solid var(--color-hairline-strong);
  background: transparent; color: var(--color-white); font: 500 16px var(--font-body);
  transition: border-color .12s var(--ease), transform .12s var(--ease); }
.btn:hover { border-color: var(--color-white); transform: translateY(-2px); }
.btn:active { transform: translateY(1px); }
.btn:focus-visible { outline: 1px solid var(--color-primary); outline-offset: 3px; }
.btn--primary { background: var(--color-primary); border-color: var(--color-primary); color: var(--color-on-primary); font-weight: 500; font-size: 18px; }
.btn--ghost { border-color: transparent; color: var(--color-text-muted); }
.btn:disabled { opacity: .4; pointer-events: none; }
```
Rule: **one** `btn--primary` per screen. Button text: a verb in the imperative and an optional full stop (`Publish`, `Save.`).

### 7.2 Text field
```css
.field { height: 44px; padding: 0 16px; background: var(--color-surface2); border: 1px solid var(--color-hairline);
  border-radius: 12px; color: var(--color-white); font: 400 16px var(--font-body); }
.field::placeholder { color: var(--color-text-muted); }
.field:focus { outline: none; border-color: var(--color-primary); }
.field--error { border-color: var(--color-primary); }
.field-label { font: 13px var(--font-mono); letter-spacing: .1em; text-transform: uppercase; color: var(--color-text-muted); }
.field-help { font: 14px var(--font-body); color: var(--color-text-muted); }
```
Structure: mono label (above) → field → help/error (below, 14px). Error: `ERROR. Token expired.` in the primary + primary border.

### 7.3 Select / dropdown
Same as the field, with a mono `▾` on the right. Menu: `surface2`, `hairlineStrong` border, radius 12, 40px item, active item with `primarySoft` + a primary dot.

### 7.4 Checkbox / radio
20px square (checkbox, radius 4) / 20px circle (radio). Off: `hairlineStrong` border. On: `white` fill, `black` check. **Never** a solid primary on all of them.

### 7.5 Toggle
56×32, radius 999. Off: `surface2` + `hairlineStrong` border, `white` knob. On: primary fill, `onPrimary` knob.

### 7.6 Slider
4px `surface2` track; `white` fill; 18px `white` knob; value in mono on the right.

### 7.7 Card
```css
.card { background: var(--color-surface1); border: var(--border); border-radius: 20px; padding: 28px;
  transition: transform .24s var(--ease), border-color .24s var(--ease); }
.card:hover { transform: translateY(-2px); border-color: var(--color-hairline-strong); }
.card__head { display: flex; justify-content: space-between; font: 15px var(--font-mono); letter-spacing: .1em; color: var(--color-text-muted); margin-bottom: 18px; }
```
Header: `LABEL` on the left, `01` on the right.

### 7.8 Tag / chip / badge
```css
.tag { font: 15px var(--font-mono); padding: 6px 14px; border-radius: 999px; border: 1px solid var(--color-hairline-strong); color: var(--color-text-muted); }
.tag--primary { border-color: var(--color-primary); color: var(--color-primary); background: var(--color-primary-soft); }
```

### 7.9 Hanko (seal)
A square with a 2×2 grid of two alternating glyphs, 4px primary border, `primarySoft` background. Default glyphs: **間 / 禅**. Rotation -3°. Sizes: 64, 96, 150.

### 7.10 Navigation
- **Rail (desktop):** 92px, `surface1`, radius 20, primary `O.` logo on top, a vertical kanji column in the middle (運用・分析・設定), `+ + +` crosses at the bottom.
- **Topbar:** height 72, display title on the left, tags on the right.
- **Bottom nav (mobile):** 5 icons with a 24px stroke, active in `white`, inactive in `textMuted`, a 4px primary dot under the active one.
- **Tabs:** uppercase mono label; active with a 2px primary underline.
- **Breadcrumb:** `In. / Projects / Theme`, mono 14px, separator `/`.

### 7.11 Table
Uppercase mono `textMuted` header, 56px rows, `hairline` divider between rows, **no zebra**, `surface2` hover, selected row with `primarySoft` + a primary dot. Numbers in mono, right-aligned.

### 7.12 List
Item: text on the left, state on the right (`● ACTIVE` primary / `● QUEUE` muted), `hairline` divider, 56px.

### 7.13 Modal / drawer
Overlay `rgba(9,10,15,0.72)`. `surface1` panel, radius 20, `hairlineStrong` border, width 560 (modal) or 440 (drawer, sticks to the right, radius 20 only on the left side). Display title 40px with a full stop. Footer actions: ghost + primary.

### 7.14 Toast
`surface1`, `hairline` border, **3px primary left rule**, radius 20, primary mono label (`SYNC`) + message. Enters by a wipe from the right, leaves after 4s.

### 7.15 Tooltip
`surface2`, radius 8, mono 13px, 300ms delay, no arrow (aligned by the border).

### 7.16 Progress and loader
- **Bar:** 14px `surface2` track + hairline, primary fill, square (radius 0), progress in steps, display number beside it.
- **Loader:** a row of 12 blocks 20×40; the active one in the primary travels; 4 frames per step.
- **Skeleton:** straight `surface2` blocks, no shimmer (opacity pulse 0.5↔1, 1.2s).

### 7.17 Avatar
A square with radius 12 (not a circle), hairline border; initials in Archivo Black. Status: an 8px primary dot in the corner.

### 7.18 Accordion
64px row, title on the left, mono `+`/`−` on the right, hairline divider; content in body text with `padding-left` aligned to the title.

### 7.19 Pagination
`‹ 01 02 03 … 12 ›` in mono; current with a primary border and radius 8.

### 7.20 Empty state
A centered card, a giant glyph in `surface2` (間), a 40px display title (`NOTHING HERE.`), one sentence, **one** button. See section 14.

---

## 8. STATES (always implement all)

| State | Visual rule |
|---|---|
| Default | `surface1` + hairline |
| Hover | `translateY(-2px)` + `hairlineStrong` (140ms) |
| Focus (keyboard) | `outline: 1px solid primary; outline-offset: 3px` |
| Active/pressed | `translateY(1px)` |
| Selected | `primarySoft` + a primary dot |
| Disabled | `opacity: .4`, no hover, `cursor: not-allowed` |
| Error | primary border + `ERROR.` primary text + message |
| Success | `white` rule/dot + `OK.` text (**do not** invent green) |
| Loading | block-loader or a stepped bar |
| Empty | section 14 |

Semantic statuses **without extra colors**: use shape and text. `● ACTIVE` (primary), `○ QUEUE` (muted), `■ ERROR.` (solid primary), `✓ OK.` (white). If the product requires green/yellow, use `#7fbf6a` / `#d9a441` **only** in an 8px dot.

---

## 9. SCREEN PATTERNS

### 9.1 Dashboard (reference: `Oriental-Ui`)
92px rail + a 12-column area. Header (`PANEL.` display 84 + tags). Row 1: a big metric card (5 cols) + terminal (4) + seal (3). Row 2: queue (4). Metric: display 190 number with a primary `%`. 1 chart with **one** bar in the primary.

### 9.2 Landing
1. Hero: Display XL title (up to 230px) with a full stop, mono subtitle, 1 primary button + 1 ghost, a floating Hanko.
2. Logo strip (mono, muted).
3. A Bento of 5–6 cards (features), one almost empty.
4. Final CTA: a wide card, title + primary button.
5. Footer: mono, top hairline, `+ + + +` crosses.

### 9.3 Login
A 440px centered card. Title `SIGN IN.`, 2 fields, full-width `btn--primary`, a ghost link "Forgot password". A 64px Hanko in the card's top right corner. A tategaki column beside it on desktop.

### 9.4 Settings
Left: a list of sections (uppercase mono, active with a primary rule). Right: cards per section (`GENERAL`, `ACCOUNT`, `ADVANCED`), toggle/slider rows. Fixed footer: ghost "Discard" + primary "Save.".

### 9.5 List and detail
List on the left (5 cols) as a table/list; detail on the right (7 cols) in a card with a display title, tags, data in mono and actions.

### 9.6 Form
One column, 560px. Sections separated by a hairline with a mono label. Primary button at the end. Inline errors.

### 9.7 404 and error
`404.` in Display XL (primary full stop), a giant `間` in `surface2` in the background, a mono sentence, one button.

### 9.8 Onboarding
Steps `01 / 04` in mono at the top, display title, 1 action per step, a square step bar.

### 9.9 Mobile
Single column; the rail becomes a bottom nav; title 48–64px; full-width cards with a 16px margin; the primary button fixed at the bottom; 56px Hanko.

---

## 10. CHARTS AND DATA

- **Bars:** `surface2` with a `hairlineStrong` top border; **one** in the primary (the one that matters). Radius 0. No label inside; axis in mono 13px.
- **Line:** 1.5px `white`; last point = an 8px primary circle; only a horizontal grid in `hairline`.
- **Donut/ring:** 1px `hairlineStrong`, a primary dot that orbits.
- **Big numbers:** display 120–190, the unit (`%`) smaller and in the primary.
- **Tables > charts** when the data is for lookup.
- **At most 1 series in the primary.** Other series: `white` (main), `textMuted`, `surface2`.
- No gradient, no shadow, no decorative animation; animation = bars grow in 6 steps.

---

## 11. ICONS AND GLYPHS

- 24px grid, 1.5px stroke, `stroke-linecap: square`, `stroke-linejoin: miter`, `currentColor`.
- Color: `white` (active), `textMuted` (inactive). The primary only in a dot/detail.
- Oriental brand glyphs (with meaning): **間** ma (space), **禅** zen, **道** path, **鉄** iron, **簡素** simplicity.
- Base set: home (a square in a square), data (3 bars), settings (6-tooth gear), search (circle + 45° stroke), exit (arrow + bracket), status (dot + ring).
- Generate: `node tools/make-asset.mjs --concept oriental-brutalismo --type icon --glyph 禅 --png`.

---

## 12. IMAGE, PHOTO AND ILLUSTRATION

- Photos: **monochrome** (duotone `black`→`white`), high contrast, no grain, rectangular crop with a `1px hairline`, radius 0 or 12.
- AI pieces: rules and prompts in section 18; always **without text**, the text comes from the script/Remotion.
- Editorial portrait: architectural slices, raw stone, directional light, the Hanko as the only touch of color.
- Illustration: geometry (circle, rectangle, line), never colored characters.
- Texture: raw matte concrete and smoked glass; **no** plastic, **no** neon.

---

## 13. MOTION

**Signature: dry and hard.** Mask wipes, no slow fade, one event per scene (the stamp).

| Principle | Value |
|---|---|
| Curve | `cubic-bezier(0.22, 1, 0.36, 1)` (OutExpo) |
| Quick / Medium / Slow | 120 / 240 / 360 ms |
| Card entrance | **wipe** from the left (`clip-path: inset`) + 24px slide |
| Title | letter by letter, bottom-to-top mask, 2-frame delay |
| Lines | grow from 0 to full width |
| Numbers | count in **steps** (quantized), not smoothly |
| Bars | grow in 6 steps |
| Terminal | types; the cursor blinks every 8 frames |
| **Stamp (Hanko)** | `scale 1.9→1`, `rotate -10°→-3°`, 6 frames, **camera shake** 9 frames, 2-frame flash |
| Card hover | `translateY(-2px)` |
| Forbidden | bounce, elastic, long fade-only, parallax, blur |

```css
@keyframes wipe-in { from { clip-path: inset(0 100% 0 0); transform: translateX(-24px); } to { clip-path: inset(0); transform: none; } }
.enter { animation: wipe-in .24s var(--ease) both; }
@media (prefers-reduced-motion: reduce) { .enter { animation: none; } }
```

### Remotion compositions (`src/oriental/`)
`Oriental-Intro`, `Oriental-Ui`, `Oriental-Components`, `Oriental-Logo`, `Oriental-Banner`, `Oriental-Social`. All accept `primary`.

---

## 14. VOICE AND MICROCOPY

**English, short, dry, ends with a full stop.** Command sentences in the imperative. No exclamation marks, no emoji, no "Oops!".

| Situation | Text |
|---|---|
| Page title | `PANEL.` `SETTINGS.` |
| Main button | `Save.` `Publish.` `Sign in.` |
| Secondary button | `Cancel` `Back` |
| Success | `OK. Theme applied.` |
| Error | `ERROR. Token expired.` |
| Empty | `NOTHING HERE.` + "Create the first item." |
| Loading | `Loading.` `Syncing 12/48.` |
| Confirm deletion | `Delete 3 items. This cannot be undone.` |
| 404 | `404.` + "Page not found." |
| Placeholder | `project name` (lowercase, mono optional) |
| Footer | `[ REV.03 ] © 2026` |

Errors say **what happened** and **what to do**, in one line.

---

## 15. ACCESSIBILITY

- Contrast: section 2.4. Body text ≥ 4.5:1.
- Focus always visible (1px primary outline, 3px offset).
- Touch target ≥ 44px.
- State never by color alone: always shape or text (`● ACTIVE`).
- `prefers-reduced-motion`: turns off wipe, shake, animated stamp.
- Decorative kanji: `aria-hidden="true"`; kanji with a function (a nav label) needs an English `aria-label`.
- `lang="en"` on the document; `lang="ja"` on the Japanese snippets.
- Headings: one `h1` per page; the full stop is **not** read (use `::after`).

---

## 16. ASSETS AND BRAND

### Logo
- Wordmark: `ORIENTAL.` in Archivo Black, full stop in the primary.
- Monogram: `O.` (rail, favicon).
- Seal: Hanko 間/禅.
- Clear space: the height of the "O". Minimum wordmark: 80px.

### Sizes
| Piece | Size |
|---|---|
| X header | 1500×500 |
| LinkedIn personal | 1584×396 |
| GitHub social | 1280×640 |
| Open Graph | 1200×630 |
| Post | 1080×1350 |
| Story | 1080×1920 |
| Slide | 1920×1080 |
| App icon | 1024 |

### Scripts
```bash
npm run fonts                                         # downloads the TTFs once
node tools/make-asset.mjs --concept oriental-brutalismo --type icon      --glyph 禅 --png
node tools/make-asset.mjs --concept oriental-brutalismo --type badge     --title STABLE --png
node tools/make-asset.mjs --concept oriental-brutalismo --type banner    --title "MY PROJECT" --subtitle "text" --png
node tools/make-asset.mjs --concept oriental-brutalismo --type og        --title "POST" --png
node tools/make-asset.mjs --concept oriental-brutalismo --type social    --title "NEW RELEASE" --png
node tools/make-asset.mjs --concept oriental-brutalismo --type wallpaper --size 3840x2160 --png
node tools/make-asset.mjs --concept oriental-brutalismo --type pattern   --png
node tools/make-asset.mjs --all --png                 # everything
```
Any command accepts `--primary "#rrggbb"`.

---

## 17. WHAT MAKES THIS CONCEPT ITS OWN

This system shares the magenta + hairline + kanji idea with other dark oriental systems. What distinguishes it, and what you must **keep** so it is not read as a copy:

| Own decision (keep) | What to avoid (belongs to another system) |
|---|---|
| **Cold bluish charcoal** canvas `#090a0f` | warm brown canvas (`#0f0c07`) |
| **Bento Grid** with `rounded-2xl` cards | square-corner panels (radius 0) |
| **Archivo Black** + Space Grotesk + JetBrains Mono | editorial serif (Fraunces) |
| Depth through **tonal layer + hairline** | offset hard shadow |
| **間 / 禅** seal in a 2×2 grid | — |
| **Swappable** primary (magenta, amber, acid) | kintsugi gold |
| **System/devtools** tone | — |
| Mono labels `In.` `Git.` `#01` `[ 0.1.0 ]` | — |

Rule of thumb: if the screen has **warm brown + serif + hard shadow**, it left the concept. Go back to cold charcoal, Archivo Black, hairline and 間.

---

## 18. IMAGE PROMPTS (AI)

> **Full library (144 prompts):** [`PROMPTS.md`](PROMPTS.md) covers images without and with people, icons, banners, image editing, video generation and editing, audio, text and code. Below, only the essentials.

Base (paste at the end of any prompt): `oriental brutalist minimalist aesthetic, deep matte obsidian (#090a0f), dark graphite panels (#14171f), stark off-white (#dedfd7), single magenta accent (#980281), 1px hairlines, dot matrix, '+' registration marks, vertical Japanese tategaki, Hanko seal, vast negative space ('Ma'), matte concrete and smoked glass, directional studio light, no plastic reflections, no neon`

| Piece | Prompt (summary) |
|---|---|
| UI | `High-end modern UI design concept for [APP]. Bento Grid, translucent dark panels, 1px hairline borders, bold grotesque headers with dry terminal periods, vertical Japanese columns, monospace tags, Hanko badges. Figma UI showcase --ar 16:9` |
| Background | `Minimalist abstract backdrop, thin 1px wireframe planes, dot matrix, '+ + + +', levitating Bento blocks, magenta Hanko seal, vast negative space --ar 16:9` |
| Icon | `Graphic icon badge featuring [OBJECT], Bento frame, 1px wireframe rings, Hanko seal, high contrast vector --ar 1:1` |
| Portrait | `Metaphysical surreal portrait of [PERSON], deconstructed into architectural slices and Bento modules, raw stone, vertical kanji, magenta Hanko accent --ar 4:5` |
| Banner without text | `Abstract hero banner, floating monoliths and levitating spheres, graphite modules, a single magenta Hanko slice, no readable text --ar 16:9` |
| Architecture | `Abstract architecture of [CONCEPT]: Bento cubes joined by 1px circuits, active pulses in magenta --ar 16:9` |
| Terminal | `Floating terminal window, dark glass Bento panel, code in magenta and off-white, vertical Japanese metadata --ar 16:9` |

Negatives: `no neon, no gradients, no plastic gloss, no rainbow, no cartoon, no 3D bevel, no gibberish text`. Full prompts in `docs/07-ai-prompts.md` and in `reference/original-prompt-manual.md`.

---

## 19. MASTER PROMPT FOR FRONT-END AI (paste whole)

```
You are an expert front-end engineer. When building interfaces in this project you MUST strictly follow
the ORIENTAL BRUTALISMO system below. Never use generic framework visuals, purple gradients, diffuse
shadows, or #000 / #FFF.

COLOR (the only live color = the primary):
- canvas #090a0f · surface1 #14171f · surface2 #1c242c · text #dedfd7 · muted #7e8790
- border 1px rgba(222,223,215,0.08); hover rgba(222,223,215,0.20)
- primary #980281 (variable --color-primary). Use it on ONE focus per screen: title full stop, Hanko
  seal, active status, primary button, one chart bar. Never as a background. Text on the primary:
  18px+ weight 500+, color #f3ece6.
TYPOGRAPHY: titles in Archivo Black, UPPERCASE, tracking -0.02em, line-height 1, ending with "."
(the dot in the primary). Body Space Grotesk 400/500. Labels and data JetBrains Mono, uppercase, tracking
0.1em. Vertical kanji (writing-mode: vertical-rl) in Noto Sans JP 300, only as a ruler; use 間 禅 道 鉄.
SHAPE: 12-column grid, gap 16/24. Cards bg surface1, 1px hairline border, radius 20px, padding 28px.
Controls radius 12px, height 44px. Pills 999px. Inner blocks radius 0. NO shadow.
SPACE: scale 4/8/12/16/24/32/48/64/96. Leave at least one almost-empty card ('Ma').
MOTION: ease cubic-bezier(.22,1,.36,1); 120/240/360ms. Entrance = wipe (clip-path) + 24px slide, never
a slow fade. Card hover translateY(-2px) + stronger border. No bounce. Respect prefers-reduced-motion.
STATES: always hover, focus-visible (1px primary outline offset 3px), active, disabled (.4), error (primary
border and text, "ERROR. ..."), empty ("NOTHING HERE."), loading (stepped bar). State never by color alone.
VOICE: short, dry English, ends with a full stop, no exclamation marks/emoji.
CHARTS: surface2 bars with ONE in the primary; 1.5px lines with the last point in the primary; no gradient.
ICONS: 1.5px stroke, square caps, 24px grid, currentColor.
Always deliver: semantic HTML, lang="en", AA contrast, touch target ≥ 44px.
```

---

## 20. DELIVERY CHECKLIST

- [ ] Background `#090a0f`; no `#000`/`#fff`.
- [ ] One primary focus; the title full stop in the primary.
- [ ] Uppercase title with a full stop; at most 2 display sizes.
- [ ] One almost-empty card ('Ma').
- [ ] 1px hairline; zero shadow.
- [ ] All states (hover, focus, active, disabled, error, empty, loading).
- [ ] Body contrast ≥ 4.5:1; visible focus; touch ≥ 44px.
- [ ] Dry English voice with a full stop.
- [ ] No warm brown, no serif, no hard shadow (section 17).

## 21. QUICK DECISION

| Question | Answer |
|---|---|
| Which color to highlight? | only the primary, and only one point |
| Do I need a shadow? | no: hairline |
| Card or list? | card for a summary, list/table for lookup |
| Too much information? | remove; if you cannot, split it into tabs |
| Does it need an icon? | only if the mono label is not enough |
| Animate? | only the entrance (wipe) and one event |
| Style doubt? | go back to section 1 (the 5 non-negotiables) |

## 22. REPOSITORY MAP

| I need… | Go to |
|---|---|
| **all prompts** (image, video, editing, audio, text, code) | `PROMPTS.md` |
| detail by topic | `docs/01…15` in this folder |
| tokens | `tokens/tokens.json`, `tokens/tokens.css` |
| ready CSS for components | `tokens/components.css` |
| example page | `examples/showcase.html` |
| videos/animations | `../src/oriental/` (`npm run studio`) |
| assets | `../tools/make-asset.mjs` |
| source MD | `reference/original-prompt-manual.md` |
