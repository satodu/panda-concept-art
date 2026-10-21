# 06. Backgrounds, wallpapers and textures

## Ingredients

| Element | Opacity | Notes |
|---|---|---|
| Dot matrix | 5–10% | 24–44px step, 1–1.4px radius |
| `+` crosses | 15–30% | in rows at the top or in the margins |
| Hairlines | 8–20% | wireframe planes, horizon lines |
| Rings | 10–20% | thin circles, 1px |
| Bento blocks | surface1 | floating rectangles of different sizes |
| Hanko seal | 100% | **one** per composition |
| Vertical kanji | 40–50% | one column, never two |

## Wallpaper recipe

1. Solid `canvas` background.
2. 7% dot matrix, 44px step.
3. Two `surface1` blocks with hairline border, in opposite corners (asymmetry).
4. One large ring, partly outside the frame.
5. A row of crosses at the top.
6. Small Hanko at ~12% of the width, at 62% of the height.
7. 60% of the frame empty.

```bash
node tools/make-asset.mjs --concept oriental-brutalismo --type wallpaper --size 3840x2160 --png
node tools/make-asset.mjs --concept oriental-brutalismo --type wallpaper --size 2560x1440 --png
```

## Wallpaper sizes

4K 3840×2160 · QHD 2560×1440 · FHD 1920×1080 · ultrawide 3440×1440 · phone 1170×2532.

## Textures for photographic/AI versions

Raw matte concrete, translucent smoked glass, soft ambient occlusion, directional studio light, **no** plastic reflections and **no** neon. Ready prompt in `07-ai-prompts.md` (PROMPT 02).

## In CSS (website background)

```css
body {
  background: var(--color-canvas);
  background-image:
    radial-gradient(rgba(222,223,215,.07) 1px, transparent 1.5px),
    linear-gradient(180deg, rgba(20,23,31,.0), rgba(20,23,31,.6));
  background-size: 30px 30px, 100% 100%;
}
```
