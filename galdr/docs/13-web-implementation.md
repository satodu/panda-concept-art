# 13. Web implementation

## File structure

```
src/
  styles/
    tokens.css        ← galdr/tokens/tokens.css
    components.css    ← galdr/tokens/components.css
    app.css           ← only your application layout
  components/         ← components that use the classes from components.css
public/fonts/         ← TTF/WOFF2 (run `npm run fonts` to get them)
```

## CSS architecture

1. `tokens.css`: variables. **No** color/radius/font value outside it.
2. `components.css`: components (`.btn`, `.card`, …). Do not write loose variants: create modifiers (`.btn--primary`).
3. `app.css`: only positioning and grid for your screen.

```html
<link rel="stylesheet" href="/styles/tokens.css">
<link rel="stylesheet" href="/styles/components.css">
<link rel="stylesheet" href="/styles/app.css">
```

## Fonts

- Big Shoulders Display
- Source Serif 4
- Noto Sans Runic
- Inter
- IBM Plex Mono

Self-host as WOFF2 with `font-display: swap`. Preload only the display font. For runes use the Runic subset (`unicode-range: U+16A0-16FF`) of Noto Sans Runic.

## Stack

Plain CSS with `tokens.css` + `components.css` (the chamfer uses `clip-path`); in React use a `Panel` component that draws the outline in SVG.

## Primary color at runtime

```js
const setPrimary = (hex, on) => {
  document.documentElement.style.setProperty('--color-primary', hex);
  document.documentElement.style.setProperty('--color-on-primary', on);
};
```

Compute `on` from the contrast (see `docs/10`). Persisting the choice in `localStorage` is optional.

## React (component pattern)

```tsx
type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {variant?: 'default' | 'primary' | 'ghost'};
export const Button = ({variant = 'default', className = '', ...p}: BtnProps) => (
  <button className={`btn ${variant !== 'default' ? 'btn--' + variant : ''} ${className}`} {...p} />
);
```

## Responsive

| Breakpoint | Behavior |
|---|---|
| < 640 | single column, rail becomes a bottom nav, display title shrinks to 48–64px |
| 640–1024 | 2 columns, 32px margins |
| > 1024 | full grid |

Use `clamp()` for display titles. Touch targets ≥ 44px.

## Performance

- Images in WebP/AVIF; backgrounds as SVG or CSS.
- No `backdrop-filter` on long lists.
- Respect `prefers-reduced-motion`.
- Measure: LCP < 2.5s, CLS < 0.1.

## Visual tests

`node tools/shot.mjs galdr out/showcase.png 1400 1250` takes a screenshot of `examples/showcase.html` through Remotion's Chrome. Compare with the previous version.

## Checklist

- [ ] All colors come from variables.
- [ ] All component states exist.
- [ ] Contrast checked (`docs/10`).
- [ ] `prefers-reduced-motion` implemented.
- [ ] Rune strings are `aria-hidden` or have an `aria-label` with the Latin text.
