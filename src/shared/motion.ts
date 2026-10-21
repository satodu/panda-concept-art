import {Easing, interpolate} from 'remotion';

export const outExpo = Easing.bezier(0.22, 1, 0.36, 1);
export const galdrEase = Easing.bezier(0.3, 0, 0, 1);
export const calmEase = Easing.bezier(0.25, 0.1, 0.25, 1);

/** 0..1 progress between two frames, clamped, with easing. */
export const progress = (
  frame: number,
  from: number,
  to: number,
  easing: (t: number) => number = outExpo,
) =>
  interpolate(frame, [from, to], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

/** Stagger helper: start frame of item i. */
export const stagger = (base: number, i: number, step = 6) => base + i * step;

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
