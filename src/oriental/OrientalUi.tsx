import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Crosses, dotGrid} from '../shared/Cross';
import {progress, stagger} from '../shared/motion';
import {quant, wipeX} from '../shared/reveal';
import {PrimaryProps} from '../shared/Themed';
import {C, F, Frame} from './theme';
import {Card, Hanko, Tag, Tategaki} from './parts';

/** Cards snap in with a hard wipe + 24px slide. No fades. */
const useSnap = (i: number, base = 6) => {
  const frame = useCurrentFrame();
  const p = progress(frame, stagger(base, i, 5), stagger(base, i, 5) + 12);
  return {clipPath: wipeX(p), transform: `translateX(${interpolate(p, [0, 1], [-24, 0])}px)`} as React.CSSProperties;
};

const lines = ['$ oriental sync --theme dark', '> reading tokens.json ... ok', '> 14 components built', '> status: ONLINE.'];

export const OrientalUi: React.FC<PrimaryProps> = ({primary}) => {
  const frame = useCurrentFrame();
  const count = quant(interpolate(frame, [26, 96], [0, 98.4], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), 0.7);
  const typed = Math.floor(interpolate(frame, [50, 150], [0, lines.join('\n').length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const bars = [0.46, 0.72, 0.58, 0.9, 0.66, 0.8, 0.5];
  const active = Math.floor(frame / 50) % 3;

  return (
    <Frame primary={primary}>
      <AbsoluteFill style={{...dotGrid('rgba(222,223,215,0.07)', 30), padding: 56, flexDirection: 'row', gap: 24}}>
        <div style={{width: 92, border: `1px solid ${C.hairline}`, borderRadius: 20, background: C.surface1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '28px 0', ...useSnap(0, 0)}}>
          <div style={{fontFamily: F.display, fontSize: 34, color: C.primary}}>O.</div>
          <Tategaki text="運用・分析・設定" size={24} color={C.textMuted} />
          <Crosses count={3} color={C.white} style={{flexDirection: 'column', gap: 12, alignItems: 'center'}} />
        </div>

        <div style={{flex: 1, display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'auto 1fr 1fr', gap: 24}}>
          <div style={{gridColumn: '1 / 13', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', ...useSnap(1, 0)}}>
            <div style={{fontFamily: F.display, fontSize: 84, color: C.white, lineHeight: 1, letterSpacing: -2}}>
              PAINEL<span style={{color: C.primary}}>.</span>
            </div>
            <div style={{display: 'flex', gap: 12}}>
              <Tag>In.</Tag>
              <Tag>Git.</Tag>
              <Tag accent>#01</Tag>
              <Tag>[ 0.1.0 ]</Tag>
            </div>
          </div>

          <Card style={{gridColumn: '1 / 6', gridRow: '2 / 4', ...useSnap(2)}} label="STATUS" tag="01">
            <div style={{fontFamily: F.display, fontSize: 190, color: C.white, lineHeight: 1, letterSpacing: -6}}>
              {count.toFixed(1)}
              <span style={{fontSize: 80, color: C.primary}}>%</span>
            </div>
            <div style={{fontFamily: F.body, color: C.textMuted, fontSize: 24, marginTop: 8}}>uptime over the last 30 days</div>
            <div style={{display: 'flex', gap: 10, alignItems: 'flex-end', height: 190, marginTop: 40}}>
              {bars.map((b, i) => {
                const p = progress(frame, stagger(34, i, 3), stagger(34, i, 3) + 18);
                const stepped = Math.ceil(p * 6) / 6; // 6 hard steps
                return <div key={i} style={{flex: 1, height: `${b * 100 * stepped}%`, background: i === 3 ? C.primary : C.surface2, borderTop: `1px solid ${i === 3 ? C.primary : C.hairlineStrong}`}} />;
              })}
            </div>
          </Card>

          <Card style={{gridColumn: '6 / 10', gridRow: '2 / 3', ...useSnap(3)}} label="TERMINAL" tag="02">
            <pre style={{margin: 0, fontFamily: F.mono, fontSize: 21, color: C.white, lineHeight: 1.6, whiteSpace: 'pre-wrap'}}>
              {lines.join('\n').slice(0, typed)}
              <span style={{background: C.primary, color: C.primary, opacity: Math.floor(frame / 8) % 2 ? 0 : 1}}>_</span>
            </pre>
          </Card>

          <Card style={{gridColumn: '10 / 13', gridRow: '2 / 4', ...useSnap(4), display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} label="SEAL" tag="03">
            <Hanko size={170} style={{alignSelf: 'center', transform: `rotate(${interpolate(frame, [0, 240], [-4, 4])}deg)`}} />
            <div style={{position: 'relative', width: 200, height: 200, alignSelf: 'center'}}>
              <div style={{position: 'absolute', inset: 0, border: `1px solid ${C.hairlineStrong}`, borderRadius: '50%'}} />
              <div style={{position: 'absolute', inset: 26, border: `1px solid ${C.hairline}`, borderRadius: '50%'}} />
              <div style={{position: 'absolute', left: '50%', top: '50%', width: 12, height: 12, marginLeft: -6, marginTop: -6, borderRadius: '50%', background: C.primary, transform: `rotate(${quant(frame * 3, 15)}deg) translateX(100px)`}} />
            </div>
          </Card>

          <Card style={{gridColumn: '6 / 10', gridRow: '3 / 4', ...useSnap(5)}} label="QUEUE" tag="04">
            {['Theme deploy', 'Review tokens', 'Generate banners'].map((t, i) => (
              <div key={t} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderTop: `1px solid ${C.hairline}`, fontFamily: F.body, fontSize: 24, color: C.white, background: i === active ? C.primarySoft : 'transparent'}}>
                <span>{t}</span>
                <span style={{display: 'flex', alignItems: 'center', gap: 10, fontFamily: F.mono, fontSize: 15, color: i === active ? C.primary : C.textMuted}}>
                  <i style={{width: 9, height: 9, borderRadius: '50%', background: i === active ? C.primary : C.hairlineStrong, display: 'inline-block'}} />
                  {i === active ? 'ACTIVE' : 'QUEUE'}
                </span>
              </div>
            ))}
          </Card>
        </div>
      </AbsoluteFill>
    </Frame>
  );
};
