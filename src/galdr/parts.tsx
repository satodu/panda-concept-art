import React from 'react';
import {C, F, T, chamferPoints} from './theme';

/**
 * Edge details for dark panels instead of a second outline: a pair of targeting
 * brackets on the two square corners, a short tick ruler on the top edge and a tiny
 * rune tag by the chamfer. Reads as machined, not as a frame.
 */
const PanelDetails: React.FC<{w: number; h: number; chamfer: number; rune: string}> = ({w, h, chamfer, rune}) => (
  <g fill="none" strokeLinecap="square">
    <polyline points={`10,24 10,10 24,10`} stroke={C.primary} strokeWidth={1.5} opacity={0.6} />
    <polyline points={`${w - 10},${h - 24} ${w - 10},${h - 10} ${w - 24},${h - 10}`} stroke={C.primary} strokeWidth={1.5} opacity={0.6} />
    {Array.from({length: 14}).map((_, i) => (
      <line key={i} x1={44 + i * 6} x2={44 + i * 6} y1={0} y2={i % 4 === 0 ? 8 : 4} stroke={C.bone} opacity={0.22} />
    ))}
    <text x={w - chamfer - 20} y={chamfer + 14} fill={C.bone} stroke="none" fontFamily={F.rune} fontSize={14} opacity={0.35} textAnchor="middle">{rune}</text>
  </g>
);

/** Panel with chamfered top-right + bottom-left corners and an SVG hairline. */
export const Panel: React.FC<{
  w: number;
  h: number;
  variant?: 'ink' | 'bone';
  children?: React.ReactNode;
  style?: React.CSSProperties;
  filet?: boolean;
  chamfer?: number;
  rune?: string;
}> = ({w, h, variant = 'ink', children, style, filet, chamfer = T.geometry.chamfer, rune = '\u16C1'}) => {
  const bone = variant === 'bone';
  const pts = chamferPoints(w, h, chamfer);
  return (
    <div style={{position: 'relative', width: w, height: h, ...style}}>
      <svg width={w} height={h} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
        <polygon points={pts} fill={bone ? C.bone : C.ink2} />
        <polygon points={pts} fill="none" stroke={bone ? 'rgba(20,17,12,0.25)' : C.hairlineStrong} strokeWidth={1} />
        {!bone && <PanelDetails w={w} h={h} chamfer={chamfer} rune={rune} />}
        {filet && <rect x={0} y={chamfer} width={T.geometry.filet + 1} height={h - chamfer * 2} fill={C.primary} />}
      </svg>
      <div style={{position: 'absolute', inset: 0, padding: T.space.pad, boxSizing: 'border-box'}}>{children}</div>
    </div>
  );
};

export const Stamp: React.FC<{label: string; size?: number; onLight?: boolean; style?: React.CSSProperties}> = ({label, size = 30, onLight, style}) => {
  const w = size * 4.6;
  const h = size * 1.5;
  const c = size * 0.5;
  const pts = `${c},0 ${w - c},0 ${w},${h / 2} ${w - c},${h} ${c},${h} 0,${h / 2}`;
  return (
    <div style={{position: 'relative', width: w, height: h, ...style}}>
      <svg width={w} height={h} style={{position: 'absolute', inset: 0}}>
        <polygon points={pts} fill={onLight ? C.ink : C.primarySoft} stroke={C.primary} strokeWidth={1.5} />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          fontFamily: F.mono,
          fontSize: size * 0.55,
          color: C.primary,
          letterSpacing: 1,
        }}
      >
        <span>◆</span>
        {label}
      </div>
    </div>
  );
};

/** Elder Futhark, all 24 runes in the traditional order. Real characters, not decoration. */
export const FUTHARK = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛞ', 'ᛟ'];

/** A vertical column of runes (transliteration or a rune name). */
export const Vertical: React.FC<{text: string; size?: number; color?: string; style?: React.CSSProperties}> = ({
  text,
  size = 40,
  color = C.boneInk,
  style,
}) => (
  <div
    style={{
      writingMode: 'vertical-rl',
      textOrientation: 'upright',
      fontFamily: F.rune,
      fontWeight: 400,
      fontSize: size,
      color,
      letterSpacing: size * 0.22,
      ...style,
    }}
  >
    {text}
  </div>
);

/** Faint facet-line geometry for backgrounds. */
export const FacetLines: React.FC<{w: number; h: number; opacity?: number}> = ({w, h, opacity = 0.12}) => (
  <svg width={w} height={h} style={{position: 'absolute', inset: 0}} opacity={opacity}>
    <g stroke={C.bone} strokeWidth={1} fill="none">
      <polygon points={`${w * 0.05},${h * 0.7} ${w * 0.18},${h * 0.35} ${w * 0.34},${h * 0.62} ${w * 0.24},${h * 0.95}`} />
      <polyline points={`${w * 0.18},${h * 0.35} ${w * 0.24},${h * 0.95}`} />
      <polygon points={`${w * 0.72},${h * 0.1} ${w * 0.92},${h * 0.22} ${w * 0.96},${h * 0.58} ${w * 0.8},${h * 0.7} ${w * 0.66},${h * 0.4}`} />
      <polyline points={`${w * 0.92},${h * 0.22} ${w * 0.8},${h * 0.7}`} />
      <polyline points={`${w * 0.72},${h * 0.1} ${w * 0.96},${h * 0.58}`} />
    </g>
  </svg>
);

/** Mohs hardness arc gauge, 0..10. */
export const MohsGauge: React.FC<{value: number; size?: number}> = ({value, size = 150}) => {
  const r = size * 0.4;
  const cx = size / 2;
  const cy = size * 0.62;
  const arc = (t: number) => {
    const a = Math.PI + Math.PI * t;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  const [sx, sy] = arc(0);
  const [ex, ey] = arc(1);
  const [vx, vy] = arc(Math.min(1, value / 10));
  const needleA = Math.PI + Math.PI * Math.min(1, value / 10);
  return (
    <svg width={size} height={size * 0.78}>
      <path d={`M${sx},${sy} A${r},${r} 0 0 1 ${ex},${ey}`} stroke="rgba(20,17,12,0.2)" strokeWidth={size * 0.07} fill="none" />
      <path d={`M${sx},${sy} A${r},${r} 0 0 1 ${vx},${vy}`} stroke={C.primary} strokeWidth={size * 0.07} fill="none" />
      <line x1={cx} y1={cy} x2={cx + r * 0.82 * Math.cos(needleA)} y2={cy + r * 0.82 * Math.sin(needleA)} stroke={C.boneInk} strokeWidth={3} />
      <circle cx={cx} cy={cy} r={5} fill={C.boneInk} />
    </svg>
  );
};

/**
 * Fine line work for the DARK surfaces: corner brackets with tick rulers, a rune ring
 * turning very slowly, thin circuit traces ending in square nodes and edge ticks.
 * All hairlines, all low contrast. Sits under content.
 */
export const Linework: React.FC<{w: number; h: number; cx?: number; cy?: number; r?: number; t?: number; ring?: boolean; frame?: boolean; opacity?: number}> = ({
  w,
  h,
  cx = w / 2,
  cy = h * 0.45,
  r = Math.min(w, h) * 0.36,
  t = 0,
  ring = true,
  frame = true,
  opacity = 1,
}) => {
  const traces: [number, number][][] = [
    [[0, 0.22], [0.1, 0.22], [0.13, 0.26], [0.13, 0.4]],
    [[1, 0.7], [0.9, 0.7], [0.87, 0.66], [0.87, 0.52]],
    [[0.06, 1], [0.06, 0.9], [0.1, 0.86], [0.2, 0.86]],
    [[0.94, 0], [0.94, 0.1], [0.9, 0.14], [0.8, 0.14]],
  ];
  return (
    <svg width={w} height={h} style={{position: 'absolute', inset: 0, pointerEvents: 'none'}} opacity={opacity}>
      {frame && (
        <g fill="none" stroke={C.bone} strokeLinecap="square">
          <polyline points={`30,70 30,30 70,30`} opacity={0.3} />
          <polyline points={`${w - 70},30 ${w - 30},30 ${w - 30},70`} opacity={0.3} />
          <polyline points={`30,${h - 70} 30,${h - 30} 70,${h - 30}`} opacity={0.3} />
          <polyline points={`${w - 70},${h - 30} ${w - 30},${h - 30} ${w - 30},${h - 70}`} opacity={0.3} />
          {Array.from({length: 24}).map((_, i) => (
            <line key={i} x1={96 + i * 8} x2={96 + i * 8} y1={30} y2={i % 4 === 0 ? 40 : 35} opacity={0.14} />
          ))}
          {Array.from({length: 24}).map((_, i) => (
            <line key={i} y1={h - 96 - i * 8} y2={h - 96 - i * 8} x1={w - 30} x2={i % 4 === 0 ? w - 40 : w - 35} opacity={0.14} />
          ))}
        </g>
      )}
      {ring && (
        <g transform={`translate(${cx} ${cy})`} fill="none" stroke={C.bone} strokeWidth={1}>
          <circle r={r} opacity={0.16} />
          <circle r={r - 36} opacity={0.1} />
          <circle r={r + 14} opacity={0.07} strokeDasharray="2 10" />
          <g transform={`rotate(${t * 0.12})`}>
            {FUTHARK.map((g, i) => {
              const a = (i / 24) * 360;
              return (
                <text key={i} transform={`rotate(${a}) translate(0 ${-(r - 18)})`} textAnchor="middle" fill={C.bone} stroke="none" fontFamily={F.rune} fontSize={20} opacity={0.3}>
                  {g}
                </text>
              );
            })}
            {Array.from({length: 72}).map((_, i) => (
              <line key={i} x1={0} x2={0} y1={-(r + (i % 3 === 0 ? 0 : 5))} y2={-(r + 10)} transform={`rotate(${i * 5})`} opacity={0.12} />
            ))}
          </g>
        </g>
      )}
      {traces.map((pts, i) => {
        const p = pts.map(([x, y]) => `${x * w},${y * h}`).join(' ');
        const [lx, ly] = pts[pts.length - 1];
        return (
          <g key={i} stroke={C.bone} strokeWidth={1} fill="none" opacity={0.14}>
            <polyline points={p} />
            <rect x={lx * w - 3} y={ly * h - 3} width={6} height={6} fill={C.ink} />
          </g>
        );
      })}
    </svg>
  );
};

/**
 * Big, faded Elder Futhark runes scattered behind everything. Muted bone and
 * warm grey, 3-7% opacity, drifting a few px. Pure atmosphere: never carries meaning.
 */
export const RuneField: React.FC<{w: number; h: number; t?: number; count?: number; seed?: number; opacity?: number}> = ({w, h, t = 0, count = 9, seed = 3, opacity = 1}) => (
  <svg width={w} height={h} style={{position: 'absolute', inset: 0, pointerEvents: 'none'}} opacity={opacity}>
    {Array.from({length: count}).map((_, i) => {
      const r1 = rnd(seed + i * 3.1), r2 = rnd(seed + i * 5.7 + 1), r3 = rnd(seed + i * 7.3 + 2), r4 = rnd(seed + i * 2.9 + 3);
      const size = 120 + r3 * 220;
      const x = r1 * w, y = r2 * h;
      const tone = i % 4 === 0 ? C.primary : i % 2 ? C.textMuted : C.bone;
      return (
        <text
          key={i}
          x={x + Math.sin(t / 90 + i) * 6}
          y={y + Math.cos(t / 110 + i) * 6}
          transform={`rotate(${(r4 - 0.5) * 24} ${x} ${y})`}
          fontFamily={F.rune}
          fontSize={size}
          fill={tone}
          opacity={i % 4 === 0 ? 0.045 : 0.035 + r4 * 0.035}
        >
          {FUTHARK[Math.floor(rnd(seed + i * 9.1) * 24)]}
        </text>
      );
    })}
  </svg>
);

const rnd = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
