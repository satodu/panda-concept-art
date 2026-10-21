import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {dotGrid} from '../shared/Cross';
import {outExpo, progress} from '../shared/motion';
import {shake, wipeUp, wipeX} from '../shared/reveal';
import {PrimaryProps} from '../shared/Themed';
import {C, F, Frame} from './theme';
import {Card, Hanko, Tag, Tategaki} from './parts';

/** 1080x1350 portrait post. */
export const OrientalSocial: React.FC<PrimaryProps & {headline?: string; issue?: string}> = ({primary, headline = 'NEW RELEASE', issue = '#07'}) => {
  const frame = useCurrentFrame();
  const words = headline.split(' ');
  const slamAt = 60;
  const slam = progress(frame, slamAt, slamAt + 6, outExpo);
  const [dx, dy] = shake(frame, slamAt, 8, 8);

  return (
    <Frame primary={primary}>
      <AbsoluteFill style={{...dotGrid('rgba(222,223,215,0.08)', 28), padding: 70, transform: `translate(${dx}px, ${dy}px)`}}>
        <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: F.mono, fontSize: 22, color: C.textMuted, letterSpacing: 2, clipPath: wipeX(progress(frame, 0, 12))}}>
          <span>[ SYSTEM.DOC ]</span>
          <span>{issue}</span>
        </div>
        <div style={{marginTop: 150}}>
          {words.map((w, i) => {
            const p = progress(frame, 8 + i * 6, 22 + i * 6);
            return (
              <div key={w} style={{clipPath: wipeUp(p)}}>
                <div style={{fontFamily: F.display, fontSize: 126, lineHeight: 0.98, color: C.white, letterSpacing: -4, transform: `translateY(${interpolate(p, [0, 1], [50, 0])}px)`}}>
                  {w}
                  {i === words.length - 1 && <span style={{color: C.primary}}>.</span>}
                </div>
              </div>
            );
          })}
        </div>
        <Card style={{position: 'absolute', left: 70, right: 70, bottom: 110, height: 300, clipPath: wipeX(progress(frame, 40, 56))}} label="SUMMARY" tag="01">
          <div style={{fontFamily: F.body, fontSize: 34, color: C.white, lineHeight: 1.35, width: 600}}>Unified tokens, 14 components and a single primary color.</div>
          <div style={{display: 'flex', gap: 10, marginTop: 28}}>
            <Tag>In.</Tag>
            <Tag>Git.</Tag>
            <Tag accent>v1.0</Tag>
          </div>
        </Card>
        <Tategaki text="東洋" size={44} style={{position: 'absolute', right: 70, top: 300, clipPath: wipeUp(progress(frame, 24, 40))}} />
        <Hanko size={150} style={{position: 'absolute', right: 120, bottom: 360, opacity: frame >= slamAt ? 1 : 0, transform: `scale(${interpolate(slam, [0, 1], [1.9, 1])}) rotate(${interpolate(slam, [0, 1], [-10, -3])}deg)`}} />
      </AbsoluteFill>
    </Frame>
  );
};
