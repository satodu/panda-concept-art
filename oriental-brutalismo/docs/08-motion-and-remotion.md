# 08. Motion and Remotion

**Signature: dry and hard.** Mask wipes (no slow fades), numbers that count in steps, one event per scene (the Hanko stamp with camera shake).

## Compositions (`src/oriental/`)

| Id | Size | Length | Shows |
|---|---|---|---|
| `Oriental-Intro` | 1920×1080 | 170f | title letter by letter through a mask, a hairline that draws itself, kanji appearing character by character, **stamp** with shake + flash |
| `Oriental-Ui` | 1920×1080 | 240f | Bento entering by wipe, stepped counter, bars in 6 steps, typing terminal, queue with the active item switching |
| `Oriental-Components` | 1920×1080 | 210f | button hover/press, tags, toggle, progress bar, block loader, toasts entering from the right |
| `Oriental-Logo` | 1920×1080 | 130f | monogram frame draws itself, `O.` appears, wordmark by wipe, Hanko |
| `Oriental-Banner` | 1500×500 | 120f | animated banner (props `title`, `subtitle`) |
| `Oriental-Social` | 1080×1350 | 120f | portrait post with a two-line title, summary card, Hanko |

All accept the **`primary`** prop. Code in `src/oriental/`; theme in `theme.tsx`.

```bash
npm run studio
npx remotion still src/index.ts Oriental-Intro out/oi.png --frame=100
npx remotion render src/index.ts Oriental-Social out/post.mp4 --props='{"headline":"NEW VERSION","primary":"#F59E0B"}'
```

## Motion vocabulary

| Resource | Recipe |
|---|---|
| Curve | `outExpo = Easing.bezier(0.22, 1, 0.36, 1)` (`src/shared/motion.ts`) |
| Horizontal wipe | `clipPath: wipeX(p)` (`src/shared/reveal.ts`) |
| Vertical wipe (letters) | `clipPath: wipeUp(p)` |
| Shake | `shake(frame, start, dur, amp)` applied to the container |
| Counter | `quant(value, step)` |
| Bars | `Math.ceil(p * 6) / 6` (6 steps) |
| Flash | primary layer at 16% for 2 frames (`mixBlendMode: screen`) |
| Stamp | `scale 1.9→1`, `rotate -10°→-3°` in 6 frames |

### Stamp
```tsx
const slam = progress(frame, slamAt, slamAt + 6, outExpo);
const [dx, dy] = shake(frame, slamAt, 10, 12);
<Hanko style={{opacity: frame >= slamAt ? 1 : 0,
  transform: `scale(${interpolate(slam, [0, 1], [1.9, 1])}) rotate(${interpolate(slam, [0, 1], [-10, -3])}deg)`}} />
```

## Rules

1. One event per scene. The rest is static.
2. Entrances: wipe + 24px offset. **No long fade-only.**
3. Numbers count in steps, not smoothly.
4. No bounce, elastic, parallax, blur.
5. End of a banner: hold the last frame for 1s.

## New scene ideas

- Card reveal with a vertical wipe and tag `#01`.
- Deploy timeline: a square bar advancing in steps.
- Terminal with an error: `ERROR.` in the primary with a short shake.
