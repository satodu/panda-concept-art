# 10. Primary color, black and white

> **Every piece of art depends on one primary color.** It is what says "this is Shizuka". Changing it must change the whole art without touching anything else.

## 1. The primary is the identity

| Item | Value |
|---|---|
| Default primary | `#A8473A` |
| Token | `color.primary` (CSS: `--color-primary`) |
| Derived | `primarySoft`, `primaryGlow`, `onPrimary` |
| What it changes | The primary changes **only the kanji**, the toggle knob when on, the task check and the active rail item. Buttons and ink stay sumi. |

## 2. Approved variations (computed contrast)

| Variation | Hex | Primary contrast over the backgrounds | Text on the primary |
|---|---|---|---|
| shu (default) | `#A8473A` | canvas: 4.3 (icon/large text only)<br>card: 4.7 (AA) | `#F3EFE3` (5:1) |
| indigo | `#2F3F6B` | canvas: 7.7 (AAA)<br>card: 8.3 (AAA) | `#F3EFE3` (8.9:1) |
| moss | `#6B7A3A` | canvas: 3.5 (icon/large text only)<br>card: 3.8 (icon/large text only) | `#F3EFE3` (4.1:1) |

Rule: validate any new color against the concept backgrounds. Text on the primary must be the color (the concept black or white) with the **highest contrast**; `src/shared/Themed.tsx` makes that choice by itself (`onColor`).

## 3. How to swap

**CSS** (single variable):
```css
:root { --color-primary: #2F3F6B; --color-on-primary: #1C1B19; }
```
`primarySoft` e `primaryGlow` come from `color-mix(in srgb, var(--color-primary) N%, transparent)` in `components.css`.

**Remotion** (a prop on every composition):
```bash
npx remotion render src/index.ts Shizuka-Intro out/v.mp4 --props='{"primary":"#2F3F6B"}'
```

**Assets** (SVG/PNG):
```bash
node tools/make-asset.mjs --concept shizuka --type banner --primary "#2F3F6B" --png
```

**showcase**: open `examples/showcase.html` and click the swatches.

## 4. Own black and white

Never `#000000` or `#FFFFFF`. Warm paper-and-sumi black and white. Contact shadows use `rgba(28,27,25,α)`, never pure black. The paper is never flat white: it has fibre and burnt edges.

| Token | Value | Where | Character |
|---|---|---|---|
| `black` | `#1C1B19` | text, ink button, on-track, suminagashi ink | warm sumi `#1C1B19` |
| `white` | `#F3EFE3` | knob, card hover, text on the primary | light paper `#F3EFE3` |

Quick check in the code: `grep -rnE "#fff|#000|rgba\\(255,255,255|rgba\\(0,0,0" src shizuka` must come back empty (except "forbidden" examples in the documentation).

## 5. Dark / light theme

No official dark theme: the concept is paper. If needed, use canvas `#1C1B19` with text `#E4DFD0` and the primary lightened by 15%; never turn it into a "tech dark mode".

## 6. Checklist

- [ ] There is **one** primary token and no primary hex scattered around.
- [ ] Swapping the primary did not break contrast (table in item 2).
- [ ] Text on the primary uses the highest-contrast color.
- [ ] No `#000`/`#fff` in the code or the assets.
- [ ] Shadows and overlays use the concept black with alpha.
