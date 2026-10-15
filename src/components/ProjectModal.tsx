import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { Content } from '../i18n/content';
import { useLanguage } from '../i18n/LanguageContext';
import { Seal } from './Seal';

type Project = Content['projects'][number];

/**
 * Project details on a sheet of paper. Uses a native <dialog> (Esc to close, focus kept inside),
 * portalled to <body> so touches inside it don't reach the scroll's swipe handler.
 */
export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDialogElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

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
      className="modal"
      aria-labelledby="modal-title"
      // A click on the dialog element itself (not its content) is a click on the backdrop.
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-inner">
        <header className="modal-head">
          <span className="modal-num" aria-hidden="true">{project.num}</span>
          <div>
            <div className="modal-meta">{project.meta}</div>
            <h3 id="modal-title">{project.title}</h3>
          </div>
          <button className="modal-close" onClick={onClose} aria-label={t.ui.close}>
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
          {project.result && (
            <section className="modal-result">
              <h4>{t.ui.result}</h4>
              <p>{project.result}</p>
            </section>
          )}
          <section>
            <h4>{t.ui.stack}</h4>
            <div className="tags">{project.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
          </section>
          <div className="modal-seal"><Seal stamp={false} /></div>
        </div>
      </div>
    </dialog>,
    document.body,
  );
}
