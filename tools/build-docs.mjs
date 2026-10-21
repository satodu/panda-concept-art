#!/usr/bin/env node
// Generates docs 10–14 for each concept (and 15 for Oriental). Concept-specific data lives here.
//   node tools/build-docs.mjs
import {readFileSync, writeFileSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tokens = (slug) => JSON.parse(readFileSync(join(root, slug, 'tokens', 'tokens.json'), 'utf8'));

// --- WCAG contrast is computed, not typed ---
const lum = (h) => { const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return +((x + 0.05) / (y + 0.05)).toFixed(1); };
const verdict = (r, large = false) => (r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? (large ? 'AA (large text)' : 'icon/large text only') : 'forbidden for text');

const C = {
  'oriental-brutalismo': {
    name: 'Oriental Brutalismo', master: 'ORIENTAL BRUTALISMO.md', t: tokens('oriental-brutalismo'),
    bgs: [['canvas', 'color.black'], ['surface1', 'color.surface1']], dark: 'black', light: 'onPrimary',
    variants: [['vermilion (default)', '#E63946'], ['amber', '#F59E0B'], ['acid', '#D4FF00']],
    blackWhite: [['black', 'canvas, general background', 'bluish charcoal'], ['white', 'text, lines, title', 'cold bone']],
    tint: 'Black and white with a slight cold-blue cast. Any "darker" uses `rgba(9,10,15,α)`; "lighter" uses `#eeeee6`.',
    swapNote: 'The primary changes the button, the title full stop, the Hanko seal, active status, highlight bar, toggle on and active tag. Nothing else.',
    slides: [
      ['Title', 'Display XL title (up to 230px) with the full stop in the primary, mono subtitle, 150px Hanko at the bottom right, 60% empty.'],
      ['Section', 'Giant `02` in display, section name in uppercase mono, vertical kanji column on the right.'],
      ['Content', 'Title on the left (5 cols), 2 to 3 Bento cards on the right (7 cols). Max 3 bullets.'],
      ['Data', 'One display 190 number (`98.4%`), bars with ONE in the primary, mono caption.'],
      ['Quote', 'Space Grotesk 500 40px text, author in mono, quotes in the primary.'],
      ['Closing', '`THANK YOU.` display, contact in mono, Hanko seal.'],
    ],
    social: [['Announcement', 'Display 126 title on two lines, summary card, Hanko, index `#07` (`Oriental-Social`).'], ['Quick tip', 'One big number, one sentence, tags `In.` `Git.`.'], ['Before/after', 'Two Bento cards side by side, labels `BEFORE` `AFTER`, primary only on the after.'], ['Quote', '64px text, quotes in the primary, small Hanko.'], ['Launch', '`Oriental-Banner` banner + Hanko.']],
    figma: {canvas: 'surface/0', card: 'surface/1', hover: 'surface/2', text: 'ink/default', muted: 'ink/muted', primary: 'brand/primary'},
    stack: 'Tailwind with the preset (section 3 of the master) or plain CSS with `tokens.css` + `components.css`.',
    darkNote: 'The concept is already dark. There is no light theme: if needed, invert only for printed material (background `#dedfd7`, text `#090a0f`).',
  },
  galdr: {
    name: 'Galdr', master: 'GALDR.md', t: tokens('galdr'),
    bgs: [['ink', 'color.black'], ['ink2', 'color.ink2']], dark: 'black', light: 'white',
    variants: [['ice (default)', '#8FF3FF'], ['jade', '#7DF9B4'], ['amber', '#FFB86B']],
    blackWhite: [['black', 'canvas, text on bone/primary', 'near black'], ['white', 'specular highlight, title on ink', 'warm paper'], ['bone', 'reading surface (not the white)', 'bone `#E9E4D6`']],
    tint: 'The white is `#F3F0E6` (warm) and the black is `#0C0C0B` (blue). Text on bone is `#14110c` (warm black). Never `#000`/`#fff`.',
    swapNote: 'The primary changes focus, active state, the facet seal, leader lines A–F, the side rule, the light sweep and the halo. The crystal spectrum (violet→cyan) does **not** change.',
    slides: [
      ['Title', 'Name in display 150 with the full stop in the primary, mono line `CATALOG · REV.01`, crystal on the right with a halo, facet seal.'],
      ['Section', 'Number `02` in display, section title, facet line in the background, vertical rune column.'],
      ['Content', 'Bone panel with (editorial) text + figure on the plinth with caption `FIG. 02`.'],
      ['Data', 'Gauge or spectral chart on ink2, catalog table on bone.'],
      ['Quote', '44px serif pull quote on bone, side rule, attribution in mono.'],
      ['Closing', 'Crystal with a halo, `THANK YOU.`, `GD-0417` seal.'],
    ],
    social: [['Shard of the week', 'Crystal on the plinth + chamfered bone panel with name and quote (`Galdr-Social`).'], ['Spec sheet', 'Mono table on bone with 4 rows, facet seal.'], ['Detail (macro)', 'Macro photo/render with callouts A–D and scale.'], ['Seer quote', 'Serif pull quote, small chamfered portrait.'], ['Acquisition', 'Provenance timeline with 3 milestones.']],
    figma: {canvas: 'surface/ink', card: 'surface/ink-2', hover: 'surface/ink-3', text: 'paper/bone', muted: 'ink/muted', primary: 'brand/primary'},
    stack: 'Plain CSS with `tokens.css` + `components.css` (the chamfer uses `clip-path`); in React use a `Panel` component that draws the outline in SVG.',
    darkNote: 'The concept is dark with paper panels. For print, use bone as the background and `ink` as the text; the primary becomes a `black` rule.',
  },
  shizuka: {
    name: 'Shizuka', master: 'SHIZUKA.md', t: tokens('shizuka'),
    bgs: [['canvas', 'color.canvas'], ['card', 'color.card']], dark: 'black', light: 'white',
    variants: [['shu (default)', '#A8473A'], ['indigo', '#2F3F6B'], ['moss', '#6B7A3A']],
    blackWhite: [['black', 'text, ink button, on-track, suminagashi ink', 'warm sumi `#1C1B19`'], ['white', 'knob, card hover, text on the primary', 'light paper `#F3EFE3`']],
    tint: 'Warm paper-and-sumi black and white. Contact shadows use `rgba(28,27,25,α)`, never pure black. The paper is never flat white: it has fibre and burnt edges.',
    swapNote: 'The primary changes **only the kanji**, the toggle knob when on, the task check and the active rail item. Buttons and ink stay sumi.',
    slides: [
      ['Title', 'Ink bloom on the side, `SHIZUKA.` Inter Tight 200, one lowercase sentence, half-erased number `001`, kanji 静.'],
      ['Section', 'Just one big weight-200 number with the last digits fading and one word; 80% empty.'],
      ['Content', 'A 40–56px sentence on the left and one small paper card on the right. No bullets.'],
      ['Data', 'One single giant number, small unit, faded last digits.'],
      ['Quote', 'Inter Tight 200 text at 90–118px, ink bloom in the corner (`Shizuka-Social`).'],
      ['Closing', 'lowercase `thank you.` and a half-faded kanji 終.'],
    ],
    social: [['Quote of the day', '112px Inter Tight 200 quote, ink bloom in the corner, kanji (`Shizuka-Social`).'], ['Breathe', 'Huge ink bloom and one word.'], ['Focus tip', 'Small card with a half-erased timer and a gentle sentence.'], ['Journal', 'Sheet of paper with the day number and one sentence.'], ['Gentle notice', 'Pill card with a small kanji and one sentence.']],
    figma: {canvas: 'surface/canvas', card: 'surface/card', hover: 'surface/card-hi', text: 'ink/default', muted: 'ink/soft', primary: 'brand/primary'},
    stack: 'Plain CSS with `tokens.css` + `components.css` + `examples/suminagashi.js` (animated ink); use `color-mix` to derive soft/glow from the primary. In React the paper is a `div` with an `feTurbulence` SVG.',
    darkNote: 'No official dark theme: the concept is paper. If needed, use canvas `#1C1B19` with text `#E4DFD0` and the primary lightened by 15%; never turn it into a "tech dark mode".',
  },
};

const section = (md, title, body) => `${md}## ${title}\n\n${body}\n\n`;

for (const [slug, c] of Object.entries(C)) {
  const col = c.t.color;
  const bg = (k) => (k === 'color.black' ? col.black : k === 'color.surface1' ? col.surface1 : k === 'color.ink2' ? col.ink2 : k === 'color.canvas' ? col.canvas : col.card);

  // ---------- 10 ----------
  const rows = c.variants.map(([n, hex]) => {
    const onDark = c.dark === 'black' ? col.black : col[c.dark];
    const onLight = col[c.light];
    const best = ratio(hex, onDark) >= ratio(hex, onLight) ? onDark : onLight;
    const cells = c.bgs.map(([label, k]) => `${label}: ${ratio(hex, bg(k))} (${verdict(ratio(hex, bg(k)))})`).join('<br>');
    return `| ${n} | \`${hex}\` | ${cells} | \`${best}\` (${ratio(hex, best)}:1) |`;
  }).join('\n');
  let d10 = `# 10. Primary color, black and white

> **Every piece of art depends on one primary color.** It is what says "this is ${c.name}". Changing it must change the whole art without touching anything else.

## 1. The primary is the identity

| Item | Value |
|---|---|
| Default primary | \`${col.primary}\` |
| Token | \`color.primary\` (CSS: \`--color-primary\`) |
| Derived | \`primarySoft\`, \`primaryGlow\`, \`onPrimary\` |
| What it changes | ${c.swapNote} |

## 2. Approved variations (computed contrast)

| Variation | Hex | Primary contrast over the backgrounds | Text on the primary |
|---|---|---|---|
${rows}

Rule: validate any new color against the concept backgrounds. Text on the primary must be the color (the concept black or white) with the **highest contrast**; \`src/shared/Themed.tsx\` makes that choice by itself (\`onColor\`).

## 3. How to swap

**CSS** (single variable):
\`\`\`css
:root { --color-primary: ${c.variants[1][1]}; --color-on-primary: ${col[c.dark]}; }
\`\`\`
\`primarySoft\` e \`primaryGlow\` come from \`color-mix(in srgb, var(--color-primary) N%, transparent)\` in \`components.css\`.

**Remotion** (a prop on every composition):
\`\`\`bash
npx remotion render src/index.ts ${slug === 'oriental-brutalismo' ? 'Oriental-Intro' : slug === 'galdr' ? 'Galdr-Intro' : 'Shizuka-Intro'} out/v.mp4 --props='{"primary":"${c.variants[1][1]}"}'
\`\`\`

**Assets** (SVG/PNG):
\`\`\`bash
node tools/make-asset.mjs --concept ${slug} --type banner --primary "${c.variants[1][1]}" --png
\`\`\`

**showcase**: open \`examples/showcase.html\` and click the swatches.

## 4. Own black and white

Never \`#000000\` or \`#FFFFFF\`. ${c.tint}

| Token | Value | Where | Character |
|---|---|---|---|
${c.blackWhite.map(([k, where, ch]) => `| \`${k}\` | \`${col[k] ?? col.bone}\` | ${where} | ${ch} |`).join('\n')}

Quick check in the code: \`grep -rnE "#fff|#000|rgba\\\\(255,255,255|rgba\\\\(0,0,0" src ${slug}\` must come back empty (except "forbidden" examples in the documentation).

## 5. Dark / light theme

${c.darkNote}

## 6. Checklist

- [ ] There is **one** primary token and no primary hex scattered around.
- [ ] Swapping the primary did not break contrast (table in item 2).
- [ ] Text on the primary uses the highest-contrast color.
- [ ] No \`#000\`/\`#fff\` in the code or the assets.
- [ ] Shadows and overlays use the concept black with alpha.
`;
  writeFileSync(join(root, slug, 'docs', '10-primary-color-black-and-white.md'), d10);

  // ---------- 11 ----------
  const d11 = `# 11. Slides and documents

## Principles

1. One subject per slide. 55–60% of the area empty.
2. Display title with a full stop; at most 2 display sizes per slide.
3. The primary (\`${col.primary}\`) on **one** element per slide.
4. Discreet numbering in mono (\`01 / 12\`).
5. ${c.name} backgrounds: solid ${slug === 'shizuka' ? 'light canvas' : 'dark canvas'}, no stock photos.

## Layouts (16:9, 1920×1080)

| Slide | Composition |
|---|---|
${c.slides.map(([n, d]) => `| ${n} | ${d} |`).join('\n')}

## Margins and grid

Outer margin 96px; 12-column grid, 24px gap; title 160px from the top; footer 56px from the bottom with the page number in mono.

## Generation

- Static pieces: \`node tools/make-asset.mjs --concept ${slug} --type banner --size 1920x1080 --png\` (uses the banner template as a title background).
- Opening animations: the concept's Remotion compositions.
- Slide prompts: \`PROMPTS.md\` (A21, A22 and J).

## Documents

| Document | Rules |
|---|---|
| README | title with a full stop, one descriptive line, 3 items, code blocks (see \`PROMPTS.md\` I05) |
| PDF/report | poster-style cover (A19/A20), body in the concept font, numbered captions, one figure per page |
| Email | 600px, table, web-safe fallback fonts, 1 CTA (see \`PROMPTS.md\` J08) |
| Notion/Docs | only headings, rules and callouts; no extra color besides the primary |
| Resume/proposal | concept typography, narrow metadata column in mono |

## Export

PDF at 300 dpi for print, 150 for screen. Embedded fonts. Images with an sRGB profile.
`;
  writeFileSync(join(root, slug, 'docs', '11-slides-and-documents.md'), d11);

  // ---------- 12 ----------
  const d12 = `# 12. Social media and content

## Formats and sizes

| Piece | Size | Note |
|---|---|---|
| Portrait post | 1080×1350 | default |
| Square post | 1080×1080 | |
| Carousel | 1080×1350 | cover + inner slides |
| Story / reels | 1080×1920 | keep 250px margins on the edges |
| YouTube thumbnail | 1280×720 | title of ≤ 3 words |
| X header | 1500×500 | avoid the bottom-left corner |
| LinkedIn personal | 1584×396 | |
| OG / link preview | 1200×630 | |

## Post types

| Type | Composition |
|---|---|
${c.social.map(([n, d]) => `| ${n} | ${d} |`).join('\n')}

## Carousel (structure)

1. **Cover:** hook in display, full stop in the primary.
2. **Inner (2–7):** one number, one sentence, one icon. Same margins on all.
3. **Closing:** call to action + wordmark.

## Consistency

- Same title position across the series.
- Same primary per campaign (change only between campaigns).
- Series numbering in mono (\`#07\`).
- Never put text inside an AI image: compose with \`tools/make-asset.mjs --type social\` or Remotion (\`*-Social\`).

## Generate

\`\`\`bash
node tools/make-asset.mjs --concept ${slug} --type social --title "YOUR TITLE" --png
node tools/make-asset.mjs --concept ${slug} --type og --title "ARTICLE" --png
npx remotion still src/index.ts ${slug === 'oriental-brutalismo' ? 'Oriental' : slug === 'galdr' ? 'Galdr' : 'Shizuka'}-Social out/post.png --frame=100
\`\`\`

## Captions and voice

How ${c.t.name} speaks: see \`${c.master}\` section 14 and \`PROMPTS.md\` section I.

## Editorial calendar (suggestion)

| Day | Type |
|---|---|
| Mon | ${c.social[0][0]} |
| Wed | ${c.social[1][0]} |
| Fri | ${c.social[2][0]} |
`;
  writeFileSync(join(root, slug, 'docs', '12-social-and-content.md'), d12);

  // ---------- 13 ----------
  const d13 = `# 13. Web implementation

## File structure

\`\`\`
src/
  styles/
    tokens.css        ← ${slug}/tokens/tokens.css
    components.css    ← ${slug}/tokens/components.css
    app.css           ← only your application layout
  components/         ← components that use the classes from components.css
public/fonts/         ← TTF/WOFF2 (run \`npm run fonts\` to get them)
\`\`\`

## CSS architecture

1. \`tokens.css\`: variables. **No** color/radius/font value outside it.
2. \`components.css\`: components (\`.btn\`, \`.card\`, …). Do not write loose variants: create modifiers (\`.btn--primary\`).
3. \`app.css\`: only positioning and grid for your screen.

\`\`\`html
<link rel="stylesheet" href="/styles/tokens.css">
<link rel="stylesheet" href="/styles/components.css">
<link rel="stylesheet" href="/styles/app.css">
\`\`\`

## Fonts

${c.t.font ? Object.values(c.t.font).map((f) => `- ${f}`).join('\n') : ''}

Self-host as WOFF2 with \`font-display: swap\`. Preload only the display font. ${slug === 'galdr' ? 'For runes use the Runic subset (\`unicode-range: U+16A0-16FF\`) of Noto Sans Runic.' : 'For Japanese use a subset (\`unicode-range\`) or load on demand.'}

## Stack

${c.stack}

## Primary color at runtime

\`\`\`js
const setPrimary = (hex, on) => {
  document.documentElement.style.setProperty('--color-primary', hex);
  document.documentElement.style.setProperty('--color-on-primary', on);
};
\`\`\`

Compute \`on\` from the contrast (see \`docs/10\`). Persisting the choice in \`localStorage\` is optional.

## React (component pattern)

\`\`\`tsx
type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {variant?: 'default' | 'primary' | 'ghost'};
export const Button = ({variant = 'default', className = '', ...p}: BtnProps) => (
  <button className={\`btn \${variant !== 'default' ? 'btn--' + variant : ''} \${className}\`} {...p} />
);
\`\`\`

## Responsive

| Breakpoint | Behavior |
|---|---|
| < 640 | single column, rail becomes a bottom nav, display title shrinks to 48–64px |
| 640–1024 | 2 columns, 32px margins |
| > 1024 | full grid |

Use \`clamp()\` for display titles. Touch targets ≥ 44px.

## Performance

- Images in WebP/AVIF; backgrounds as SVG or CSS.
- No \`backdrop-filter\` on long lists.
- Respect \`prefers-reduced-motion\`.
- Measure: LCP < 2.5s, CLS < 0.1.

## Visual tests

\`node tools/shot.mjs ${slug} out/showcase.png 1400 1250\` takes a screenshot of \`examples/showcase.html\` through Remotion's Chrome. Compare with the previous version.

## Checklist

- [ ] All colors come from variables.
- [ ] All component states exist.
- [ ] Contrast checked (\`docs/10\`).
- [ ] \`prefers-reduced-motion\` implemented.
- [ ] ${slug === 'galdr' ? 'Rune strings are \`aria-hidden\` or have an \`aria-label\` with the Latin text.' : '\`lang="en"\` and \`lang="ja"\` on the Japanese snippets.'}
`;
  writeFileSync(join(root, slug, 'docs', '13-web-implementation.md'), d13);

  // ---------- 14 ----------
  const f = c.figma;
  const d14 = `# 14. Figma and handoff

## Variables (collections)

| Collection | Variable | Value | CSS |
|---|---|---|---|
| Color | \`${f.canvas}\` | ${col.canvas ?? col.ink ?? col.black} | \`--color-${slug === 'galdr' ? 'ink' : 'canvas'}\` |
| Color | \`${f.card}\` | ${col.surface1 ?? col.ink2 ?? col.card} | \`--color-${slug === 'oriental-brutalismo' ? 'surface1' : slug === 'galdr' ? 'ink2' : 'card'}\` |
| Color | \`${f.text}\` | ${col.text ?? col.bone ?? col.ink} | \`--color-${slug === 'oriental-brutalismo' ? 'text' : slug === 'galdr' ? 'bone' : 'ink'}\` |
| Color | \`${f.primary}\` | ${col.primary} | \`--color-primary\` |
| Color | \`black\` / \`white\` | ${col.black} / ${col.white} | \`--color-black\` / \`--color-white\` |
| Type | \`font/display\` | ${c.t.font.display} | \`--font-display\` |
| Type | \`font/mono\` | ${c.t.font.mono} | \`--font-mono\` |
| Radius | \`radius/card\` | ${c.t.radius?.card ?? c.t.geometry?.chamfer} | \`--radius-card\` / \`--geometry-chamfer\` |

**Mode:** create a "primary: alt" mode where only \`brand/primary\` changes, to demonstrate swapping the primary.

## Text styles

| Style | Use |
|---|---|
| Display / XL, L | titles |
| Body / L, M | body |
| Mono / Label | labels, data |
| ${slug === 'shizuka' ? 'Ghost / JP' : slug === 'galdr' ? 'Rune / Vertical' : 'JP / Vertical'} | ${slug === 'galdr' ? 'runes' : 'kanji'} |

## Components (names)

\`Button/default | primary | ghost\`, \`Field/default | focus | error\`, \`Card\`, \`Tag/default | primary\`, \`Toggle/off | on\`, \`Slider\`, \`Tabs\`, \`List item\`, \`Table row\`, \`Toast\`, \`Modal\`, \`Nav rail\`, \`Empty state\`${slug === 'galdr' ? ', `Panel/ink | bone`, `Stamp`, `Rune ring`, `Mohs gauge`, `Timeline`' : slug === 'shizuka' ? ', `Ink bloom`, `Kanji`' : ', `Hanko`, `Tategaki`'}.

Every component has a variant for each state (default, hover, focus, active, disabled, error, loading, empty where applicable).

## Auto layout

Spacing only on the 4 scale. Card padding ${slug === 'shizuka' ? '32' : '28'}px. 12-column grid, gap ${slug === 'shizuka' ? '20' : '24'}px.

## Token export

\`tokens.json\` → Tokens Studio / Style Dictionary:

\`\`\`json
{
  "color": { "primary": { "value": "${col.primary}", "type": "color" } },
  "radius": { "card": { "value": "${c.t.radius?.card ?? c.t.geometry?.chamfer}", "type": "borderRadius" } }
}
\`\`\`

Import the file in the extension and apply it to the styles. To regenerate the CSS: \`node tools/build-tokens.mjs\`.

## Handoff

1. A "Specs" page with each component + states + measurements.
2. Frames named by screen (\`Home / Desktop\`, \`Home / Mobile\`).
3. Mono annotations with the token (\`--color-primary\`), not the hex.
4. Export icons as SVG (stroke \`currentColor\`).
5. Deliver together: \`${c.master}\`, \`tokens/\`, \`examples/showcase.html\`.

## Checklist

- [ ] No loose hex in the frames: everything bound to a variable.
- [ ] Components with all states.
- [ ] The "primary: alt" mode works.
- [ ] Contrast checked.
`;
  writeFileSync(join(root, slug, 'docs', '14-figma-and-handoff.md'), d14);
  console.log('+', slug);
}

// ---------- 15: Oriental ----------
writeFileSync(join(root, 'oriental-brutalismo', 'docs', '15-differentiation.md'), `# 15. Differentiation: what makes Oriental Brutalismo its own

This system uses a language that other dark oriental systems also use (vermilion, hairline, kanji, seal). For it to be recognized as **yours**, keep what is only its own and avoid what belongs to others.

## Own decisions (keep)

| Decision | Value |
|---|---|
| Canvas | cold bluish charcoal \`#090a0f\` |
| Layout | **Bento Grid** with \`rounded-2xl\` cards (20px) |
| Typography | **Archivo Black** + Space Grotesk + JetBrains Mono |
| Depth | tonal layer + hairline (no shadow) |
| Seal | **間 / 禅** in a 2×2 grid |
| Color | **swappable** primary (vermilion, amber, acid) |
| Tone | system/devtools, dry voice in English with a full stop |
| Labels | \`In.\` \`Git.\` \`#01\` \`[ 0.1.0 ]\` |
| Motion | hard wipes, kanji with camera shake |

## What to avoid

| Avoid | Reason |
|---|---|
| Warm brown canvas | belongs to another system |
| Editorial serif in titles | same |
| "Kintsugi" gold | same |
| Offset hard shadow | your system uses no shadows |
| Square-corner panels (radius 0) | your system uses 20px on cards |

## How to check a screen

1. Is the background \`#090a0f\` and not brown?
2. Does it have Bento and 20px cards?
3. Title in Archivo Black with the full stop in the primary?
4. No shadow?
5. Is the seal 間/禅?
6. Is the voice dry and ends with a full stop?

Six "yes" = it is Oriental Brutalismo.

## How to evolve without getting closer to others

- Create variations through the **primary** (amber, acid) and **ornaments** (crosses, dot matrix, rings), not through serif, gold or shadow.
- Add your own glyphs (道, 鉄, 簡素) instead of reusing third-party marks.
- Document your decisions in \`ORIENTAL BRUTALISMO.md\` section 17.
`);
console.log('+ oriental 15');
