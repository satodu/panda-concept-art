# 14. Figma and handoff

## Variables (collections)

| Collection | Variable | Value | CSS |
|---|---|---|---|
| Color | `surface/0` | #090a0f | `--color-canvas` |
| Color | `surface/1` | #14171f | `--color-surface1` |
| Color | `ink/default` | #dedfd7 | `--color-text` |
| Color | `brand/primary` | #980281 | `--color-primary` |
| Color | `black` / `white` | #090a0f / #dedfd7 | `--color-black` / `--color-white` |
| Type | `font/display` | Archivo Black | `--font-display` |
| Type | `font/mono` | JetBrains Mono | `--font-mono` |
| Radius | `radius/card` | 20 | `--radius-card` / `--geometry-chamfer` |

**Mode:** create a "primary: alt" mode where only `brand/primary` changes, to demonstrate swapping the primary.

## Text styles

| Style | Use |
|---|---|
| Display / XL, L | titles |
| Body / L, M | body |
| Mono / Label | labels, data |
| JP / Vertical | kanji |

## Components (names)

`Button/default | primary | ghost`, `Field/default | focus | error`, `Card`, `Tag/default | primary`, `Toggle/off | on`, `Slider`, `Tabs`, `List item`, `Table row`, `Toast`, `Modal`, `Nav rail`, `Empty state`, `Hanko`, `Tategaki`.

Every component has a variant for each state (default, hover, focus, active, disabled, error, loading, empty where applicable).

## Auto layout

Spacing only on the 4 scale. Card padding 28px. 12-column grid, gap 24px.

## Token export

`tokens.json` → Tokens Studio / Style Dictionary:

```json
{
  "color": { "primary": { "value": "#980281", "type": "color" } },
  "radius": { "card": { "value": "20", "type": "borderRadius" } }
}
```

Import the file in the extension and apply it to the styles. To regenerate the CSS: `node tools/build-tokens.mjs`.

## Handoff

1. A "Specs" page with each component + states + measurements.
2. Frames named by screen (`Home / Desktop`, `Home / Mobile`).
3. Mono annotations with the token (`--color-primary`), not the hex.
4. Export icons as SVG (stroke `currentColor`).
5. Deliver together: `ORIENTAL BRUTALISMO.md`, `tokens/`, `examples/showcase.html`.

## Checklist

- [ ] No loose hex in the frames: everything bound to a variable.
- [ ] Components with all states.
- [ ] The "primary: alt" mode works.
- [ ] Contrast checked.
