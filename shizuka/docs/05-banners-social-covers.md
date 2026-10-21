# 05. Banners, social and covers

- **Banner (1500×500):** `SHIZUKA.` on the left, a straight rule, one sentence, ink bloom on the right, small kanji.
- **OG (1200×630):** the same, cropped.
- **Post (1080×1350):** 112px quote in Inter Tight 200, ink in the corner, kanji (`Shizuka-Social`).
- **Covers:** one sentence, one ink bloom. Never more than that.

```bash
node tools/make-asset.mjs --concept shizuka --type banner --title "MY PROJECT" --png
node tools/make-asset.mjs --concept shizuka --type social --title "rest first." --png
```
