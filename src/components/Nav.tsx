import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { SECTIONS } from '../i18n/content';
import { useLanguage } from '../i18n/LanguageContext';
import { useScroll } from './Scroll';
import { Lanterns } from './Lanterns';

export function Nav() {
  const { active, goTo } = useScroll();
  const { lang, t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  // Centre of each item, in nav coordinates: one lantern hangs under each.
  const [xs, setXs] = useState<number[]>([]);

  useLayoutEffect(() => {
    const measure = () => {
      const buttons = ref.current?.querySelectorAll<HTMLElement>('button');
      if (buttons) setXs([...buttons].map((b) => b.offsetLeft + b.offsetWidth / 2));
    };
    measure();
    document.fonts?.ready.then(measure); // labels change width once the web font loads
    addEventListener('resize', measure);
    return () => removeEventListener('resize', measure);
  }, [lang]);

  // On narrow screens the bar scrolls sideways: keep the active item in view.
  useEffect(() => {
    const nav = ref.current;
    const btn = nav?.querySelector<HTMLElement>('button.active');
    if (!nav || !btn || nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollTo({ left: btn.offsetLeft - (nav.clientWidth - btn.offsetWidth) / 2, behavior: 'smooth' });
  }, [active, lang]);

  return (
    <nav ref={ref} className={`nav nav-${lang}`}>
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          className={active === s.id ? 'active' : undefined}
          onClick={() => goTo(s.id)}
        >
          {lang === 'zh' ? s.zh : t.ui[s.id]}
        </button>
      ))}
      <Lanterns xs={xs} active={SECTIONS.findIndex((s) => s.id === active)} />
    </nav>
  );
}
