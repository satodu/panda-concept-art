#!/usr/bin/env node
// Downloads the Google Fonts used by the three concepts into ./fonts (TTF),
// so PNG exports from make-asset.mjs use the real typefaces.
//   node tools/get-fonts.mjs
import {mkdirSync, writeFileSync, existsSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'fonts');
mkdirSync(out, {recursive: true});

const families = {
  'Archivo Black': '400',
  'Space Grotesk': '400;500',
  'JetBrains Mono': '400',
  'Noto Sans JP': '300;400;700',
  'Big Shoulders Display': '600;800',
  'Shippori Mincho': '400;700',
  Inter: '300;400;500',
  'Inter Tight': '200;300',
  'IBM Plex Mono': '400;500',
  'Noto Sans Runic': '400',
  'Source Serif 4': '400;600',
};

for (const [name, weights] of Object.entries(families)) {
  const url = `https://fonts.googleapis.com/css2?family=${name.replace(/ /g, '+')}${weights === '400' && name === 'Archivo Black' ? '' : `:wght@${weights}`}&display=swap`;
  const css = await (await fetch(url, {headers: {'User-Agent': 'curl/8.0'}})).text();
  const blocks = [...css.matchAll(/font-weight:\s*(\d+);[\s\S]*?url\((https:[^)]+\.ttf)\)/g)];
  if (!blocks.length) {
    console.warn(`! no TTF for ${name}`);
    continue;
  }
  for (const [, weight, src] of blocks) {
    const file = join(out, `${name.replace(/ /g, '')}-${weight}.ttf`);
    if (existsSync(file)) continue;
    writeFileSync(file, Buffer.from(await (await fetch(src)).arrayBuffer()));
    console.log(`+ ${file}`);
  }
}
