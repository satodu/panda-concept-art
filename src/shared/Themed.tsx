import React from 'react';
import {AbsoluteFill} from 'remotion';

/**
 * Every art depends on ONE primary colour. Components never read the hex:
 * they read `var(--primary)` (via theme `C.primary`), so passing a different
 * `primary` prop re-themes the whole composition.
 */
const lum = (hex: string) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};
/** Text colour for use ON the primary: whichever of the concept's dark/light has more contrast. */
export const onColor = (primary: string, dark: string, light: string) => (ratio(primary, dark) >= ratio(primary, light) ? dark : light);

export const themeVars = (primary: string, softPct: number, glowPct: number, on: string): React.CSSProperties =>
  ({
    '--on-primary': on,
    '--primary': primary,
    '--primary-soft': `color-mix(in srgb, ${primary} ${softPct}%, transparent)`,
    '--primary-glow': `color-mix(in srgb, ${primary} ${glowPct}%, transparent)`,
  }) as React.CSSProperties;

export const Themed: React.FC<{
  primary: string;
  softPct: number;
  glowPct: number;
  onDark: string;
  onLight: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({primary, softPct, glowPct, onDark, onLight, children, style}) => (
  <AbsoluteFill style={{...themeVars(primary, softPct, glowPct, onColor(primary, onDark, onLight)), ...style}}>{children}</AbsoluteFill>
);

/** Props every composition accepts. */
export type PrimaryProps = {primary?: string};

/** Mix a theme colour with transparency, works with var() colours. */
export const mixA = (color: string, pct: number) => `color-mix(in srgb, ${color} ${pct}%, transparent)`;
