import { LANGS } from '../i18n/content';
import { useLanguage } from '../i18n/LanguageContext';

export function LangSwitch() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="lang" role="group" aria-label="Idioma / Language / 语言">
      {LANGS.map((l) => (
        <button key={l.id} className={`lang-${l.id}`} aria-pressed={lang === l.id} onClick={() => setLang(l.id)}>
          {l.label}
        </button>
      ))}
    </div>
  );
}
