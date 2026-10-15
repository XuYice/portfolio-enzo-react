import { useCallback, useState } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { Scroll } from './components/Scroll';
import { Intro } from './components/Intro';
import { LangSwitch } from './components/LangSwitch';
import { RoughFilter } from './components/Seal';
import { InkDecor } from './components/InkDecor';
import { About, Contact, Experience, Hero, Projects, Skills } from './sections/Sections';

export default function App() {
  // On phones there is no unroll animation: start open.
  const [open, setOpen] = useState(() => matchMedia('(max-width: 760px)').matches);
  const unroll = useCallback(() => setOpen(true), []);

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
