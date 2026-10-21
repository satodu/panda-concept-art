# 03. UI and components

## Chamfer: the base component

Two corners cut at 45° (top-right and bottom-left).

```css
.panel {
  --c: 14px;
  clip-path: polygon(0 0, calc(100% - var(--c)) 0, 100% var(--c), 100% 100%, var(--c) 100%, 0 calc(100% - var(--c)));
  background: var(--color-ink2);
  position: relative;
}
```

`clip-path` also clips the border. To keep the hairline use the two-layer trick:

```css
.panel { background: var(--color-hairline-strong); padding: 1px; }
.panel > .inner {
  background: var(--color-ink2);
  clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
}
```

In React/Remotion use the `Panel` component (`src/galdr/parts.tsx`), which draws the outline in SVG.

## Bone panel (editorial)

```css
.panel--bone .inner { background: var(--color-bone); color: var(--color-bone-ink); }
.panel--bone .meta  { font: 15px var(--font-mono); letter-spacing: 2px; color: var(--color-bone-muted); }
```

## Title

```css
.title { font: 800 96px/1 var(--font-display); letter-spacing: 2px; text-transform: uppercase; }
.title::after { content: "."; color: var(--color-primary); }
```

## Catalog table

```html
<dl class="spec">
  <div><dt>Catalog</dt><dd>GD-0417</dd></div>
  <div><dt>Mohs hardness</dt><dd>7</dd></div>
</dl>
```
```css
.spec div { display: flex; justify-content: space-between; padding: 18px 0; border-top: 1px solid rgba(20,17,12,.2); font: 20px var(--font-mono); }
.spec dt { color: var(--color-bone-muted); }
```

## Facet seal (rhombus)

```css
.stamp { clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%); background: var(--color-primary-soft); color: var(--color-primary); font: 17px var(--font-mono); padding: 10px 26px; }
.stamp::before { content: "◆ "; }
```

## Button

```css
.btn { clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
  background: var(--color-ink2); color: var(--color-primary); font: 800 28px var(--font-display); letter-spacing: 4px; padding: 20px 40px; border: 0; }
.btn:hover { background: var(--color-primary); color: var(--color-ink); }
```

## Callouts A–F (leader lines)

1.2px ice lines connect a point on the crystal to a letter in mono. Origin point: 4px circle. Bend: a single angle. See `Galdr-Intro`.

## Mohs gauge

180° arc, `rgba(20,17,12,.2)` track on bone, ice fill, dark needle. `MohsGauge` component.

## Provenance timeline

2px track, 16px rhombuses (ice when reached), years in mono and label in sans.

## Plinth

Dark block `ink3 → ink` with `border-top: 1px solid hairlineStrong`, beneath every hero object. Mono caption underneath (`FIG. 01 — ...`).

## Reference screens

`reference/galdr-ui-home.png`, `galdr-ui-collection.png`, `galdr-ui-shard.png`, `galdr-mobile-shard-b.png`.

| Screen | Structure |
|---|---|
| Home | left rail, hero on the plinth, bone editorial column, collection grid, spectral chart |
| Collection | filters on the left, 4×3 grid of plinths, bone editorial drawer on the right |
| Shard | table on the left, crystal with callouts, article on the right, provenance below |
| Mobile | hero on top (45%), chamfered bone sheet over the dark, fixed action at the bottom |


## More components (CSS in `tokens/components.css`, demo `Galdr-Kit`)

| Component | Class | Notes |
|---|---|---|
| Tabs | `.tabs` `.tab[aria-selected]` | rune-led labels, 2px primary underline |
| Slider | `.slider` | tick every 10%, rhombus knob |
| Stepper | `.stepper` `.step` | chamfered rune tiles joined by lines |
| Search | `.search` | rune ᚲ icon, 2px primary left rule |
| Segmented | `.segmented` | chamfered segments |
| Checkbox / radio | `.chk` `.rad` | rhombus / ring |
| Table | `.table` | on bone, selected row with primary rule |
| Tooltip / notice | `.tooltip` `.notice[data-rune]` | no extra colors |
| Tiers | `.tier` | rhombus stacks I–V |
| Accordion / pages | `.accordion` `.pages` | `<details>` based |

## Panel edge details (instead of a double outline)

Dark panels get two primary targeting brackets on the square corners and a short tick ruler on the top edge (`.panel:not(.panel--bone) > .in::before/::after`). Bone panels stay clean.
