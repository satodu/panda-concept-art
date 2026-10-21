import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {galdrEase, progress} from '../shared/motion';
import {diagWipe} from '../shared/reveal';
import {PrimaryProps} from '../shared/Themed';
import {C, F, Frame} from './theme';
import {Crystal} from './Crystal';
import {FacetLines, Linework, RuneField, MohsGauge, Panel, Stamp, Vertical} from './parts';

/** 1080x1920 mobile shard detail. */
export const GaldrMobile: React.FC<PrimaryProps> = ({primary}) => {
  const frame = useCurrentFrame();
  const sheet = progress(frame, 18, 62, galdrEase);
  const sheetY = interpolate(sheet, [0, 1], [900, 0]);
  const mohs = interpolate(frame, [64, 120], [0, 7], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: galdrEase});
  const btn = progress(frame, 80, 108, galdrEase);
  const labels = ['A', 'B', 'C', 'D'];
  const pos = [
    [140, 330],
    [840, 300],
    [880, 560],
    [150, 600],
  ];

  return (
    <Frame primary={primary}>
      <FacetLines w={1080} h={1920} opacity={0.09} />
      <RuneField w={1080} h={1920} t={frame} seed={5} />
      <Linework w={1080} h={1920} cx={540} cy={460} r={330} t={frame} />
      <div style={{position: 'absolute', top: 70, left: 0, right: 0, textAlign: 'center', fontFamily: F.display, fontWeight: 800, fontSize: 40, letterSpacing: 4, color: C.bone}}>
        GALDR
      </div>

      <div style={{position: 'absolute', left: 190, top: 160, opacity: progress(frame, 0, 24)}}>
        <Crystal size={700} angle={frame * 0.016 + 0.3} lightAngle={0.8 + Math.sin(frame * 0.03) * 0.6} />
      </div>
      <div style={{position: 'absolute', left: 290, top: 760, width: 500, height: 150, background: `linear-gradient(${C.ink3}, ${C.ink})`, borderTop: `1px solid ${C.hairlineStrong}`}} />

      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {labels.map((l, i) => {
          const p = progress(frame, 24 + i * 6, 50 + i * 6, galdrEase);
          const [tx, ty] = pos[i];
          const sx = 540 + (tx < 540 ? -90 : 90) * (i % 2 ? 1 : 1.4);
          const sy = ty + 60;
          return (
            <g key={l} opacity={p}>
              <circle cx={sx} cy={sy} r={4} fill={C.primary} />
              <line x1={sx} y1={sy} x2={sx + (tx - sx) * p} y2={sy + (ty - sy) * p} stroke={C.primary} strokeWidth={1.2} />
              <circle cx={tx} cy={ty} r={20} fill={C.ink} stroke={C.primary} strokeWidth={1.2} />
              <text x={tx} y={ty + 6} textAnchor="middle" fill={C.primary} fontFamily={F.mono} fontSize={18}>
                {l}
              </text>
            </g>
          );
        })}
      </svg>

      {/* bone sheet */}
      <div style={{position: 'absolute', left: 0, top: 920, transform: `translateY(${sheetY}px)`, clipPath: diagWipe(Math.min(1, sheet * 1.3))}}>
        <Panel w={1080} h={1000} variant="bone" chamfer={40}>
          <div style={{padding: '8px 20px'}}>
            <Stamp label="GD-0417" size={32} onLight />
            <Vertical text="ᚨᛗᛖᚦᛁᛊᛏ" size={54} style={{position: 'absolute', right: 56, top: 70}} />
            <div style={{fontFamily: F.display, fontWeight: 800, fontSize: 130, lineHeight: 0.95, color: C.boneInk, marginTop: 26, width: 700}}>
              AMETHYST CLUSTER.
            </div>
            <div style={{fontFamily: F.mono, fontSize: 24, color: C.boneMuted, letterSpacing: 2, marginTop: 14}}>HÖFN · ICELAND</div>
            <div style={{fontFamily: F.editorial, fontSize: 28, lineHeight: 1.7, color: C.boneInk, marginTop: 26, width: 840}}>
              Cluster of prismatic purple quartz crystals, collected from a basaltic geode. The color comes from irradiated iron.
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 28, marginTop: 28}}>
              <MohsGauge value={mohs} size={200} />
              <div style={{fontFamily: F.mono, fontSize: 24, color: C.boneInk, lineHeight: 1.8}}>
                SYSTEM: TRIGONAL<br />
                DENSITY: 2.65 g/cm³<br />
                LUSTER: VITREOUS
              </div>
            </div>
          </div>
        </Panel>
      </div>

      {/* sticky action */}
      <div style={{position: 'absolute', left: 80, right: 80, bottom: 60, opacity: btn, transform: `translateY(${interpolate(btn, [0, 1], [30, 0])}px)`}}>
        <Panel w={920} h={110} variant="ink" chamfer={22} style={{filter: 'none'}}>
          <div style={{position: 'absolute', inset: 0, background: 'transparent'}} />
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.display, fontWeight: 800, fontSize: 44, letterSpacing: 4, color: C.primary}}>
            ADD TO COLLECTION
          </div>
        </Panel>
      </div>
    </Frame>
  );
};
