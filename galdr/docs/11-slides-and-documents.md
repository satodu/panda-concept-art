# 11. Slides and documents

## Principles

1. One subject per slide. 55–60% of the area empty.
2. Display title with a full stop; at most 2 display sizes per slide.
3. The primary (`#8FF3FF`) on **one** element per slide.
4. Discreet numbering in mono (`01 / 12`).
5. Galdr backgrounds: solid dark canvas, no stock photos.

## Layouts (16:9, 1920×1080)

| Slide | Composition |
|---|---|
| Title | Name in display 150 with the full stop in the primary, mono line `CATALOG · REV.01`, crystal on the right with a halo, facet seal. |
| Section | Number `02` in display, section title, facet line in the background, vertical rune column. |
| Content | Bone panel with (editorial) text + figure on the plinth with caption `FIG. 02`. |
| Data | Gauge or spectral chart on ink2, catalog table on bone. |
| Quote | 44px serif pull quote on bone, side rule, attribution in mono. |
| Closing | Crystal with a halo, `THANK YOU.`, `GD-0417` seal. |

## Margins and grid

Outer margin 96px; 12-column grid, 24px gap; title 160px from the top; footer 56px from the bottom with the page number in mono.

## Generation

- Static pieces: `node tools/make-asset.mjs --concept galdr --type banner --size 1920x1080 --png` (uses the banner template as a title background).
- Opening animations: the concept's Remotion compositions.
- Slide prompts: `PROMPTS.md` (A21, A22 and J).

## Documents

| Document | Rules |
|---|---|
| README | title with a full stop, one descriptive line, 3 items, code blocks (see `PROMPTS.md` I05) |
| PDF/report | poster-style cover (A19/A20), body in the concept font, numbered captions, one figure per page |
| Email | 600px, table, web-safe fallback fonts, 1 CTA (see `PROMPTS.md` J08) |
| Notion/Docs | only headings, rules and callouts; no extra color besides the primary |
| Resume/proposal | concept typography, narrow metadata column in mono |

## Export

PDF at 300 dpi for print, 150 for screen. Embedded fonts. Images with an sRGB profile.
