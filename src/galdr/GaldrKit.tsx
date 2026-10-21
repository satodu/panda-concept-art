import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {galdrEase, progress} from '../shared/motion';
import {diagWipe} from '../shared/reveal';
import {PrimaryProps} from '../shared/Themed';
import {C, F, Frame, chamferClip} from './theme';
import {FacetLines, Linework, Panel, RuneField} from './parts';

const W = 568;
const H = 290;
const label = {fontFamily: F.mono, fontSize: 14, letterSpacing: 3, color: C.textMuted, textTransform: 'uppercase'} as React.CSSProperties;
const rune = {fontFamily: F.rune, fontSize: 22, color: C.primary} as React.CSSProperties;

const Cell: React.FC<{i: number; frame: number; title: string; r: string; variant?: 'ink' | 'bone'; children: React.ReactNode}> = ({i, frame, title, r, variant = 'ink', children}) => (
  <div style={{clipPath: diagWipe(progress(frame, i * 5, i * 5 + 24, galdrEase))}}>
    <Panel w={W} h={H} variant={variant} rune={r}>
      <div style={{...label, color: variant === 'bone' ? C.boneMuted : C.textMuted}}>{title}</div>
      <div style={{marginTop: 22}}>{children}</div>
    </Panel>
  </div>
);

const Diamond: React.FC<{on?: boolean; size?: number}> = ({on, size = 18}) => (
  <svg width={size} height={size} viewBox="0 0 18 18">
    <polygon points="9,1 17,9 9,17 1,9" fill={on ? C.primary : 'none'} stroke={on ? C.primary : C.hairlineStrong} strokeWidth={1.5} />
  </svg>
);

export const GaldrKit: React.FC<PrimaryProps> = ({primary}) => {
  const frame = useCurrentFrame();
  const tab = Math.floor(frame / 50) % 3;
  const slide = interpolate(frame, [30, 170], [0.1, 0.7], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: galdrEase});
  const step = Math.min(3, Math.floor(frame / 45));
  const typed = 'amethy'.slice(0, Math.max(0, Math.min(6, Math.floor((frame - 20) / 8))));
  const seg = Math.floor(frame / 60) % 3;
  const row = Math.floor(frame / 40) % 4;
  const open = Math.floor(frame / 90) % 2;

  const tabs = [['ᚨ', 'OVERVIEW'], ['ᛊ', 'SPECTRUM'], ['ᛏ', 'LOG']];
  const steps = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ'];
  const rows = [['GD-0417', 'AMETHYST', '7.0'], ['GD-0388', 'QUARTZ', '7.0'], ['GD-0291', 'FLUORITE', '4.0'], ['GD-0102', 'BERYL', '7.5']];

  return (
    <Frame primary={primary}>
      <FacetLines w={1920} h={1080} opacity={0.06} />
      <RuneField w={1920} h={1080} t={frame} seed={21} count={11} />
      <Linework w={1920} h={1080} ring={false} t={frame} />
      <AbsoluteFill style={{padding: '70px 76px', display: 'grid', gridTemplateColumns: `repeat(3, ${W}px)`, gridTemplateRows: `repeat(3, ${H}px)`, gap: 24, justifyContent: 'center', alignContent: 'center'}}>
        {/* 1 tabs */}
        <Cell i={0} frame={frame} title="tabs" r={'ᚨ'}>
          <div style={{display: 'flex', gap: 28, borderBottom: `1px solid ${C.hairline}`, position: 'relative'}}>
            {tabs.map(([g, t], i) => (
              <div key={t} style={{paddingBottom: 14, color: i === tab ? C.bone : C.textMuted, fontFamily: F.mono, fontSize: 18, letterSpacing: 2}}>
                <span style={{...rune, fontSize: 20, marginRight: 8, opacity: i === tab ? 1 : 0.4}}>{g}</span>{t}
              </div>
            ))}
            <div style={{position: 'absolute', bottom: -1, left: tab * 172, width: 150, height: 2, background: C.primary, transition: 'none'}} />
          </div>
          <div style={{marginTop: 24, fontFamily: F.editorial, fontSize: 19, color: C.bone, lineHeight: 1.6}}>Cluster of prismatic purple quartz. Read the plate, then the spectrum.</div>
        </Cell>

        {/* 2 slider */}
        <Cell i={1} frame={frame} title="slider · hardness" r={'ᚷ'}>
          <div style={{position: 'relative', height: 70, marginTop: 20}}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 30, height: 2, background: C.hairlineStrong}} />
            <div style={{position: 'absolute', left: 0, top: 30, height: 2, width: `${slide * 100}%`, background: C.primary}} />
            {Array.from({length: 11}).map((_, i) => (
              <div key={i} style={{position: 'absolute', left: `${i * 10}%`, top: 40, width: 1, height: i % 5 === 0 ? 14 : 8, background: C.hairlineStrong}} />
            ))}
            <div style={{position: 'absolute', left: `${slide * 100}%`, top: 18, marginLeft: -12}}><Diamond on size={24} /></div>
            <div style={{position: 'absolute', left: `${slide * 100}%`, top: -14, marginLeft: -22, fontFamily: F.mono, fontSize: 20, color: C.primary}}>{(slide * 10).toFixed(1)}</div>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', ...label}}><span>talc 1</span><span>quartz 7</span><span>diamond 10</span></div>
        </Cell>

        {/* 3 stepper */}
        <Cell i={2} frame={frame} title="stepper" r={'ᚱ'}>
          <div style={{display: 'flex', alignItems: 'center', marginTop: 24}}>
            {steps.map((g, i) => (
              <React.Fragment key={g}>
                <div style={{width: 54, height: 54, clipPath: chamferClip(12), background: i <= step ? C.primary : C.ink3, color: i <= step ? C.onPrimary : C.textMuted, display: 'grid', placeItems: 'center', fontFamily: F.rune, fontSize: 26}}>{g}</div>
                {i < 3 && <div style={{flex: 1, height: 2, background: i < step ? C.primary : C.hairlineStrong}} />}
              </React.Fragment>
            ))}
          </div>
          <div style={{marginTop: 26, display: 'flex', justifyContent: 'space-between', ...label}}><span>carve</span><span>polish</span><span>seal</span><span>read</span></div>
        </Cell>

        {/* 4 search */}
        <Cell i={3} frame={frame} title="search" r={'ᚲ'}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, height: 54, background: C.ink3, clipPath: chamferClip(8), padding: '0 18px', boxShadow: `inset 2px 0 0 ${C.primary}`}}>
            <span style={rune}>{'ᚲ'}</span>
            <span style={{fontFamily: F.body, fontSize: 20, color: C.bone}}>{typed}<span style={{opacity: Math.floor(frame / 12) % 2, color: C.primary}}>|</span></span>
          </div>
          {['AMETHYST CLUSTER', 'AMETHYST GEODE'].map((t, i) => (
            <div key={t} style={{display: 'flex', justifyContent: 'space-between', padding: '12px 4px', borderBottom: `1px solid ${C.hairline}`, color: i === 0 && typed.length > 3 ? C.primary : C.textMuted, fontFamily: F.mono, fontSize: 15, letterSpacing: 2, opacity: typed.length > 3 ? 1 : 0.2}}>
              <span>{t}</span><span>GD-0{417 - i * 29}</span>
            </div>
          ))}
        </Cell>

        {/* 5 segmented + checks */}
        <Cell i={4} frame={frame} title="segmented · checks" r={'ᛁ'}>
          <div style={{display: 'flex', gap: 6}}>
            {['GRID', 'LIST', 'MAP'].map((t, i) => (
              <div key={t} style={{flex: 1, textAlign: 'center', padding: '12px 0', clipPath: chamferClip(8), background: i === seg ? C.primary : C.ink3, color: i === seg ? C.onPrimary : C.textMuted, fontFamily: F.mono, fontSize: 16, letterSpacing: 3}}>{t}</div>
            ))}
          </div>
          <div style={{display: 'flex', gap: 28, marginTop: 28, alignItems: 'center'}}>
            {['facets', 'halo', 'runes'].map((t, i) => (
              <div key={t} style={{display: 'flex', alignItems: 'center', gap: 10, fontFamily: F.body, fontSize: 18, color: C.bone}}><Diamond on={i !== 1 || seg === 1} />{t}</div>
            ))}
          </div>
          <div style={{display: 'flex', gap: 24, marginTop: 22}}>
            {['dark', 'bone'].map((t, i) => (
              <div key={t} style={{display: 'flex', alignItems: 'center', gap: 10, fontFamily: F.body, fontSize: 18, color: C.bone}}>
                <div style={{width: 18, height: 18, borderRadius: '50%', border: `1.5px solid ${i === 0 ? C.primary : C.hairlineStrong}`, display: 'grid', placeItems: 'center'}}>{i === 0 && <div style={{width: 8, height: 8, borderRadius: '50%', background: C.primary}} />}</div>{t}
              </div>
            ))}
          </div>
        </Cell>

        {/* 6 table (bone) */}
        <Cell i={5} frame={frame} title="table" r={'ᛊ'} variant="bone">
          {rows.map(([id, n, m], i) => (
            <div key={id} style={{display: 'flex', justifyContent: 'space-between', padding: '11px 6px', borderTop: '1px solid rgba(20,17,12,0.2)', background: i === row ? 'rgba(20,17,12,0.07)' : 'transparent', boxShadow: i === row ? `inset 2px 0 0 ${C.primary}` : 'none', fontFamily: F.mono, fontSize: 17, color: C.boneInk}}>
              <span>{id}</span><span>{n}</span><span>{m}</span>
            </div>
          ))}
        </Cell>

        {/* 7 tooltip + notice */}
        <Cell i={6} frame={frame} title="tooltip · notice" r={'ᚾ'}>
          <div style={{position: 'relative', height: 92}}>
            <div style={{position: 'absolute', left: 40, top: 40}}><Diamond on size={20} /></div>
            <div style={{position: 'absolute', left: 70, top: 8, clipPath: chamferClip(6), background: C.ink3, boxShadow: `inset 0 0 0 1px ${C.hairlineStrong}`, padding: '10px 16px', fontFamily: F.mono, fontSize: 14, color: C.bone, letterSpacing: 1, opacity: progress(frame, 20, 34)}}>Mohs 7.0 · vitreous luster</div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '14px 16px', background: C.ink3, clipPath: chamferClip(8), boxShadow: `inset 2px 0 0 ${C.bone}`}}>
            <span style={{...rune, color: C.bone}}>{'ᚾ'}</span>
            <span style={{fontFamily: F.mono, fontSize: 15, color: C.bone, letterSpacing: 1}}>ERROR — Shard GD-9999 not found.</span>
          </div>
        </Cell>

        {/* 8 tiers */}
        <Cell i={7} frame={frame} title="tiers" r={'ᛏ'}>
          <div style={{display: 'flex', gap: 22, alignItems: 'center', marginTop: 10}}>
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} style={{textAlign: 'center', fontFamily: F.mono, fontSize: 14, color: C.textMuted, letterSpacing: 2}}>
                <svg width={70} height={86} viewBox="0 0 70 86">
                  {Array.from({length: Math.min(n, 3)}).map((_, k) => (
                    <polygon key={k} points="35,4 62,30 35,56 8,30" transform={`translate(0 ${k * 8})`} fill={k === Math.min(n, 3) - 1 ? C.primarySoft : 'none'} stroke={n >= 4 ? C.primary : C.bone} strokeOpacity={n >= 4 ? 1 : 0.55} strokeWidth={1.4} />
                  ))}
                  {n >= 5 && <circle cx={35} cy={34} r={30} fill="none" stroke={C.primary} strokeOpacity={0.4} strokeDasharray="2 5" />}
                </svg>
                <div>{['I', 'II', 'III', 'IV', 'V'][n - 1]}</div>
              </div>
            ))}
          </div>
        </Cell>

        {/* 9 accordion + pagination */}
        <Cell i={8} frame={frame} title="accordion · pages" r={'ᛞ'}>
          {['Provenance', 'Spectrum notes'].map((t, i) => (
            <div key={t} style={{borderTop: `1px solid ${C.hairline}`, padding: '12px 4px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: F.body, fontSize: 19, color: C.bone}}><span>{t}</span><span style={{fontFamily: F.mono, color: C.primary}}>{open === i ? '−' : '+'}</span></div>
              {open === i && <div style={{fontFamily: F.editorial, fontSize: 16, color: C.textMuted, marginTop: 8}}>Collected 1984, acquired 1991, digitized 2024.</div>}
            </div>
          ))}
          <div style={{display: 'flex', gap: 18, marginTop: 14, fontFamily: F.mono, fontSize: 17, color: C.textMuted, alignItems: 'center'}}>
            <span>‹</span>{['01', '02', '03'].map((p, i) => <span key={p} style={{color: i === open ? C.primary : C.textMuted, borderBottom: i === open ? `2px solid ${C.primary}` : 'none'}}>{p}</span>)}<span>…</span><span>›</span>
          </div>
        </Cell>
      </AbsoluteFill>
    </Frame>
  );
};
