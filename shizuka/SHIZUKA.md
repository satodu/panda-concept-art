# SHIZUKA.

[ SYSTEM.DOC // REV.04 ] | Master reference. One file, the whole system.

静か, "quiet". An interface of **aged paper and sumi ink**: off-white paper with fibre, real black ink blooms spreading on water, half-erased numbers, **one primary color** (a faded red kanji) and a lot of emptiness. It is peace and discomfort at the same time. Wabi-sabi: the beauty of the worn and the unfinished.

> REV.04 replaces REV.02 (chrome sphere + lime dot). None of the chrome, glow or lime survives.

---

## 0. HOW TO USE THIS FILE

1. **UI decision:** find the section, copy the value.
2. **AI (Claude, Cursor, v0):** paste section **19. MASTER PROMPT** at the start of the project.
3. **Code:** `tokens/tokens.json` is the single source; `tokens/tokens.css` holds the variables. If they diverge, the JSON wins.
4. **Graphic pieces:** `node tools/make-asset.mjs` (section 16) and Remotion compositions (section 13).
5. **Ready ink:** `examples/suminagashi.js` (web), `Suminagashi` in `src/shizuka/parts.tsx` (Remotion), `sumi()` in `tools/templates.mjs` (SVG). Same filters in all three.
6. **Golden rule:** if the screen does not feel **silent and a little worn**, remove things and age the rest. Half the screen empty is the minimum.
7. **Basics stay basic.** Buttons, fields, lines and text are plain and straight. Decoration (section 6.1) belongs to showcase pieces only.

---

## 1. IDENTITY

### In one sentence
An old journal that became an interface: paper that has lived, ink that does not obey, and the certainty that everything passes.

### The feeling
**Peace:** emptiness, off-white, organic forms of water and smoke, earthy paper tones, the comfort of something with a history.
**Discomfort:** imperfection, numbers that fade, ink that escapes control, the reminder that time passes (mono no aware, wabi-sabi). The interface stops being perfectly predictable and mathematical.

### The 6 non-negotiables
1. **Real aged paper:** fibre, burnt edges, stains. Never flat white.
2. **One ink bloom per screen**, at most. It is the hero object. Never concentric rings (they read as a target).
3. **A single primary:** the kanji (a real character, plain, faded red). One per screen. No seal, no hanko, no frame.
4. **Half-erased numbers:** the last digits fade. No "brand new" data.
5. **Basics stay basic:** lines, borders, buttons and text are simple and straight. The imperfection lives only in the ink, the paper and the faded numbers.
6. **No big shadow, no glow, no chrome.** Depth = lighter paper over darker paper + hairline.

### The 5 pillars
| Pillar | Means | On screen |
|---|---|---|
| 侘 wabi | beauty of the simple and worn | paper, fibre, emptiness |
| 寂 sabi | beauty that time gives | faded numbers, burnt edges |
| 間 ma | the interval | empty space, pauses in animation |
| 墨 sumi | ink | ink bloom, text, buttons |
| 字 ji | the character | the single kanji in the primary |

### Origin
The brief was born from a dream about ink and from a reference of suminagashi on aged paper with faded marks.

### When to use / not to use
Use: focus, meditation, journal, clock, lockscreen, reading, products about pausing. Do not use: dense dashboards, screens with lots of action, anything that needs urgency (use Oriental) or catalog rigor (use Galdr).

---

## 2. PRIMARY COLOR, BLACK AND WHITE

### 2.1 The primary color is the identity
Every Shizuka piece depends on **one** primary. Swapping it changes the kanji and the few state points, never the structure.
Default: **shu (faded red) `#A8473A`**. Matte, earthy, small. It is not Oriental's vivid magenta `#980281`.
Valid alternatives: indigo `#2F3F6B`, moss `#6B7A3A`.
Where the primary appears: the kanji, the knob of a toggle that is on, the task check, the active rail item, the `save` button. **Never** on large backgrounds, never as long text.

### 2.2 Own black and white
| Role | Value | When |
|---|---|---|
| black (sumi) | `#1C1B19` | text, ink button, ink bloom, on-track |
| white (light paper) | `#F3EFE3` | knob, card hover, text on the primary |

Never `#000` or `#fff`. Contact shadows use `rgba(28,27,25,α)`.

### 2.3 Full palette
| Token | Value | Use |
|---|---|---|
| canvas | `#E4DFD0` | the sheet, background |
| canvasDeep | `#D6D0BD` | burnt edge, stains |
| card | `#ECE7D9` | cards (lighter paper) |
| cardHi | `#F3EFE3` | hover, highlight |
| ink | `#1C1B19` | text, ink |
| inkSoft | `#5E5A50` | secondary text |
| textMuted | `#7D7869` | mono labels (decorative/large only) |
| fade | `rgba(28,27,25,.24)` | faded numbers |
| ghost | `rgba(28,27,25,.07)` | ghost kanji |
| hairline | `rgba(28,27,25,.12)` | dividers |
| hairlineStrong | `rgba(28,27,25,.22)` | control borders |
| primary | `#A8473A` | the kanji |
| primarySoft / primaryGlow | primary at 14% / 30% | soft tint, focus |

### 2.4 Dark theme
There is no official dark theme: the concept is paper. If needed: canvas `#1C1B19`, text `#E4DFD0`, primary 15% lighter. It never becomes "tech dark mode".

### 2.5 Verified contrast (WCAG)
| Pair | Ratio | Rule |
|---|---|---|
| ink / canvas | 12.9 | everything |
| inkSoft / canvas | 5.2 | secondary body |
| primary / canvas | 4.35 | large text only (≥18px 500) and icons |
| primary / card | 4.7 | ok for normal text |
| onPrimary / primary | 5.0 | `save` button |
| textMuted / canvas | 3.3 | large mono labels only, decorative |
| white / ink | 15.0 | ink button |

Faded numbers (`fade`) are decoration: the full value must be available as text (`aria-label`).

---

## 3. TOKENS
Source: `tokens/tokens.json` → `tokens.css`.
```css
:root {
  --color-canvas:#E4DFD0; --color-canvas-deep:#D6D0BD; --color-card:#ECE7D9; --color-card-hi:#F3EFE3;
  --color-ink:#1C1B19; --color-ink-soft:#5E5A50; --color-text-muted:#7D7869;
  --color-hairline:rgba(28,27,25,.12); --color-hairline-strong:rgba(28,27,25,.22);
  --color-primary:#A8473A; --color-on-primary:#F3EFE3; --color-black:#1C1B19; --color-white:#F3EFE3;
  --radius-card:40px; --radius-control:24px; --radius-pill:999px;
  --shadow-contact:0 1px 2px rgba(28,27,25,.06);
}
```
### Tailwind
```js
theme: { extend: { colors: { canvas:'#E4DFD0', card:'#ECE7D9', ink:'#1C1B19', seal:'var(--color-primary)' },
  borderRadius: { card:'40px', control:'24px' }, fontFamily: { display:['Inter Tight'], body:['Inter'], mono:['IBM Plex Mono'], jp:['Shippori Mincho'] } } }
```

---

## 4. TYPOGRAPHY
| Role | Font | Weight | Notes |
|---|---|---|---|
| Display | Inter Tight | 200 | uppercase, wide tracking, **full stop** |
| Body | Inter | 300 | gentle lowercase |
| Labels / data | IBM Plex Mono | 400 | uppercase, 3px tracking |
| Kanji (primary, ghost) | **Shippori Mincho** | 400/700 | always real text, never AI-generated |

### Scale
| Level | Size | Use |
|---|---|---|
| Display XL | 120–168px | brand title |
| Display | 56–84px | screen title |
| Big number | 80–150px, weight 200 | timer, count (with `fade`) |
| Body | 20–28px | text |
| Label | 14px mono, 3px | sections |

### Faded numbers
The last digits lose opacity in steps: 1.0, 0.72, 0.46, 0.22. Example: `06:4` + `8` at 0.72. Use `FadedNum` (Remotion) or `.fade-1/2/3` (CSS).

---

## 5. GEOMETRY, GRID AND SPACE
### Radii
Card **40px**, control **24px**, pill 999. Large radii are part of the charm: do not reduce them.
### Grid and space
4 scale. Card padding 32. Gap 20 (40 between groups). Centered or asymmetric composition, **half empty**.
### Dot grid
Background dots of 1.2px at 8% black, 28px step. One grid, no variation. It is the only "ruler" of the UI.
### Lines
Straight 1px hairlines (`.rule`, `Rule`). A rule under a title is fine; keep it straight. No wobbly lines, no decorative underlines.

---

## 6. DEPTH (the shadow rule)
1. Layer: the card is lighter paper (`#ECE7D9`) over the sheet (`#E4DFD0`).
2. 1px hairline.
3. Contact shadow: `0 1px 2px rgba(28,27,25,.06)`. Nothing bigger.
4. Forbidden: big diffuse shadow, neumorphism, glow, shine.
5. Aging: burnt edge (a `canvasDeep` vignette) and low-frequency stains, only on the background.

### 6.1 Showcase decoration (optional)
For showcases, posters and covers only, add: ink specks (tiny dots), a ledger frame (inset 1px hairline), a folio label in mono (`NO. 001 · VOL. 03`) and a small mono/mincho footer (`静か · quiet`). Components: `Decor` (Remotion), `.decor`/`.folio`/`.speck` (CSS). All low contrast. Remove them on dense product screens.

---

## 7. COMPONENTS
All in `tokens/components.css`.
### 7.1 Card
`.card`: `card` paper, hairline, radius 40, padding 32. Hover moves to `cardHi` in 520ms. A card may contain ink (`.ink`, clipped by the radius).
### 7.2 Buttons
| Type | Style |
|---|---|
| ink | `ink` background, `cardHi` text, pill, 56px |
| ghost | `hairlineStrong` border, `ink` text |
| primary | `primary` background, `onPrimary` text, weight 400. **One per screen.** |

### 7.3 Field
56px, radius 24, `hairlineStrong` border; focus: `ink` border. Error: **dashed border** `ink` + help text (never red).
### 7.4 Tags / chips
Mono 14px, 3px, pill. Active: `ink` background. Inactive: `hairlineStrong` border, `textMuted` text.
### 7.5 Toggle and task
Toggle 56×32; on: `ink` track, `primary` knob. Task: 28px circle; done: `ink` with a `primary` check, text struck through at 45%.
### 7.6 Slider
2px line; `ink` fill; paper knob with a hairline.
### 7.7 List, rail, toast, modal
List with hairline dividers. 92px rail; the active item in the primary. Toast as a pill-card with a small kanji. Modal over an `ink` 28% veil with 6px blur.
### 7.8 Kanji (`Kanji`)
One **real** character, plain, in the primary: Shippori Mincho 700, no box, no frame, no rotation, no seal texture. No hanko. It enters with blur → sharp. **One per screen.** Valid meanings: 静 silence · 間 interval · 白 white · 終 end · 侘 wabi.
### 7.9 Ink bloom (suminagashi)
A real ink bloom, not rings (rings read as a target). Low-frequency fractal noise is thresholded into a blot, with wisps at the edges (`feDisplacementMap`), a pale wash underneath and a radial mask that controls how far it has spread (`grow`). `mix-blend-mode: multiply`. It may bleed out of the card (clipped by the radius). Slow drift, never a fast loop.

---

## 8. STATES
| State | Treatment |
|---|---|
| hover | background goes up a tone (card → cardHi), 520ms |
| focus | 2px `ink` outline, 4px offset |
| pressed | sinks to `canvasDeep` 6% |
| disabled | opacity .4 |
| loading | the ink spreads slowly (`grow`) |
| error | dashed border + calm sentence ("lost, and that is fine.") |
| success | the kanji 静 appears once |
| empty | just the sheet and one sentence |

---

## 9. SCREEN PATTERNS
1. **Home:** title on the left, ink bloom on the right, one sentence, kanji in the corner.
2. **Dashboard (`Shizuka-Ui`):** rail, title, 3 cards (ink, faded timer, task) and a row of 3 history cards with fading numbers.
3. **Focus (`Shizuka-Focus`):** the ink is the timer; it spreads as the minutes pass and the time sits in a small card.
4. **Reading/journal:** a narrow single column, faded day number, one kanji at the end.
5. **Empty:** the sheet, one sentence.

---

## 10. CHARTS AND DATA
One datum at a time. Big weight-200 number with a small unit and **faded last digits**. Charts: one thin, straight `ink` line; filled areas only as an ink wash at 10–25%. No colored legend. The past series lighter than the current one.

---

## 11. ICONS AND SYMBOLS
1.25px stroke, round cap, 24px, graphite on paper. App icon: super-rounded square (26%) of paper with an ink bloom and the kanji 静 in the primary. Interface symbols: `○ ∿ ⌂ ◐ |`.

---

## 12. IMAGE AND PHOTO
Photos and art: paper, ink, empty tatami rooms, small people or people seen from behind, overcast morning light, 5% fibre grain, desaturated. Out: chrome, glossy 3D, neon, saturated color. Kanji and text are never AI-generated: place them in HTML/SVG afterwards.

---

## 13. MOTION
Slow. A 6.4s breath. One small event at a time.

| Element | Motion |
|---|---|
| entrance | blur → sharp + 14px rise, 520–1200ms, curve `0.25,0.1,0.25,1` |
| ink | slow drift; when loading, `grow` from 0.25 to 1 in ~5s |
| numbers | final digits fade in steps |
| kanji | appears with opacity and blur, **no shake, no stamp** |

Forbidden: hard wipe, shake, glow, bounce, fast parallax.
Remotion (`npm run studio`): `Shizuka-Intro`, `-Ui`, `-Focus`, `-Components`, `-Logo`, `-Social` (1080×1350), `-Kanji` (kanji series). All accept `primary`.

---

## 14. VOICE AND MICROCOPY
Lowercase, short, gentle, never urgent, no exclamation marks or emoji; it accepts imperfection.

| Context | Text |
|---|---|
| welcome | nothing is perfect. rest anyway. |
| success | done. rest a little. |
| empty | nothing here. and that is fine. |
| loading | saving slowly… |
| error | lost, and that is fine. |

---

## 15. ACCESSIBILITY
- Contrast: section 2.5. The primary only in large text over `canvas`.
- Faded numbers: provide the full value in `aria-label`.
- Decorative kanji: `aria-hidden`; kanji with meaning: `lang="ja"` and the translation beside it.
- Visible focus always (2px outline).
- `prefers-reduced-motion`: the ink stops and the blurs disappear.
- Touch ≥ 44px; buttons 56px.

---

## 16. ASSETS AND BRAND
```bash
npm run fonts                       # TTFs (includes Shippori Mincho) for faithful PNGs
node tools/make-asset.mjs --concept shizuka --type icon|badge|banner|wallpaper|og|social|avatar|pattern [--title T] [--primary #hex] [--png]
```
Brand: `SHIZUKA.` Inter Tight 200 + ink bloom + the kanji 静. Clear space = height of the "S" around it. Minimum kanji size 16px; below that, only the text.

---

## 17. WHAT MAKES THIS CONCEPT ITS OWN
- **Paper and ink, not a screen:** no other concept here uses fibre, stains and imperfection.
- **A real ink bloom as the hero object** (Oriental has the Hanko, Galdr has the crystal).
- **Numbers that fade.**
- **A matte, small primary** (shu), unlike Oriental's brutal magenta: here it is a faded mark on light paper, never a block of color.
- **A plain, real kanji** instead of a perfect seal box. No hanko.
- Shared with the others: the title with a full stop and the Japanese layer. Everything else is different.

---

## 18. IMAGE PROMPTS (AI)
Full library: [`PROMPTS.md`](PROMPTS.md) (144 prompts). Base:
`wabi-sabi interface, aged off-white washi paper with visible fibre and soft stains, a real black sumi ink bloom with wisps and tendrils spreading on wet paper, organic, never concentric rings, numbers and lines partly rubbed away, one plain faded red kanji, huge empty space, peaceful and quietly uncomfortable, no text` + `--ar 16:9`.
Negatives: concentric rings, target-like circles, hanko seals, stamp boxes, big shadows, neumorphism, chrome, glossy 3D, neon, saturated color, flat white paper, fake kanji.

---

## 19. MASTER PROMPT FOR FRONT-END AI (paste whole)
```
Build the UI in the SHIZUKA concept (aged paper + sumi ink, wabi-sabi).
- Background: aged paper #E4DFD0 with fibre (feTurbulence), burnt vignette #D6D0BD and a 28px dot grid at 8%. Never flat white.
- Sumi text #1C1B19, secondary #5E5A50. Never #000/#fff. White = #F3EFE3.
- ONE primary only: --color-primary (default #A8473A, faded red). Use only on: the kanji, the knob of a toggle that is on, the check, the active rail item, the "save" button (1 per screen). Never on large backgrounds.
- Cards: background #ECE7D9, 1px border rgba(28,27,25,.12), RADIUS 40px, controls 24px, pills 999. Shadow only 0 1px 2px rgba(28,27,25,.06). No large blur, no glow, no chrome.
- Typography: Inter Tight 200 uppercase with a full stop for titles; Inter 300 lowercase for body; IBM Plex Mono uppercase 14px/3px for labels; kanji in Shippori Mincho.
- Hero object: ONE real ink bloom (thresholded fractal noise, wisps at the edges, multiply), clipped by the card radius. Use examples/suminagashi.js. NEVER concentric rings.
- Big numbers in Inter Tight 200 with the last digits fading (opacity 1, .72, .46, .22).
- Lines and borders are straight and simple. Basics stay basic. No decoration on product UI.
- Kanji: one real character, plain, Shippori Mincho 700, in the primary. No seal, no hanko, no frame, no rotation. One per screen.
- Slow motion: blur→sharp + 14px, 520–1200ms, ease(.25,.1,.25,1); no shake, no hard wipe, no bounce. Respect prefers-reduced-motion.
- Voice: lowercase, gentle, no exclamation marks/emoji ("nothing is perfect. rest anyway.").
- Half the screen empty. Error = dashed border, never red.
- Accessibility: contrast from section 2.5, aria-label with the full value on faded numbers.
Deliver HTML+CSS with tokens in :root.
```

---

## 20. DELIVERY CHECKLIST
- [ ] Paper with fibre and burnt edges (not flat)
- [ ] One ink bloom, at most; no concentric rings
- [ ] One primary; the kanji is a real character; one per screen; no seal/hanko
- [ ] Numbers with faded last digits + `aria-label`
- [ ] No `#000`/`#fff`
- [ ] Radius 40/24/999; contact shadow only
- [ ] Basics stay basic: straight lines, no ornament on product UI
- [ ] Slow motion, no shake
- [ ] Gentle lowercase text
- [ ] Half the screen empty
- [ ] Contrast checked (section 2.5)

---

## 21. QUICK DECISION
| I need… | Use |
|---|---|
| calm, pause, journal, focus | **Shizuka** |
| urgency, data, devtools | Oriental Brutalismo |
| catalog, collection, museum seriousness | Galdr |

If you hesitate between paper and screen: if there is a number that "ages", it is Shizuka.

---

## 22. REPOSITORY MAP
| Path | What |
|---|---|
| `shizuka/SHIZUKA.md` | this file |
| `shizuka/PROMPTS.md` | 144 prompts (generated by `tools/build-prompts.mjs`) |
| `shizuka/docs/` | guides 01–14 |
| `shizuka/tokens/` | `tokens.json`, `tokens.css`, `components.css` |
| `shizuka/examples/` | `showcase.html`, `suminagashi.js` |
| `src/shizuka/` | Remotion (`parts.tsx`: Paper, Suminagashi, FadedNum, Kanji, Rule, Decor) |
| `tools/` | `make-asset.mjs`, `templates.mjs`, `build-*.mjs` |
