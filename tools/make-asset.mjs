#!/usr/bin/env node
// Usage:
//   node tools/make-asset.mjs --concept galdr --type banner --title "MY PROJECT" [--subtitle "..."] [--png]
//   node tools/make-asset.mjs --concept shizuka --type icon --primary #F59E0B   # re-theme through the primary color
//   node tools/make-asset.mjs --all            # generates every type for the 3 concepts in out/assets
import {mkdirSync, writeFileSync} from 'node:fs';
import {existsSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {templates} from './templates.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const flag = (name) => argv.includes(`--${name}`);
const opt = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : fallback;
};

const types = ['icon', 'badge', 'banner', 'wallpaper', 'og', 'social', 'avatar', 'pattern'];

async function toPng(svgText, outPng) {
  const {Resvg} = await import('@resvg/resvg-js');
  const fontDirs = (opt('fonts', '') || '').split(',').filter(Boolean);
  if (existsSync(join(root, 'fonts'))) fontDirs.push(join(root, 'fonts')); // npm run fonts
  const png = new Resvg(svgText, {
    font: {loadSystemFonts: true, fontDirs},
    fitTo: {mode: 'original'},
  }).render().asPng();
  writeFileSync(outPng, png);
}

async function make(concept, type, params, outDir) {
  const tpl = templates[concept]?.[type];
  if (!tpl) throw new Error(`template not found: ${concept}/${type}`);
  const svg = tpl(params);
  mkdirSync(outDir, {recursive: true});
  const base = join(outDir, `${concept}-${type}`);
  writeFileSync(`${base}.svg`, svg);
  console.log(`+ ${base}.svg`);
  if (flag('png')) {
    await toPng(svg, `${base}.png`);
    console.log(`+ ${base}.png`);
  }
}

const outDir = opt('out', join(root, 'out', 'assets'));

if (flag('all')) {
  for (const concept of Object.keys(templates)) for (const type of types) await make(concept, type, {}, outDir);
} else {
  const concept = opt('concept');
  const type = opt('type');
  if (!concept || !type) {
    console.error(`usage: --concept <${Object.keys(templates).join('|')}> --type <${types.join('|')}> [--title T] [--subtitle S] [--glyph G] [--primary #rrggbb] [--png] [--out dir] [--fonts dirA,dirB]\n     or --all`);
    process.exit(1);
  }
  const params = {};
  for (const k of ['title', 'subtitle', 'glyph', 'primary']) if (opt(k)) params[k] = opt(k);
  if (params.primary && !/^#[0-9a-fA-F]{6}$/.test(params.primary)) throw new Error('--primary must be #rrggbb');
  if (opt('size')) {
    const [w, h] = opt('size').split('x').map(Number);
    Object.assign(params, {w, h: h ?? w, size: w});
  }
  await make(concept, type, params, outDir);
}
