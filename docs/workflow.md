# Workflow

## 1. From prompt to reference

1. Open the concept's `PROMPTS.md` (144 prompts) and choose the section (A images without people, B icons, C banners, D people, E image editing, F video, G video editing, H audio, I text, J code).
2. Generate the reference in `agy` (the Antigravity CLI):

```bash
agy -p "Generate an image and save it as /path/to/output.png. Prompt: <prompt>" --dangerously-skip-permissions
```

`--dangerously-skip-permissions` approves the tools automatically; use it only for image generation into a known output folder.

3. Approve only what respects `09-checklist-anti-patterns.md`.
4. Keep the approved ones in `<concept>/reference/`.

## 2. From reference to product

| Deliverable | How |
|---|---|
| Icons, banners, wallpapers | `tools/make-asset.mjs` |
| Screens | HTML/CSS with `tokens.css` (guide 03 of the concept) |
| Motion/video | Remotion (`src/`) |
| Photoreal hero image | AI, **without text**; the text goes in the script or in Remotion |

## 2b. Swapping the primary color

A single decision: see `docs/10-primary-color-black-and-white.md` of the concept (computed contrast and commands).

## 3. Known limits of AI images

- **Text:** letters and kanji come out wrong. Use the image as a reference and redo the text.
- **Prompt leaking:** the model writes design labels on the interface. See the rule in guides 07.
- **Quota:** `agy`'s image model has a quota. When it runs out (`429 RESOURCE_EXHAUSTED`) it returns after a few hours; meanwhile, work with HTML and Remotion.
- **Consistency:** repeat the same hex values in every prompt of the concept.

## 4. Versioning

- Tokens are the source of truth. Change `tokens.json`, not the loose values in the guides.
- References in `reference/` are heavy images; if the repository grows, consider Git LFS.
- `out/` and `node_modules/` are in `.gitignore`.
