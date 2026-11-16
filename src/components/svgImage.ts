import type { ReactElement } from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';

/**
 * Renders an SVG element once and returns it as a data-URI image.
 *
 * Heavy SVG filters (feTurbulence ink texture, large blurs) are recomputed on every repaint when
 * the SVG is inline — and the scroll repaints every frame while it unrolls or slides. As an <img>,
 * the browser rasterizes the filters once and then just draws the bitmap.
 *
 * Call at module load (not during a React render): it mounts a throwaway root synchronously.
 * The root <svg> must carry xmlns="http://www.w3.org/2000/svg". Web fonts aren't available inside
 * an image, so keep text out of it.
 */
export function svgDataUri(el: ReactElement): string {
  const host = document.createElement('div');
  const root = createRoot(host);
  flushSync(() => root.render(el));
  const markup = host.innerHTML;
  root.unmount();
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`;
}
