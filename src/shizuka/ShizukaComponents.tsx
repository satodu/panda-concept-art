import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {blurIn} from '../shared/reveal';
import {PrimaryProps} from '../shared/Themed';
import {calmEase, progress, stagger} from '../shared/motion';
import {C, F, Frame, T} from './theme';
import {Card, FadedNum, Paper, Kanji, Suminagashi, Toggle, dots, Decor, Rule} from './parts';

const label = {fontFamily: F.mono, fontSize: 14, letterSpacing: 3, color: C.textMuted, textTransform: 'uppercase'} as React.CSSProperties;

export const ShizukaComponents: React.FC<PrimaryProps> = ({primary}) => {
  const frame = useCurrentFrame();
  const rise = (i: number) => {
    const p = progress(frame, stagger(8, i, 14), stagger(8, i, 14) + 50, calmEase);
    return {opacity: p, filter: blurIn(p, 10), transform: `translateY(${interpolate(p, [0, 1], [12, 0])}px)`} as React.CSSProperties;
  };
  const on = progress(frame, 120, 145, calmEase);
  const slide = interpolate(frame, [100, 200], [0.25, 0.7], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: calmEase});
  const check = progress(frame, 150, 175, calmEase);
  return (
    <Frame primary={primary}>
      <Paper>
        <AbsoluteFill style={dots()}>
          <Decor folio="NO. 003 · COMPONENTS" />
          <div style={{position: 'absolute', left: 120, top: 70, fontFamily: F.display, fontWeight: 200, fontSize: 64, color: C.ink, letterSpacing: 4, ...rise(0)}}>COMPONENTS.</div>

          <Rule width={420} style={{position: 'absolute', left: 126, top: 150}} />
          <Card style={{position: 'absolute', left: 120, top: 220, width: 520, height: 330, ...rise(1)}}>
            <div style={label}>buttons</div>
            <div style={{display: 'flex', gap: 18, marginTop: 40, alignItems: 'center'}}>
              <div style={{height: 56, padding: '0 34px', borderRadius: 999, background: C.ink, color: C.cardHi, display: 'grid', placeItems: 'center', fontFamily: F.body, fontWeight: 300, fontSize: 20}}>start</div>
              <div style={{height: 56, padding: '0 34px', borderRadius: 999, border: `1px solid ${C.hairlineStrong}`, color: C.ink, display: 'grid', placeItems: 'center', fontFamily: F.body, fontWeight: 300, fontSize: 20}}>later</div>
            </div>
            <div style={{marginTop: 34, height: 56, borderRadius: 999, background: C.primary, color: C.onPrimary, display: 'grid', placeItems: 'center', fontFamily: F.body, fontWeight: 400, fontSize: 20, width: 220}}>save</div>
          </Card>

          <Card style={{position: 'absolute', left: 670, top: 220, width: 520, height: 330, ...rise(2)}}>
            <div style={label}>field</div>
            <div style={{marginTop: 34, height: 60, borderRadius: T.radius.control, border: `1px solid ${C.ink}`, background: C.card, padding: '0 24px', display: 'flex', alignItems: 'center', fontFamily: F.body, fontWeight: 300, fontSize: 24, color: C.ink}}>
              one word<span style={{width: 2, height: 28, background: C.ink, marginLeft: 3, opacity: Math.floor(frame / 15) % 2}} />
            </div>
            <div style={{marginTop: 14, fontFamily: F.body, fontSize: 17, color: C.inkSoft}}>only what matters today.</div>
            <div style={{marginTop: 26, height: 60, borderRadius: T.radius.control, border: `1px dashed ${C.ink}`, padding: '0 24px', display: 'flex', alignItems: 'center', fontFamily: F.body, fontWeight: 300, fontSize: 22, color: C.textMuted}}>error: dashed border</div>
          </Card>

          <Card style={{position: 'absolute', left: 1220, top: 220, width: 580, height: 330, ...rise(3)}}>
            <div style={label}>controls</div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 34}}>
              <span style={{fontFamily: F.body, fontSize: 26, fontWeight: 300, color: C.ink}}>rain</span><Toggle on={on} />
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 36}}>
              <div style={{width: 30, height: 30, borderRadius: '50%', border: `1.5px solid ${check > 0.5 ? C.ink : C.hairlineStrong}`, background: check > 0.5 ? C.ink : 'transparent', color: C.primary, display: 'grid', placeItems: 'center', fontSize: 16}}>{check > 0.5 ? '✓' : ''}</div>
              <span style={{fontFamily: F.body, fontSize: 26, fontWeight: 300, color: C.ink, opacity: check > 0.5 ? 0.45 : 1, textDecoration: check > 0.5 ? 'line-through' : 'none'}}>water the plant</span>
            </div>
            <div style={{marginTop: 46, height: 2, background: C.hairlineStrong, position: 'relative'}}>
              <i style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${slide * 100}%`, background: C.ink}} />
              <b style={{position: 'absolute', top: -9, left: `${slide * 100}%`, marginLeft: -10, width: 20, height: 20, borderRadius: '50%', background: C.cardHi, border: `1px solid ${C.hairlineStrong}`}} />
            </div>
          </Card>

          <Card style={{position: 'absolute', left: 120, top: 590, width: 520, height: 330, ...rise(4)}}>
            <div style={label}>tags</div>
            <div style={{display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap'}}>
              {['calm', 'paper', 'ink'].map((t, i) => (
                <span key={t} style={{fontFamily: F.mono, fontSize: 14, letterSpacing: 3, textTransform: 'uppercase', padding: '8px 18px', borderRadius: 999, border: `1px solid ${i === 0 ? C.ink : C.hairlineStrong}`, background: i === 0 ? C.ink : 'transparent', color: i === 0 ? C.cardHi : C.textMuted}}>{t}</span>
              ))}
            </div>
            <FadedNum value="0 3 7" size={84} keep={1} style={{marginTop: 50}} />
          </Card>

          <Card style={{position: 'absolute', left: 670, top: 590, width: 520, height: 330, padding: 0, ...rise(5)}}>
            <div style={{position: 'absolute', left: 90, top: -190}}>
              <Suminagashi size={560} rings={9} t={frame / 80} seed={7} warpAmt={26} />
            </div>
            <div style={{...label, position: 'absolute', left: 32, top: 28}}>ink</div>
          </Card>

          <Card style={{position: 'absolute', left: 1220, top: 590, width: 580, height: 330, ...rise(6)}}>
            <div style={label}>kanji</div>
            <div style={{display: 'flex', gap: 30, marginTop: 36, alignItems: 'center'}}>
              <Kanji char="静" size={120} press={progress(frame, 140, 170, calmEase)} />
              <Kanji char="間" size={120} press={progress(frame, 160, 190, calmEase)} />
            </div>
            <div style={{marginTop: 26, fontFamily: F.body, fontSize: 17, color: C.inkSoft}}>one per screen. plain.</div>
          </Card>
        </AbsoluteFill>
      </Paper>
    </Frame>
  );
};
