/** Motion vocabulary shared by all concepts. Each concept picks its own signature. */

/** Hard left-to-right wipe (Oriental). p: 0..1 */
export const wipeX = (p: number) => `inset(0 ${(1 - p) * 100}% 0 0)`;
/** Hard bottom-to-top wipe (Oriental letters). */
export const wipeUp = (p: number) => `inset(${(1 - p) * 100}% 0 0 0)`;
/** Diagonal 45deg-ish wipe (Galdr chamfer). */
export const diagWipe = (p: number) => {
  const x = p * 140 - 20;
  return `polygon(0 0, ${x + 20}% 0, ${x}% 100%, 0 100%)`;
};
/** Decaying camera shake. Returns [dx, dy] px. */
export const shake = (frame: number, start: number, dur = 9, amp = 10): [number, number] => {
  const t = frame - start;
  if (t < 0 || t > dur) return [0, 0];
  const k = 1 - t / dur;
  return [Math.sin(t * 7.3) * amp * k, Math.cos(t * 9.1) * amp * k * 0.7];
};
/** Quantise to steps (mechanical counters). */
export const quant = (v: number, step: number) => Math.round(v / step) * step;
/** Slow blur-in (Shizuka). */
export const blurIn = (p: number, px = 12) => `blur(${(1 - p) * px}px)`;
/** Breathing 0..1 on a 5.2s cycle at 30fps. */
export const breathe = (frame: number, seconds = 5.2, fps = 30) => (Math.sin((frame / fps) * ((Math.PI * 2) / seconds)) + 1) / 2;
