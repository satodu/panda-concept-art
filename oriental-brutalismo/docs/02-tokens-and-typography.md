# 02. Tokens and typography

Single source: `../tokens/tokens.json`. The matching CSS is in `../tokens/tokens.css`.

## Color

| Token | Value | Use |
|---|---|---|
| `canvas` | `#090a0f` | general background (surface-0) |
| `surface1` | `#14171f` | cards and panels |
| `surface2` | `#1c242c` | hover and interactive surfaces |
| `text` | `#dedfd7` | main text and lines |
| `textMuted` | `#7e8790` | secondary text, metadata |
| `hairline` | `rgba(222,223,215,0.08)` | 1px structural border |
| `hairlineStrong` | `rgba(222,223,215,0.20)` | hover border, strong dividers |
| `primary` | `#980281` | **only** highlight (magenta/Hanko) |
| `primarySoft` | `rgba(152,2,129,0.12)` | translucent background for seals and badges |

### Primary color rule

At most **one magenta focus per screen**, plus small status dots. Valid uses: the title full stop, Hanko seal, active badge, primary button, technical underline. Never for section backgrounds or long text.

## Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display | Archivo Black (alternatives: Cabinet Grotesk, Space Grotesk, Syne) | black | uppercase, `tracking-tight`, **full stop** |
| Body/UI | Space Grotesk (alternatives: Geist, Inter, Plus Jakarta Sans) | 400 and 500 | |
| Mono | JetBrains Mono (or Geist Mono) | 400 | tags, codes, axes |
| Japanese | Noto Sans JP (Gothic) or Shippori Mincho | 300 to 700 | `writing-mode: vertical-rl` |

### Suggested scale (desktop)

| Level | Size | Use |
|---|---|---|
| Display XL | 160–230px | cover title |
| Display | 64–96px | page title |
| H2 | 32–40px | card title |
| Body | 18–24px | text |
| Mono label | 13–15px, `letter-spacing: 1–2px` | tags and metadata |

### Labels

Dotted prefixes and short hashtags: `In.`, `Git.`, `#01`, `[ 0.1.0 ]`, `[ SYSTEM.DOC // REV.01 ]`.

## Geometry

| Token | Value |
|---|---|
| Card radius | 20px (`rounded-2xl`); `rounded-xl` (12px) on smaller elements |
| Chip/pill | 999px |
| Inner corners | 0 (straight inner blocks contrast with the card) |
| Border | 1px solid `hairline` |
| Gap | 16 (`gap-4`) or 24 (`gap-6`) |
| Card padding | 24–32px |

## Motion

`cubic-bezier(0.22, 1, 0.36, 1)` (OutExpo). Durations: 120ms (quick), 240ms (medium), 360ms (slow). Card hover: `translateY(-2px)` and `border-color` to `hairlineStrong`.

## Tailwind

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        canvas: '#090a0f',
        surface: {1: '#14171f', 2: '#1c242c'},
        ink: {DEFAULT: '#dedfd7', muted: '#7e8790'},
        hanko: '#980281',
      },
      fontFamily: {
        display: ['"Archivo Black"', 'sans-serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        jp: ['"Noto Sans JP"', 'sans-serif'],
      },
      borderColor: {hairline: 'rgba(222,223,215,0.08)'},
      transitionTimingFunction: {oriental: 'cubic-bezier(0.22,1,0.36,1)'},
    },
  },
};
```
