import React from 'react';
import {C, F, T} from './theme';
import {mixA} from '../shared/Themed';

/** Deterministic pseudo-random 0..1 so renders are stable. */
export const rnd = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Aged washi paper. Fibre noise, edge burn and two stains, all under content.
 * `wear` 0..1 controls how old it looks.
 */
export const Paper: React.FC<{wear?: number; children?: React.ReactNode; style?: React.CSSProperties}> = ({wear = 1, children, style}) => (
  <div style={{position: 'absolute', inset: 0, background: C.canvas, overflow: 'hidden', ...style}}>
    <svg width="100%" height="100%" style={{position: 'absolute', inset: 0}}>
      <defs>
        <filter id="fiber" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9 0.35" numOctaves="3" seed="7" />
          <feColorMatrix values="0 0 0 0 0.11  0 0 0 0 0.105  0 0 0 0 0.1  0 0 0 0.9 -0.34" />
        </filter>
        <filter id="blotch" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.0025 0.003" numOctaves="2" seed="3" />
          <feColorMatrix values="0 0 0 0 0.42  0 0 0 0 0.35  0 0 0 0 0.22  0 0 0 1.4 -0.52" />
        </filter>
        <radialGradient id="burn" cx="50%" cy="50%" r="75%">
          <stop offset="62%" stopColor={C.canvasDeep} stopOpacity="0" />
          <stop offset="100%" stopColor={C.canvasDeep} stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" filter="url(#blotch)" opacity={0.35 * wear} />
      <rect width="100%" height="100%" filter="url(#fiber)" opacity={0.5 * wear} />
      <rect width="100%" height="100%" fill="url(#burn)" opacity={wear} />
    </svg>
    {children}
  </div>
);

/**
 * Sumi ink on water: a real bloom, not rings. Low-frequency noise is
 * thresholded into a blot with wisps, a wider pale wash sits under it,
 * and a radial mask decides how far it has spread (`grow` 0..1).
 * `t` drifts the noise slowly. `seed` picks a different blot.
 */
export const Suminagashi: React.FC<{
  size: number;
  t?: number;
  grow?: number;
  seed?: number;
  tint?: string;
  rings?: number; // ignored, kept so old call sites compile
  warpAmt?: number; // ignored
  style?: React.CSSProperties;
}> = ({size, t = 0, grow = 1, seed = 1, style}) => {
  const id = `ink${seed}`;
  const k = 840 / size;
  const f = (0.0042 + 0.0004 * Math.sin(t * 0.9 + seed)) * k;
  const g = (0.006 + 0.0005 * Math.cos(t * 0.7 + seed)) * k;
  const rgb = '0 0 0 0 0.11  0 0 0 0 0.105  0 0 0 0 0.1';
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{overflow: 'visible', mixBlendMode: 'multiply', ...style}}>
      <defs>
        <radialGradient id={`${id}m`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff" />
          <stop offset={Math.max(0.05, 0.5 * grow)} stopColor="#fff" stopOpacity="0.8" />
          <stop offset={Math.max(0.1, 0.98 * grow)} stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id={`${id}mask`}>
          <rect width={size} height={size} fill={`url(#${id}m)`} />
        </mask>
        <filter id={`${id}core`} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency={`${f} ${g}`} numOctaves="5" seed={seed * 7} result="n" />
          <feColorMatrix in="n" values={`${rgb}  11 0 0 0 -4.7`} result="blot" />
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed={seed + 3} result="r" />
          <feDisplacementMap in="blot" in2="r" scale="26" />
        </filter>
        <filter id={`${id}wash`} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency={`${f * 0.9} ${g * 0.9}`} numOctaves="4" seed={seed * 7} result="n" />
          <feColorMatrix in="n" values={`${rgb}  3.2 0 0 0 -1.15`} />
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <g mask={`url(#${id}mask)`}>
        <rect width={size} height={size} filter={`url(#${id}wash)`} opacity={0.12} />
        <rect width={size} height={size} filter={`url(#${id}core)`} opacity={0.94} />
      </g>
    </svg>
  );
};

/** Number partly rubbed away: later digits fade, like an old ledger. */
export const FadedNum: React.FC<{value: string; size?: number; mono?: boolean; keep?: number; style?: React.CSSProperties}> = ({value, size = 96, mono = false, keep = 1, style}) => (
  <div style={{fontFamily: mono ? F.mono : F.display, fontWeight: mono ? 400 : 200, fontSize: size, lineHeight: 1, color: C.ink, letterSpacing: mono ? 4 : 0, fontVariantNumeric: 'tabular-nums', ...style}}>
    {value.split('').map((ch, i) => (
      <span key={i} style={{opacity: i < keep ? 1 : Math.max(0.12, 0.72 - (i - keep) * 0.26)}}>{ch}</span>
    ))}
  </div>
);

/** A real kanji, set plainly in the primary. No box, no stamp texture, no rotation. */
export const Kanji: React.FC<{char: string; size?: number; press?: number; style?: React.CSSProperties}> = ({char, size = 120, press = 1, style}) => (
  <div style={{width: size, height: size, display: 'grid', placeItems: 'center', opacity: press, filter: `blur(${(1 - press) * 8}px)`, ...style}}>
    <span style={{fontFamily: F.jp, fontWeight: 700, fontSize: size * 0.9, lineHeight: 1, color: C.primary}}>{char}</span>
  </div>
);

/** Tonal-layer card: paper lighter than the sheet, hairline, contact shadow. */
export const Card: React.FC<{children?: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div style={{background: C.card, border: `1px solid ${C.hairline}`, borderRadius: T.radius.card, boxShadow: T.shadow.contact, padding: T.space.pad, boxSizing: 'border-box', position: 'relative', overflow: 'hidden', ...style}}>{children}</div>
);

export const Toggle: React.FC<{on: number; style?: React.CSSProperties}> = ({on, style}) => (
  <div style={{width: 56, height: 32, borderRadius: 999, background: on > 0.5 ? C.ink : C.hairlineStrong, position: 'relative', ...style}}>
    <div style={{position: 'absolute', top: 4, left: 4 + on * 24, width: 24, height: 24, borderRadius: '50%', background: on > 0.5 ? C.primary : C.cardHi}} />
  </div>
);

export const Ghost: React.FC<{text: string; size?: number; style?: React.CSSProperties}> = ({text, size = 90, style}) => (
  <div style={{writingMode: 'vertical-rl', fontFamily: F.jp, fontWeight: 400, fontSize: size, letterSpacing: size * 0.3, color: C.ghost, ...style}}>{text}</div>
);

/** Faint 28px dot grid. The only "grid" the UI uses. */
export const dots = (): React.CSSProperties => ({
  backgroundImage: `radial-gradient(${mixA(C.black, 8)} 1px, transparent 1.5px)`,
  backgroundSize: '28px 28px',
});

/** Straight 1px hairline. Basic stays basic: no wobble, no ornament. */
export const Rule: React.FC<{width: number; style?: React.CSSProperties}> = ({width, style}) => (
  <div style={{width, height: 1, background: C.hairlineStrong, ...style}} />
);

/**
 * Showcase decoration, sits UNDER content: ink specks, folio labels,
 * a faint ledger frame. All low contrast; remove it for dense product screens.
 */
export const Decor: React.FC<{folio?: string; frame?: boolean; specks?: number; style?: React.CSSProperties}> = ({folio = 'NO. 001 · VOL. 03', frame = true, specks = 46, style}) => (
  <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', ...style}}>
    {frame && <div style={{position: 'absolute', inset: 28, border: `1px solid ${C.hairline}`}} />}
    {Array.from({length: specks}).map((_, i) => {
      const r = rnd(i + 1), q = rnd(i + 101), z = rnd(i + 201);
      return <div key={i} style={{position: 'absolute', left: `${r * 100}%`, top: `${q * 100}%`, width: 1 + z * 2.4, height: 1 + z * 2.4, borderRadius: '50%', background: mixA(C.black, 10 + z * 24)}} />;
    })}
    <div style={{position: 'absolute', right: 52, top: 40, fontFamily: F.mono, fontSize: 13, letterSpacing: 4, color: C.textMuted, opacity: 0.8}}>{folio}</div>
    <div style={{position: 'absolute', left: 52, bottom: 40, fontFamily: F.jp, fontWeight: 400, fontSize: 16, letterSpacing: 6, color: C.textMuted, opacity: 0.7}}>静か · quiet</div>
  </div>
);
