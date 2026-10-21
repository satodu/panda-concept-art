# 04. Icons, badges and logo

## Icon rules

- **Grid:** 24px (UI) or 512px (app). 1.5px to 2px stroke, square corners.
- **Color:** `text` (`#dedfd7`) over `surface1`. The primary appears in **one** small detail (a square, dot or seal).
- **Shape:** simple geometry, a circle or rectangle with a single cut.
- **Japanese glyph** as a mark: 禅 (zen), 道 (path), 間 (Ma), 鉄 (iron).

## App icon

```bash
node tools/make-asset.mjs --concept oriental-brutalismo --type icon --glyph 禅 --png
node tools/make-asset.mjs --concept oriental-brutalismo --type icon --glyph 道 --size 1024x1024 --png
```

Anatomy: `canvas` background with dot matrix, `surface1` plate (10% radius), thin ring behind the glyph, magenta square at the bottom right corner, 4 crosses at the top left corner.

## Badge / project seal

```bash
node tools/make-asset.mjs --concept oriental-brutalismo --type badge --title "STABLE" --png
```

`surface1` circle with an inner ring, Archivo Black title with a magenta full stop, mini Hanko in the corner.

## Logo

- Wordmark: `NAME.` in Archivo Black, magenta full stop.
- Monogram: letter + dot (`O.`), used in rails and favicons.
- Seal: 2x2 Hanko with two alternating kanji (間 and 禅).
- Clear space: the height of the letter "O" around it.
- Minimum wordmark size: 80px wide; below that use the monogram.

## UI icon set (ideas)

| Function | Metaphor |
|---|---|
| Home | square inside a square |
| Data | three bars of different heights |
| Settings | 6-tooth gear in thin stroke |
| Search | circle + 45° stroke |
| Exit | arrow leaving a bracket |
| Status | filled dot with a ring |

For the UI set, draw in SVG with `stroke="currentColor"`, `stroke-width="1.5"`, `stroke-linecap="square"`.

## Export

| Destination | Sizes |
|---|---|
| Favicon | 16, 32, 48 (SVG + ICO) |
| App/PWA | 192, 512 (PNG), maskable with 10% margin |
| GitHub avatar | 460 |
| macOS/Windows | 1024 (source) |
