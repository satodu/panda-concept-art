# 06. Backgrounds, wallpapers and textures

## Ingredients

**Faded rune field:** 7–11 huge runes (120–340px) in bone, warm grey and a few in the primary at 3–7% opacity (`RuneField`, `.rune-bg`).

| Element | Notes |
|---|---|
| Radial gradient `ink3 → ink` | center 45%, subtle |
| Ice halo behind the crystal | opacity 20–28% |
| Facet lines | 1px polygons in bone, 8–12% |
| Plinth | dark block with a hairline top border |
| Fine particles | few, without exaggerated glow |
| Mono caption in the corner | `GALDR · REV.01` |

## Wallpaper

```bash
node tools/make-asset.mjs --concept galdr --type wallpaper --size 3840x2160 --png
```

Recipe: radial `ink3 → ink`, two facet polygons in the corners, ice halo, central crystal at 48% of the height, plinth, mono caption. 55–60% of the frame empty.

## AI-version textures

Cold stone hall, raking light, glass with a slight reflection, matte dark marble, suspended dust. **No** neon, no excessive lens flare.

## Interface backgrounds

```css
body {
  background:
    radial-gradient(ellipse at 50% 45%, var(--color-ink3), var(--color-ink) 70%);
}
```

## Background for bone paper

Solid color `#E9E4D6`. Optional texture: paper noise at 3% opacity. Never a gradient.

## Sizes

4K 3840×2160 · QHD 2560×1440 · FHD 1920×1080 · phone 1170×2532 (crystal at 38% of the height).
