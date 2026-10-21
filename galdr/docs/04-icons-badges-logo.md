# 04. Icons, badges and logo

## Rules

- 1.5px stroke, `stroke-linejoin: miter`, no rounded corners.
- Chamfered frame on app icons (14% cut).
- The crystal is the symbol: a prismatic hexagon with double pyramids (double terminated).
- Color: bone and ice over ink; violet/cyan appears **only** in the crystal.

## App icon

```bash
node tools/make-asset.mjs --concept galdr --type icon --png
node tools/make-asset.mjs --concept galdr --type icon --size 1024x1024 --png
```

Ink background with chamfer, hairline inner frame, ice halo behind, central crystal.

## Badge / catalog label

```bash
node tools/make-asset.mjs --concept galdr --type badge --title "GD-0417" --png
```

Chamfered bone sheet, number in display, rule and rhombus seal "GALDR".

## Logo

- Wordmark: `GALDR.` in Big Shoulders 800, ice full stop.
- Monogram: the crystal (SVG) alone.
- Seal: ice rhombus with `◆ GD-0417`.
- Clear space: the height of the "G" around it. Minimum wordmark: 160px; below that, only the crystal.

## UI icon set

| Function | Metaphor |
|---|---|
| Collection | three overlapping rhombuses |
| Search | magnifier with a facet |
| Filter | three lines with rhombuses |
| Favorites | small crystal |
| Scale | ruler with ticks |
| Hardness | arc with a needle |
| Timeline | track with rhombuses |

`stroke="currentColor"`, `stroke-width="1.5"`, 24px grid.

## Rarity / tiers (optional, for games)

Use the **number of facets** and the glow, never different colors:

| Tier | Representation |
|---|---|
| I | simple rhombus, bone border |
| II | rhombus + inner line |
| III | double rhombus |
| IV | double + ice glow |
| V | double + ice halo and rim light |

## Export

Favicon 16/32/48 (SVG), app 192/512 (PNG), avatar 460, source 1024.
