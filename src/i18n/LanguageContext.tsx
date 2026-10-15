import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getContent, type Content, type Lang } from './content';

interface LanguageValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Content;
}

const LanguageContext = createContext<LanguageValue | null>(null);

function readStoredLang(): Lang {
  try {
    const v = localStorage.getItem('lang');
    if (v === 'pt' || v === 'en' || v === 'zh') return v;
  } catch {
    /* storage blocked */
  }
  return 'pt';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(readStoredLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('lang', lang);
    } catch {
      /* storage blocked */
    }
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: getContent(lang) }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
