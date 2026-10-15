const INK = '#24211d';

// The deck is a quadratic curve from (300,292) through control (480,180) to (660,292).
const DECK = 'M300 292 Q480 180 660 292';
const POSTS = Array.from({ length: 11 }, (_, i) => {
  const t = (i + 1) / 12;
  return { x: 300 + 360 * t, y: 292 - 224 * t * (1 - t) };
});

/** Ink-wash scene: Chinese karst peaks ← moon bridge → Pão de Açúcar, with a walker crossing. */
export function Landscape() {
  return (
    <svg viewBox="0 0 1000 340" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <defs>
        <filter id="ink">
          <feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves={3} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={7} />
        </filter>
        <filter id="soft"><feGaussianBlur stdDeviation={2.5} /></filter>
        <linearGradient id="mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={INK} stopOpacity=".55" />
          <stop offset="1" stopColor={INK} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="mist2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={INK} stopOpacity=".9" />
          <stop offset="1" stopColor={INK} stopOpacity=".15" />
        </linearGradient>
      </defs>

      <circle cx="770" cy="70" r="34" fill="#b3322a" opacity=".85" />

      {/* China: pointed karst peaks */}
      <path d="M0 270 L40 200 L70 222 L120 95 L165 205 L205 150 L250 230 L300 200 L360 265 L420 280 L0 285Z" fill="url(#mist)" filter="url(#soft)" opacity=".7" />
      <path d="M-10 295 Q30 210 70 245 Q110 120 155 230 Q185 190 215 255 Q255 215 300 285 L-10 300Z" fill="url(#mist2)" filter="url(#ink)" />

      {/* Brasil: Pão de Açúcar + Morro da Urca + cable car */}
      <path d="M560 290 Q660 225 780 265 Q880 215 1010 255 L1010 300 L560 300Z" fill="url(#mist)" filter="url(#soft)" opacity=".7" />
      <path d="M650 292 Q662 262 698 256 Q732 256 748 292Z" fill="url(#mist2)" filter="url(#ink)" />
      <path d="M762 292 Q768 168 832 148 Q886 146 900 218 Q910 272 950 292Z" fill="url(#mist2)" filter="url(#ink)" />
      <path d="M718 258 L834 150" stroke={INK} strokeWidth="1" opacity=".55" />
      <rect x="772" y="203" width="7" height="6" fill={INK} opacity=".75" />

      {/* water */}
      <g stroke={INK} strokeLinecap="round" opacity=".18">
        <path d="M40 310 H180" strokeWidth="2" />
        <path d="M230 322 H330" strokeWidth="1.5" />
        <path d="M680 314 H860" strokeWidth="2" />
        <path d="M780 328 H900" strokeWidth="1.5" />
        <path d="M90 334 H200" strokeWidth="1.2" />
      </g>

      {/* moon bridge + its reflection */}
      <path d="M300 292 Q480 404 660 292" fill="none" stroke={INK} strokeWidth="3" opacity=".13" />
      <path id="deck" d={DECK} fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" filter="url(#ink)" />
      <path d="M300 274 Q480 162 660 274" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      <g stroke={INK} strokeWidth="2">
        {POSTS.map(({ x, y }) => <line key={x} x1={x} y1={y} x2={x} y2={y - 18} />)}
      </g>

      {/* walker: goes across, pauses, comes back */}
      <g fill={INK}>
        <g transform="translate(0,-3)">
          <circle cx="0" cy="-19" r="3.6" />
          <path d="M-3 -15 L3 -15 L4 -4 L-4 -4Z" />
          <path d="M-2 -4 L-3 0 M2 -4 L3 0" stroke={INK} strokeWidth="2" />
          <path d="M-5 -13 Q0 -16 5 -13" stroke="#b3322a" strokeWidth="2" fill="none" />
        </g>
        <animateMotion dur="16s" repeatCount="indefinite" keyPoints="0;1;1;0;0" keyTimes="0;.45;.5;.95;1" calcMode="linear">
          <mpath href="#deck" />
        </animateMotion>
      </g>

      <text x="120" y="330" fontFamily="Ma Shan Zheng" fontSize="26" fill={INK} opacity=".6">中国</text>
      <text x="800" y="335" fontFamily="Ma Shan Zheng" fontSize="26" fill={INK} opacity=".6">Brasil</text>
    </svg>
  );
}
