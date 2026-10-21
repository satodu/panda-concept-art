import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {galdrEase, progress} from '../shared/motion';
import {diagWipe} from '../shared/reveal';
import {PrimaryProps} from '../shared/Themed';
import {C, F, Frame} from './theme';
import {Crystal} from './Crystal';
import {FacetLines, Linework, RuneField, Panel, Stamp, Vertical} from './parts';

/** 1080x1350 portrait post: shard + pull quote. */
export const GaldrSocial: React.FC<PrimaryProps & {quote?: string; title?: string}> = ({
  primary,
  title = 'AMETHYST CLUSTER.',
  quote = 'The color comes from irradiated iron in the crystal structure.',
}) => {
  const frame = useCurrentFrame();
  return (
    <Frame primary={primary}>
      <FacetLines w={1080} h={1350} opacity={0.09} />
      <RuneField w={1080} h={1350} t={frame} seed={9} />
      <Linework w={1080} h={1350} cx={540} cy={470} r={300} t={frame} />
      <div style={{position: 'absolute', left: 70, top: 64, fontFamily: F.mono, fontSize: 22, color: C.textMuted, letterSpacing: 3, opacity: progress(frame, 0, 14)}}>GALDR · #07</div>
      <div style={{position: 'absolute', left: 220, top: 70, opacity: progress(frame, 0, 24), clipPath: diagWipe(progress(frame, 0, 24, galdrEase))}}>
        <Crystal size={640} angle={frame * 0.016 + 0.3} lightAngle={0.8 + Math.sin(frame * 0.03) * 0.6} />
      </div>
      <div style={{position: 'absolute', left: 290, top: 640, width: 500, height: 80, background: `linear-gradient(${C.ink3}, ${C.ink})`, borderTop: `1px solid ${C.hairlineStrong}`}} />
      <div style={{position: 'absolute', left: 60, bottom: 60, clipPath: diagWipe(progress(frame, 24, 56, galdrEase))}}>
        <Panel w={960} h={470} variant="bone" chamfer={36} filet>
          <Vertical text="ᚨᛗᛖᚦᛁᛊᛏ" size={50} style={{position: 'absolute', right: 40, top: 40}} />
          <Stamp label="GD-0417" size={26} onLight />
          <div style={{fontFamily: F.display, fontWeight: 800, fontSize: 96, lineHeight: 0.95, color: C.boneInk, marginTop: 24, width: 620}}>{title}</div>
          <div style={{fontFamily: F.editorial, fontSize: 30, lineHeight: 1.6, color: C.boneInk, marginTop: 22, width: 760}}>“{quote}”</div>
        </Panel>
      </div>
    </Frame>
  );
};
