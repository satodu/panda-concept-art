# 03. UI and components

Ready CSS in `tokens/components.css`; example in `examples/showcase.html`.

| Component | Rule |
|---|---|
| Card | `card` paper, hairline, radius 40, padding 32, hover → `cardHi` in 520ms |
| Ink button | `ink` with `cardHi` text, pill 56px |
| Primary button | `primary`, 1 per screen |
| Field | 56px, radius 24, error = dashed border |
| Toggle | on: `ink` track, `primary` knob |
| Kanji | a real, plain character in the primary; no seal, no frame |
| Ink bloom | `examples/suminagashi.js`; 1 per screen, clipped by the card radius |
| Number | last digits faded (`.fade-1/2/3`) |
| Rule | straight 1px hairline (`.rule`) |

States and screen patterns: sections 8 and 9 of `SHIZUKA.md`.
