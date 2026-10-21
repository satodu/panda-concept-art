import React from 'react';
import tokens from '../../oriental-brutalismo/tokens/tokens.json';
import {fonts} from '../shared/fonts';
import {Themed, PrimaryProps} from '../shared/Themed';

export const T = tokens;
/** Primary-dependent keys are CSS variables: swap `primary` and the whole art follows. */
export const C = {
  ...tokens.color,
  primary: 'var(--primary)',
  primarySoft: 'var(--primary-soft)',
  primaryGlow: 'var(--primary-glow)',
  onPrimary: 'var(--on-primary)',
};
export const F = {
  display: fonts.archivo,
  body: fonts.space,
  mono: fonts.jetbrains,
  jp: fonts.notoJp,
};

export const Frame: React.FC<PrimaryProps & {children: React.ReactNode; style?: React.CSSProperties}> = ({primary, children, style}) => (
  <Themed primary={primary ?? tokens.color.primary} softPct={12} glowPct={45} onDark={tokens.color.black} onLight={tokens.color.onPrimary} style={{background: C.canvas, ...style}}>
    {children}
  </Themed>
);
