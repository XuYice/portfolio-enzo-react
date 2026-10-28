import { useCallback, useEffect, useState } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { Scroll } from './components/Scroll';
import { Intro } from './components/Intro';
import { LangSwitch } from './components/LangSwitch';
import { RoughFilter } from './components/Seal';
import { InkDecor } from './components/InkDecor';
import { About, Contact, Experience, Hero, Projects, Skills } from './sections/Sections';
import { fontsReady, preloadFonts } from './fonts';

export default function App() {
  // Starts rolled up on every screen: the first tap unrolls it (sideways on desktop, downward on
  // phones, like a hanging scroll).
  const [open, setOpen] = useState(false);
  // Fetch every glyph while the visitor is on the intro, so no font download lands mid-animation;
  // if they tap before it's done, wait a moment (at most 1.5 s) before unrolling.
  useEffect(() => { preloadFonts(); }, []);
  const unroll = useCallback(() => { fontsReady(1500).then(() => setOpen(true)); }, []);

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
