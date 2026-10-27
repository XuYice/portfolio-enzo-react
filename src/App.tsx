import { useCallback, useEffect, useState } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { Scroll } from './components/Scroll';
import { Intro } from './components/Intro';
import { LangSwitch } from './components/LangSwitch';
import { RoughFilter } from './components/Seal';
import { InkDecor } from './components/InkDecor';
import { useIsMobile } from './hooks/useIsMobile';
import { About, Contact, Experience, Hero, Projects, Skills } from './sections/Sections';

export default function App() {
  // On phones there is no unroll animation: start open — and open as soon as the window becomes
  // phone-sized, otherwise a still-rolled scroll would leave the mobile page blank.
  const mobile = useIsMobile();
  const [open, setOpen] = useState(mobile);
  const unroll = useCallback(() => setOpen(true), []);
  useEffect(() => { if (mobile) setOpen(true); }, [mobile]);

  return (
    <LanguageProvider>
      <div className={open ? 'app open' : 'app'}>
        <RoughFilter />
        <InkDecor kind="night" />
        <LangSwitch />
        <Scroll open={open}>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </Scroll>
        <Intro open={open} onOpen={unroll} />
      </div>
    </LanguageProvider>
  );
}
