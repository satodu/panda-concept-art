/* Sumi ink on water: a real bloom, not rings.
   Low-frequency noise is thresholded into a blot, a pale wash sits underneath, and a radial mask controls how far it has spread.
   Usage: suminagashi(el, {size: 700, seed: 3, grow: 1, animate: true})
   Same filters as src/shizuka/parts.tsx (Remotion) and tools/templates.mjs (SVG). */
(function () {
  window.suminagashi = function (el, o) {
    o = Object.assign({size: 700, seed: 1, grow: 1, animate: true}, o);
    const id = 'ink' + o.seed, k = 840 / o.size, rgb = '0 0 0 0 0.11 0 0 0 0 0.105 0 0 0 0 0.1';
    const wrap = document.createElement('div');
    wrap.innerHTML = `<svg width="${o.size}" height="${o.size}" viewBox="0 0 ${o.size} ${o.size}" style="overflow:visible;mix-blend-mode:multiply">
      <defs>
        <radialGradient id="${id}m"><stop offset="0" stop-color="#fff"/><stop offset="${0.5 * o.grow}" stop-color="#fff" stop-opacity=".8"/><stop offset="${0.98 * o.grow}" stop-color="#fff" stop-opacity="0"/></radialGradient>
        <mask id="${id}k"><rect width="${o.size}" height="${o.size}" fill="url(#${id}m)"/></mask>
        <filter id="${id}c" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
          <feTurbulence id="${id}n1" type="fractalNoise" baseFrequency="${0.0042 * k} ${0.006 * k}" numOctaves="5" seed="${o.seed * 7}" result="n"/>
          <feColorMatrix in="n" values="${rgb} 11 0 0 0 -4.7" result="b"/>
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="${o.seed + 3}" result="r"/>
          <feDisplacementMap in="b" in2="r" scale="26"/></filter>
        <filter id="${id}w" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
          <feTurbulence id="${id}n2" type="fractalNoise" baseFrequency="${0.0038 * k} ${0.0054 * k}" numOctaves="4" seed="${o.seed * 7}" result="n"/>
          <feColorMatrix in="n" values="${rgb} 3.2 0 0 0 -1.15"/><feGaussianBlur stdDeviation="6"/></filter>
      </defs>
      <g mask="url(#${id}k)"><rect width="${o.size}" height="${o.size}" filter="url(#${id}w)" opacity=".12"/><rect width="${o.size}" height="${o.size}" filter="url(#${id}c)" opacity=".94"/></g></svg>`;
    const svg = wrap.firstElementChild;
    el.appendChild(svg);
    if (o.animate && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const n1 = svg.querySelector('#' + id + 'n1'), n2 = svg.querySelector('#' + id + 'n2'), t0 = performance.now();
      (function loop(now) {
        const t = (now - t0) / 2300;
        n1.setAttribute('baseFrequency', `${(0.0042 + 0.0004 * Math.sin(t * 0.9 + o.seed)) * k} ${(0.006 + 0.0005 * Math.cos(t * 0.7 + o.seed)) * k}`);
        requestAnimationFrame(loop);
      })(t0);
    }
    return svg;
  };
})();
