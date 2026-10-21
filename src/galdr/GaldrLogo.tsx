import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {galdrEase, progress} from '../shared/motion';
import {diagWipe} from '../shared/reveal';
import {PrimaryProps} from '../shared/Themed';
import {C, F, Frame} from './theme';
import {Crystal} from './Crystal';
import {FacetLines, Linework, RuneField, Stamp} from './parts';

/** Logo reveal 1920x1080: crystal outline draws, fills with light, wordmark wipes in. */
export const GaldrLogo: React.FC<PrimaryProps> = ({primary}) => {
  const frame = useCurrentFrame();
  const fill = progress(frame, 24, 64, galdrEase);
  const size = 420;
  const outline = progress(frame, 0, 30, galdrEase);
  const perim = 1400;

  return (
    <Frame primary={primary} style={{background: `radial-gradient(ellipse at 50% 40%, ${C.ink3}, ${C.ink} 70%)`}}>
      <FacetLines w={1920} h={1080} opacity={0.08} />
      <RuneField w={1920} h={1080} t={frame} seed={11} />
      <Linework w={1920} h={1080} cx={960} cy={400} r={290} t={frame} />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <div style={{position: 'relative', width: size, height: size, marginTop: -120}}>
          <svg width={size} height={size} viewBox="0 0 420 420" style={{position: 'absolute', inset: 0, opacity: 1 - fill}}>
            <polygon points="210,26 300,138 300,282 210,394 120,282 120,138" fill="none" stroke={C.primary} strokeWidth={2} strokeDasharray={perim} strokeDashoffset={perim * (1 - outline)} />
          </svg>
          <div style={{opacity: fill, clipPath: diagWipe(fill)}}>
            <Crystal size={size} angle={frame * 0.02 + 0.4} lightAngle={0.9 + Math.sin(frame * 0.04) * 0.6} />
          </div>
        </div>
        <div style={{marginTop: 20, fontFamily: F.display, fontWeight: 800, fontSize: 130, letterSpacing: 4, color: C.bone, clipPath: diagWipe(progress(frame, 56, 86, galdrEase))}}>
          GALDR<span style={{color: C.primary}}>.</span>
        </div>
        <div style={{marginTop: 8, fontFamily: F.mono, fontSize: 22, color: C.textMuted, letterSpacing: 6, opacity: progress(frame, 80, 104)}}>ARCHIVE · REV.01</div>
        <Stamp label="GD-0417" style={{marginTop: 36, opacity: progress(frame, 92, 112)}} />
      </AbsoluteFill>
    </Frame>
  );
};
