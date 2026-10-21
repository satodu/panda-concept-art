# GALDR.

[ SYSTEM.DOC // REV.03 ] | Master reference. One file, the whole system.

Primitive Nordic cyberpunk, minimal. Carved Elder Futhark runes, thin circuit lines, near black, bone paper, **a single primary color** (ice) and physical crystal shards lit like runestones.

---

## 0. HOW TO USE THIS FILE

1. **UI decision:** find the section, copy the value. Do not invent.
2. **AI (Claude, Cursor, v0):** paste section **19. MASTER PROMPT** at the start of the project.
3. **Code:** `tokens/tokens.json` is the single source; `tokens/tokens.css` holds the variables. If they diverge, the JSON wins.
4. **Graphic pieces:** `node tools/make-asset.mjs` (section 16) and Remotion compositions (section 13).
5. **Golden rule:** every screen is a **runestone plate**: title, figure, caption, data, a rune line. If it does not fit on a plate, it does not go in.

---

## 1. IDENTITY

### In one sentence
Primitive Nordic cyberpunk, minimal: each crystal is a carved runestone read by a cold machine, a data shard lit by ice-colored light and described in short, serious prose.

> **The crystal is the concept, not a literal object.** It lives in the visual language: facets, 45° chamfers, refraction in the light, ice-colored glow. A literal crystal is one hero option among others (carved standing stone, rune tablet, floating rune ring, a small shard set in stone). Do not put a crystal in every image or prompt; use one only when the brief asks for it.

### The 7 non-negotiables
1. **Warm near-black canvas** `#0C0C0B`, never pure black.
2. **One primary** (ice `#8FF3FF`), one focus per screen.
3. **45° chamfered corners** on panels (never rounded).
4. **Depth through light** (inner glow, rim light, frost), **never** a hard shadow.
5. **Live color only in the crystal.** The violet→cyan spectrum **never** becomes a UI color.
6. **Magazine hierarchy**: at least 4 levels (title, subtitle, body, caption/data).
7. **Fine line work on every dark surface** (corner brackets, tick rulers, rune ring, faded rune field, circuit traces: section 6.1) and **real runes only**, never random glyphs.

### The 6 pillars
| Pillar | Appears as |
|---|---|
| Catalog | `GD-0417`, mono tables, scale ruler |
| Editorial | condensed title, serif body, pull quote |
| Facet | 45° chamfer, cutting lines, rhombus seal |
| Light | halo, rim light, light sweep, frosted panels |
| Runes | carved Elder Futhark characters: the vertical rune ruler, the rune ring around the hero shard, seals |
| Line work | corner brackets, tick rulers, a faded rune field, thin circuit traces with square nodes (dark surfaces only) |

### The myth
**Galdr (Old Norse: the chanted spell of the runes).** Runes carved into crystal, read by cold machines. The product is a rune archive, not a faction. A terse, factual, ritual-technical voice.

### When to use / not to use
| Use | Do not use |
|---|---|
| catalogs, collections, archives, asset libraries, collection games, research dashboards, serious premium | casual products, humor, children's, dense operations interfaces |

---

## 2. PRIMARY COLOR, BLACK AND WHITE

### 2.1 The primary color is the identity
**Every piece of art depends on one primary color.** It says "this is Galdr". Everything else is cold-neutral.

| Item | Value |
|---|---|
| Primary (default) | `#8FF3FF` ice |
| Approved variations | jade `#7DF9B4`, amber `#FFB86B` |
| `primarySoft` | primary at 25% (seal background, active item) |
| `primaryGlow` | primary at 35% (crystal halo, sweep) |
| `onPrimary` | `#0C0C0B` (text on the primary; 15.3:1) |

Rules:
- The primary is **light**: leader lines, focus, active, seal, side rule, title full stop, sweep.
- **Never** on bone paper (contrast 1.0). On bone, the highlight is `black` + the primary side rule.
- At most **one** button filled with the primary per screen.
- Crystal and primary are independent: the crystal spectrum (`spectralA/B`) **does not change** when the primary changes; only the halo and the lines.

```css
:root { --color-primary: #8FF3FF; }   /* the only value to swap */
```
```bash
node tools/make-asset.mjs --concept galdr --type banner --primary "#FFB86B" --png
npx remotion render src/index.ts Galdr-Intro out/k.mp4 --props='{"primary":"#FFB86B"}'
```

### 2.2 Own black and white
Never `#000000` or `#FFFFFF`.

| Token | Value | Where |
|---|---|---|
| `black` | `#0C0C0B` | canvas, text on bone/primary |
| `white` | `#F3F0E6` | maximum highlight (specular shine, title on ink) |
| `bone` | `#E9E4D6` | reading **paper** (not the "white"; it is the surface) |
| `boneInk` | `#14110c` | text on bone (warm black) |

### 2.3 Full palette

| Token | Value | Use |
|---|---|---|
| `ink` | `#0C0C0B` | canvas |
| `ink2` | `#141413` | dark panels, rail |
| `ink3` | `#1D1D1B` | plinth, raised layer, field |
| `bone` | `#E9E4D6` | editorial panel |
| `boneInk` | `#14110c` | text on bone |
| `boneMuted` | `#6b665a` | caption on bone |
| `primary` | `#8FF3FF` | identity |
| `primarySoft` | `rgba(143,243,255,0.25)` | seal, active |
| `spectralA` / `spectralB` | `#8B5CF6` / `#7DF9FF` | **only inside the crystal** |
| `textMuted` | `#8F8E88` | metadata on dark |
| `hairline` | `rgba(233,228,214,0.14)` | 1px divider |
| `hairlineStrong` | `rgba(233,228,214,0.32)` | panel border |

### 2.4 Verified contrast (WCAG)
| Pair | Ratio | Verdict |
|---|---|---|
| `bone` on `ink` | 15.4 | AAA |
| `boneInk` on `bone` | 14.8 | AAA |
| `boneMuted` on `bone` | 4.5 | AA (limit) |
| `primary` on `ink` | 15.3 | AAA |
| `primary` on `ink2` | 14.4 | AAA |
| `textMuted` on `ink2` | 5.6 | AA |
| `ink` on `primary` | 15.3 | AAA |
| `primary` on `bone` | **1.0** | **forbidden** |

### 2.5 The two surfaces
- **Dark (`ink`/`ink2`)**: navigate, measure, see the object.
- **Bone (`bone`)**: **read** (article, spec sheet, long caption).
Alternating dark/bone creates the editorial rhythm. At most **2 bone panels** per screen.

---

## 3. TOKENS

```css
:root {
  --color-black: #0C0C0B;  --color-ink: #0C0C0B;  --color-ink2: #141413;  --color-ink3: #1D1D1B;
  --color-white: #F3F0E6;  --color-bone: #E9E4D6; --color-bone-ink: #14110c; --color-bone-muted: #6b665a;
  --color-primary: #8FF3FF; --color-primary-soft: rgba(143,243,255,0.25); --color-on-primary: #0C0C0B;
  --color-spectral-a: #8B5CF6; --color-spectral-b: #7DF9FF;
  --color-text-muted: #8F8E88;
  --color-hairline: rgba(233,228,214,0.14); --color-hairline-strong: rgba(233,228,214,0.32);

  --font-display: "Big Shoulders Display", sans-serif;
  --font-editorial: "Source Serif 4", serif;
  --font-rune: "Noto Sans Runic", sans-serif;
  --font-body: "Inter", sans-serif;
  --font-mono: "IBM Plex Mono", monospace;

  --chamfer: 14px;  --chamfer-btn: 16px;  --chamfer-sheet: 40px;
  --filet: 2px;

  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-6: 24px; --sp-8: 32px; --sp-12: 48px; --sp-16: 64px;

  --ease: cubic-bezier(0.3, 0, 0, 1);
  --t-quick: 140ms; --t-medium: 260ms; --t-slow: 420ms;
}
```

### Tailwind
```js
export default { theme: { extend: {
  colors: { ink: {DEFAULT:'#0C0C0B',2:'#141413',3:'#1D1D1B'}, bone: {DEFAULT:'#E9E4D6',ink:'#14110c',muted:'#6b665a'}, primary:'var(--color-primary)' },
  fontFamily: { display:['"Big Shoulders Display"'], editorial:['"Source Serif 4"'], rune:['"Noto Sans Runic"'], body:['Inter'], mono:['"IBM Plex Mono"'] },
  transitionTimingFunction: { galdr:'cubic-bezier(0.3,0,0,1)' },
}}};
```

---

## 4. TYPOGRAPHY

| Role | Font | Weight | Rules |
|---|---|---|---|
| Display | Big Shoulders Display | 800 | uppercase, `letter-spacing: 2px`, `line-height: 1`, **full stop** in the primary |
| Editorial | Source Serif 4 | 400/600 | reading body, `line-height: 1.7–1.8` |
| UI | Inter | 400/500 | controls |
| Data | IBM Plex Mono | 400/500 | catalog, measurements, figure captions, uppercase with `letter-spacing: 2px` |
| Runes | Noto Sans Runic | 400 | real Elder Futhark characters; `writing-mode: vertical-rl` for the rune ruler (ᚷᚨᛚᛞᚱ), rune ring, seals |

### Scale
| Level | Size / line | Use |
|---|---|---|
| Display XL | 130–150 / 1 | cover title |
| Display | 78–96 / 1 | plate title |
| H2 | 48–56 / 1 | shard name |
| Editorial body | 19–22 / 1.75 | article, spec sheet |
| UI | 16–18 / 1.4 | controls |
| Mono label | 14–16 / 1, caps +2px | `SPEC SHEET` |
| Mono data | 18–22 | table values |

### Minimum hierarchy of every screen (5 levels)
1. Display title · 2. Mono caps subtitle · 3. Serif body · 4. Figure caption (`FIG. 01 — ...`) · 5. Small mono note/metadata.

---

## 5. GEOMETRY, GRID AND SPACE

### Chamfer (the brand stroke)
Two corners cut at 45°: **top right** and **bottom left**.
| Element | Chamfer |
|---|---|
| Panel | 14px |
| Button, large chip | 16px |
| Chip, tag | 8px |
| Mobile sheet | 36–40px |
| Facet seal | rhombus (10% cut on 4 corners) |

### Grid
- Desktop 12 columns, gap 28px, margin 80px.
- Mobile 4 columns, gap 16px, margin 24px.
- Editorial layout: columns of **uneven** width (table 3 · object 6 · article 3).
- Breakpoints: 640 / 1024 / 1440.

### Space
Panel padding 28px (24 mobile). Label→content 14px. Table row 64px. Between panels 28px. Control height 48px (lg 56). Touch ≥ 44px.

---

## 6. DEPTH AND LIGHT

**No hard shadow. Depth through light.**

| Resource | Recipe |
|---|---|
| Halo | radial gradient of the primary, 22–30% → 0, behind the crystal |
| Rim light | 1px `white` line at 40–60% on the object's edges |
| Frost | `ink2` panel at 80% + `backdrop-filter: blur(10px)` + `hairlineStrong` border |
| Inner glow | `box-shadow: inset 0 0 40px primarySoft` (active item only) |
| Plinth | `ink3 → ink` block with `border-top: 1px hairlineStrong` under every hero object |
| Sweep | a 2px primary vertical bar with glow that crosses the crystal |

No offset `box-shadow`. No cast shadow.

### 6.1 Fine line work and rune atmosphere (the dark surfaces)
The dark side needs thin lines and faded runes, never fills and never a second outline around components (that reads as a frame). Everything is low contrast and sits under the content.

| Piece | Recipe |
|---|---|
| Page corner brackets | four L-shaped brackets inset 30px (40px legs, bone at 30%) + two short tick rulers on the top and right edges |
| Panel edge details | on every dark panel: two primary **targeting brackets** (14px, 1.5px, 60%) on the two square corners, a 14-tick **ruler** on the top edge (every 4th tick longer) and a tiny **rune tag** by the chamfer. No inner outline |
| Rune ring | two thin circles (`r` and `r − 36`) plus a dotted outer one around the hero shard; the 24 Elder Futhark runes sit between them at 30% and the ring turns at 0.12°/frame |
| Faded rune field | 7–11 huge runes (120–340px) scattered behind everything in bone, warm grey and a few in the primary, at 3–7% opacity, drifting a few px. Atmosphere only, never carries meaning |
| Circuit traces | 4 polylines with 45°/90° bends ending in a 6px square node, 14% opacity |
| Facet lines | the large wireframe polygons behind the cards (6–12%) |

Components: `Linework`, `RuneField`, `Panel` (Remotion); `.lines`, `.rune-bg`, `.panel > .in::before/::after` (CSS); `gLines` (SVG). Never add line work to bone panels: they stay clean.

---

## 7. COMPONENTS

### 7.1 Chamfered panel (the base of everything)
```css
.panel { --c: 14px; background: var(--color-hairline-strong); padding: 1px;
  clip-path: polygon(0 0, calc(100% - var(--c)) 0, 100% var(--c), 100% 100%, var(--c) 100%, 0 calc(100% - var(--c))); }
.panel > .inner { background: var(--color-ink2); padding: 28px;
  clip-path: inherit; }
.panel--bone > .inner { background: var(--color-bone); color: var(--color-bone-ink); }
.panel--active { box-shadow: none; border-left: 2px solid var(--color-primary); }   /* rule */
```
(In Remotion/React use `Panel` from `src/galdr/parts.tsx`, outline in SVG.)

### 7.2 Button
```css
.btn { --c: 16px; height: 56px; padding: 0 40px; border: 0; background: var(--color-ink2); color: var(--color-primary);
  font: 800 28px var(--font-display); letter-spacing: 4px; text-transform: uppercase;
  clip-path: polygon(0 0, calc(100% - var(--c)) 0, 100% var(--c), 100% 100%, var(--c) 100%, 0 calc(100% - var(--c)));
  transition: background var(--t-medium) var(--ease), color var(--t-medium) var(--ease); }
.btn:hover { background: var(--color-primary); color: var(--color-on-primary); }
.btn:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 4px; }
.btn:disabled { opacity: .4; }
.btn--ghost { background: transparent; color: var(--color-white); box-shadow: inset 0 0 0 1px var(--color-hairline-strong); }
```
Label: a short uppercase verb (`ADD`, `COMPARE`, `EXPORT`).

### 7.3 Field
Height 48, `ink3` background, chamfer 8 (same corners), Inter 16 `bone` text, `textMuted` placeholder. Focus: 2px primary left rule + `hairlineStrong` border. Mono caps label above. Error: mono text `ERROR — ...` in `white` + a primary ◆ icon (state by shape, not by an extra color).

### 7.4 Select, checkbox, radio, toggle
- **Checkbox:** 18px rhombus; checked = filled primary rhombus.
- **Radio:** 18px circle; checked = 8px primary dot.
- **Toggle:** 76×38, chamfer 8, 28px square knob; on = primary knob.
- **Select:** field + mono `▾`; `ink2` menu with a chamfer, active item with a rule.

### 7.5 Catalog table
```css
.spec > div { display: flex; justify-content: space-between; padding: 18px 0; border-top: 1px solid rgba(20,17,12,.2); font: 20px var(--font-mono); }
.spec dt { color: var(--color-bone-muted); }
```
On bone. Values on the right, labels on the left. No zebra.

### 7.6 Facet seal (rhombus)
```css
.stamp { clip-path: polygon(10% 0,90% 0,100% 50%,90% 100%,10% 100%,0 50%); padding: 10px 28px;
  background: var(--color-primary-soft); color: var(--color-primary); font: 17px var(--font-mono); }
.stamp::before { content: "◆ "; }
.stamp--on-bone { background: var(--color-ink); }   /* on bone */
```

### 7.7 Tag / filter
Chamfer 8, mono 18 caps `+2px`, inactive `ink3` + `textMuted`; active `primarySoft` + `primary`.

### 7.8 Navigation
- **Rail:** 92px `ink2`, 24px stroke icons, active with a primary rule on the left.
- **Topbar:** height 72, `GALDR.` display 40, search in the center, status.
- **Bottom nav (mobile):** 4–5 icons, active `primary` + a 6px rhombus.
- **Tabs:** mono caps; active with a 2px primary bottom rule.
- **Breadcrumb:** `COLLECTION / QUARTZ / GD-0417`, mono 14, separator `/`.

### 7.9 Shard card
Dark plinth + object + footer with a number (`K-0078`) and a chamfered corner. Selected: primary border + halo. 4×3 grid (desktop) / 2×N (mobile).

### 7.10 Leader line (callout A–F)
A 4px primary point on the object → a single bend → a mono 22 primary letter. 1.2px line. Letters in sequence **without repeating**.

### 7.11 Mohs gauge
180° arc, `rgba(20,17,12,.2)` track on bone, primary fill, `boneInk` needle, display number beside it.

### 7.12 Timeline (provenance)
2px `hairline` track, primary fill, 16px rhombus milestones (filled when reached), mono 18 year + Inter 16 label.

### 7.13 Modal / drawer
Chamfered `ink2` panel, `rgba(12,12,11,0.78)` overlay, display title, footer actions (ghost + primary). 480px drawer on the right.

### 7.14 Toast
`ink2` panel with a primary left rule, facet seal + a short message; enters by a diagonal wipe, 4s.

### 7.15 Tooltip
`ink3`, chamfer 6, mono 13, `hairlineStrong` border; 300ms delay.

### 7.16 Progress / loader
- 6px bar, `ink3` track (or `rgba(20,17,12,.15)` on bone), primary fill, smooth linear.
- Loader: a 14px rhombus turning 45° every 400ms; or a vertical sweep.
- Skeleton: chamfered `ink3` blocks with a slow light sweep (2s).

### 7.17 Avatar / seer
Portrait in a 14px chamfered frame, hairline border, sober painting; mono caption `SEER · HILDR`.

### 7.18 Accordion, pagination
- Accordion: 64 row, title + mono `+/−`, hairline divider.
- Pagination: `‹ 01 02 03 … ›` mono; current with a primary bottom rule.

### 7.19 Empty state
An empty plinth with a dashed outline, caption `FIG. — NO SHARD.`, one action.

### 7.20 Tabs
Mono caps labels, each led by a rune (ᚨ overview, ᛊ spectrum, ᛏ log) at 45% when idle; active tab: bone text, rune in the primary, 2px primary underline. Class `.tabs`, `.tab[aria-selected]`.
### 7.21 Slider
2px track with a tick every 10%, primary fill, **rhombus** knob, value in mono above the knob, scale labels in mono caps below (`talc 1 · quartz 7 · diamond 10`). `.slider`.
### 7.22 Stepper
Chamfered rune tiles (ᚠ ᚢ ᚦ ᚨ) joined by 2px lines; done/current tiles fill with the primary. `.stepper`, `.step`.
### 7.23 Search
`ink3` field, 2px primary left rule, rune ᚲ as the icon, mono suggestions below with the active one in the primary. `.search`.
### 7.24 Segmented control and checks
Chamfered segments, active in the primary. Checkbox = rhombus (filled when on), radio = ring with a dot. `.segmented`, `.chk`, `.rad`.
### 7.25 Table
On bone: mono rows, hairline dividers, hovered/selected row gets a 7% tint and a 2px primary rule. `.table`.
### 7.26 Tooltip and notice
Tooltip: `ink3` chamfer-6 bubble with a hairline inset. Notice: `ink3` chamfer-8 strip with a **bone** left rule and a rune (ᚾ nauthiz for errors); no extra colors. `.tooltip`, `.notice[data-rune]`.
### 7.27 Tier badges
Rhombus stacks: I one, II/III two and three, IV/V in the primary, V with a dotted halo ring. `.tier`.
### 7.28 Accordion and pagination
`<details>` rows with a primary `+`/`−`; pages in mono with the current one underlined in the primary. `.accordion`, `.pages`.

Remotion: `Galdr-Kit` shows all of 7.20–7.28 on one sheet.

---

## 8. STATES

| State | Rule |
|---|---|
| Default | `ink2` + hairline |
| Hover | background → primary (button) / soft halo (card) / 260ms |
| Focus | `outline: 2px primary; outline-offset: 4px` |
| Active/selected | 2px primary left rule + `primarySoft` |
| Disabled | `opacity .4` |
| Error | `ERROR — message` + primary ◆ + `hairlineStrong` border |
| Success | `OK — message` + facet seal |
| Loading | turning rhombus or bar |
| Empty | section 7.19 |

**No extra semantic colors.** State = shape + text + rule. (If the product requires it, use 8px dots: jade `#7DF9B4` ok, amber `#FFB86B` warning, **never** red.)

---

## 9. SCREEN PATTERNS

### 9.1 Home (reference `galdr-ui-home.png`)
Rail 92 + topbar. Center: hero shard on the plinth (6 cols). Left: bone panel (3) with name/spec sheet. Right: bone panel (3) with a condensed title, article, Mohs gauge. Below: a collection strip (5 cards) + spectral chart + seer portrait.

### 9.2 Collection (`galdr-ui-collection.png`)
Filters on the left (family, hardness with a slider, locality). A 4×3 grid of cards. A bone editorial drawer on the right (preview on select).

### 9.3 Shard / plate (`Galdr-Ui`)
Bone table (3) · crystal with callouts A–F on the plinth (6) · bone article with a `rule` + gauge (3). Footer: provenance.

### 9.4 Mobile (`galdr-mobile-shard-b.png`)
Hero on top (45%), callouts A–D; a **chamfered bone sheet** over the dark (seal, title, locality, article, Mohs, data); a fixed action at the bottom (an ink chamfered button + primary).

### 9.5 Compare (A/B)
Two plinths side by side, a vertical primary line between them, a central bone table with the differences.

### 9.6 Seer profile
Chamfered portrait, serif text, acquisition timeline.

### 9.7 Search and results
A big field on top, filters as tags, results in a card grid.

### 9.8 Login
`ink2` panel 440px, title `ACCESS.`, two fields, a chamfered button, a small crystal with a halo beside it.

### 9.9 Settings
Sections on the left (mono caps with a rule), panels on the right; actions fixed in the footer.

### 9.10 404
An empty plinth, `404.` display 150, caption `FIG. — SHARD NOT FOUND.`, a button.

### 9.11 Onboarding
`01 / 03`, a turning crystal in the center, one sentence, one button.

---

## 10. CHARTS AND DATA

- **Spectral (line):** 1.5px primary line, subtle `primarySoft`→0 fill, `hairline` horizontal grid, mono 13 axes. Peaks labeled in mono.
- **Mohs:** arc (7.11).
- **Bars:** `ink3` with a `hairlineStrong` top; the one that matters in the primary; chamfer 4 on top.
- **Distribution:** 6px dots; selected in the primary with a halo.
- **Timeline:** 7.12.
- At most 1 series in the primary; the rest in `bone` (60%) and `textMuted`.
- No colored gradient, no shadow.

---

## 11. ICONS AND SYMBOLS

### Runes (Elder Futhark)
Always real characters, never random glyphs. Use the transliteration of the shard name or a rune with a meaning:

| Rune | Name | Meaning | Use |
|---|---|---|---|
| ᛁ | Isa | ice | the default seal rune (it is the primary's color name) |
| ᚷ | Gebo | gift | collection, add |
| ᚨ | Ansuz | message | text, article |
| ᛊ | Sowilo | sun | light, highlight |
| ᛟ | Othala | heritage | home, archive |
| ᛏ | Tiwaz | guidance | active, target |
| ᛚ | Laguz | water | loading, flow |
| ᛞ | Dagaz | dawn | success, done |
| ᚾ | Nauthiz | need | error, constraint |

Rune ruler: the shard name transliterated into runes, vertical (`ᚨᛗᛖᚦᛁᛊᛏ` for AMETHYST). Brand ruler: `ᚷᚨᛚᛞᚱ`. One rune ruler per screen. Rune strings are decorative (`aria-hidden`) or carry an `aria-label` with the Latin text.

- 24 grid, 1.5 stroke, `stroke-linejoin: miter`, `currentColor`.
- Brand symbol: a **double-terminated hexagonal crystal** (SVG) and the **rhombus**.
- Set: collection (3 rhombuses), search (magnifier with a facet), filter (3 lines + rhombuses), favorite (crystal), scale (ruler), hardness (arc), time (track + rhombuses).
- **Tiers** (games): number of facets and shine, never another color — I simple rhombus · II + line · III double · IV double + shine · V double + halo + rim light.
- Generate: `node tools/make-asset.mjs --concept galdr --type icon --png`.

---

## 12. IMAGE, CRYSTAL AND PEOPLE

- **Crystal:** always facet + light. Never flat. In vector use `Crystal.tsx` (real rotation and sweeping light). In photo: raking light, rim light, dark plinth, `ink` background.
- **Seer (waifu):** a **seer** portrait, a sober dark hooded coat with a thin silver rune clasp, a small frame, restrained painting, no game effects. Event key art only in the "serious" version.
- **Shard photo:** 4:5, `ink` background, 1 object, a soft contact shadow (the only exception; it is the photo's physical shadow, not the UI's).
- AI: no text in the image; the text comes afterwards (section 18).

---

## 13. MOTION

**Signature: precise and luminous.** Diagonal chamfer wipes, lines that draw themselves, a light sweep, slow continuous crystal rotation.

| Principle | Value |
|---|---|
| Curve | `cubic-bezier(0.3, 0, 0, 1)` |
| Durations | 140 / 260 / 420 ms |
| Panel entrance | **diagonal wipe** `clip-path: polygon(...)` + 10–24px slide |
| Lines | draw from the origin point (`stroke-dashoffset`) |
| Table | values **type in** (per line, 7-frame delay) |
| Crystal | turns ~1 turn/11s, light sweeps ±0.6 rad, **always alive** |
| Sweep | a 2px primary bar crosses the crystal in ~2s, once on entrance |
| Gauge/timeline | fill with ease |
| Hover | soft halo / background → primary |
| Forbidden | shadow, bounce, shake, glitch, pulsing neon |

```css
@keyframes diag-in { from { clip-path: polygon(0 0,0 0,-20% 100%,0 100%); } to { clip-path: polygon(0 0,120% 0,100% 100%,0 100%); } }
.enter { animation: diag-in 420ms var(--ease) both; }
@media (prefers-reduced-motion: reduce) { .enter { animation: none; } }
```

### Remotion compositions (`src/galdr/`)
`Galdr-Intro`, `Galdr-Ui`, `Galdr-Components`, `Galdr-Kit`, `Galdr-Logo`, `Galdr-Mobile`, `Galdr-Social`. All accept `primary`.

---

## 14. VOICE AND MICROCOPY

**Terse ritual-technical English: factual, short sentences, a little incantatory.** No exclamation marks, emoji or slang. Numbers always with units.

| Situation | Text |
|---|---|
| Plate title | `AMETHYST CLUSTER.` (shard name) |
| Subtitle | `HÖFN · ICELAND` |
| Figure caption | `FIG. 01 — AMETHYST, FRONT VIEW` |
| Body | "Cluster of prismatic purple quartz crystals, collected from a basaltic geode." |
| Button | `ADD TO COLLECTION` `COMPARE` `EXPORT SPEC SHEET` |
| Success | `OK — Shard added to the collection.` |
| Error | `ERROR — Shard GD-9999 not found.` |
| Empty | `FIG. — NO SHARD.` + "Add the first one." |
| Loading | `Cataloging…` |
| 404 | `404.` + "Shard not found." |
| Footer | `GALDR · REV.03` |

---

## 15. ACCESSIBILITY

- Contrast: section 2.4. **Never** the primary on bone.
- `boneMuted` on bone is at the limit (4.5:1): use only ≥ 16px.
- Focus: 2px primary outline, 4px offset.
- Touch target ≥ 44px.
- State never by color alone (rule + text + shape).
- `prefers-reduced-motion`: turns off wipe, sweep, rotation (the crystal stays static).
- Decorative crystal `aria-hidden`; informative crystal with `alt` ("Amethyst cluster, front view").
- `lang="en"`; rune strings are decorative or transliteration: `aria-hidden`, or give an `aria-label` with the Latin text.

---

## 16. ASSETS AND BRAND

- Wordmark: `GALDR.` (primary full stop). Symbol: the crystal. Seal: rhombus `◆ GD-0417`.
- Clear space: the height of the "G". Minimum wordmark: 160px; below that, only the crystal.

| Piece | Size |
|---|---|
| X header | 1500×500 |
| LinkedIn | 1584×396 |
| GitHub social | 1280×640 |
| Open Graph | 1200×630 |
| Post | 1080×1350 |
| Story | 1080×1920 |
| Slide | 1920×1080 |
| Icon | 1024 |

```bash
npm run fonts
node tools/make-asset.mjs --concept galdr --type icon      --png
node tools/make-asset.mjs --concept galdr --type badge     --title GD-0417 --png
node tools/make-asset.mjs --concept galdr --type banner    --title SHARD --subtitle "catalog · rev.01" --png
node tools/make-asset.mjs --concept galdr --type og        --png
node tools/make-asset.mjs --concept galdr --type social    --title "AMETHYST CLUSTER" --png
node tools/make-asset.mjs --concept galdr --type wallpaper --size 3840x2160 --png
node tools/make-asset.mjs --concept galdr --type pattern   --png
node tools/make-asset.mjs --all --png
```
All accept `--primary "#rrggbb"`.

---

## 17. WHAT MAKES THIS CONCEPT ITS OWN

| Own decision (keep) | Avoid (belongs to another system) |
|---|---|
| **Near-black** canvas | warm brown, neutral charcoal |
| **Ice** primary, swappable | vermilion, gold |
| **45° chamfer** | square or rounded corners |
| Depth through **light** | hard shadow, hairline as the only depth |
| **Bone paper** as the reading surface | uniform Bento |
| Condensed + serif + mono + runes | Archivo Black, impact serif |
| Spectrum **only in the crystal** | live color scattered around |
| Terse ritual-technical voice | slang, gang tone |

If the screen has **red, gold, hard shadow or acid green**, it left the concept.

---

## 18. IMAGE PROMPTS (AI)

> **Full library (144 prompts):** [`PROMPTS.md`](PROMPTS.md) covers images without and with people, icons, banners, image editing, video generation and editing, audio, text and code. Below, only the essentials.

Base: `primitive Nordic cyberpunk, minimal, serious editorial rune-archive UI, near-black canvas (#0C0C0B), bone-paper editorial panels (#E9E4D6), single ice-cyan accent (#8FF3FF), spectral violet only inside gems, chamfered 45-degree cut corners, hairline rules, frosted translucent layers with inner glow, no hard shadows, no red, tall condensed grotesk display with trailing period, serif body, carved Elder Futhark runes, thin circuit lines and rune rings, monospace catalog data, realistic physical crystals with rim light`

**Rule against leaking:** `every visible word must be real content; never show design-system labels, hex codes, or words like 'chamfered' or 'bone-paper' on screen.`

| Piece | Prompt (summary) |
|---|---|
| UI | `Complete desktop app UI named GALDR. rail nav, hero crystal on plinth, bone-paper editorial column with caption and Mohs gauge, collection grid, spectral chart, seer portrait card. Magazine grid --ar 16:9` |
| Shard | `Shard detail page like a carved runestone plate: huge faceted crystal with refraction, leader lines A to F, scale bar, monospace data table, editorial article, provenance timeline --ar 16:9` |
| Key art | `Premium event key art, restrained and serious. A seer woman in a dark hooded coat with a thin silver rune clasp holds a heavy faceted crystal, a stone hall with carved runes, rim light and refraction --ar 16:9` |
| Mobile | `Three phone mockups: home with hero crystal; shard detail with leader lines and a bone-paper chamfered sheet; seer profile with timeline --ar 16:9` |
| Crystal | `Studio photograph of an amethyst cluster on a dark matte plinth, rim light, refraction caustics, near-black background --ar 4:5` |

Negatives: `no neon overload, no rainbow, no red, no gold, no glassmorphism blobs, no rounded cards, no gibberish text`. Approved references in `reference/`.

---

## 19. MASTER PROMPT FOR FRONT-END AI (paste whole)

```
You are an expert front-end engineer. Strictly follow the GALDR system. Never use
#000/#FFF, colored gradients, glassmorphism with blobs, rounded corners on panels, or shadows.

COLOR: canvas #0C0C0B · ink2 #141413 · ink3 #1D1D1B · bone paper #E9E4D6 with text #14110c · muted #8F8E88.
Primary (ONE): #8FF3FF (--color-primary) for focus, active, seal, leader lines, title full stop,
side rule. NEVER on bone. Spectrum #8B5CF6→#7DF9FF only inside the crystal.
SURFACES: dark to navigate/measure; bone to READ (max. 2 bone panels per screen).
SHAPE: 45° CHAMFERED corners (top right and bottom left): panel 14px, button 16px, chip 8px,
mobile sheet 40px, via clip-path polygon (border through a 1px inner layer). Rhombus seal.
DEPTH: through light (radial halo of the primary, rim light, frost with 10px blur). No offset box-shadow.
TYPOGRAPHY: titles Big Shoulders Display 800 UPPERCASE, tracking 2px, ending with "." (the dot in the
primary); editorial body Source Serif 4, line-height 1.75; UI Inter; data and captions
IBM Plex Mono caps with 2px tracking. Every screen has ≥ 4 levels: title, mono subtitle, body, caption
"FIG. 01 — ...". The shard name in a vertical rune column (Noto Sans Runic, writing-mode vertical-rl).
LAYOUT: 12-col grid, uneven columns (table 3 · object 6 · article 3); the hero object always on a plinth.
MOTION: cubic-bezier(.3,0,0,1); 140/260/420ms; entrance by diagonal wipe (clip-path) + slide; lines
that draw themselves; the crystal turns slowly and the light sweeps; no bounce/glitch/neon. Respect prefers-reduced-motion.
STATES: hover, focus-visible (2px primary outline offset 4px), active (2px primary rule), disabled .4,
error ("ERROR — ..."), empty ("FIG. — NO SHARD."), loading. State never by color alone.
VOICE: terse ritual-technical English, factual, short; no exclamation marks/emoji.
Deliver semantic HTML, lang="en", AA contrast, touch ≥ 44px.
```

---

## 20. DELIVERY CHECKLIST

- [ ] Canvas `#0C0C0B`; no `#000`/`#fff`; bone only for reading (≤ 2 panels).
- [ ] One primary; never on bone.
- [ ] Violet/cyan only in the crystal.
- [ ] Chamfered corners; zero hard shadow.
- [ ] Display title with a full stop; ≥ 4 typographic levels.
- [ ] Numbered figure caption wherever there is an image.
- [ ] Hero object on a plinth, with light.
- [ ] All states; visible focus; touch ≥ 44px.
- [ ] Terse ritual-technical English voice.
- [ ] No red, gold or acid green (section 17).

## 21. QUICK DECISION

| Question | Answer |
|---|---|
| Which color to highlight? | the primary, as light |
| Dark or bone background? | bone if it is to read; dark if it is to see/measure |
| Do I need a shadow? | no: halo, rim light, frost |
| Rounded panel? | never: 45° chamfer |
| Missing "editorial weight"? | add a figure caption and a catalog number |
| Looks gamer? | remove glow/neon; go back to bone, serif and fine lines |

## 22. REPOSITORY MAP

| I need… | Go to |
|---|---|
| **all prompts** (image, video, editing, audio, text, code) | `PROMPTS.md` |
| detail by topic | `docs/01…14` in this folder |
| tokens | `tokens/tokens.json`, `tokens/tokens.css` |
| ready CSS | `tokens/components.css` |
| example page | `examples/showcase.html` |
| animations | `../src/galdr/` (`npm run studio`) |
| assets | `../tools/make-asset.mjs` |
| visual references | `reference/` |
