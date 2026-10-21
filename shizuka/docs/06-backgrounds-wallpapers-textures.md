# 06. Backgrounds, wallpapers and textures

- **Paper:** `canvas` + fibre (`feTurbulence` 0.9×0.35, 3 octaves) at 50% + low-frequency stains + `canvasDeep` vignette.
- **Dot grid:** 28px, 8% black. Just one.
- **Showcase decoration (optional):** ink specks, ledger frame, folio label (`NO. 001 · VOL. 03`). Remove it on dense product screens.
- **Wallpaper (3840×2160):** paper, one large ink bloom in the center, kanji in the corner.
- **Pattern:** two ink blooms of different sizes + one kanji, over the grid.
- Never flat white, never stock photos.
```bash
node tools/make-asset.mjs --concept shizuka --type wallpaper --png
node tools/make-asset.mjs --concept shizuka --type pattern --png
```
