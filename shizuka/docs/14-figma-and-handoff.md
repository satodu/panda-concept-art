# 14. Figma and handoff

## Variables (collections)

| Collection | Variable | Value | CSS |
|---|---|---|---|
| Color | `surface/canvas` | #E4DFD0 | `--color-canvas` |
| Color | `surface/card` | #ECE7D9 | `--color-card` |
| Color | `ink/default` | #1C1B19 | `--color-ink` |
| Color | `brand/primary` | #A8473A | `--color-primary` |
| Color | `black` / `white` | #1C1B19 / #F3EFE3 | `--color-black` / `--color-white` |
| Type | `font/display` | Inter Tight | `--font-display` |
| Type | `font/mono` | IBM Plex Mono | `--font-mono` |
| Radius | `radius/card` | 40 | `--radius-card` / `--geometry-chamfer` |

**Mode:** create a "primary: alt" mode where only `brand/primary` changes, to demonstrate swapping the primary.

## Text styles

| Style | Use |
|---|---|
| Display / XL, L | titles |
| Body / L, M | body |
| Mono / Label | labels, data |
| Ghost / JP | kanji |

## Components (names)

`Button/default | primary | ghost`, `Field/default | focus | error`, `Card`, `Tag/default | primary`, `Toggle/off | on`, `Slider`, `Tabs`, `List item`, `Table row`, `Toast`, `Modal`, `Nav rail`, `Empty state`, `Ink bloom`, `Kanji`.

Every component has a variant for each state (default, hover, focus, active, disabled, error, loading, empty where applicable).

## Auto layout

Spacing only on the 4 scale. Card padding 32px. 12-column grid, gap 20px.

## Token export

`tokens.json` → Tokens Studio / Style Dictionary:

```json
{
  "color": { "primary": { "value": "#A8473A", "type": "color" } },
  "radius": { "card": { "value": "40", "type": "borderRadius" } }
}
```

Import the file in the extension and apply it to the styles. To regenerate the CSS: `node tools/build-tokens.mjs`.

## Handoff

1. A "Specs" page with each component + states + measurements.
2. Frames named by screen (`Home / Desktop`, `Home / Mobile`).
3. Mono annotations with the token (`--color-primary`), not the hex.
4. Export icons as SVG (stroke `currentColor`).
5. Deliver together: `SHIZUKA.md`, `tokens/`, `examples/showcase.html`.

## Checklist

- [ ] No loose hex in the frames: everything bound to a variable.
- [ ] Components with all states.
- [ ] The "primary: alt" mode works.
- [ ] Contrast checked.
