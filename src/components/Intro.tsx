import { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

/** Overlay on the rolled-up scroll. Click (or Enter/Space) unrolls it. */
export function Intro({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  const { t } = useLanguage();

  useEffect(() => {
    if (open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') onOpen();
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [open, onOpen]);

  return (
    <div className="intro" onClick={onOpen} aria-hidden={open}>
      <div className="zh">点击展开</div>
      <div className="lat">{t.ui.openHint}</div>
    </div>
  );
}
