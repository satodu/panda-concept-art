import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {calmEase, progress} from '../shared/motion';
import {blurIn} from '../shared/reveal';
import {PrimaryProps} from '../shared/Themed';
import {C, F, Frame} from './theme';
import {FadedNum, Paper, Kanji, Suminagashi, dots, Decor, Rule} from './parts';

/** 1080x1350 quote post. */
export const ShizukaSocial: React.FC<PrimaryProps & {quote?: string}> = ({primary, quote = 'rest first. the rest can wait.'}) => {
  const frame = useCurrentFrame();
  const q = progress(frame, 20, 100, calmEase);
  return (
    <Frame primary={primary}>
      <Paper>
        <AbsoluteFill style={dots()}>
          <Decor folio="NO. 007" frame={false} />
          <div style={{position: 'absolute', left: 80, top: 100, opacity: progress(frame, 0, 40)}}>
            <FadedNum value="#0 0 7" size={26} mono keep={2} />
          </div>
          <div style={{position: 'absolute', right: -160, bottom: -120, opacity: progress(frame, 0, 90)}}>
            <Suminagashi size={760} rings={11} t={frame / 90} grow={0.3 + progress(frame, 0, 110, calmEase) * 0.7} seed={4} />
          </div>
          <Rule width={300} style={{position: 'absolute', left: 86, top: 220, opacity: q}} />
          <div style={{position: 'absolute', left: 80, right: 80, top: 260, fontFamily: F.display, fontWeight: 200, fontSize: 112, lineHeight: 1.1, color: C.ink, letterSpacing: -2, opacity: q, filter: blurIn(q, 12)}}>{quote}</div>
          <Kanji char="静" size={110} press={progress(frame, 100, 130, calmEase)} style={{position: 'absolute', left: 80, bottom: 120}} />
        </AbsoluteFill>
      </Paper>
    </Frame>
  );
};
