# 10. Primary color, black and white

> **Every piece of art depends on one primary color.** It is what says "this is Oriental Brutalismo". Changing it must change the whole art without touching anything else.

## 1. The primary is the identity

| Item | Value |
|---|---|
| Default primary | `#E63946` |
| Token | `color.primary` (CSS: `--color-primary`) |
| Derived | `primarySoft`, `primaryGlow`, `onPrimary` |
| What it changes | The primary changes the button, the title full stop, the Hanko seal, active status, highlight bar, toggle on and active tag. Nothing else. |

## 2. Approved variations (computed contrast)

| Variation | Hex | Primary contrast over the backgrounds | Text on the primary |
|---|---|---|---|
| vermilion (default) | `#E63946` | canvas: 4.7 (AA)<br>surface1: 4.3 (icon/large text only) | `#090a0f` (4.7:1) |
| amber | `#F59E0B` | canvas: 9.2 (AAA)<br>surface1: 8.3 (AAA) | `#090a0f` (9.2:1) |
| acid | `#D4FF00` | canvas: 17 (AAA)<br>surface1: 15.4 (AAA) | `#090a0f` (17:1) |

Rule: validate any new color against the concept backgrounds. Text on the primary must be the color (the concept black or white) with the **highest contrast**; `src/shared/Themed.tsx` makes that choice by itself (`onColor`).

## 3. How to swap

**CSS** (single variable):
```css
:root { --color-primary: #F59E0B; --color-on-primary: #090a0f; }
```
`primarySoft` e `primaryGlow` come from `color-mix(in srgb, var(--color-primary) N%, transparent)` in `components.css`.

**Remotion** (a prop on every composition):
```bash
npx remotion render src/index.ts Oriental-Intro out/v.mp4 --props='{"primary":"#F59E0B"}'
```

**Assets** (SVG/PNG):
```bash
node tools/make-asset.mjs --concept oriental-brutalismo --type banner --primary "#F59E0B" --png
```

**showcase**: open `examples/showcase.html` and click the swatches.

## 4. Own black and white

Never `#000000` or `#FFFFFF`. Black and white with a slight cold-blue cast. Any "darker" uses `rgba(9,10,15,α)`; "lighter" uses `#eeeee6`.

| Token | Value | Where | Character |
|---|---|---|---|
| `black` | `#090a0f` | canvas, general background | bluish charcoal |
| `white` | `#dedfd7` | text, lines, title | cold bone |

Quick check in the code: `grep -rnE "#fff|#000|rgba\\(255,255,255|rgba\\(0,0,0" src oriental-brutalismo` must come back empty (except "forbidden" examples in the documentation).

## 5. Dark / light theme

The concept is already dark. There is no light theme: if needed, invert only for printed material (background `#dedfd7`, text `#090a0f`).

## 6. Checklist

- [ ] There is **one** primary token and no primary hex scattered around.
- [ ] Swapping the primary did not break contrast (table in item 2).
- [ ] Text on the primary uses the highest-contrast color.
- [ ] No `#000`/`#fff` in the code or the assets.
- [ ] Shadows and overlays use the concept black with alpha.
