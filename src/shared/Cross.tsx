import React from 'react';

/** Row of registration crosses "+ + + +". */
export const Crosses: React.FC<{
  count?: number;
  color: string;
  size?: number;
  gap?: number;
  opacity?: number;
  style?: React.CSSProperties;
}> = ({count = 6, color, size = 14, gap = 22, opacity = 0.35, style}) => (
  <div
    style={{
      display: 'flex',
      gap,
      color,
      opacity,
      fontFamily: 'monospace',
      fontSize: size,
      lineHeight: 1,
      ...style,
    }}
  >
    {Array.from({length: count}).map((_, i) => (
      <span key={i}>+</span>
    ))}
  </div>
);

/** Dot-matrix background using a CSS radial gradient. */
export const dotGrid = (color: string, step = 22, r = 1): React.CSSProperties => ({
  backgroundImage: `radial-gradient(${color} ${r}px, transparent ${r + 0.5}px)`,
  backgroundSize: `${step}px ${step}px`,
});
