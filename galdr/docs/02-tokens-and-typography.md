# 02. Tokens and typography

Single source: `../tokens/tokens.json`. CSS in `../tokens/tokens.css`.

## Color

| Token | Value | Use |
|---|---|---|
| `ink` | `#0C0C0B` | canvas |
| `ink2` | `#141413` | dark panels, rail |
| `ink3` | `#1D1D1B` | plinth, raised layer |
| `bone` | `#E9E4D6` | **editorial paper** (text panels) |
| `boneInk` | `#14110c` | text on bone |
| `boneMuted` | `#6b665a` | captions on bone |
| `primary` | `#8FF3FF` | **only** accent: focus, active, seal, leader lines |
| `primarySoft` | `rgba(143,243,255,.25)` | seal background |
| `spectralA/B` | `#8B5CF6` / `#7DF9FF` | **only inside the crystal** |
| `textMuted` | `#8F8E88` | metadata |
| `hairline` | `rgba(233,228,214,.14)` | 1px dividers |
| `hairlineStrong` | `rgba(233,228,214,.32)` | panel borders |

### Rules

1. One accent: ice. No red, no gold.
2. Live color only in the crystal and in the ice. The spectrum (violet to cyan) **never** becomes a UI color.
3. Two surfaces: dark (`ink2`) for navigation and data, bone (`bone`) for reading. Alternating them gives editorial rhythm.

## Typography

| Role | Font | Notes |
|---|---|---|
| Display | Big Shoulders Display (or Barlow Condensed) | uppercase, 800, `letter-spacing: 2px`, **full stop** (ice dot) |
| Editorial | Source Serif 4 | serious body, `line-height: 1.7–1.8` |
| UI | Inter or IBM Plex Sans | controls and labels |
| Data | IBM Plex Mono | catalog, measurements, figure captions |
| Runes | Noto Sans Runic in `vertical-rl` | rune ruler (ᚷᚨᛚᛞᚱ, ᚨᛗᛖᚦᛁᛊᛏ) |

### Minimum hierarchy of a screen

1. Display title
2. Subtitle (uppercase mono with `letter-spacing: 2px`)
3. Serif body
4. Figure caption (`FIG. 01 — ...`)
5. Note/metadata (small mono, `textMuted`)

## Geometry

| Token | Value |
|---|---|
| `chamfer` | 14px (top-right and bottom-left corners) |
| Large chamfer | 40px (mobile sheets) |
| Border | 1px |
| Active rule | 2px ice on the left side |
| Gap | 16–28px |

## Motion

`cubic-bezier(0.3, 0, 0, 1)`. Duration: 140 / 260 / 420ms. Entrance offset: 8–12px. See `08-motion-and-remotion.md`.

## CSS variables

```css
@import './tokens.css';
body { background: var(--color-ink); color: var(--color-bone); font-family: var(--font-body); }
```
