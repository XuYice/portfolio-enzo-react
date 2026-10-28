import { getContent, LANGS, SECTIONS } from './i18n/content';

/**
 * Warm up the web fonts before the scroll opens.
 *
 * Google serves Noto Serif SC as ~100 small unicode-range files per weight and only downloads a
 * file once a glyph from it appears on screen. On a fresh visit (browser caches are per site, so
 * localhost being fast doesn't help production) those downloads would start in the middle of the
 * unroll or of the slide to Projetos, and the text re-layout when they land makes the animation
 * stutter. Asking for every glyph the site uses up front moves all of that to the intro screen.
 */
const FACES = [
  '400 16px "Noto Serif SC"',
  '600 16px "Noto Serif SC"',
  '700 16px "Noto Serif SC"',
  '900 16px "Noto Serif SC"',
  '16px "Ma Shan Zheng"',
];

// Every string in all three languages, plus the fixed Chinese labels used in the UI.
const ALL_TEXT = [
  ...LANGS.map((l) => JSON.stringify(getContent(l.id))),
  SECTIONS.map((s) => s.zh).join(''),
  '桥点击展开中国Brasil完一二三四五六七八编程质量智能证书中PTEN',
].join('');

let ready: Promise<void> | null = null;

/** Starts loading (once) and resolves when every face is in. Never rejects. */
export function preloadFonts(): Promise<void> {
  if (!document.fonts) return Promise.resolve();
  ready ??= Promise.all(FACES.map((f) => document.fonts.load(f, ALL_TEXT).catch(() => [])))
    .then(() => undefined);
  return ready;
}

/** Waits for the fonts, but never longer than `ms` (a slow network shouldn't block the site). */
export function fontsReady(ms: number): Promise<void> {
  return Promise.race([preloadFonts(), new Promise<void>((r) => setTimeout(r, ms))]);
}
