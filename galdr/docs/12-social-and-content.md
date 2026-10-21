# 12. Social media and content

## Formats and sizes

| Piece | Size | Note |
|---|---|---|
| Portrait post | 1080×1350 | default |
| Square post | 1080×1080 | |
| Carousel | 1080×1350 | cover + inner slides |
| Story / reels | 1080×1920 | keep 250px margins on the edges |
| YouTube thumbnail | 1280×720 | title of ≤ 3 words |
| X header | 1500×500 | avoid the bottom-left corner |
| LinkedIn personal | 1584×396 | |
| OG / link preview | 1200×630 | |

## Post types

| Type | Composition |
|---|---|
| Shard of the week | Crystal on the plinth + chamfered bone panel with name and quote (`Galdr-Social`). |
| Spec sheet | Mono table on bone with 4 rows, facet seal. |
| Detail (macro) | Macro photo/render with callouts A–D and scale. |
| Seer quote | Serif pull quote, small chamfered portrait. |
| Acquisition | Provenance timeline with 3 milestones. |

## Carousel (structure)

1. **Cover:** hook in display, full stop in the primary.
2. **Inner (2–7):** one number, one sentence, one icon. Same margins on all.
3. **Closing:** call to action + wordmark.

## Consistency

- Same title position across the series.
- Same primary per campaign (change only between campaigns).
- Series numbering in mono (`#07`).
- Never put text inside an AI image: compose with `tools/make-asset.mjs --type social` or Remotion (`*-Social`).

## Generate

```bash
node tools/make-asset.mjs --concept galdr --type social --title "YOUR TITLE" --png
node tools/make-asset.mjs --concept galdr --type og --title "ARTICLE" --png
npx remotion still src/index.ts Galdr-Social out/post.png --frame=100
```

## Captions and voice

How Galdr speaks: see `GALDR.md` section 14 and `PROMPTS.md` section I.

## Editorial calendar (suggestion)

| Day | Type |
|---|---|
| Mon | Shard of the week |
| Wed | Spec sheet |
| Fri | Detail (macro) |
