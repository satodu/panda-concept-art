import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {galdrEase, progress} from '../shared/motion';
import {diagWipe} from '../shared/reveal';
import {PrimaryProps} from '../shared/Themed';
import {C, F, Frame, chamferClip} from './theme';
import {FacetLines, Linework, RuneField, MohsGauge, Panel, Stamp} from './parts';

const Btn: React.FC<{label: string; on?: number}> = ({label, on = 0}) => (
  <div style={{clipPath: chamferClip(14), background: on > 0.5 ? C.primary : C.ink2, color: on > 0.5 ? C.ink : C.primary, fontFamily: F.display, fontWeight: 800, fontSize: 30, letterSpacing: 4, padding: '18px 38px'}}>{label}</div>
);

/** Component showcase 1920x1080: button, toast, loader, gauge, toggle, filter. */
export const GaldrComponents: React.FC<PrimaryProps> = ({primary}) => {
  const frame = useCurrentFrame();
  const hover = progress(frame, 40, 44) - progress(frame, 90, 94);
  const load = progress(frame, 20, 150, galdrEase);
  const mohs = progress(frame, 40, 120, galdrEase) * 7;
  const toast = progress(frame, 100, 124, galdrEase) - progress(frame, 200, 220, galdrEase);
  const sel = Math.floor(frame / 40) % 3;

  return (
    <Frame primary={primary}>
      <FacetLines w={1920} h={1080} opacity={0.07} />
      <RuneField w={1920} h={1080} t={frame} seed={13} />
      <Linework w={1920} h={1080} ring={false} t={frame} />
      <AbsoluteFill style={{padding: 90, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36}}>
        <div style={{clipPath: diagWipe(progress(frame, 0, 24, galdrEase))}}>
          <Panel w={820} h={400} variant="ink">
            <div style={{fontFamily: F.mono, fontSize: 15, color: C.textMuted, letterSpacing: 3}}>ACTIONS</div>
            <div style={{display: 'flex', gap: 24, marginTop: 36}}>
              <Btn label="CANCEL" />
              <Btn label="ADD" on={Math.max(0, hover)} />
            </div>
            <div style={{display: 'flex', gap: 14, marginTop: 44}}>
              {['QUARTZ', 'FLUORITE', 'BERYL'].map((t, i) => (
                <div key={t} style={{fontFamily: F.mono, fontSize: 18, letterSpacing: 2, padding: '10px 18px', clipPath: chamferClip(8), background: i === sel ? C.primarySoft : C.ink3, color: i === sel ? C.primary : C.textMuted}}>{t}</div>
              ))}
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 20, marginTop: 44}}>
              <div style={{width: 76, height: 38, clipPath: chamferClip(8), background: C.ink3, position: 'relative'}}>
                <div style={{position: 'absolute', top: 5, left: 5 + (progress(frame, 70, 76)) * 38, width: 28, height: 28, background: C.primary}} />
              </div>
              <span style={{fontFamily: F.body, fontSize: 22, color: C.bone}}>Show scale</span>
            </div>
          </Panel>
        </div>

        <div style={{clipPath: diagWipe(progress(frame, 6, 30, galdrEase))}}>
          <Panel w={820} h={400} variant="bone" filet>
            <div style={{fontFamily: F.mono, fontSize: 15, color: C.boneMuted, letterSpacing: 3}}>ANALYSIS</div>
            <div style={{display: 'flex', alignItems: 'flex-end', gap: 30, marginTop: 20}}>
              <MohsGauge value={mohs} size={220} />
              <div style={{fontFamily: F.display, fontWeight: 800, fontSize: 120, color: C.boneInk, lineHeight: 1}}>{mohs.toFixed(1)}</div>
            </div>
            <div style={{height: 6, background: 'rgba(20,17,12,0.15)', marginTop: 40}}>
              <div style={{height: '100%', width: `${load * 100}%`, background: C.primary}} />
            </div>
            <div style={{fontFamily: F.mono, fontSize: 16, color: C.boneMuted, marginTop: 10, letterSpacing: 2}}>SPECTRUM {Math.round(load * 100)}%</div>
          </Panel>
        </div>

        <div style={{gridColumn: '1 / 3', position: 'relative'}}>
          <div style={{position: 'absolute', right: 0, top: 0, transform: `translateY(${(1 - toast) * 40}px)`, opacity: toast}}>
            <Panel w={760} h={130} variant="ink" filet>
              <div style={{display: 'flex', alignItems: 'center', gap: 24, height: '100%'}}>
                <Stamp label="GD-0417" size={24} />
                <span style={{fontFamily: F.body, fontSize: 24, color: C.bone}}>Shard added to the collection.</span>
              </div>
            </Panel>
          </div>
        </div>
      </AbsoluteFill>
    </Frame>
  );
};
