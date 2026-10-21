import React from 'react';
import tokens from '../../shizuka/tokens/tokens.json';
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
  display: fonts.interTight,
  body: fonts.inter,
  mono: fonts.plexMono,
  jp: fonts.shippori,
};

export const Frame: React.FC<PrimaryProps & {children: React.ReactNode; style?: React.CSSProperties}> = ({primary, children, style}) => (
  <Themed primary={primary ?? tokens.color.primary} softPct={14} glowPct={30} onDark={tokens.color.black} onLight={tokens.color.white} style={{background: C.canvas, ...style}}>
    {children}
  </Themed>
);
