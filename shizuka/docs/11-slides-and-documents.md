# 11. Slides and documents

## Principles

1. One subject per slide. 55–60% of the area empty.
2. Display title with a full stop; at most 2 display sizes per slide.
3. The primary (`#A8473A`) on **one** element per slide.
4. Discreet numbering in mono (`01 / 12`).
5. Shizuka backgrounds: solid light canvas, no stock photos.

## Layouts (16:9, 1920×1080)

| Slide | Composition |
|---|---|
| Title | Ink bloom on the side, `SHIZUKA.` Inter Tight 200, one lowercase sentence, half-erased number `001`, kanji 静. |
| Section | Just one big weight-200 number with the last digits fading and one word; 80% empty. |
| Content | A 40–56px sentence on the left and one small paper card on the right. No bullets. |
| Data | One single giant number, small unit, faded last digits. |
| Quote | Inter Tight 200 text at 90–118px, ink bloom in the corner (`Shizuka-Social`). |
| Closing | lowercase `thank you.` and a half-faded kanji 終. |

## Margins and grid

Outer margin 96px; 12-column grid, 24px gap; title 160px from the top; footer 56px from the bottom with the page number in mono.

## Generation

- Static pieces: `node tools/make-asset.mjs --concept shizuka --type banner --size 1920x1080 --png` (uses the banner template as a title background).
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
