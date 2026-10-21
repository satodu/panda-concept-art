import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {blurIn} from '../shared/reveal';
import {PrimaryProps} from '../shared/Themed';
import {calmEase, progress} from '../shared/motion';
import {C, F, Frame} from './theme';
import {FadedNum, Ghost, Paper, Kanji, Suminagashi, dots} from './parts';

/** Focus mode: the ink IS the timer. It spreads as the minutes go; the time is half erased. */
export const ShizukaFocus: React.FC<PrimaryProps> = ({primary}) => {
  const frame = useCurrentFrame();
  const spread = interpolate(frame, [0, 300], [0.35, 1], {easing: calmEase});
  const left = 25 * 60 - Math.floor(frame / 30);
  const mm = String(Math.floor(left / 60)).padStart(2, '0');
  const ss = String(left % 60).padStart(2, '0');
  const inP = progress(frame, 0, 60, calmEase);
  return (
    <Frame primary={primary}>
      <Paper>
        <AbsoluteFill style={dots()}>
          <Ghost text="集中" size={96} style={{position: 'absolute', left: 90, top: 70, opacity: inP}} />
          <div style={{position: 'absolute', left: 960 - 520, top: 30, opacity: inP, filter: blurIn(inP, 12)}}>
            <Suminagashi size={1040} rings={15} t={frame / 90} grow={spread} seed={6} warpAmt={52} />
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center', opacity: inP}}>
            <div style={{display: 'inline-block', background: C.card, border: `1px solid ${C.hairline}`, borderRadius: 40, padding: '26px 56px'}}>
              <FadedNum value={`${mm}:${ss}`} size={150} keep={4} />
            </div>
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 680, textAlign: 'center', opacity: progress(frame, 40, 90)}}>
            <span style={{display: 'inline-block', background: C.card, border: `1px solid ${C.hairline}`, borderRadius: 999, padding: '10px 28px', fontFamily: F.mono, fontSize: 16, letterSpacing: 8, color: C.inkSoft}}>FOCUS · 25 MIN</span>
          </div>
          <Kanji char="静" size={96} press={progress(frame, 120, 150, calmEase)} style={{position: 'absolute', right: 130, bottom: 100}} />
        </AbsoluteFill>
      </Paper>
    </Frame>
  );
};
