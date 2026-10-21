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
| Announcement | Display 126 title on two lines, summary card, Hanko, index `#07` (`Oriental-Social`). |
| Quick tip | One big number, one sentence, tags `In.` `Git.`. |
| Before/after | Two Bento cards side by side, labels `BEFORE` `AFTER`, primary only on the after. |
| Quote | 64px text, quotes in the primary, small Hanko. |
| Launch | `Oriental-Banner` banner + Hanko. |

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
node tools/make-asset.mjs --concept oriental-brutalismo --type social --title "YOUR TITLE" --png
node tools/make-asset.mjs --concept oriental-brutalismo --type og --title "ARTICLE" --png
npx remotion still src/index.ts Oriental-Social out/post.png --frame=100
```

## Captions and voice

How Oriental Brutalismo speaks: see `ORIENTAL BRUTALISMO.md` section 14 and `PROMPTS.md` section I.

## Editorial calendar (suggestion)

| Day | Type |
|---|---|
| Mon | Announcement |
| Wed | Quick tip |
| Fri | Before/after |
