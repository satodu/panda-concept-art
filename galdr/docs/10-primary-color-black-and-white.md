# 10. Primary color, black and white

> **Every piece of art depends on one primary color.** It is what says "this is Galdr". Changing it must change the whole art without touching anything else.

## 1. The primary is the identity

| Item | Value |
|---|---|
| Default primary | `#8FF3FF` |
| Token | `color.primary` (CSS: `--color-primary`) |
| Derived | `primarySoft`, `primaryGlow`, `onPrimary` |
| What it changes | The primary changes focus, active state, the facet seal, leader lines A–F, the side rule, the light sweep and the halo. The crystal spectrum (violet→cyan) does **not** change. |

## 2. Approved variations (computed contrast)

| Variation | Hex | Primary contrast over the backgrounds | Text on the primary |
|---|---|---|---|
| ice (default) | `#8FF3FF` | ink: 15.3 (AAA)<br>ink2: 14.4 (AAA) | `#0C0C0B` (15.3:1) |
| jade | `#7DF9B4` | ink: 15 (AAA)<br>ink2: 14.1 (AAA) | `#0C0C0B` (15:1) |
| amber | `#FFB86B` | ink: 11.5 (AAA)<br>ink2: 10.8 (AAA) | `#0C0C0B` (11.5:1) |

Rule: validate any new color against the concept backgrounds. Text on the primary must be the color (the concept black or white) with the **highest contrast**; `src/shared/Themed.tsx` makes that choice by itself (`onColor`).

## 3. How to swap

**CSS** (single variable):
```css
:root { --color-primary: #7DF9B4; --color-on-primary: #0C0C0B; }
```
`primarySoft` e `primaryGlow` come from `color-mix(in srgb, var(--color-primary) N%, transparent)` in `components.css`.

**Remotion** (a prop on every composition):
```bash
npx remotion render src/index.ts Galdr-Intro out/v.mp4 --props='{"primary":"#7DF9B4"}'
```

**Assets** (SVG/PNG):
```bash
node tools/make-asset.mjs --concept galdr --type banner --primary "#7DF9B4" --png
```

**showcase**: open `examples/showcase.html` and click the swatches.

## 4. Own black and white

Never `#000000` or `#FFFFFF`. The white is `#F3F0E6` (warm) and the black is `#0C0C0B` (blue). Text on bone is `#14110c` (warm black). Never `#000`/`#fff`.

| Token | Value | Where | Character |
|---|---|---|---|
| `black` | `#0C0C0B` | canvas, text on bone/primary | near black |
| `white` | `#F3F0E6` | specular highlight, title on ink | warm paper |
| `bone` | `#E9E4D6` | reading surface (not the white) | bone `#E9E4D6` |

Quick check in the code: `grep -rnE "#fff|#000|rgba\\(255,255,255|rgba\\(0,0,0" src galdr` must come back empty (except "forbidden" examples in the documentation).

## 5. Dark / light theme

The concept is dark with paper panels. For print, use bone as the background and `ink` as the text; the primary becomes a `black` rule.

## 6. Checklist

- [ ] There is **one** primary token and no primary hex scattered around.
- [ ] Swapping the primary did not break contrast (table in item 2).
- [ ] Text on the primary uses the highest-contrast color.
- [ ] No `#000`/`#fff` in the code or the assets.
- [ ] Shadows and overlays use the concept black with alpha.
