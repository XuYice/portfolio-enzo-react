import { useEffect, useRef } from 'react';
import { SECTIONS } from '../i18n/content';
import { useLanguage } from '../i18n/LanguageContext';
import { useScroll } from './Scroll';

export function Nav() {
  const { active, goTo } = useScroll();
  const { lang, t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

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
    </nav>
  );
}
