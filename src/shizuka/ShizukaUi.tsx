import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {blurIn} from '../shared/reveal';
import {PrimaryProps} from '../shared/Themed';
import {calmEase, progress, stagger} from '../shared/motion';
import {C, F, Frame, T} from './theme';
import {Card, FadedNum, Ghost, Paper, Kanji, Suminagashi, Toggle, dots, Decor, Rule} from './parts';

const icons = ['○', '∿', '⌂', '◐', '|'];

export const ShizukaUi: React.FC<PrimaryProps> = ({primary}) => {
  const frame = useCurrentFrame();
  const rise = (i: number, base = 30) => {
    const p = progress(frame, stagger(base, i, 14), stagger(base, i, 14) + 55, calmEase);
    return {opacity: p, filter: blurIn(p, 10), transform: `translateY(${interpolate(p, [0, 1], [14, 0])}px)`} as React.CSSProperties;
  };
  const minutes = 5 + Math.floor(frame / 120);
  const secs = (42 + Math.floor(frame / 30)) % 60;
  const task = progress(frame, 160, 190, calmEase);
  const rain = progress(frame, 200, 225, calmEase);
  const mmss = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return (
    <Frame primary={primary}>
      <Paper>
        <AbsoluteFill style={dots()}>
          <Decor folio="NO. 002 · TODAY" />
          <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 92, borderRight: `1px solid ${C.hairline}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 46, fontFamily: F.body, fontSize: 26}}>
            {icons.map((ic, i) => (
              <span key={i} style={{opacity: i === 0 ? 1 : 0.4, color: i === 0 ? C.primary : C.inkSoft}}>{ic}</span>
            ))}
          </div>

          <div style={{position: 'absolute', left: 150, top: 60, ...rise(0, 4)}}>
            <div style={{fontFamily: F.display, fontWeight: 200, fontSize: 84, color: C.ink, letterSpacing: 4}}>SHIZUKA.</div>
            <Rule width={360} style={{marginTop: 8}} />
            <div style={{fontFamily: F.body, fontWeight: 300, fontSize: 24, color: C.inkSoft, marginTop: 10}}>good morning. rest first.</div>
          </div>
          <Ghost text="静か" size={90} style={{position: 'absolute', right: 90, top: 70, opacity: progress(frame, 10, 80)}} />

          {/* hero card: ink on water */}
          <Card style={{position: 'absolute', left: 150, top: 290, width: 700, height: 360, padding: 0, ...rise(1, 8)}}>
            <div style={{position: 'absolute', left: 250, top: -150}}>
              <Suminagashi size={760} rings={11} t={frame / 80} grow={0.6 + progress(frame, 0, 120, calmEase) * 0.4} seed={3} />
            </div>
            <div style={{position: 'absolute', left: 40, top: 36, fontFamily: F.mono, fontSize: 14, color: C.textMuted, letterSpacing: 3}}>BREATHE</div>
            <FadedNum value="4 · 7 · 8" size={64} style={{position: 'absolute', left: 40, bottom: 40}} keep={2} />
          </Card>

          <Card style={{position: 'absolute', left: 890, top: 290, width: 390, height: 360, ...rise(2)}}>
            <div style={{fontFamily: F.mono, fontSize: 14, color: C.textMuted, letterSpacing: 3}}>NOW</div>
            <FadedNum value={mmss} size={92} keep={4} style={{marginTop: 24}} />
            <div style={{marginTop: 36, fontFamily: F.body, fontSize: 20, fontWeight: 300, color: C.inkSoft}}>the rest can wait.</div>
            <Kanji char="間" size={90} press={progress(frame, 100, 140, calmEase)} style={{position: 'absolute', right: 26, bottom: 24}} />
          </Card>

          <Card style={{position: 'absolute', left: 1320, top: 290, width: 450, height: 360, ...rise(3)}}>
            <div style={{fontFamily: F.mono, fontSize: 14, color: C.textMuted, letterSpacing: 3}}>ONE THING</div>
            <div style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 34}}>
              <div style={{width: 30, height: 30, borderRadius: '50%', border: `1.5px solid ${task > 0.5 ? C.ink : C.hairlineStrong}`, background: task > 0.5 ? C.ink : 'transparent', display: 'grid', placeItems: 'center', color: C.primary, fontSize: 16}}>{task > 0.5 ? '✓' : ''}</div>
              <div style={{fontFamily: F.body, fontSize: 30, fontWeight: 300, color: C.ink, textDecoration: task > 0.5 ? 'line-through' : 'none', opacity: task > 0.5 ? 0.45 : 1}}>water the plant</div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 60}}>
              <div style={{fontFamily: F.body, fontSize: 28, fontWeight: 300, color: C.ink}}>rain</div>
              <Toggle on={rain} />
            </div>
          </Card>

          <div style={{position: 'absolute', left: 150, right: 150, top: 760, display: 'flex', gap: T.space.gap}}>
            {['yesterday', 'today', 'tomorrow'].map((d, i) => (
              <Card key={d} style={{flex: 1, height: 170, ...rise(4 + i)}}>
                <div style={{fontFamily: F.mono, fontSize: 14, color: C.textMuted, letterSpacing: 3, textTransform: 'uppercase'}}>{d}</div>
                <FadedNum value={['0 8 h', '0 6 h', '- - h'][i]} size={56} keep={i === 2 ? 0 : 2} style={{marginTop: 18}} />
              </Card>
            ))}
          </div>
        </AbsoluteFill>
      </Paper>
    </Frame>
  );
};
