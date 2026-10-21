import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Crosses, dotGrid} from '../shared/Cross';
import {outExpo, progress, stagger} from '../shared/motion';
import {shake, wipeUp, wipeX} from '../shared/reveal';
import {mixA, PrimaryProps} from '../shared/Themed';
import {C, F, Frame} from './theme';
import {Hanko, Tag} from './parts';

/**
 * Oriental signature: HARD motion. Mask wipes, no fades, stepped reveals,
 * one slam (Hanko) with a camera shake and a single-frame flash.
 */
export const OrientalIntro: React.FC<PrimaryProps> = ({primary}) => {
  const frame = useCurrentFrame();
  const word = 'ORIENTAL.';
  const slamAt = 70;
  const [dx, dy] = shake(frame, slamAt, 10, 12);
  const slam = progress(frame, slamAt, slamAt + 6, outExpo);
  const flash = frame >= slamAt && frame < slamAt + 2 ? 0.16 : 0;
  const kanji = '東洋ブルータリズム'.split('');
  const rule = progress(frame, 6, 40);

  return (
    <Frame primary={primary}>
      <AbsoluteFill style={{...dotGrid('rgba(222,223,215,0.10)', 28), transform: `translate(${dx}px, ${dy}px)`}}>
        <Crosses color={C.white} count={12} style={{position: 'absolute', top: 54, left: 96, opacity: 0.25}} />
        <div style={{position: 'absolute', top: 52, right: 96, fontFamily: F.mono, fontSize: 18, color: C.textMuted, letterSpacing: 2, clipPath: wipeX(progress(frame, 4, 20))}}>
          [ SYSTEM.DOC // REV.01 ]
        </div>

        <div style={{position: 'absolute', left: 96, top: 760, height: 1, width: 1728 * rule, background: C.hairlineStrong}} />

        <div style={{position: 'absolute', left: 96, top: 250, display: 'flex'}}>
          {word.split('').map((ch, i) => {
            const p = progress(frame, stagger(8, i, 2), stagger(8, i, 2) + 10);
            return (
              <span
                key={i}
                style={{
                  fontFamily: F.display,
                  fontSize: 230,
                  lineHeight: 1,
                  color: ch === '.' ? C.primary : C.white,
                  letterSpacing: -6,
                  clipPath: wipeUp(p),
                  transform: `translateY(${interpolate(p, [0, 1], [40, 0])}px)`,
                }}
              >
                {ch}
              </span>
            );
          })}
        </div>

        <div style={{position: 'absolute', left: 100, top: 520, fontFamily: F.body, fontSize: 38, color: C.textMuted, width: 880, lineHeight: 1.35, clipPath: wipeX(progress(frame, 34, 52))}}>
          Japanese editorial brutalism. Bento, 'Ma' and a single primary color.
        </div>

        <div style={{position: 'absolute', left: 96, top: 800, display: 'flex', gap: 14, clipPath: wipeX(progress(frame, 80, 96))}}>
          <Tag accent>#980281</Tag>
          <Tag>Archivo Black</Tag>
          <Tag>Space Grotesk</Tag>
          <Tag>JetBrains Mono</Tag>
        </div>

        {/* tategaki appears character by character, stepped */}
        <div style={{position: 'absolute', right: 150, top: 150, writingMode: 'vertical-rl', fontFamily: F.jp, fontWeight: 300, fontSize: 34, letterSpacing: 12, color: C.white}}>
          {kanji.map((ch, i) => (
            <span key={i} style={{opacity: frame >= 24 + i * 3 ? 1 : 0}}>
              {ch}
            </span>
          ))}
        </div>
        <div style={{position: 'absolute', right: 96, top: 150, width: 1, height: 560 * progress(frame, 20, 60), background: C.hairlineStrong}} />

        <Hanko
          size={150}
          style={{
            position: 'absolute',
            right: 260,
            bottom: 190,
            opacity: frame >= slamAt ? 1 : 0,
            transform: `scale(${interpolate(slam, [0, 1], [1.9, 1])}) rotate(${interpolate(slam, [0, 1], [-10, -3])}deg)`,
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{background: mixA(C.primary, 100), opacity: flash, mixBlendMode: 'screen'}} />
    </Frame>
  );
};
