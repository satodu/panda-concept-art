# 03. UI and components

All examples assume `tokens.css` is imported.

## Layout: Bento Grid

```css
.bento {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  padding: 56px;
  background: var(--color-canvas);
  background-image: radial-gradient(rgba(222,223,215,.07) 1px, transparent 1.5px);
  background-size: 30px 30px;
}
.span-5 { grid-column: span 5; }
.span-4 { grid-column: span 4; }
.span-3 { grid-column: span 3; }
```

Rules: cards of different sizes, but aligned to the 12-column grid. Leave at least one "empty" or almost empty card per screen (the 'Ma').

## Card

```css
.card {
  background: var(--color-surface1);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-card);
  padding: 28px;
  transition: transform .24s cubic-bezier(.22,1,.36,1), border-color .24s;
}
.card:hover { transform: translateY(-2px); border-color: var(--color-hairline-strong); }
.card__label { font: 15px var(--font-mono); letter-spacing: 1.5px; color: var(--color-text-muted); }
```

Card header: mono label on the left (`STATUS`) and index on the right (`01`).

## Title

```css
.title { font: 96px/1 var(--font-display); letter-spacing: -.02em; text-transform: uppercase; }
.title::after { content: "."; color: var(--color-primary); }
```

## Buttons

```css
.btn { padding: 14px 24px; border-radius: 12px; border: 1px solid var(--color-hairline-strong); background: transparent; color: var(--color-text); font: 500 16px var(--font-body); }
.btn:hover { border-color: var(--color-text); }
.btn--primary { background: var(--color-primary); border-color: var(--color-primary); color: var(--color-on-primary); }
```

Only **one** magenta primary button per screen.

## Tag / pill

```css
.tag { font: 15px var(--font-mono); padding: 6px 14px; border-radius: 999px; border: 1px solid var(--color-hairline-strong); color: var(--color-text-muted); }
.tag--primary { border-color: var(--color-primary); color: var(--color-primary); background: var(--color-primary-soft); }
```

## Hanko seal

```html
<div class="hanko"><span>間</span><span>禅</span><span>禅</span><span>間</span></div>
```
```css
.hanko { width: 96px; height: 96px; display: grid; grid-template: 1fr 1fr / 1fr 1fr; place-items: center;
  border: 4px solid var(--color-primary); background: var(--color-primary-soft); color: var(--color-primary);
  font: 700 32px var(--font-jp); padding: 6px; box-sizing: border-box; }
```

Apply with `transform: rotate(-3deg)` and a "stamp" animation (see `08-motion-and-remotion.md`).

## Vertical column (tategaki)

```css
.tategaki { writing-mode: vertical-rl; font: 300 34px var(--font-jp); letter-spacing: .35em; }
```

## Decorative patterns

```css
.dots   { background-image: radial-gradient(rgba(222,223,215,.1) 1px, transparent 1.5px); background-size: 28px 28px; }
.cross  { font: 14px var(--font-mono); letter-spacing: 22px; opacity: .3; }   /* content: "+ + + + +" */
.ring   { border: 1px solid var(--color-hairline-strong); border-radius: 50%; }
```

## States

| State | Treatment |
|---|---|
| Hover | `translateY(-2px)` and `hairlineStrong` border |
| Active/online | 9px magenta dot and magenta mono label `ACTIVE` |
| Inactive | `hairlineStrong` dot and muted label `QUEUE` |
| Focus (keyboard) | `outline: 1px solid var(--color-primary); outline-offset: 3px` |
| Disabled | `opacity: .4`, no hover |

See the full result in `Oriental-Ui` (Remotion).
