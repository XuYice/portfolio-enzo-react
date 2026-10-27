import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Content } from '../i18n/content';
import { useLanguage } from '../i18n/LanguageContext';
import { Seal } from './Seal';

type Project = Content['projects'][number];

/**
 * Project details as a hanging scroll (立轴): the top rod appears, the mounted paper unrolls
 * downward, and on close it rolls back up before the dialog goes away — unlike the home page,
 * which unrolls sideways. Uses a native <dialog> (focus kept inside), portalled to <body> so
 * touches inside it don't reach the scroll's swipe handler.
 */
export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDialogElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const [closing, setClosing] = useState(false);

  /** Roll the scroll back up, then really close. */
  const requestClose = useCallback(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) onCloseRef.current();
    else setClosing(true);
  }, []);

  useEffect(() => {
    const dialog = ref.current!;
    // Esc fires 'close'. The event is queued, so a close from an earlier mount (React StrictMode
    // mounts twice in dev) can arrive after the dialog was reopened: only report it if still closed.
    const handleClose = () => {
      if (!dialog.open) onCloseRef.current();
    };
    dialog.addEventListener('close', handleClose);
    if (!dialog.open) dialog.showModal();
    // Keep the page behind from scrolling (mobile uses body scroll).
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.removeEventListener('close', handleClose);
      document.body.style.overflow = prev;
      if (dialog.open) dialog.close();
    };
  }, []);

  return createPortal(
    <dialog
      ref={ref}
      className={closing ? 'modal closing' : 'modal'}
      aria-labelledby="modal-title"
      // Esc: roll up first instead of vanishing. Handled on keydown because browsers don't always
      // let the 'cancel' event be prevented (e.g. without a recent user click); cancel is the fallback.
      onKeyDown={(e) => { if (e.key === 'Escape') { e.preventDefault(); requestClose(); } }}
      onCancel={(e) => { e.preventDefault(); requestClose(); }}
      // A click on the dialog element itself (not its content) is a click on the backdrop.
      onClick={(e) => { if (e.target === e.currentTarget) requestClose(); }}
    >
      <svg className="hang-string" viewBox="0 0 120 40" aria-hidden="true">
        <path d="M6 40 L60 4 L114 40" fill="none" stroke="#c9b48a" strokeWidth="1.6" />
        <circle cx="60" cy="4" r="3.2" fill="#8a6a3a" />
      </svg>
      <div className="rod top" aria-hidden="true" />
      <div className="unroll" onAnimationEnd={(e) => { if (e.animationName === 'rollup') onCloseRef.current(); }}>
        <div className="mount">
          <div className="modal-inner">
            <header className="modal-head">
              <span className="modal-num" aria-hidden="true">{project.num}</span>
              <div>
                <div className="modal-meta">{project.meta}</div>
                <h3 id="modal-title">{project.title}</h3>
                {project.role && <div className="modal-role"><b>{t.ui.myRole}:</b> {project.role}</div>}
              </div>
              <button className="modal-close" onClick={requestClose} aria-label={t.ui.close}>
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </header>

            <div className="modal-body">
              <section>
                <h4>{t.ui.context}</h4>
                <p>{project.context}</p>
              </section>
              <section>
                <h4>{t.ui.did}</h4>
                <ul>{project.did.map((d) => <li key={d}>{d}</li>)}</ul>
              </section>
              {project.challenges && project.challenges.length > 0 && (
                <section>
                  <h4>{t.ui.challenges}</h4>
                  <ul>{project.challenges.map((c) => <li key={c}>{c}</li>)}</ul>
                </section>
              )}
              {project.result && (
                <section className="modal-result">
                  <h4>{t.ui.result}</h4>
                  <p>{project.result}</p>
                </section>
              )}
              {project.images && project.images.length > 0 && (
                <section>
                  <h4>{t.ui.gallery}</h4>
                  <div className="modal-gallery">
                    {project.images.map((src, i) => (
                      <figure key={src}>
                        <a href={src} target="_blank" rel="noopener">
                          <img src={src} alt={project.captions?.[i] ?? project.title} loading="lazy" />
                        </a>
                        {project.captions?.[i] && <figcaption>{project.captions[i]}</figcaption>}
                      </figure>
                    ))}
                  </div>
                </section>
              )}
              <section>
                <h4>{t.ui.stack}</h4>
                <div className="tags">{project.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
              </section>
              {project.links && project.links.length > 0 && (
                <section>
                  <h4>{t.ui.links}</h4>
                  <div className="modal-links">
                    {project.links.map((l) => (
                      <a key={l.url} className="btn" href={l.url} target="_blank" rel="noopener">{l.label} ↗</a>
                    ))}
                  </div>
                </section>
              )}
              <div className="modal-seal"><Seal stamp={false} /></div>
            </div>
          </div>
        </div>
        {/* rides on the paper's lower edge: both follow the same --p progress */}
        <div className="rod bottom" aria-hidden="true" />
      </div>
    </dialog>,
    document.body,
  );
}
