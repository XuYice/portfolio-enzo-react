import { SEAL } from '../i18n/content';

/** Red chop stamp (印章). `stamp` plays the press-down animation when its panel is seen. */
export function Seal({ big, stamp = true }: { big?: boolean; stamp?: boolean }) {
  const classes = ['seal', big && 'big', stamp && 'stamp'].filter(Boolean).join(' ');
  return (
    <span className={classes} title="桥 · qiáo · ponte">
      {SEAL}
    </span>
  );
}

/** SVG filter that roughens the seal's edges like real ink. Render once. */
export function RoughFilter() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <filter id="rough">
        <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves={2} result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale={3} />
      </filter>
    </svg>
  );
}
