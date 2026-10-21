import React from 'react';
import tokens from '../../galdr/tokens/tokens.json';
import {fonts} from '../shared/fonts';
import {Themed, PrimaryProps} from '../shared/Themed';

export const T = tokens;
export const C = {
  ...tokens.color,
  primary: 'var(--primary)',
  primarySoft: 'var(--primary-soft)',
  primaryGlow: 'var(--primary-glow)',
  onPrimary: 'var(--on-primary)',
};
export const F = {
  display: fonts.bigShoulders,
  editorial: fonts.sourceSerif,
  rune: fonts.runic,
  body: fonts.inter,
  mono: fonts.plexMono,
};

/** Polygon points with 45deg cuts on top-right and bottom-left. */
export const chamferPoints = (w: number, h: number, c = T.geometry.chamfer) =>
  `0,0 ${w - c},0 ${w},${c} ${w},${h} ${c},${h} 0,${h - c}`;

export const chamferClip = (c = T.geometry.chamfer) =>
  `polygon(0 0, calc(100% - ${c}px) 0, 100% ${c}px, 100% 100%, ${c}px 100%, 0 calc(100% - ${c}px))`;

export const Frame: React.FC<PrimaryProps & {children: React.ReactNode; style?: React.CSSProperties}> = ({primary, children, style}) => (
  <Themed primary={primary ?? tokens.color.primary} softPct={25} glowPct={35} onDark={tokens.color.black} onLight={tokens.color.white} style={{background: C.ink, ...style}}>
    {children}
  </Themed>
);
