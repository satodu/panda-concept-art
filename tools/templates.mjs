// SVG templates for every concept. Pure functions: (options) -> SVG string.
// Every art depends on ONE primary colour: pass `primary` to re-theme (default = tokens.color.primary).
// Black and white are never #000/#fff: each concept defines its own tinted pair in tokens.color.
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const load = (slug) => JSON.parse(readFileSync(join(root, slug, 'tokens', 'tokens.json'), 'utf8'));

export const concepts = {
  'oriental-brutalismo': load('oriental-brutalismo'),
  galdr: load('galdr'),
  shizuka: load('shizuka'),
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const svg = (w, h, body, defs = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${defs ? `<defs>${defs}</defs>` : ''}${body}</svg>\n`;

/** hex (#rrggbb) + alpha -> rgba() */
export const hexA = (hex, a) => {
  const n = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
  return `rgba(${r},${g},${b},${a})`;
};

const crosses = (x, y, n, color, gap = 24, op = 0.3) =>
  Array.from({length: n}, (_, i) => `<text x="${x + i * gap}" y="${y}" font-family="monospace" font-size="14" fill="${color}" opacity="${op}">+</text>`).join('');
const dotPattern = (id, color, step = 24, r = 1) =>
  `<pattern id="${id}" width="${step}" height="${step}" patternUnits="userSpaceOnUse"><circle cx="${step / 2}" cy="${step / 2}" r="${r}" fill="${color}"/></pattern>`;
const chamfer = (x, y, w, h, c) => `${x},${y} ${x + w - c},${y} ${x + w},${y + c} ${x + w},${y + h} ${x + c},${y + h} ${x},${y + h - c}`;

/* ============ ORIENTAL BRUTALISMO ============ */
const o = concepts['oriental-brutalismo'];
const O = o.color;
const hanko = (x, y, s, p, glyphs = ['間', '禅']) =>
  `<g><rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${hexA(p, 0.12)}" stroke="${p}" stroke-width="${Math.max(3, s / 24)}"/>` +
  [[0, 0, glyphs[0]], [1, 0, glyphs[1]], [0, 1, glyphs[1]], [1, 1, glyphs[0]]]
    .map(([cx, cy, g]) => `<text x="${x + s * (0.27 + 0.46 * cx)}" y="${y + s * (0.42 + 0.46 * cy)}" text-anchor="middle" font-family="${o.font.jp}" font-weight="700" font-size="${s * 0.34}" fill="${p}">${g}</text>`)
    .join('') + `</g>`;
const oBg = (w, h) => `<rect width="${w}" height="${h}" fill="${O.black}"/><rect width="${w}" height="${h}" fill="url(#d)"/>`;
const oDots = (step = 26) => dotPattern('d', hexA(O.white, 0.09), step);
const oTitle = (t, x, y, size, p, dot = true) => `<text x="${x}" y="${y}" font-family="${o.font.display}" font-size="${size}" fill="${O.white}" letter-spacing="${-size * 0.026}">${esc(t.toUpperCase())}${dot ? `<tspan fill="${p}">.</tspan>` : ''}</text>`;

const oriental = {
  icon: ({glyph = '間', size = 512, primary = O.primary}) =>
    svg(size, size,
      `${oBg(size, size)}` +
      `<rect x="${size * 0.06}" y="${size * 0.06}" width="${size * 0.88}" height="${size * 0.88}" rx="${size * 0.1}" fill="${O.surface1}" stroke="${O.hairlineStrong}"/>` +
      `<circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.34}" fill="none" stroke="${O.hairlineStrong}"/>` +
      `<text x="${size / 2}" y="${size * 0.62}" text-anchor="middle" font-family="${o.font.jp}" font-weight="700" font-size="${size * 0.42}" fill="${O.white}">${esc(glyph)}</text>` +
      `<rect x="${size * 0.7}" y="${size * 0.7}" width="${size * 0.16}" height="${size * 0.16}" fill="${primary}"/>` +
      crosses(size * 0.12, size * 0.14, 4, O.white, size * 0.045),
      oDots(size / 18)),
  badge: ({title = 'BADGE', size = 512, primary = O.primary}) =>
    svg(size, size,
      `<rect width="${size}" height="${size}" fill="${O.black}"/>` +
      `<circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.42}" fill="${O.surface1}" stroke="${O.hairlineStrong}"/>` +
      `<circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.34}" fill="none" stroke="${O.hairline}"/>` +
      oTitle(title, size * 0.13, size * 0.54, size * 0.13, primary).replace(`x="${size * 0.13}"`, `x="${size / 2}" text-anchor="middle"`) +
      hanko(size * 0.64, size * 0.62, size * 0.18, primary), ''),
  banner: ({title = 'YOUR TITLE', subtitle = 'design system // dev tools', w = 1500, h = 500, primary = O.primary}) =>
    svg(w, h,
      `${oBg(w, h)}<rect x="18" y="18" width="${w - 36}" height="${h - 36}" rx="18" fill="none" stroke="${O.hairline}"/>` +
      crosses(60, 56, 8, O.white, 24, 0.25) + oTitle(title, 60, h * 0.6, h * 0.3, primary) +
      `<text x="66" y="${h * 0.74}" font-family="${o.font.mono}" font-size="22" fill="${O.textMuted}">${esc(subtitle)}</text>` +
      hanko(w - 200, h - 190, 118, primary), oDots(26)),
  wallpaper: ({w = 3840, h = 2160, primary = O.primary}) =>
    svg(w, h,
      `${oBg(w, h)}` +
      `<rect x="${w * 0.08}" y="${h * 0.14}" width="${w * 0.2}" height="${h * 0.32}" rx="28" fill="${O.surface1}" stroke="${O.hairline}"/>` +
      `<rect x="${w * 0.64}" y="${h * 0.5}" width="${w * 0.26}" height="${h * 0.3}" rx="28" fill="${O.surface1}" stroke="${O.hairline}"/>` +
      `<circle cx="${w * 0.74}" cy="${h * 0.28}" r="${h * 0.12}" fill="none" stroke="${O.hairlineStrong}"/>` +
      crosses(w * 0.08, h * 0.1, 14, O.white, 40, 0.2) +
      `<text x="${w * 0.9}" y="${h * 0.16}" font-family="${o.font.jp}" font-size="64" fill="${O.white}" opacity="0.5" writing-mode="tb">東洋</text>` +
      hanko(w * 0.12, h * 0.62, 180, primary), oDots(44)),
  og: ({title = 'YOUR TITLE', subtitle = 'design system // dev tools', primary = O.primary}) => oriental.banner({title, subtitle, w: 1200, h: 630, primary}),
  social: ({title = 'NEW RELEASE', subtitle = '[ SYSTEM.DOC ]  #07', w = 1080, h = 1350, primary = O.primary}) => {
    const words = title.split(' ');
    return svg(w, h,
      `${oBg(w, h)}<text x="70" y="96" font-family="${o.font.mono}" font-size="22" fill="${O.textMuted}" letter-spacing="2">${esc(subtitle)}</text>` +
      words.map((t, i) => oTitle(t, 70, 330 + i * 130, 126, primary, i === words.length - 1)).join('') +
      `<rect x="70" y="${h - 400}" width="${w - 140}" height="290" rx="20" fill="${O.surface1}" stroke="${O.hairline}"/>` +
      hanko(w - 260, h - 540, 150, primary), oDots(28));
  },
  avatar: ({glyph = '間', size = 512, primary = O.primary}) => oriental.icon({glyph, size, primary}),
  pattern: ({w = 1200, h = 1200, primary = O.primary}) =>
    svg(w, h,
      `<rect width="${w}" height="${h}" fill="${O.black}"/><rect width="${w}" height="${h}" fill="url(#d)"/><rect width="${w}" height="${h}" fill="url(#x)"/>` +
      Array.from({length: 6}, (_, i) => `<circle cx="${w * (0.12 + i * 0.16)}" cy="${h * (0.2 + (i % 3) * 0.3)}" r="${30 + (i % 2) * 20}" fill="none" stroke="${i === 3 ? primary : O.hairlineStrong}"/>`).join(''),
      oDots(32) + `<pattern id="x" width="96" height="96" patternUnits="userSpaceOnUse"><text x="40" y="52" font-family="monospace" font-size="16" fill="${hexA(O.white, 0.18)}">+</text></pattern>`),
};

/* ============ GALDR (primitive Nordic cyberpunk, minimal, crystals) ============ */
const k = concepts.galdr;
const K = k.color;
const crystalSvg = (cx, cy, s) => {
  const r = s * 0.2;
  const top = cy - s * 0.44, shT = cy - s * 0.22, shB = cy + s * 0.22, bot = cy + s * 0.44;
  const xs = [-r, -r * 0.45, r * 0.45, r];
  const faces = [0, 1, 2].map((i) => [[xs[i], shT], [xs[i + 1], shT], [xs[i + 1], shB], [xs[i], shB]]);
  const fill = [0.45, 0.8, 0.6];
  const tri = (a, b, apex, o2 = 0.32) => `<polygon points="${cx + a[0]},${a[1]} ${cx + b[0]},${b[1]} ${cx},${apex}" fill="${K.spectralB}" opacity="${o2}" stroke="${K.bone}" stroke-opacity="0.5"/>`;
  return (
    faces.map((f, i) => `<polygon points="${f.map(([x, y]) => `${cx + x},${y}`).join(' ')}" fill="${K.spectralA}" opacity="${fill[i]}" stroke="${K.bone}" stroke-opacity="0.5"/>`).join('') +
    tri(faces[0][0], faces[1][1], top) + tri(faces[1][0], faces[2][0], top) + tri(faces[2][0], faces[2][1], top) +
    tri(faces[0][3], faces[1][2], bot) + tri(faces[1][3], faces[2][3], bot) + tri(faces[2][3], faces[2][2], bot)
  );
};
const kStamp = (x, y, label, p, light = false) =>
  `<polygon points="${x + 12},${y} ${x + 124},${y} ${x + 136},${y + 22} ${x + 124},${y + 44} ${x + 12},${y + 44} ${x},${y + 22}" fill="${light ? K.black : hexA(p, 0.25)}" stroke="${p}"/>` +
  `<text x="${x + 68}" y="${y + 29}" text-anchor="middle" font-family="${k.font.mono}" font-size="17" fill="${p}">◆ ${esc(label)}</text>`;
const kHalo = (p, o2 = 0.26) => `<radialGradient id="h"><stop offset="0" stop-color="${p}" stop-opacity="${o2}"/><stop offset="1" stop-color="${p}" stop-opacity="0"/></radialGradient>`;
const FUTHARK = [...'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ'];
/** fine line work for dark surfaces: double chamfered frame, rune ring, circuit traces. Mirrors Linework in src/galdr/parts.tsx. */
/** big faded runes behind everything: 3-7% opacity, bone / warm grey / a few in the primary */
const runeField = (w, h, n = 9) => {
  const r = (x) => { const v = Math.sin(x * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };
  return Array.from({length: n}, (_, i) => {
    const x = r(3 + i * 3.1) * w, y = r(3 + i * 5.7 + 1) * h, sz = (120 + r(3 + i * 7.3 + 2) * 220) * Math.min(1, w / 1500), q = r(3 + i * 2.9 + 3);
    const tone = i % 4 === 0 ? K.primary : i % 2 ? K.textMuted : K.bone;
    return `<text x="${x.toFixed(0)}" y="${y.toFixed(0)}" transform="rotate(${((q - 0.5) * 24).toFixed(1)} ${x.toFixed(0)} ${y.toFixed(0)})" font-family="${k.font.rune}" font-size="${sz.toFixed(0)}" fill="${tone}" opacity="${(i % 4 === 0 ? 0.045 : 0.035 + q * 0.035).toFixed(3)}">${FUTHARK[Math.floor(r(3 + i * 9.1) * 24)]}</text>`;
  }).join('');
};
const gLines = (w, h, cx = w / 2, cy = h * 0.45, r = Math.min(w, h) * 0.36, {ring = true, frame = true} = {}) => {
  const c = 22, bone = K.bone;
  const box = (i, cc) => chamfer(i, i, w - i * 2, h - i * 2, cc);
  const traces = [[[0, 0.22], [0.1, 0.22], [0.13, 0.26], [0.13, 0.4]], [[1, 0.7], [0.9, 0.7], [0.87, 0.66], [0.87, 0.52]], [[0.06, 1], [0.06, 0.9], [0.1, 0.86], [0.2, 0.86]], [[0.94, 0], [0.94, 0.1], [0.9, 0.14], [0.8, 0.14]]];
  return (
    (frame
      ? `<g fill="none" stroke="${bone}" stroke-linecap="square" opacity="0.3"><polyline points="30,70 30,30 70,30"/><polyline points="${w - 70},30 ${w - 30},30 ${w - 30},70"/><polyline points="30,${h - 70} 30,${h - 30} 70,${h - 30}"/><polyline points="${w - 70},${h - 30} ${w - 30},${h - 30} ${w - 30},${h - 70}"/></g>` +
        `<g stroke="${bone}" opacity="0.14">${Array.from({length: 24}, (_, i) => `<line x1="${96 + i * 8}" x2="${96 + i * 8}" y1="30" y2="${i % 4 === 0 ? 40 : 35}"/>`).join('')}</g>`
      : '') +
    runeField(w, h) +
    (ring
      ? `<g transform="translate(${cx} ${cy})" fill="none" stroke="${bone}"><circle r="${r}" opacity="0.16"/><circle r="${r - 36}" opacity="0.1"/><circle r="${r + 14}" opacity="0.07" stroke-dasharray="2 10"/>` +
        FUTHARK.map((g, i) => `<text transform="rotate(${(i / 24) * 360}) translate(0 ${-(r - 18)})" text-anchor="middle" fill="${bone}" stroke="none" font-family="${k.font.rune}" font-size="20" opacity="0.3">${g}</text>`).join('') +
        Array.from({length: 72}, (_, i) => `<line x1="0" x2="0" y1="${-(r + (i % 3 === 0 ? 0 : 5))}" y2="${-(r + 10)}" transform="rotate(${i * 5})" opacity="0.12"/>`).join('') + '</g>'
      : '') +
    traces.map((pts) => `<g stroke="${bone}" fill="none" opacity="0.14"><polyline points="${pts.map(([x, y]) => `${x * w},${y * h}`).join(' ')}"/><rect x="${pts[3][0] * w - 3}" y="${pts[3][1] * h - 3}" width="6" height="6" fill="${K.black}"/></g>`).join('')
  );
};
const kTitle = (t, x, y, size, p) => `<text x="${x}" y="${y}" font-family="${k.font.display}" font-weight="800" font-size="${size}" fill="${K.bone}" letter-spacing="2">${esc(t.toUpperCase())}<tspan fill="${p}">.</tspan></text>`;

const galdr = {
  icon: ({size = 512, primary = K.primary}) =>
    svg(size, size,
      `<polygon points="${chamfer(0, 0, size, size, size * 0.14)}" fill="${K.black}"/>` +
      `<polygon points="${chamfer(size * 0.03, size * 0.03, size * 0.94, size * 0.94, size * 0.12)}" fill="none" stroke="${K.hairlineStrong}"/>` +
      `<circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.44}" fill="none" stroke="${K.bone}" stroke-opacity="0.16"/>` + `<circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.38}" fill="url(#h)"/>` + crystalSvg(size / 2, size / 2, size * 0.9), kHalo(primary, 0.3)),
  badge: ({title = 'GD-0417', size = 512, primary = K.primary}) =>
    svg(size, size,
      `<rect width="${size}" height="${size}" fill="${K.black}"/>` +
      `<polygon points="${chamfer(size * 0.1, size * 0.1, size * 0.8, size * 0.8, size * 0.1)}" fill="${K.bone}"/>` +
      `<text x="${size / 2}" y="${size * 0.42}" text-anchor="middle" font-family="${k.font.display}" font-weight="800" font-size="${size * 0.2}" fill="${K.boneInk}">${esc(title.toUpperCase())}<tspan fill="${primary}">.</tspan></text>` +
      `<line x1="${size * 0.2}" x2="${size * 0.8}" y1="${size * 0.5}" y2="${size * 0.5}" stroke="${K.boneInk}" stroke-opacity="0.3"/>` +
      kStamp(size * 0.5 - 68, size * 0.58, 'GALDR', primary, true), ''),
  banner: ({title = 'SHARD', subtitle = 'shard catalog · rev.01', w = 1500, h = 500, primary = K.primary}) =>
    svg(w, h,
      `<rect width="${w}" height="${h}" fill="${K.black}"/>` + gLines(w, h, w * 0.78, h * 0.5, h * 0.42) + `<circle cx="${w * 0.78}" cy="${h * 0.5}" r="${h * 0.6}" fill="url(#h)"/>` + crystalSvg(w * 0.78, h * 0.5, h) +
      kTitle(title, 60, h * 0.58, h * 0.34, primary) +
      `<text x="64" y="${h * 0.72}" font-family="${k.font.mono}" font-size="20" fill="${K.textMuted}" letter-spacing="2">${esc(subtitle.toUpperCase())}</text>` +
      kStamp(60, h - 90, 'GD-0417', primary) + `<line x1="40" x2="${w - 40}" y1="${h - 24}" y2="${h - 24}" stroke="${K.hairline}"/>`, kHalo(primary, 0.22)),
  wallpaper: ({w = 3840, h = 2160, primary = K.primary}) =>
    svg(w, h,
      `<rect width="${w}" height="${h}" fill="url(#bg)"/>` +
      `<g stroke="${K.bone}" stroke-opacity="0.1" fill="none"><polygon points="${w * 0.05},${h * 0.7} ${w * 0.18},${h * 0.35} ${w * 0.34},${h * 0.62} ${w * 0.24},${h * 0.95}"/><polygon points="${w * 0.72},${h * 0.1} ${w * 0.92},${h * 0.22} ${w * 0.96},${h * 0.58} ${w * 0.8},${h * 0.7} ${w * 0.66},${h * 0.4}"/></g>` +
      gLines(w, h, w / 2, h * 0.48, h * 0.4) + `<circle cx="${w / 2}" cy="${h * 0.48}" r="${h * 0.34}" fill="url(#h)"/>` + crystalSvg(w / 2, h * 0.48, h * 0.7) +
      `<rect x="${w / 2 - h * 0.2}" y="${h * 0.84}" width="${h * 0.4}" height="${h * 0.07}" fill="${K.ink3}" stroke="${K.hairlineStrong}"/>` +
      `<text x="${w * 0.06}" y="${h * 0.1}" font-family="${k.font.mono}" font-size="28" fill="${K.textMuted}" letter-spacing="4">GALDR · REV.01</text>`,
      `<radialGradient id="bg" cx="50%" cy="45%" r="70%"><stop offset="0" stop-color="${K.ink3}"/><stop offset="1" stop-color="${K.black}"/></radialGradient>` + kHalo(primary, 0.24)),
  og: ({title = 'SHARD', subtitle = 'shard catalog · rev.01', primary = K.primary}) => galdr.banner({title, subtitle, w: 1200, h: 630, primary}),
  social: ({title = 'AMETHYST CLUSTER', subtitle = 'the color comes from irradiated iron', w = 1080, h = 1350, primary = K.primary}) =>
    svg(w, h,
      `<rect width="${w}" height="${h}" fill="${K.black}"/>` + gLines(w, h, w / 2, h * 0.34, w * 0.36) + `<circle cx="${w / 2}" cy="${h * 0.34}" r="${w * 0.4}" fill="url(#h)"/>` + crystalSvg(w / 2, h * 0.34, w * 0.8) +
      `<polygon points="${chamfer(60, h - 500, w - 120, 440, 36)}" fill="${K.bone}"/>` +
      `<text x="100" y="${h - 330}" font-family="${k.font.display}" font-weight="800" font-size="104" fill="${K.boneInk}">${esc(title.toUpperCase())}<tspan fill="${primary}">.</tspan></text>` +
      `<text x="100" y="${h - 250}" font-family="${k.font.editorial}" font-size="32" fill="${K.boneInk}">${esc(subtitle)}</text>` + kStamp(100, h - 200, 'GD-0417', primary, true), kHalo(primary, 0.24)),
  avatar: ({size = 512, primary = K.primary}) => galdr.icon({size, primary}),
  pattern: ({w = 1200, h = 1200, primary = K.primary}) =>
    svg(w, h,
      `<rect width="${w}" height="${h}" fill="${K.black}"/><rect width="${w}" height="${h}" fill="url(#f)"/>`,
      `<pattern id="f" width="200" height="200" patternUnits="userSpaceOnUse"><g fill="none" stroke="${K.bone}" stroke-opacity="0.12"><polygon points="100,10 170,60 170,140 100,190 30,140 30,60"/><line x1="100" y1="10" x2="100" y2="190"/><line x1="30" y1="60" x2="170" y2="140"/></g><circle cx="100" cy="100" r="3" fill="${primary}"/></pattern>`),
};

/* ============ SHIZUKA (suminagashi + papel velho) ============ */
const z = concepts.shizuka;
const Z = z.color;
const R = z.radius.card;
/** Real ink bloom: thresholded noise + pale wash + radial mask. Same filters as src/shizuka/parts.tsx. */
const sumi = (cx, cy, size, {seed = 1, id = 'ink'} = {}) => {
  const k = 840 / size, f = 0.0042 * k, g = 0.006 * k, rgb = '0 0 0 0 0.11 0 0 0 0 0.105 0 0 0 0 0.1', x = cx - size / 2, y = cy - size / 2;
  return `<defs><radialGradient id="${id}m" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.8"/><stop offset="0.98" stop-color="#fff" stop-opacity="0"/></radialGradient>` +
    `<mask id="${id}k" maskUnits="userSpaceOnUse" x="${x}" y="${y}" width="${size}" height="${size}"><rect x="${x}" y="${y}" width="${size}" height="${size}" fill="url(#${id}m)"/></mask>` +
    `<filter id="${id}c" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="${f} ${g}" numOctaves="5" seed="${seed * 7}" result="n"/><feColorMatrix in="n" values="${rgb} 11 0 0 0 -4.7" result="b"/><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="${seed + 3}" result="r"/><feDisplacementMap in="b" in2="r" scale="26"/></filter>` +
    `<filter id="${id}w" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="${f * 0.9} ${g * 0.9}" numOctaves="4" seed="${seed * 7}" result="n"/><feColorMatrix in="n" values="${rgb} 3.2 0 0 0 -1.15"/><feGaussianBlur stdDeviation="6"/></filter></defs>` +
    `<g mask="url(#${id}k)" style="mix-blend-mode:multiply"><rect x="${x}" y="${y}" width="${size}" height="${size}" filter="url(#${id}w)" opacity="0.12"/><rect x="${x}" y="${y}" width="${size}" height="${size}" filter="url(#${id}c)" opacity="0.94"/></g>`;
};
const zDefs = () =>
  `<filter id="fiber" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9 0.35" numOctaves="3" seed="7"/><feColorMatrix values="0 0 0 0 0.11 0 0 0 0 0.105 0 0 0 0 0.1 0 0 0 0.9 -0.34"/></filter>` +
  `<radialGradient id="burn" cx="50%" cy="50%" r="75%"><stop offset="62%" stop-color="${Z.canvasDeep}" stop-opacity="0"/><stop offset="100%" stop-color="${Z.canvasDeep}" stop-opacity="0.9"/></radialGradient>`;
const zPaper = (w, h) =>
  `<rect width="${w}" height="${h}" fill="${Z.canvas}"/><rect width="${w}" height="${h}" filter="url(#fiber)" opacity="0.5"/><rect width="${w}" height="${h}" fill="url(#burn)"/>`;
/** real kanji, plain, in the primary. */
const zSeal = (x, y, size, char, primary) =>
  `<text x="${x}" y="${y + size * 0.34}" text-anchor="middle" font-family="${z.font.jp}" font-weight="700" font-size="${size * 0.9}" fill="${primary}" opacity="0.92">${esc(char)}</text>`;
const zLine = (x, y, w) => `<line x1="${x}" y1="${y}" x2="${x + w}" y2="${y}" stroke="${Z.hairlineStrong}" stroke-width="1"/>`;
/** showcase decoration: ink specks, folio. Same idea as Decor in parts.tsx. */
const zDecor = (w, h, folio = 'NO. 001') => {
  const r = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const specks = Array.from({length: 40}, (_, i) => `<circle cx="${(r(i + 1) * w).toFixed(0)}" cy="${(r(i + 101) * h).toFixed(0)}" r="${(0.5 + r(i + 201) * 1.3).toFixed(1)}" fill="${hexA(Z.black, 0.1 + r(i + 201) * 0.22)}"/>`).join('');
  return specks +
    `<text x="${w - 40}" y="40" text-anchor="end" font-family="${z.font.mono}" font-size="13" letter-spacing="4" fill="${Z.textMuted}">${folio}</text>`;
};
const zDots = (w, h, step = 28) => `<rect width="${w}" height="${h}" fill="url(#d)"/>`;
const zDotDef = (step = 28) => `<pattern id="d" width="${step}" height="${step}" patternUnits="userSpaceOnUse"><circle cx="${step / 2}" cy="${step / 2}" r="1.2" fill="${hexA(Z.black, 0.08)}"/></pattern>`;

const shizuka = {
  icon: ({size = 512, primary = Z.primary}) =>
    svg(size, size,
      `<rect width="${size}" height="${size}" rx="${size * 0.26}" fill="${Z.canvas}"/><rect width="${size}" height="${size}" rx="${size * 0.26}" filter="url(#fiber)" opacity="0.5"/>` +
      `<clipPath id="c"><rect width="${size}" height="${size}" rx="${size * 0.26}"/></clipPath><g clip-path="url(#c)">${sumi(size * 0.46, size * 0.46, size * 0.9, {seed: 2})}</g>` +
      zSeal(size * 0.78, size * 0.8, size * 0.2, '静', primary),
      zDefs()),
  badge: ({title = 'quiet', size = 512, primary = Z.primary}) =>
    svg(size, size,
      zPaper(size, size) + `<rect x="${size * 0.1}" y="${size * 0.1}" width="${size * 0.8}" height="${size * 0.8}" rx="${size * 0.2}" fill="${Z.card}" stroke="${Z.hairline}"/>` +
      sumi(size / 2, size * 0.42, size * 0.5, {seed: 4}) + zSeal(size * 0.68, size * 0.62, size * 0.16, '間', primary) +
      `<text x="${size / 2}" y="${size * 0.8}" text-anchor="middle" font-family="${z.font.display}" font-weight="200" font-size="${size * 0.085}" letter-spacing="${size * 0.012}" fill="${Z.ink}">${esc(title.toUpperCase())}.</text>`, zDefs()),
  banner: ({title = 'SHIZUKA', subtitle = 'nothing is perfect. rest anyway.', w = 1500, h = 500, primary = Z.primary}) =>
    svg(w, h,
      zPaper(w, h) + zDots(w, h) + zDecor(w, h) + sumi(w * 0.78, h * 0.5, h * 1.5, {seed: 2}) +
      `<text x="80" y="${h * 0.56}" font-family="${z.font.display}" font-weight="200" font-size="${h * 0.26}" letter-spacing="6" fill="${Z.ink}">${esc(title.toUpperCase())}.</text>` +
      `<text x="86" y="${h * 0.74}" font-family="${z.font.body}" font-weight="300" font-size="26" fill="${Z.inkSoft}">${esc(subtitle)}</text>` +
      zLine(86, h * 0.62, 360) + zSeal(100, h - 80, 64, '静', primary), zDefs() + zDotDef()),
  wallpaper: ({w = 3840, h = 2160, primary = Z.primary}) =>
    svg(w, h, zPaper(w, h) + zDots(w, h, 48) + sumi(w * 0.5, h * 0.48, h * 1.1, {seed: 6}) + zSeal(w * 0.9, h * 0.88, 150, '静', primary), zDefs() + zDotDef(48)),
  og: ({title = 'SHIZUKA', subtitle = 'nothing is perfect. rest anyway.', primary = Z.primary}) => shizuka.banner({title, subtitle, w: 1200, h: 630, primary}),
  social: ({title = 'descanse primeiro.', subtitle = 'o resto espera.', w = 1080, h = 1350, primary = Z.primary}) =>
    svg(w, h,
      zPaper(w, h) + zDots(w, h) + zDecor(w, h, 'NO. 007') + sumi(w * 0.82, h * 0.86, 900, {seed: 4}) + zLine(86, 230, 300) +
      `<text x="80" y="420" font-family="${z.font.display}" font-weight="200" font-size="112" letter-spacing="-2" fill="${Z.ink}">${esc(title)}</text>` +
      `<text x="80" y="545" font-family="${z.font.display}" font-weight="200" font-size="112" letter-spacing="-2" fill="${Z.inkSoft}">${esc(subtitle)}</text>` +
      zSeal(140, h - 170, 110, '静', primary), zDefs() + zDotDef()),
  avatar: ({size = 512, primary = Z.primary}) => shizuka.icon({size, primary}),
  pattern: ({w = 1200, h = 1200, primary = Z.primary}) =>
    svg(w, h, zPaper(w, h) + zDots(w, h, 36) + sumi(w * 0.36, h * 0.4, 760, {seed: 3}) + sumi(w * 0.8, h * 0.8, 420, {seed: 8, id: 'ink2'}) + zSeal(w * 0.8, h * 0.2, 90, '間', primary), zDefs() + zDotDef(36)),
};

export const templates = {'oriental-brutalismo': oriental, galdr, shizuka};
