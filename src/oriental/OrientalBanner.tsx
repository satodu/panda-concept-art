import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Crosses, dotGrid} from '../shared/Cross';
import {outExpo, progress} from '../shared/motion';
import {shake, wipeUp, wipeX} from '../shared/reveal';
import {PrimaryProps} from '../shared/Themed';
import {C, F, Frame} from './theme';
import {Hanko, Tag, Tategaki} from './parts';

/** 1500x500: LinkedIn / X header. */
export const OrientalBanner: React.FC<PrimaryProps & {title?: string; subtitle?: string}> = ({
  primary,
  title = 'YOUR TITLE',
  subtitle = 'Design system // dev tools // architecture',
}) => {
  const frame = useCurrentFrame();
  const slideP = progress(frame, 4, 20);
  const slamAt = 38;
  const slam = progress(frame, slamAt, slamAt + 6, outExpo);
  const [dx, dy] = shake(frame, slamAt, 8, 6);

  return (
    <Frame primary={primary}>
      <AbsoluteFill style={{...dotGrid('rgba(222,223,215,0.09)', 26), transform: `translate(${dx}px, ${dy}px)`}}>
        <div style={{position: 'absolute', inset: 18, border: `1px solid ${C.hairline}`, borderRadius: 18}} />
        <Crosses count={8} color={C.white} style={{position: 'absolute', top: 40, left: 60, opacity: 0.22}} />
        <div style={{position: 'absolute', left: 60, top: 150, clipPath: wipeUp(slideP)}}>
          <div style={{fontFamily: F.display, fontSize: 150, lineHeight: 1, color: C.white, letterSpacing: -4, transform: `translateY(${interpolate(slideP, [0, 1], [60, 0])}px)`}}>
            {title}
            <span style={{color: C.primary}}>.</span>
          </div>
        </div>
        <div style={{position: 'absolute', left: 66, top: 336, fontFamily: F.mono, fontSize: 22, color: C.textMuted, letterSpacing: 1, clipPath: wipeX(progress(frame, 18, 34))}}>
          {subtitle}
        </div>
        <div style={{position: 'absolute', left: 60, bottom: 52, display: 'flex', gap: 10, clipPath: wipeX(progress(frame, 30, 44))}}>
          <Tag>In.</Tag>
          <Tag>Git.</Tag>
          <Tag accent>#01</Tag>
        </div>
        <Tategaki text="東洋・簡素" size={30} style={{position: 'absolute', right: 270, top: 70, clipPath: wipeUp(progress(frame, 12, 30))}} />
        <Hanko size={118} style={{position: 'absolute', right: 76, bottom: 66, opacity: frame >= slamAt ? 1 : 0, transform: `scale(${interpolate(slam, [0, 1], [1.8, 1])}) rotate(${interpolate(slam, [0, 1], [-10, -3])}deg)`}} />
      </AbsoluteFill>
    </Frame>
  );
};
