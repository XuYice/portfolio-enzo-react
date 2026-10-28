import {
  createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode,
} from 'react';
import { SECTIONS, type SectionId } from '../i18n/content';
import { useIsMobile } from '../hooks/useIsMobile';
import { useLanguage } from '../i18n/LanguageContext';
import { Nav } from './Nav';

interface ScrollValue {
  /** Panels that have been on screen (their text "inks in" once). */
  seen: Set<SectionId>;
  active: SectionId;
  goTo: (id: SectionId) => void;
}

const ScrollContext = createContext<ScrollValue | null>(null);

export function useScroll() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error('useScroll must be used inside <Scroll>');
  return ctx;
}

/**
 * The handscroll: two wooden rollers and a paper strip that unrolls horizontally.
 * On mobile there's no unrolling: one section is shown at a time, like pages, switched with
 * the bottom nav, the pager under each page, or a sideways swipe.
 */
export function Scroll({ open, children }: { open: boolean; children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mobile = useIsMobile();
  const [seen, setSeen] = useState<Set<SectionId>>(() => new Set());
  const [active, setActive] = useState<SectionId>('hero');
  const { t } = useLanguage();
  const openRef = useRef(open);
  openRef.current = open;
  const activeRef = useRef(active);
  activeRef.current = active;

  const markSeen = useCallback((id: SectionId) => {
    setSeen((s) => (s.has(id) ? s : new Set(s).add(id)));
  }, []);

  // Once the unroll is mostly done, ink in every panel already on screen. The observer below
  // only reports panels *entering* the view, so anything visible before opening would stay blank.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      const track = trackRef.current!;
      const view = mobile
        ? { left: 0, right: innerWidth, top: 0, bottom: innerHeight }
        : track.getBoundingClientRect();
      track.querySelectorAll<HTMLElement>('.panel').forEach((p) => {
        const r = p.getBoundingClientRect();
        if (r.left < view.right && r.right > view.left && r.top < view.bottom && r.bottom > view.top) {
          markSeen(p.id as SectionId);
        }
      });
    }, mobile ? 450 : 900);
    return () => clearTimeout(t);
  }, [open, mobile, markSeen]);

  // Ink in each panel the first time it comes on screen (desktop; mobile pages are marked in goTo).
  useEffect(() => {
    if (mobile) return;
    const track = trackRef.current!;
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting && openRef.current) markSeen(en.target.id as SectionId);
        }
      },
      { root: track, threshold: 0.35 },
    );
    track.querySelectorAll('.panel').forEach((p) => io.observe(p));
    return () => io.disconnect();
  }, [mobile, markSeen]);

  /**
   * Index of the panel currently being read. Desktop: from the scroll position, the last panel
   * whose start has passed the first third of the view (at the very end, always the last panel).
   * Mobile: the page being shown.
   */
  const currentIndex = useCallback(() => {
    if (mobile) return SECTIONS.findIndex((s) => s.id === activeRef.current);
    const track = trackRef.current!;
    const panels = [...track.querySelectorAll<HTMLElement>('.panel')];
    if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 2) return panels.length - 1;
    const mark = track.clientWidth / 3;
    let i = 0;
    panels.forEach((p, j) => { if (p.offsetLeft - track.scrollLeft <= mark) i = j; });
    return i;
  }, [mobile]);

  // Desktop: keep the nav highlight in sync with the scroll position.
  useEffect(() => {
    if (mobile) return;
    const target = trackRef.current!;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setActive(SECTIONS[currentIndex()].id));
    };
    onScroll();
    target.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      target.removeEventListener('scroll', onScroll);
    };
  }, [mobile, currentIndex]);

  // Desktop: panels are one viewport wide, so a window resize changes every offset. Re-align the
  // track on the panel being read, otherwise it ends up showing parts of two panels.
  useEffect(() => {
    if (mobile) return;
    const onResize = () => {
      const el = document.getElementById(activeRef.current);
      if (el) trackRef.current!.scrollLeft = el.offsetLeft;
    };
    addEventListener('resize', onResize);
    return () => removeEventListener('resize', onResize);
  }, [mobile]);

  /**
   * Mobile: play the hanging-scroll unroll once, when the visitor first opens the page (same look
   * as the project modal). The progress value
   * --p grows the paper's height up to the space between the rods, with the bottom rod following
   * it in normal flow.
   */
  const unroll = useCallback((seconds: number) => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty('--unroll-dur', `${seconds}s`);
    stage.classList.remove('unrolling');
    void stage.offsetWidth; // restart the animation
    stage.classList.add('unrolling');
  }, []);


  // Mobile: the first tap opens the scroll by unrolling it downward. Runs right after the commit
  // rather than on the next animation frame, which a browser may hold back (leaving a blank page).
  useLayoutEffect(() => {
    if (mobile && open) unroll(1.3);
  }, [mobile, open, unroll]);


  const goTo = useCallback(
    (id: SectionId) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (mobile) {
        // the scroll stays open (it unrolled once on entry); only the paper's content changes
        if (id === activeRef.current) return;
        setActive(id);
        markSeen(id);
        trackRef.current!.scrollTop = 0; // the page scrolls inside the paper on mobile
      } else {
        trackRef.current!.scrollTo({ left: el.offsetLeft, behavior: 'smooth' });
      }
    },
    [mobile, markSeen],
  );

  // Where an arrow-triggered animation is heading, so quick repeated clicks advance from the
  // destination instead of from wherever the animation happens to be.
  const targetRef = useRef<{ index: number; until: number } | null>(null);

  /** Moves one panel left (-1) or right (+1). The only way to unroll on desktop. */
  const step = useCallback(
    (dir: -1 | 1) => {
      const pending = targetRef.current;
      const from = pending && performance.now() < pending.until ? pending.index : currentIndex();
      const index = Math.max(0, Math.min(SECTIONS.length - 1, from + dir));
      targetRef.current = { index, until: performance.now() + 900 };
      goTo(SECTIONS[index].id);
    },
    [currentIndex, goTo],
  );

  // Keyboard arrows do the same as the on-screen arrows.
  useEffect(() => {
    if (mobile || !open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      if (document.querySelector('dialog[open]')) return; // a project modal is on top
      e.preventDefault();
      step(e.key === 'ArrowRight' ? 1 : -1);
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [mobile, open, step]);

  // Mobile: a clear sideways swipe turns the page.
  useEffect(() => {
    if (!mobile) return;
    const track = trackRef.current!;
    let x0 = 0;
    let y0 = 0;
    const onStart = (e: TouchEvent) => {
      x0 = e.touches[0].clientX;
      y0 = e.touches[0].clientY;
    };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - x0;
      const dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
    };
    track.addEventListener('touchstart', onStart, { passive: true });
    track.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      track.removeEventListener('touchstart', onStart);
      track.removeEventListener('touchend', onEnd);
    };
  }, [mobile, step]);

  /** Jump from the nav menu: forget any arrow destination still in flight. */
  const jump = useCallback(
    (id: SectionId) => {
      targetRef.current = null;
      goTo(id);
    },
    [goTo],
  );

  const index = SECTIONS.findIndex((s) => s.id === active);

  return (
    <ScrollContext.Provider value={{ seen, active, goTo: jump }}>
      <div className="stage" ref={stageRef}>
        <div className="roller l" />
        <div className="mrod top" aria-hidden="true" />
        <div className="paper">
          <div className="track" ref={trackRef}>
            {children}
          </div>
          <div className="pager">
            {index > 0 && (
              <button className="prev" onClick={() => step(-1)}>
                <Chevron /> {t.ui[SECTIONS[index - 1].id]}
              </button>
            )}
            {index < SECTIONS.length - 1 && (
              <button className="next" onClick={() => step(1)}>
                {t.ui[SECTIONS[index + 1].id]} <Chevron />
              </button>
            )}
          </div>
        </div>
        <div className="mrod bottom" aria-hidden="true" />
        <div className="roller r" />
        <div className="tie" />
        <div className="arrows">
          <button className="arrow prev" aria-label="←" hidden={index <= 0} onClick={() => step(-1)}>
            <Chevron />
          </button>
          <button className="arrow next" aria-label="→" hidden={index >= SECTIONS.length - 1} onClick={() => step(1)}>
            <Chevron />
          </button>
        </div>
      </div>
      <Nav />
    </ScrollContext.Provider>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d="M9 4.5 L16.5 12 L9 19.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
