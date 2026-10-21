# 14. Figma and handoff

## Variables (collections)

| Collection | Variable | Value | CSS |
|---|---|---|---|
| Color | `surface/ink` | #0C0C0B | `--color-ink` |
| Color | `surface/ink-2` | #141413 | `--color-ink2` |
| Color | `paper/bone` | #E9E4D6 | `--color-bone` |
| Color | `brand/primary` | #8FF3FF | `--color-primary` |
| Color | `black` / `white` | #0C0C0B / #F3F0E6 | `--color-black` / `--color-white` |
| Type | `font/display` | Big Shoulders Display | `--font-display` |
| Type | `font/mono` | IBM Plex Mono | `--font-mono` |
| Radius | `radius/card` | 14 | `--radius-card` / `--geometry-chamfer` |

**Mode:** create a "primary: alt" mode where only `brand/primary` changes, to demonstrate swapping the primary.

## Text styles

| Style | Use |
|---|---|
| Display / XL, L | titles |
| Body / L, M | body |
| Mono / Label | labels, data |
| Rune / Vertical | runes |

## Components (names)

`Button/default | primary | ghost`, `Field/default | focus | error`, `Card`, `Tag/default | primary`, `Toggle/off | on`, `Slider`, `Tabs`, `List item`, `Table row`, `Toast`, `Modal`, `Nav rail`, `Empty state`, `Panel/ink | bone`, `Stamp`, `Rune ring`, `Mohs gauge`, `Timeline`.

Every component has a variant for each state (default, hover, focus, active, disabled, error, loading, empty where applicable).

## Auto layout

Spacing only on the 4 scale. Card padding 28px. 12-column grid, gap 24px.

## Token export

`tokens.json` → Tokens Studio / Style Dictionary:

```json
{
  "color": { "primary": { "value": "#8FF3FF", "type": "color" } },
  "radius": { "card": { "value": "14", "type": "borderRadius" } }
}
```

Import the file in the extension and apply it to the styles. To regenerate the CSS: `node tools/build-tokens.mjs`.

## Handoff

1. A "Specs" page with each component + states + measurements.
2. Frames named by screen (`Home / Desktop`, `Home / Mobile`).
3. Mono annotations with the token (`--color-primary`), not the hex.
4. Export icons as SVG (stroke `currentColor`).
5. Deliver together: `GALDR.md`, `tokens/`, `examples/showcase.html`.

## Checklist

- [ ] No loose hex in the frames: everything bound to a variable.
- [ ] Components with all states.
- [ ] The "primary: alt" mode works.
- [ ] Contrast checked.
