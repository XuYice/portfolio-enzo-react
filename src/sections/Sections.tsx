import { useState } from 'react';
import { Panel, Rich } from '../components/Panel';
import { ProjectModal } from '../components/ProjectModal';
import { Landscape } from '../components/Landscape';
import { Seal } from '../components/Seal';
import { CONTACT } from '../i18n/content';
import { useLanguage } from '../i18n/LanguageContext';

export function Hero() {
  const { t } = useLanguage();
  return (
    <Panel id="hero" className="hero" bare decor={["wash", "birds"]}>
      <div className="kicker reveal">{t.ui.kicker}</div>
      <div className="name-row reveal">
        <h1 className="name">Yice Xu</h1>
        <Seal />
      </div>
      <div className="role reveal">{t.ui.role}</div>
      <p className="tagline reveal">{t.ui.tagline}</p>
      <div className="landscape reveal">
        <Landscape />
      </div>
      <div className="hint">{t.ui.hint}</div>
    </Panel>
  );
}

export function About() {
  const { t } = useLanguage();
  return (
    <Panel id="about" decor={["bamboo"]}>
      {t.about.paragraphs.map((p) => (
        <p key={p} className="reveal"><Rich text={p} /></p>
      ))}
      <div className="facts reveal">
        {t.about.facts.map((f) => <span key={f}>{f}</span>)}
      </div>
    </Panel>
  );
}

export function Experience() {
  const { t } = useLanguage();
  return (
    <Panel id="experience" className="exp" decor={["mountains"]}>
      {t.jobs.map((job) => (
        <div key={job.company} className="job reveal">
          <h3><span>{job.title}</span> · {job.company}</h3>
          <div className="when">{job.when}</div>
          {job.before && <div className="before">{job.before}</div>}
          <ul>{job.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
        </div>
      ))}
    </Panel>
  );
}

export function Projects() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Panel id="projects" className="wide" decor={["wash"]}>
      <div className="grid">
        {t.projects.map((p, i) => (
          <button key={p.num} className="card reveal" onClick={() => setOpen(i)} aria-haspopup="dialog">
            <span className="num">{p.num}</span>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="tags">{p.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
            <span className="more">{t.ui.more} →</span>
          </button>
        ))}
      </div>
      {open !== null && <ProjectModal project={t.projects[open]} onClose={() => setOpen(null)} />}
    </Panel>
  );
}

export function Skills() {
  const { t } = useLanguage();
  return (
    <Panel id="skills" decor={["plum"]}>
      {t.skills.map((g) => (
        <div key={g.zh} className="group reveal">
          <h3>{g.zh} <small>{g.label}</small></h3>
          <div className="tags">{g.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
        </div>
      ))}
    </Panel>
  );
}

export function Contact() {
  const { t } = useLanguage();
  return (
    <Panel id="contact" className="last" decor={["mountains", "birds"]}>
      <div className="big-q reveal">{t.contact.question}</div>
      <p className="reveal" style={{ marginTop: 16 }}>{t.contact.text}</p>
      <div className="links reveal">
        <a className="btn red" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        <a className="btn" href={CONTACT.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a>
        <a className="btn" href={CONTACT.github} target="_blank" rel="noopener">GitHub ↗</a>
        <a className="btn" href={CONTACT.cv} target="_blank">{t.ui.cv}</a>
      </div>
      <div className="end reveal">
        <Seal big />
        <span>{t.ui.end}</span>
      </div>
    </Panel>
  );
}
