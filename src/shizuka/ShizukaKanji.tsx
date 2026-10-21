import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {calmEase, progress} from '../shared/motion';
import {blurIn} from '../shared/reveal';
import {PrimaryProps} from '../shared/Themed';
import {C, F, Frame} from './theme';
import {Paper, Kanji, Suminagashi, dots} from './parts';

/** Kanji set: real characters, set plainly in the primary. */
export const KANJI = [
  {k: '静', r: 'shizuka', m: 'quiet'},
  {k: '間', r: 'ma', m: 'the pause between'},
  {k: '白', r: 'shiro', m: 'white'},
  {k: '終', r: 'owari', m: 'the end'},
  {k: '侘', r: 'wabi', m: 'quiet imperfection'},
];
const EACH = 72;

export const ShizukaKanji: React.FC<PrimaryProps> = ({primary}) => {
  const frame = useCurrentFrame();
  const i = Math.min(KANJI.length - 1, Math.floor(frame / EACH));
  const f = frame - i * EACH;
  const inP = progress(f, 0, 30, calmEase);
  const outP = i < KANJI.length - 1 ? progress(f, EACH - 18, EACH, calmEase) : 0;
  const vis = inP * (1 - outP);
  const {k, r, m} = KANJI[i];
  return (
    <Frame primary={primary}>
      <Paper>
        <AbsoluteFill style={{...dots(), alignItems: 'center', justifyContent: 'center'}}>
          <div style={{position: 'absolute', left: 900, top: 90, opacity: 0.95}}>
            <Suminagashi size={900} rings={11} t={frame / 100} seed={i + 1} grow={0.8} />
          </div>
          <div style={{position: 'absolute', left: 280, top: 300, opacity: vis, filter: blurIn(vis, 14)}}>
            <Kanji char={k} size={320} press={progress(f, 8, 36, calmEase)} />
          </div>
          <div style={{position: 'absolute', top: 700, left: 150, width: 600, textAlign: 'center', opacity: vis, fontFamily: F.mono, fontSize: 22, letterSpacing: 6, textTransform: 'uppercase', color: C.textMuted}}>{r} · {m}</div>
        </AbsoluteFill>
      </Paper>
    </Frame>
  );
};
