import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {dotGrid} from '../shared/Cross';
import {outExpo, progress} from '../shared/motion';
import {shake, wipeX} from '../shared/reveal';
import {PrimaryProps} from '../shared/Themed';
import {C, F, Frame} from './theme';
import {Hanko} from './parts';

/** Logo reveal 1920x1080: monogram frame draws, wordmark wipes, Hanko slams. */
export const OrientalLogo: React.FC<PrimaryProps> = ({primary}) => {
  const frame = useCurrentFrame();
  const size = 360;
  const draw = progress(frame, 6, 40);
  const perim = size * 4;
  const slamAt = 78;
  const slam = progress(frame, slamAt, slamAt + 6, outExpo);
  const [dx, dy] = shake(frame, slamAt, 9, 10);

  return (
    <Frame primary={primary}>
      <AbsoluteFill style={{...dotGrid('rgba(222,223,215,0.08)', 30), alignItems: 'center', justifyContent: 'center', transform: `translate(${dx}px, ${dy}px)`}}>
        <div style={{position: 'relative', width: size, height: size}}>
          <svg width={size} height={size} style={{position: 'absolute', inset: 0}}>
            <rect x={2} y={2} width={size - 4} height={size - 4} rx={32} fill="none" stroke={C.white} strokeWidth={2} strokeDasharray={perim} strokeDashoffset={perim * (1 - draw)} />
          </svg>
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.display, fontSize: 250, color: C.white, clipPath: wipeX(progress(frame, 30, 48))}}>
            O<span style={{color: C.primary}}>.</span>
          </div>
        </div>
        <div style={{marginTop: 56, fontFamily: F.display, fontSize: 96, letterSpacing: -2, color: C.white, clipPath: wipeX(progress(frame, 52, 70))}}>
          ORIENTAL<span style={{color: C.primary}}>.</span>
        </div>
        <div style={{marginTop: 14, fontFamily: F.mono, fontSize: 22, color: C.textMuted, letterSpacing: 4, opacity: frame > 80 ? 1 : 0}}>MINIMALIST BRUTALISM</div>
        <Hanko size={110} style={{position: 'absolute', right: 520, top: 250, opacity: frame >= slamAt ? 1 : 0, transform: `scale(${interpolate(slam, [0, 1], [1.9, 1])}) rotate(${interpolate(slam, [0, 1], [-10, -3])}deg)`}} />
      </AbsoluteFill>
    </Frame>
  );
};
