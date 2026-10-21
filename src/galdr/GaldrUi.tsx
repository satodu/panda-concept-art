import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {galdrEase, progress, stagger} from '../shared/motion';
import {diagWipe} from '../shared/reveal';
import {PrimaryProps} from '../shared/Themed';
import {C, F, Frame, T} from './theme';
import {Crystal} from './Crystal';
import {FacetLines, Linework, RuneField, MohsGauge, Panel, Stamp, Vertical} from './parts';

const rows: [string, string][] = [
  ['Catalog', 'GD-0417'],
  ['Locality', 'Höfn, Iceland'],
  ['Mohs hardness', '7'],
  ['Refractive index', '1.544 – 1.553'],
  ['System', 'Trigonal'],
  ['Density', '2.65 g/cm³'],
];

/** Diagonal chamfer wipe + small slide. */
const slideIn = (frame: number, from: number, dx = 0, dy = T.motion.slide * 2.4) => {
  const p = progress(frame, from, from + 26, galdrEase);
  return {
    clipPath: diagWipe(p),
    transform: `translate(${interpolate(p, [0, 1], [dx, 0])}px, ${interpolate(p, [0, 1], [dy, 0])}px)`,
  } as React.CSSProperties;
};

export const GaldrUi: React.FC<PrimaryProps> = ({primary}) => {
  const frame = useCurrentFrame();
  const mohs = interpolate(frame, [70, 140], [0, 7], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: galdrEase});
  const timeline = progress(frame, 120, 200, galdrEase);

  return (
    <Frame primary={primary}>
      <FacetLines w={1920} h={1080} opacity={0.08} />
      <RuneField w={1920} h={1080} t={frame} seed={7} />
      <Linework w={1920} h={1080} cx={960} cy={440} r={310} t={frame} />
      {/* title */}
      <div style={{position: 'absolute', left: 80, top: 44, fontFamily: F.display, fontWeight: 800, fontSize: 78, color: C.bone, letterSpacing: 2, ...slideIn(frame, 0)}}>
        SHARD PLATE<span style={{color: C.primary}}>.</span>
      </div>

      {/* left data panel */}
      <div style={{position: 'absolute', left: 80, top: 170, ...slideIn(frame, 6, -20, 0)}}>
        <Panel w={470} h={560} variant="bone">
          <div style={{fontFamily: F.mono, fontSize: 15, color: C.boneMuted, letterSpacing: 2, marginBottom: 14}}>SPEC SHEET</div>
          {rows.map(([k, v], i) => {
            const p = progress(frame, stagger(26, i, 7), stagger(26, i, 7) + 18);
            return (
              <div
                key={k}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '18px 0',
                  borderTop: '1px solid rgba(20,17,12,0.2)',
                  fontFamily: F.mono,
                  fontSize: 20,
                  color: C.boneInk,
                  opacity: p,
                  transform: `translateY(${interpolate(p, [0, 1], [8, 0])}px)`,
                }}
              >
                <span style={{color: C.boneMuted}}>{k}</span>
                <span>{v.slice(0, Math.floor(p * v.length))}</span>
              </div>
            );
          })}
        </Panel>
      </div>

      {/* center: crystal on plinth */}
      <div style={{position: 'absolute', left: 620, top: 130, ...slideIn(frame, 0, 0, 20)}}>
        <Crystal size={620} angle={frame * 0.014 + 0.2} lightAngle={0.8 + Math.sin(frame * 0.025) * 0.7} />
      </div>
      <div style={{position: 'absolute', left: 660, top: 700, width: 540, height: 100, background: `linear-gradient(${C.ink3}, ${C.ink})`, borderTop: `1px solid ${C.hairlineStrong}`}} />
      <div style={{position: 'absolute', left: 700, top: 724, fontFamily: F.mono, fontSize: 16, color: C.textMuted, letterSpacing: 2}}>
        FIG. 01 — AMETHYST, FRONT VIEW
      </div>
      <Stamp label="GD-0417" style={{position: 'absolute', left: 1000, top: 160, ...slideIn(frame, 40)}} />

      {/* right editorial panel */}
      <div style={{position: 'absolute', left: 1330, top: 170, ...slideIn(frame, 10, 20, 0)}}>
        <Panel w={510} h={560} variant="bone" filet>
          <Vertical text="ᚨᛗᛖᚦᛁᛊᛏ" size={38} style={{position: 'absolute', right: 28, top: 28}} />
          <div style={{fontFamily: F.display, fontWeight: 800, fontSize: 52, lineHeight: 1, color: C.boneInk, width: 300}}>
            AMETHYST CLUSTER.
          </div>
          <div style={{fontFamily: F.editorial, fontSize: 19, lineHeight: 1.75, color: C.boneInk, marginTop: 20, width: 370}}>
            Cluster of prismatic purple quartz crystals, collected from a basaltic geode. The color comes from irradiated iron in the structure.
          </div>
          <div style={{position: 'absolute', left: 32, bottom: 28, display: 'flex', alignItems: 'flex-end', gap: 16}}>
            <MohsGauge value={mohs} size={150} />
            <div style={{fontFamily: F.mono, fontSize: 15, color: C.boneMuted, letterSpacing: 1.5, paddingBottom: 10}}>
              MOHS<br />
              <span style={{fontSize: 34, color: C.boneInk}}>{mohs.toFixed(1)}</span>
            </div>
          </div>
        </Panel>
      </div>

      {/* provenance timeline */}
      <div style={{position: 'absolute', left: 80, right: 80, top: 800, ...slideIn(frame, 18)}}>
        <Panel w={1760} h={190} variant="ink">
          <div style={{fontFamily: F.mono, fontSize: 15, color: C.textMuted, letterSpacing: 2}}>PROVENANCE</div>
          <div style={{position: 'relative', marginTop: 44, height: 2, background: C.hairline}}>
            <div style={{position: 'absolute', left: 0, top: 0, height: 2, width: `${timeline * 100}%`, background: C.primary}} />
            {[
              ['1984', 'Collected'],
              ['1991', 'Acquired'],
              ['2008', 'Cataloged'],
              ['2024', 'Digitized'],
            ].map(([y, l], i) => {
              const x = (i / 3) * 100;
              const on = timeline >= i / 3 - 0.001;
              return (
                <div key={y} style={{position: 'absolute', left: `${x}%`, top: -7, transform: `translateX(${i === 3 ? '-100%' : '0'})`}}>
                  <div style={{width: 16, height: 16, background: on ? C.primary : C.ink3, border: `1px solid ${C.primary}`, transform: 'rotate(45deg)'}} />
                  <div style={{fontFamily: F.mono, fontSize: 18, color: C.bone, marginTop: 14}}>{y}</div>
                  <div style={{fontFamily: F.body, fontSize: 16, color: C.textMuted}}>{l}</div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </Frame>
  );
};
