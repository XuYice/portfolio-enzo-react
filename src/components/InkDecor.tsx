/**
 * Ink-wash (水墨) decorations painted behind a panel's content: mountains, bamboo, plum branch,
 * wash stains, birds. Purely decorative, kept faint and at the edges so text stays readable.
 */
const INK = '#24211d';
const RED = '#b3322a';

export type InkKind = 'mountains' | 'bamboo' | 'plum' | 'wash' | 'birds' | 'night';

export function InkDecor({ kind }: { kind: InkKind }) {
  const Art = ART[kind];
  return (
    <div className={`ink ink-${kind}`} aria-hidden="true">
      <Art />
    </div>
  );
}

/* ---------- helpers ---------- */

/** Small deterministic PRNG so the hills look hand-made but identical on every render. */
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A soft mountain ridge from x=0 to x=w, closed down to `bottom`. */
function ridge(w: number, base: number, amp: number, seed: number, steps = 9, bottom = 400) {
  const r = rng(seed);
  const pts = Array.from({ length: steps + 1 }, (_, i) => [
    (i * w) / steps,
    base - amp * (0.25 + 0.75 * r()) * (i % 2 ? 1 : 0.55),
  ]);
  let d = `M0 ${bottom} L${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x, y] = pts[i];
    const [nx, ny] = pts[i + 1];
    d += ` Q${x} ${y} ${(x + nx) / 2} ${(y + ny) / 2}`;
  }
  const last = pts[pts.length - 1];
  return `${d} L${last[0]} ${last[1]} L${w} ${bottom} Z`;
}

function Filters({ id }: { id: string }) {
  return (
    <defs>
      <filter id={`${id}-ink`}>
        <feTurbulence type="fractalNoise" baseFrequency=".04" numOctaves={3} result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale={6} />
      </filter>
      <filter id={`${id}-soft`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation={3} />
      </filter>
      <filter id={`${id}-wash`} x="-50%" y="-50%" width="200%" height="200%">
        <feTurbulence type="fractalNoise" baseFrequency=".012" numOctaves={2} result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale={60} result="d" />
        <feGaussianBlur in="d" stdDeviation={14} />
      </filter>
      <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={INK} stopOpacity=".9" />
        <stop offset="1" stopColor={INK} stopOpacity="0" />
      </linearGradient>
    </defs>
  );
}

function Birds({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const b = (dx: number, dy: number, k: number) => (
    <path
      key={`${dx}-${dy}`}
      d={`M${dx} ${dy} q${5 * k} ${-5 * k} ${10 * k} 0 q${5 * k} ${-5 * k} ${10 * k} 0`}
      fill="none" stroke={INK} strokeWidth={1.6 * k} strokeLinecap="round"
    />
  );
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{[b(0, 0, 1), b(26, -14, 0.8), b(48, 6, 0.65)]}</g>;
}

/* ---------- pieces ---------- */

function Mountains() {
  return (
    <svg viewBox="0 0 1000 400" preserveAspectRatio="xMidYMax slice">
      <Filters id="mt" />
      <path d={ridge(1000, 220, 150, 7, 7)} fill="url(#mt-fade)" opacity=".35" filter="url(#mt-soft)" />
      <path d={ridge(1000, 285, 110, 21, 9)} fill="url(#mt-fade)" opacity=".55" filter="url(#mt-ink)" />
      <path d={ridge(1000, 345, 70, 42, 12)} fill="url(#mt-fade)" opacity=".8" filter="url(#mt-ink)" />
      <rect x="0" y="330" width="1000" height="70" fill="#f1e7d2" opacity=".55" filter="url(#mt-soft)" />
      <Birds x={720} y={110} s={1.4} />
    </svg>
  );
}

function Bamboo() {
  const stalk = (x: number, w: number, lean: number, segs: number[]) => {
    let y = 0;
    return (
      <g transform={`rotate(${lean} ${x} 600)`}>
        {segs.map((h, i) => {
          const el = (
            <g key={i}>
              <rect x={x} y={y} width={w} height={h - 5} rx={w / 3} fill={INK} opacity={0.75 - i * 0.04} />
              <path d={`M${x - 2} ${y + h - 3} h${w + 4}`} stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
            </g>
          );
          y += h;
          return el;
        })}
      </g>
    );
  };
  const leaf = (x: number, y: number, rot: number, len = 70) => (
    <path
      key={`${x}-${y}-${rot}`}
      d={`M0 0 Q${len * 0.4} ${-len * 0.13} ${len} 0 Q${len * 0.4} ${len * 0.13} 0 0Z`}
      transform={`translate(${x} ${y}) rotate(${rot})`}
      fill={INK}
    />
  );
  return (
    <svg viewBox="0 0 220 600" preserveAspectRatio="xMaxYMin meet">
      <Filters id="bb" />
      <g filter="url(#bb-ink)">
        {stalk(150, 13, 3, [110, 120, 115, 125, 130])}
        {stalk(186, 9, -2, [95, 105, 100, 110, 115, 90])}
        <g opacity=".85">
          {[leaf(150, 120, 150), leaf(150, 122, 175, 85), leaf(150, 124, 200, 60),
            leaf(186, 300, 160, 75), leaf(186, 302, 190, 90), leaf(186, 304, 215, 65),
            leaf(152, 360, 140, 80), leaf(152, 362, 165, 60)]}
        </g>
      </g>
    </svg>
  );
}

function Plum() {
  const flower = (x: number, y: number, r = 7) => (
    <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <circle key={a} cx={Math.cos((a * Math.PI) / 180) * r * 0.9} cy={Math.sin((a * Math.PI) / 180) * r * 0.9} r={r * 0.62} fill={RED} opacity=".7" />
      ))}
      <circle r={r * 0.28} fill="#7a1d17" />
    </g>
  );
  return (
    <svg viewBox="0 0 420 320" preserveAspectRatio="xMaxYMin meet">
      <Filters id="pl" />
      <g fill="none" stroke={INK} strokeLinecap="round" filter="url(#pl-ink)">
        <path d="M430 20 Q340 40 280 90 Q230 130 160 140" strokeWidth="9" />
        <path d="M280 90 Q270 150 300 210" strokeWidth="5" />
        <path d="M160 140 Q110 150 70 190" strokeWidth="4" />
        <path d="M215 132 Q200 90 220 60" strokeWidth="3" />
        <path d="M300 210 Q320 240 310 270" strokeWidth="2.5" />
      </g>
      {[flower(160, 140, 9), flower(120, 152), flower(74, 186, 8), flower(222, 62), flower(296, 206, 8),
        flower(312, 268, 6), flower(250, 112, 6)]}
      {[[190, 135], [95, 168], [265, 100], [305, 240]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="3.5" fill={RED} opacity=".6" />)}
    </svg>
  );
}

function Wash() {
  return (
    <svg viewBox="0 0 1000 600" preserveAspectRatio="none">
      <Filters id="ws" />
      <g filter="url(#ws-wash)" fill={INK}>
        <ellipse cx="960" cy="40" rx="220" ry="140" opacity=".5" />
        <ellipse cx="40" cy="590" rx="200" ry="120" opacity=".4" />
        <ellipse cx="900" cy="560" rx="90" ry="60" opacity=".25" />
      </g>
    </svg>
  );
}

function FlyingBirds() {
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMaxYMin meet">
      <Birds x={120} y={80} s={1.6} />
      <Birds x={260} y={130} s={1} />
    </svg>
  );
}

/** Pale ridges for the dark page background around the scroll. */
function Night() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="nt-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9dcc3" stopOpacity="1" />
          <stop offset="1" stopColor="#e9dcc3" stopOpacity="0" />
        </linearGradient>
        <filter id="nt-soft"><feGaussianBlur stdDeviation={6} /></filter>
        <radialGradient id="nt-moon">
          <stop offset="0" stopColor="#e9dcc3" stopOpacity=".5" />
          <stop offset="1" stopColor="#e9dcc3" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="1320" cy="150" r="160" fill="url(#nt-moon)" />
      <path d={ridge(1600, 640, 260, 3, 8, 900)} fill="url(#nt-fade)" opacity=".5" filter="url(#nt-soft)" />
      <path d={ridge(1600, 760, 200, 11, 11, 900)} fill="url(#nt-fade)" opacity=".7" filter="url(#nt-soft)" />
    </svg>
  );
}

const ART: Record<InkKind, () => JSX.Element> = {
  mountains: Mountains,
  bamboo: Bamboo,
  plum: Plum,
  wash: Wash,
  birds: FlyingBirds,
  night: Night,
};
