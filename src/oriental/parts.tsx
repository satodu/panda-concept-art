import React from 'react';
import {C, F, T} from './theme';

export const Hanko: React.FC<{size?: number; text?: string[]; style?: React.CSSProperties}> = ({
  size = 96,
  text = ['間', '禅'],
  style,
}) => (
  <div
    style={{
      width: size,
      height: size,
      border: `${Math.max(3, size / 24)}px solid ${C.primary}`,
      background: C.primarySoft,
      color: C.primary,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr 1fr',
      alignItems: 'center',
      justifyItems: 'center',
      fontFamily: F.jp,
      fontWeight: 700,
      fontSize: size * 0.34,
      lineHeight: 1,
      padding: size * 0.06,
      boxSizing: 'border-box',
      ...style,
    }}
  >
    {[text[0], text[1], text[1], text[0]].map((t, i) => (
      <span key={i}>{t}</span>
    ))}
  </div>
);

export const Tategaki: React.FC<{text: string; size?: number; color?: string; style?: React.CSSProperties}> = ({
  text,
  size = 34,
  color = C.text,
  style,
}) => (
  <div
    style={{
      writingMode: 'vertical-rl',
      fontFamily: F.jp,
      fontWeight: 300,
      fontSize: size,
      letterSpacing: size * 0.35,
      color,
      ...style,
    }}
  >
    {text}
  </div>
);

export const Tag: React.FC<{children: React.ReactNode; accent?: boolean; style?: React.CSSProperties}> = ({
  children,
  accent,
  style,
}) => (
  <span
    style={{
      fontFamily: F.mono,
      fontSize: 15,
      letterSpacing: 1,
      padding: '6px 14px',
      borderRadius: 999,
      border: `1px solid ${accent ? C.primary : C.hairlineStrong}`,
      color: accent ? C.primary : C.textMuted,
      background: accent ? C.primarySoft : 'transparent',
      whiteSpace: 'nowrap',
      ...style,
    }}
  >
    {children}
  </span>
);

export const Card: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  label?: string;
  tag?: string;
}> = ({children, style, label, tag}) => (
  <div
    style={{
      background: C.surface1,
      border: `1px solid ${C.hairline}`,
      borderRadius: T.radius.card,
      padding: T.space.pad,
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
      ...style,
    }}
  >
    {(label || tag) && (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: F.mono,
          fontSize: 15,
          color: C.textMuted,
          letterSpacing: 1.5,
          marginBottom: 18,
        }}
      >
        <span>{label}</span>
        <span>{tag}</span>
      </div>
    )}
    {children}
  </div>
);
