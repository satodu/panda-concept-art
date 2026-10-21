# 05. Banners, social and covers

## Sizes

| Piece | Size |
|---|---|
| X/Twitter header | 1500 × 500 |
| LinkedIn personal | 1584 × 396 |
| GitHub social preview | 1280 × 640 |
| Open Graph | 1200 × 630 |
| YouTube banner | 2560 × 1440 (safe 1546 × 423) |
| Portrait post | 1080 × 1350 |
| Story | 1080 × 1920 |
| Slide | 1920 × 1080 |

## Anatomy

1. Ink background with an ice halo on the crystal side.
2. Crystal on the right (or centered), with rim light.
3. Bone display title with an ice full stop.
4. Uppercase mono line (`SHARD CATALOG · REV.01`).
5. Rhombus seal `GD-0417`.
6. Footer hairline.

```bash
node tools/make-asset.mjs --concept galdr --type banner \
  --title "SHARD" --subtitle "shard catalog · rev.01" --png --fonts ./fonts
```

`--fonts` with the `.ttf` files of Big Shoulders, IBM Plex Mono, Source Serif 4 and Noto Sans Runic gives the final result. Without it the PNG uses system fonts (thinner).

## Cover types

| Cover | Composition |
|---|---|
| Article | title on the left, figure on the plinth on the right, issue number |
| Repository | crystal + stack in mono tags |
| Event/pass | serious key art (see prompt 03), tier rows as shard cards |
| Podcast | giant crystal cropped by the chamfer |

## Post template

- Header: small `GALDR.` + issue number.
- Center: crystal or bone paper with a serif quote.
- Footer: rhombus seal + date.

## Captions

Always number them: `FIG. 01 — AMETHYST, FRONT VIEW`. This reinforces the rune-archive tone.
