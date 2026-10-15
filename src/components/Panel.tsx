import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { SECTIONS, type SectionId } from '../i18n/content';
import { useLanguage } from '../i18n/LanguageContext';
import { useScroll } from './Scroll';
import { InkDecor, type InkKind } from './InkDecor';

interface PanelProps {
  id: SectionId;
  className?: string;
  style?: CSSProperties;
  /** Skip the vertical calligraphy title and the small label (used by the hero). */
  bare?: boolean;
  /** Ink-wash (水墨) painting behind the content. */
  decor?: InkKind[];
  children: ReactNode;
}

/** One "sheet" of the scroll: a vertical brush title on the left, content on the right. */
export function Panel({ id, className = '', style, bare, decor = [], children }: PanelProps) {
  const { seen, active } = useScroll();
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  // Stagger the ink-in of every `.reveal` child.
  useEffect(() => {
    ref.current?.querySelectorAll<HTMLElement>('.reveal').forEach((el, i) => {
      el.style.transitionDelay = `${i * 110}ms`;
    });
  });

  const zh = SECTIONS.find((s) => s.id === id)!.zh;
  const classes = ['panel', className, seen.has(id) && 'seen', active === id && 'current']
    .filter(Boolean).join(' ');

  return (
    <section id={id} ref={ref} className={classes} style={style}>
      {decor.map((k) => <InkDecor key={k} kind={k} />)}
      {bare ? (
        children
      ) : (
        <>
          <h2 className="vtitle">{zh}</h2>
          <div className="content">
            <div className="sub reveal">{t.ui[id]}</div>
            {children}
          </div>
        </>
      )}
    </section>
  );
}

/** Renders `**bold**` segments inside translated strings. */
export function Rich({ text }: { text: string }) {
  return <>{text.split('**').map((part, i) => (i % 2 ? <b key={i}>{part}</b> : part))}</>;
}
