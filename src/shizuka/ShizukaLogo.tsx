import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {calmEase, progress} from '../shared/motion';
import {blurIn} from '../shared/reveal';
import {PrimaryProps} from '../shared/Themed';
import {C, F, Frame} from './theme';
import {Paper, Kanji, Suminagashi, dots, Decor} from './parts';

/** Logo reveal 1920x1080. A drop of ink opens on water, the word settles, the seal takes. */
export const ShizukaLogo: React.FC<PrimaryProps> = ({primary}) => {
  const frame = useCurrentFrame();
  const drop = progress(frame, 0, 100, calmEase);
  const word = progress(frame, 70, 130, calmEase);
  const seal = progress(frame, 120, 150, calmEase);
  return (
    <Frame primary={primary}>
      <Paper>
        <AbsoluteFill style={{...dots(), alignItems: 'center', justifyContent: 'center'}}>
          <Decor />
          <div style={{position: 'absolute', left: 960 - 330, top: 80, opacity: drop}}>
            <Suminagashi size={660} rings={9} t={frame / 80} grow={0.1 + drop * 0.9} seed={5} />
          </div>
          <div style={{marginTop: 520, fontFamily: F.display, fontWeight: 200, fontSize: 120, color: C.ink, letterSpacing: interpolate(word, [0, 1], [34, 10]), opacity: word, filter: blurIn(word, 10)}}>SHIZUKA.</div>
          <div style={{marginTop: 14, fontFamily: F.mono, fontSize: 18, color: C.textMuted, letterSpacing: 6, opacity: progress(frame, 110, 150)}}>静か · QUIET</div>
          <Kanji char="静" size={96} press={seal} style={{position: 'absolute', right: 150, bottom: 110}} />
        </AbsoluteFill>
      </Paper>
    </Frame>
  );
};
