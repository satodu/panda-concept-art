# 05. Banners, social and covers

## Sizes

| Piece | Size | Note |
|---|---|---|
| X/Twitter header | 1500 × 500 | safety: avoid the bottom-left 200px (avatar) |
| LinkedIn personal | 1584 × 396 | title to the right of the avatar |
| LinkedIn page | 1128 × 191 | wordmark only |
| GitHub social preview | 1280 × 640 | 40px margin |
| Open Graph / link preview | 1200 × 630 | |
| YouTube banner | 2560 × 1440 | central safe area 1546 × 423 |
| Square post | 1080 × 1080 | |
| Portrait post | 1080 × 1350 | |
| Story/Reels | 1080 × 1920 | |
| 16:9 slide | 1920 × 1080 | |

## Banner anatomy

1. `canvas` background with dot matrix.
2. 1px `hairline` inner frame (inset 18px, radius 18px).
3. Display title (uppercase) with a **magenta dot**.
4. Mono subtitle in `textMuted`.
5. Tags (`In.`, `Git.`, `#01`).
6. Tategaki column (optional).
7. Hanko at the bottom right corner.

## Generate

```bash
node tools/make-asset.mjs --concept oriental-brutalismo --type banner \
  --title "MY PROJECT" --subtitle "design system // dev tools" --png --fonts ./fonts
node tools/make-asset.mjs --concept oriental-brutalismo --type banner --size 1200x630 --title "BLOG" --png
```

`--fonts` points to a folder with `.ttf` files (Archivo Black, JetBrains Mono, Noto Sans JP). Without it, the PNG uses system fonts.

## Animated banner

`Oriental-Banner` (1500×500, 4s). Parameterizable through props (`title`, `subtitle`). See `08-motion-and-remotion.md`.

## Covers

- **Repository:** 1280×640, title + stack in tags.
- **Article:** title on the left, issue number (`#07`) in mono, small Hanko.
- **Album/playlist:** square, giant glyph in Archivo Black, magenta full stop.

## Slides

- One topic per slide. Title on the left, 60% empty.
- Numbering in mono (`01 / 12`).
- `canvas` background; only one slide with a big magenta highlight.
