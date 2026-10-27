import { useEffect, useRef, useState } from 'react';

/**
 * 灯笼串: a string of lanterns under the nav, one per item. Only the current section's lantern is
 * lit; on a change the light runs along the lanterns in between (each flares briefly, then goes
 * out) and settles on the new one.
 */
export function Lanterns({ xs, active }: { xs: number[]; active: number }) {
  const [lit, setLit] = useState(active);
  const litRef = useRef(active);

  useEffect(() => {
    const from = litRef.current;
    if (from === active) return;
    const dir = active > from ? 1 : -1;
    const timers: number[] = [];
    for (let k = from + dir, n = 1; dir > 0 ? k <= active : k >= active; k += dir, n++) {
      const idx = k;
      timers.push(window.setTimeout(() => {
        litRef.current = idx;
        setLit(idx);
      }, n * 120));
    }
    return () => timers.forEach(clearTimeout);
  }, [active]);

  if (xs.length === 0) return null;
  const first = xs[0];
  const last = xs[xs.length - 1];
  // rope sagging between lanterns
  let rope = `M${first - 28} 1`;
  xs.forEach((x, j) => {
    const px = j ? xs[j - 1] : first - 28;
    rope += ` Q${(px + x) / 2} 9 ${x} 3`;
  });
  rope += ` Q${last + 14} 9 ${last + 28} 1`;

  return (
    <div className="lanterns" aria-hidden="true">
      <svg className="lantern-rope" overflow="visible">
        <path d={rope} />
      </svg>
      {xs.map((x, j) => (
        <div key={j} className={j === lit ? 'lantern-slot lit' : 'lantern-slot'} style={{ left: x - 9 }}>
          <Lantern />
        </div>
      ))}
    </div>
  );
}

function Lantern() {
  return (
    <svg className="lantern" viewBox="0 0 20 32" overflow="visible">
      <circle className="l-glow" cx="10" cy="15" r="17" />
      <path className="l-string" d="M10 0 V4.5" />
      <rect className="l-cap" x="6" y="4" width="8" height="2.6" rx="1" />
      <ellipse className="l-body" cx="10" cy="14.2" rx="8" ry="7.6" />
      <ellipse className="l-rib" cx="10" cy="14.2" rx="4.2" ry="7.6" />
      <path className="l-rib" d="M10 6.6 V21.8" />
      <rect className="l-cap" x="6.6" y="21.2" width="6.8" height="2.2" rx=".8" />
      <path className="l-tassel" d="M10 23.4 V31 M8.6 25 V30 M11.4 25 V30" />
    </svg>
  );
}
