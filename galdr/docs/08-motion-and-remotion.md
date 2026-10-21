# 08. Motion and Remotion

**Signature: precise and luminous.** Diagonal chamfer wipes, lines that draw themselves, a light sweep, a crystal that never stops turning.

## Compositions (`src/galdr/`)

| Id | Size | Length | Shows |
|---|---|---|---|
| `Galdr-Intro` | 1920×1080 | 180f | crystal enters by diagonal wipe, **light sweep**, callouts A–E draw themselves, title by diagonal wipe |
| `Galdr-Ui` | 1920×1080 | 240f | shard plate: panels by diagonal wipe, table values **typing**, Mohs gauge, timeline filling |
| `Galdr-Components` | 1920×1080 | 240f | button that lights up, filters, toggle, gauge, spectral bar, toast with seal |
| `Galdr-Kit` | 1920×1080 | 240f | 9 more components: tabs, slider, stepper, search, segmented + checks, table, tooltip + notice, tiers, accordion + pages |
| `Galdr-Logo` | 1920×1080 | 140f | hexagonal outline draws itself, becomes a crystal, wordmark by wipe, seal |
| `Galdr-Mobile` | 1080×1920 | 150f | hero, callouts A–D, chamfered bone sheet rising, fixed action |
| `Galdr-Social` | 1080×1350 | 120f | crystal + bone panel with a quote |

All accept the **`primary`** prop. Code in `src/galdr/`; theme in `theme.tsx`.

## The crystal

`Crystal.tsx` is pure SVG: each face is a polygon that depends on `angle`; the shine comes from the face angle versus `lightAngle`.

```tsx
<Crystal size={640} angle={frame * 0.018 + 0.4} lightAngle={0.9 + Math.sin(frame * 0.03) * 0.6} />
```

| Prop | Effect |
|---|---|
| `size` | square box in px |
| `angle` | rotation in radians (0.018/frame ≈ 1 turn every 11s) |
| `lightAngle` | light direction |
| `glow` | halo (0..1) |

The crystal spectrum (`spectralA/B`) is fixed; only the halo, lines and seals follow the primary.

## Motion vocabulary

| Resource | Recipe |
|---|---|
| Curve | `galdrEase = Easing.bezier(0.3, 0, 0, 1)` |
| Diagonal wipe | `clipPath: diagWipe(p)` (`src/shared/reveal.ts`) |
| Lines that draw themselves | polyline with an interpolated end point, or `strokeDashoffset` |
| Sweep | 2px primary bar with a glow `boxShadow`, crosses the crystal in ~55 frames |
| Typing | `text.slice(0, floor(p * text.length))` |
| Chamfered panel | `Panel` component (outline in SVG) |

## Rules

1. Every reveal is diagonal (chamfer), never a pure fade.
2. The crystal **always** turns slowly; everything else stays calm.
3. Lines draw from the origin point to the caption.
4. No shadow, bounce, glitch or pulsing neon.
5. Technical text enters "being filled in" (typing line by line).

```bash
npm run studio
npx remotion still src/index.ts Galdr-Intro out/ki.png --frame=120
npx remotion render src/index.ts Galdr-Social out/post.mp4 --props='{"title":"FLUORITE.","primary":"#FFB86B"}'
```

## New scene ideas

- A/B comparator with a vertical primary line between two crystals.
- Spectral chart drawing the curve live.
- A chamfered curtain opening over the plinth.
