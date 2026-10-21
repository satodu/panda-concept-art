import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {calmEase, progress} from '../shared/motion';
import {blurIn} from '../shared/reveal';
import {PrimaryProps} from '../shared/Themed';
import {C, F, Frame} from './theme';
import {FadedNum, Paper, Kanji, Suminagashi, dots, Decor, Rule} from './parts';

/**
 * Shizuka signature: SLOW. Sumi spreads on still water, numbers are half
 * rubbed away, and a faded seal presses once. Nothing snaps, nothing is perfect.
 */
export const ShizukaIntro: React.FC<PrimaryProps> = ({primary}) => {
  const frame = useCurrentFrame();
  const ink = progress(frame, 0, 140, calmEase);
  const title = progress(frame, 60, 130, calmEase);
  const sub = progress(frame, 110, 170, calmEase);
  const seal = progress(frame, 150, 185, calmEase);
  return (
    <Frame primary={primary}>
      <Paper>
        <AbsoluteFill style={dots()}>
          <Decor />
          <div style={{position: 'absolute', left: 940, top: 120, opacity: ink, filter: blurIn(ink, 10)}}>
            <Suminagashi size={840} rings={13} t={frame / 70} grow={0.25 + ink * 0.75} seed={2} />
          </div>
          <div style={{position: 'absolute', left: 140, top: 150, opacity: progress(frame, 30, 90)}}>
            <FadedNum value="0 0 1" size={34} mono keep={2} />
          </div>
          <div style={{position: 'absolute', left: 140, top: 380, fontFamily: F.display, fontWeight: 200, fontSize: 168, color: C.ink, letterSpacing: interpolate(title, [0, 1], [30, 6]), opacity: title, filter: blurIn(title, 10)}}>
            SHIZUKA.
          </div>
          <Rule width={520} style={{position: 'absolute', left: 148, top: 600, opacity: title}} />
          <div style={{position: 'absolute', left: 148, top: 640, fontFamily: F.body, fontWeight: 300, fontSize: 30, color: C.inkSoft, letterSpacing: 1, opacity: sub, filter: blurIn(sub, 6)}}>
            nothing is perfect. rest anyway.
          </div>
          <Kanji char="静" size={150} press={seal} style={{position: 'absolute', left: 150, bottom: 110}} />
        </AbsoluteFill>
      </Paper>
    </Frame>
  );
};
