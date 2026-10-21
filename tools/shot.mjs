#!/usr/bin/env node
// Screenshot <concept>/examples/showcase.html through Remotion's Chrome (needs network for Google Fonts).
//   node tools/shot.mjs oriental-brutalismo out/show.png [width height]
import {cpSync, mkdirSync, rmSync} from 'node:fs';
import {join, dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const [slug, out, w = '1400', h = '1100'] = process.argv.slice(2);
const dest = join(root, 'public', '_shots', slug);
rmSync(dest, {recursive: true, force: true});
mkdirSync(dest, {recursive: true});
cpSync(join(root, slug, 'examples'), join(dest, 'examples'), {recursive: true});
cpSync(join(root, slug, 'tokens'), join(dest, 'tokens'), {recursive: true});
execFileSync('npx', ['remotion', 'still', 'src/index.ts', 'Dev-Showcase', resolve(out), '--frame=0', `--props=${JSON.stringify({src: `_shots/${slug}/examples/showcase.html`})}`, `--width=${w}`, `--height=${h}`], {cwd: root, stdio: 'ignore', timeout: 120000});
rmSync(join(root, 'public', '_shots'), {recursive: true, force: true});
console.log('+', resolve(out));
