import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {dotGrid} from '../shared/Cross';
import {progress} from '../shared/motion';
import {quant, wipeX} from '../shared/reveal';
import {PrimaryProps} from '../shared/Themed';
import {C, F, Frame, T} from './theme';
import {Card, Tag} from './parts';

const Btn: React.FC<{label: string; primary?: boolean; hover?: number; press?: number}> = ({label, primary, hover = 0, press = 0}) => (
  <div
    style={{
      padding: '16px 30px',
      borderRadius: 12,
      border: `1px solid ${primary ? C.primary : hover ? C.white : C.hairlineStrong}`,
      background: primary ? C.primary : 'transparent',
      color: primary ? C.onPrimary : C.white,
      fontFamily: F.body,
      fontWeight: 500,
      fontSize: 24,
      transform: `translateY(${-2 * hover + 2 * press}px)`,
    }}
  >
    {label}
  </div>
);

/** Component showcase: buttons, toasts, loader, toggle. 1920x1080. */
export const OrientalComponents: React.FC<PrimaryProps> = ({primary}) => {
  const frame = useCurrentFrame();
  const hover = progress(frame, 40, 46) - progress(frame, 80, 86);
  const press = progress(frame, 64, 68) - progress(frame, 72, 76);
  const toast = (i: number) => progress(frame, 90 + i * 24, 102 + i * 24) - progress(frame, 170 + i * 8, 178 + i * 8);
  const load = quant(progress(frame, 20, 160, (t) => t), 0.05);
  const tog = progress(frame, 120, 126);
  const toasts = [
    ['SYNC', 'Theme applied to 14 components'],
    ['BUILD', 'Banners generated: 4'],
    ['DEPLOY', 'Status: ONLINE.'],
  ];

  return (
    <Frame primary={primary}>
      <AbsoluteFill style={{...dotGrid('rgba(222,223,215,0.07)', 30), padding: 80, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32}}>
        <Card label="BUTTONS" tag="01" style={{clipPath: wipeX(progress(frame, 0, 12))}}>
          <div style={{display: 'flex', gap: 20, marginTop: 20}}>
            <Btn label="Cancel" />
            <Btn label="Hover" hover={Math.max(0, hover)} />
            <Btn label="Publish" primary press={Math.max(0, press)} />
          </div>
          <div style={{display: 'flex', gap: 12, marginTop: 36}}>
            <Tag>In.</Tag>
            <Tag>Git.</Tag>
            <Tag accent>#01</Tag>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 20, marginTop: 40}}>
            <div style={{width: 76, height: 40, borderRadius: 999, background: tog > 0.5 ? C.primary : C.surface2, border: `1px solid ${tog > 0.5 ? C.primary : C.hairlineStrong}`, position: 'relative'}}>
              <div style={{position: 'absolute', top: 5, left: 5 + tog * 36, width: 28, height: 28, borderRadius: '50%', background: tog > 0.5 ? C.onPrimary : C.white}} />
            </div>
            <span style={{fontFamily: F.body, fontSize: 24, color: C.white}}>Editorial mode</span>
          </div>
        </Card>

        <Card label="LOADING" tag="02" style={{clipPath: wipeX(progress(frame, 6, 18))}}>
          <div style={{fontFamily: F.display, fontSize: 120, color: C.white, lineHeight: 1}}>
            {Math.round(load * 100)}
            <span style={{color: C.primary}}>%</span>
          </div>
          <div style={{height: 14, background: C.surface2, marginTop: 28, border: `1px solid ${C.hairline}`}}>
            <div style={{height: '100%', width: `${load * 100}%`, background: C.primary}} />
          </div>
          <div style={{display: 'flex', gap: 6, marginTop: 36}}>
            {Array.from({length: 12}).map((_, i) => (
              <div key={i} style={{width: 20, height: 40, background: (Math.floor(frame / 4) % 12) === i ? C.primary : C.surface2}} />
            ))}
          </div>
        </Card>

        <div style={{gridColumn: '1 / 3', position: 'relative'}}>
          {toasts.map(([k, v], i) => {
            const p = toast(i);
            return (
              <div key={k} style={{position: 'absolute', right: 0, top: i * 120, width: 700, display: 'flex', gap: 20, alignItems: 'center', background: C.surface1, border: `1px solid ${C.hairline}`, borderLeft: `3px solid ${C.primary}`, borderRadius: T.radius.card, padding: '24px 28px', transform: `translateX(${interpolate(p, [0, 1], [760, 0])}px)`, opacity: p > 0 ? 1 : 0}}>
                <span style={{fontFamily: F.mono, fontSize: 16, letterSpacing: 2, color: C.primary}}>{k}</span>
                <span style={{fontFamily: F.body, fontSize: 24, color: C.white}}>{v}</span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Frame>
  );
};
