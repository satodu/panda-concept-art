# 11. Slides and documents

## Principles

1. One subject per slide. 55–60% of the area empty.
2. Display title with a full stop; at most 2 display sizes per slide.
3. The primary (`#980281`) on **one** element per slide.
4. Discreet numbering in mono (`01 / 12`).
5. Oriental Brutalismo backgrounds: solid dark canvas, no stock photos.

## Layouts (16:9, 1920×1080)

| Slide | Composition |
|---|---|
| Title | Display XL title (up to 230px) with the full stop in the primary, mono subtitle, 150px Hanko at the bottom right, 60% empty. |
| Section | Giant `02` in display, section name in uppercase mono, vertical kanji column on the right. |
| Content | Title on the left (5 cols), 2 to 3 Bento cards on the right (7 cols). Max 3 bullets. |
| Data | One display 190 number (`98.4%`), bars with ONE in the primary, mono caption. |
| Quote | Space Grotesk 500 40px text, author in mono, quotes in the primary. |
| Closing | `THANK YOU.` display, contact in mono, Hanko seal. |

## Margins and grid

Outer margin 96px; 12-column grid, 24px gap; title 160px from the top; footer 56px from the bottom with the page number in mono.

## Generation

- Static pieces: `node tools/make-asset.mjs --concept oriental-brutalismo --type banner --size 1920x1080 --png` (uses the banner template as a title background).
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
