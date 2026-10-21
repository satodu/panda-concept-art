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
| Quote of the day | 112px Inter Tight 200 quote, ink bloom in the corner, kanji (`Shizuka-Social`). |
| Breathe | Huge ink bloom and one word. |
| Focus tip | Small card with a half-erased timer and a gentle sentence. |
| Journal | Sheet of paper with the day number and one sentence. |
| Gentle notice | Pill card with a small kanji and one sentence. |

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
node tools/make-asset.mjs --concept shizuka --type social --title "YOUR TITLE" --png
node tools/make-asset.mjs --concept shizuka --type og --title "ARTICLE" --png
npx remotion still src/index.ts Shizuka-Social out/post.png --frame=100
```

## Captions and voice

How Shizuka speaks: see `SHIZUKA.md` section 14 and `PROMPTS.md` section I.

## Editorial calendar (suggestion)

| Day | Type |
|---|---|
| Mon | Quote of the day |
| Wed | Breathe |
| Fri | Focus tip |
