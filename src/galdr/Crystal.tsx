import React from 'react';
import {C} from './theme';

type Pt = [number, number];

/**
 * Double-terminated hexagonal crystal drawn in SVG. `angle` (radians) rotates
 * it around the vertical axis, so facets truly turn and the light sweeps.
 */
export const Crystal: React.FC<{
  size?: number;
  angle: number;
  lightAngle?: number;
  glow?: number;
}> = ({size = 520, angle, lightAngle = 0.9, glow = 1}) => {
  const R = size * 0.2; // hex radius
  const cx = size / 2;
  const topY = size * 0.06;
  const shoulderTop = size * 0.28;
  const shoulderBot = size * 0.72;
  const botY = size * 0.94;
  const sides = 6;

  const vert = (k: number): {x: number; z: number} => {
    const a = angle + (k * Math.PI * 2) / sides;
    return {x: cx + R * Math.sin(a), z: Math.cos(a)};
  };
  const v = Array.from({length: sides}, (_, k) => vert(k));
  const apexTop: Pt = [cx, topY];
  const apexBot: Pt = [cx, botY];

  const faces: {pts: Pt[]; normal: number; kind: string; k: number}[] = [];
  for (let k = 0; k < sides; k++) {
    const a = v[k];
    const b = v[(k + 1) % sides];
    const mid = angle + ((k + 0.5) * Math.PI * 2) / sides;
    faces.push({pts: [[a.x, shoulderTop], [b.x, shoulderTop], [b.x, shoulderBot], [a.x, shoulderBot]], normal: mid, kind: 'side', k});
    faces.push({pts: [apexTop, [a.x, shoulderTop], [b.x, shoulderTop]], normal: mid, kind: 'top', k});
    faces.push({pts: [apexBot, [a.x, shoulderBot], [b.x, shoulderBot]], normal: mid, kind: 'bot', k});
  }

  const rgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  // blend spectralA <-> spectralB by t (0..1), then push toward white by `lift`
  const mix = (t: number, lift = 0) => {
    const a = rgb(C.spectralA);
    const b = rgb(C.spectralB);
    const c = a.map((x, i) => x + (b[i] - x) * t);
    return `rgb(${c.map((x) => Math.round(x + (255 - x) * lift)).join(',')})`;
  };

  const shade = (n: number) => Math.max(0, Math.cos(n - lightAngle));

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{overflow: 'visible'}}>
      <defs>
        <radialGradient id="k-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.primary} stopOpacity={0.28 * glow} />
          <stop offset="100%" stopColor={C.primary} stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={size * 0.5} r={size * 0.5} fill="url(#k-halo)" />
      {faces
        .map((f) => {
          const facing = Math.cos(f.normal);
          return {...f, facing};
        })
        .sort((a, b) => a.facing - b.facing)
        .map((f, i) => {
          const s = shade(f.normal);
          const back = f.facing <= 0;
          const hue = (f.k / sides + (f.kind === 'top' ? 0.15 : f.kind === 'bot' ? 0.35 : 0)) % 1;
          const fill = mix(hue);
          const alpha = back ? 0.1 : 0.3 + 0.6 * s;
          const gid = `kg-${i}`;
          return (
            <g key={i}>
              <defs>
                <linearGradient id={gid} x1="0" y1="0" x2="0.35" y2="1">
                  <stop offset="0" stopColor={mix(hue, 0.25 + 0.45 * s)} />
                  <stop offset="1" stopColor={mix(hue * 0.4, 0)} stopOpacity={0.55} />
                </linearGradient>
              </defs>
              <polygon points={f.pts.map((p) => p.join(',')).join(' ')} fill={back ? fill : `url(#${gid})`} opacity={alpha} />
              <polygon
                points={f.pts.map((p) => p.join(',')).join(' ')}
                fill="none"
                stroke={C.bone}
                strokeOpacity={back ? 0.08 : 0.22 + 0.4 * s}
                strokeWidth={back ? 1 : 1.5}
                strokeLinejoin="round"
              />
              {!back && s > 0.78 && (
                <polygon
                  points={f.pts.map((p) => p.join(',')).join(' ')}
                  fill={C.white}
                  opacity={(s - 0.78) * 1.7}
                />
              )}
            </g>
          );
        })}
    </svg>
  );
};
