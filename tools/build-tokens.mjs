#!/usr/bin/env node
// tokens.json -> tokens.css (CSS variables) for the three concepts.
//   node tools/build-tokens.mjs
import {readFileSync, writeFileSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const kebab = (k) => k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());

for (const slug of ['oriental-brutalismo', 'galdr', 'shizuka']) {
  const t = JSON.parse(readFileSync(join(root, slug, 'tokens', 'tokens.json'), 'utf8'));
  const out = [':root {'];
  const walk = (o, p) => {
    for (const [k, v] of Object.entries(o)) {
      const name = `${p}-${kebab(k)}`;
      if (v && typeof v === 'object') walk(v, name);
      else if (typeof v === 'number') out.push(`  ${name}: ${v}px;`);
      else if (/^(#|rgba?\(|cubic-bezier)/.test(v)) out.push(`  ${name}: ${v};`);
      else if (/^[A-Z]/.test(v) && !v.includes('.')) out.push(`  ${name}: ${/ /.test(v) ? JSON.stringify(v) : v};`);
    }
  };
  for (const g of ['color', 'font', 'radius', 'geometry', 'space']) if (t[g]) walk(t[g], `--${g}`);
  if (t.shadow?.contact) out.push(`  --shadow-contact: ${t.shadow.contact};`);
  out.push('}');
  writeFileSync(join(root, slug, 'tokens', 'tokens.css'), out.join('\n') + '\n');
  console.log('+', slug);
}
