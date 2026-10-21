import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {galdrEase, progress, stagger} from '../shared/motion';
import {diagWipe} from '../shared/reveal';
import {PrimaryProps} from '../shared/Themed';
import {C, F, Frame} from './theme';
import {Crystal} from './Crystal';
import {FacetLines, Linework, RuneField, Stamp, Vertical} from './parts';

const callouts = [
  {l: 'A', x: 0.34, y: 0.3, tx: 560, ty: 280},
  {l: 'B', x: 0.62, y: 0.28, tx: 1370, ty: 250},
  {l: 'C', x: 0.66, y: 0.5, tx: 1400, ty: 470},
  {l: 'D', x: 0.4, y: 0.6, tx: 520, ty: 650},
  {l: 'E', x: 0.58, y: 0.74, tx: 1330, ty: 700},
];

/**
 * Galdr signature: PRECISE motion + LIGHT. Diagonal chamfer wipes, lines that
 * draw themselves, a scan bar of light crossing the crystal, constant slow rotation.
 */
export const GaldrIntro: React.FC<PrimaryProps> = ({primary}) => {
  const frame = useCurrentFrame();
  const size = 640;
  const ox = 960 - size / 2;
  const oy = 240;
  const enter = progress(frame, 0, 36, galdrEase);
  const scan = progress(frame, 14, 70, galdrEase);

  return (
    <Frame primary={primary} style={{background: `radial-gradient(ellipse at 50% 45%, ${C.ink3}, ${C.ink} 70%)`}}>
      <FacetLines w={1920} h={1080} />
      <RuneField w={1920} h={1080} t={frame} seed={3} />
      <Linework w={1920} h={1080} cx={960} cy={560} r={350} t={frame} />
      <div style={{position: 'absolute', left: ox, top: oy, opacity: enter, clipPath: diagWipe(enter)}}>
        <Crystal size={size} angle={frame * 0.018 + 0.4} lightAngle={0.9 + Math.sin(frame * 0.03) * 0.6} />
      </div>
      {/* scan bar of light */}
      <div
        style={{
          position: 'absolute',
          left: ox + size * 0.2 + scan * size * 0.6,
          top: oy + size * 0.05,
          width: 2,
          height: size * 0.9,
          background: C.primary,
          boxShadow: `0 0 28px 8px ${C.primaryGlow}`,
          opacity: scan > 0 && scan < 1 ? 0.9 : 0,
        }}
      />
      <div style={{position: 'absolute', left: 960 - 270, top: oy + size - 40, width: 540, height: 120, background: `linear-gradient(${C.ink3}, ${C.ink})`, borderTop: `1px solid ${C.hairlineStrong}`, opacity: enter}} />

      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {callouts.map((c, i) => {
          const p = progress(frame, stagger(60, i, 8), stagger(60, i, 8) + 26, galdrEase);
          const sx = ox + size * c.x;
          const sy = oy + size * c.y;
          const mx = sx + (c.tx - sx) * 0.5;
          return (
            <g key={c.l} opacity={p > 0 ? 1 : 0}>
              <circle cx={sx} cy={sy} r={4} fill={C.primary} />
              <polyline points={`${sx},${sy} ${mx},${sy + (c.ty - sy) * p} ${sx + (c.tx - sx) * p},${c.ty}`} fill="none" stroke={C.primary} strokeWidth={1.2} />
              <text x={c.tx + (c.tx > 960 ? 14 : -14)} y={c.ty + 7} fill={C.primary} fontFamily={F.mono} fontSize={22} textAnchor={c.tx > 960 ? 'start' : 'end'} opacity={p > 0.9 ? 1 : 0}>
                {c.l}
              </text>
            </g>
          );
        })}
      </svg>

      <div style={{position: 'absolute', left: 96, top: 70, clipPath: diagWipe(progress(frame, 4, 34, galdrEase))}}>
        <div style={{fontFamily: F.display, fontWeight: 800, fontSize: 150, lineHeight: 1, color: C.bone, letterSpacing: 2}}>
          GALDR<span style={{color: C.primary}}>.</span>
        </div>
      </div>
      <div style={{position: 'absolute', left: 100, top: 232, fontFamily: F.mono, fontSize: 20, color: C.textMuted, letterSpacing: 2, clipPath: diagWipe(progress(frame, 24, 48, galdrEase))}}>
        SHARD INDEX · REV.01
      </div>

      <Vertical text="ᚷᚨᛚᛞᚱ" size={40} color={C.bone} style={{position: 'absolute', right: 110, top: 90, opacity: progress(frame, 24, 54)}} />
      <div style={{position: 'absolute', right: 100, top: 90, width: 1, height: 420 * progress(frame, 20, 70, galdrEase), background: C.hairlineStrong}} />

      <div style={{position: 'absolute', left: 96, bottom: 90, opacity: progress(frame, 90, 112)}}>
        <div style={{display: 'flex'}}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{width: 60, height: 10, background: i % 2 ? 'transparent' : C.bone, border: `1px solid ${C.bone}`}} />
          ))}
        </div>
        <div style={{fontFamily: F.mono, fontSize: 16, color: C.textMuted, marginTop: 8}}>0 — 4 cm</div>
      </div>
      <Stamp label="GD-0417" style={{position: 'absolute', right: 110, bottom: 84, opacity: progress(frame, 100, 124), transform: `translateY(${interpolate(progress(frame, 100, 124), [0, 1], [10, 0])}px)`}} />
    </Frame>
  );
};
