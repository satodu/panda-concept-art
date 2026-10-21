# 08. Motion and Remotion

Slow. The ink spreads, the paper breathes (6.4s), one small event at a time.

| Composition | Length | What it shows |
|---|---|---|
| `Shizuka-Intro` | 220f | ink spreads, title blurs to sharp, half-erased number, kanji appears |
| `Shizuka-Ui` | 300f | dashboard: ink in a card, timer with a faded last digit, task, toggle |
| `Shizuka-Focus` | 300f | the ink IS the timer; it grows with the minutes |
| `Shizuka-Components` | 270f | buttons, field, controls, tags, ink, kanji |
| `Shizuka-Logo` | 160f | ink drop, the word settles, kanji |
| `Shizuka-Social` | 150f | 1080×1350 quote |
| `Shizuka-Kanji` | 360f | series 静 間 白 終 侘 |

```bash
npm run studio
npx remotion render src/index.ts Shizuka-Intro out/shizuka.mp4 --props='{"primary":"#2F3F6B"}'
```
Primitives in `src/shizuka/parts.tsx`: `Paper`, `Suminagashi`, `FadedNum`, `Kanji`, `Rule`, `Decor`, `Card`, `Toggle`, `Ghost`, `dots`.
Forbidden: hard wipe, shake, glow, bounce.
