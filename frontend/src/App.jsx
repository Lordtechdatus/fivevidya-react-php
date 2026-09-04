import React, { useMemo, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE || (import.meta.env.DEV ? 'http://localhost:8000/api' : '/api');

const navGroups = [
  {
    title: 'Where to Start',
    items: ['PhD Admission Assistance', 'Research Journey Planning', 'Topic & Research Proposal', 'Problem Statement', 'Base Papers', 'Patent Support'],
  },
  {
    title: 'Moving Along',
    items: ['MATLAB Projects', 'Simulink Projects', 'Python Projects', 'Java Projects', 'Ansys Projects', 'Qualitative Analysis', 'Quantitative Analysis'],
  },
  {
    title: 'Finishing Up',
    items: ['Thesis Editing', 'Thesis Formatting'],
  },
  {
    title: 'Also Do This',
    items: ['Review Article', 'Empirical Article', 'Technical Article', 'IEEE / Scopus Paper Support', 'Researcher Profile Enhancement'],
  },
  {
    title: 'PhD Guide',
    items: ['Thought Clearing', 'Development Editing', 'Research Design'],
  },
];

const services = [
  ['Topic & Research Proposal', 'Shape a feasible research direction, research gap, objectives, questions and proposal framework.'],
  ['Problem Statement', 'Convert a broad topic into a defensible problem statement grounded in the literature.'],
  ['Base Paper Support', 'Identify useful research foundations and organise evidence for the proposed methodology.'],
  ['Chapter Development Guidance', 'Structure thesis chapters, arguments, citations, tables and presentation in a consistent academic flow.'],
  ['Questionnaire & Experiment Design', 'Map constructs, objectives and hypotheses into measurable items and practical experimental plans.'],
  ['Software Implementation', 'Research-oriented implementation support for MATLAB, Python, Java, simulation and engineering tools.'],
  ['Data Analysis', 'Descriptive and inferential analysis planning, statistical testing and interpretation workflows.'],
  ['Editing', 'Language, logical-flow and academic-style review to improve readability and consistency.'],
  ['Formatting', 'Apply university or journal formatting rules across headings, tables, figures, references and front matter.'],
  ['Journal Paper Support', 'Plan manuscripts for SCI, Scopus and peer-reviewed journals with a clear contribution and submission structure.'],
  ['Research Design', 'Align objectives, variables, sampling, instruments, data analysis and evidence before execution.'],
  ['Technical Research Support', 'Engineering, computing and data-centric academic project support with a documented workflow.'],
];

const samples = [
  { type: 'Thesis', title: 'Short Literature Review', meta: 'Literature Review · Chapter Guidance', desc: 'A structured short review organised around themes, research gaps and evidence mapping.' },
  { type: 'Thesis', title: 'Introduction Chapter Plan', meta: 'Introduction · Thesis Structure', desc: 'A research-focused chapter architecture covering background, problem, aims, scope and chapterisation.' },
  { type: 'Technical', title: 'Technical Proposal Development', meta: 'Synopsis · Research Design', desc: 'A proposal framework connecting the technical problem, methodology, validation and expected outcomes.' },
  { type: 'Analysis', title: 'Quantitative Analysis Plan', meta: 'SPSS / R · Statistical Tests', desc: 'A hypothesis-wise workflow covering reliability, descriptive statistics, assumptions and suitable inferential tests.' },
];

function Logo() {
  return (
    <a className="brand" href="#top" aria-label="Lord-Tech Datus Thesis home">
      <span className="brand-mark" aria-hidden="true">
        <span className="mark-line a" />
        <span className="mark-line b" />
        <span className="mark-dot" />
      </span>
      <span>
        <strong>LORD-TECH</strong>
        <small>DATUS THESIS</small>
      </span>
    </a>
  );
}

function Icon({ type }) {
  const common = { width: 34, height: 34, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    compass: <><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z"/></>,
    chart: <><path d="M4 19V9"/><path d="M10 19V5"/><path d="M16 19v-7"/><path d="M22 19H2"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></>,
    code: <><path d="m8 9-4 3 4 3"/><path d="m16 9 4 3-4 3"/><path d="m14 5-4 14"/></>,
    edit: <><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/></>,
  };
  return <svg {...common}>{paths[type] || paths.book}</svg>;
}

function Header({ onQuote }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
      <div className="accent-line" />
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Top-Notch Consulting for PhD Research & Journal Publications</span>
          <div className="top-actions">
            <a href="mailto:research@lordtech.example">research@lordtech.example</a>
            <a href="tel:+910000000000">+91 00000 00000</a>
            <button className="mini-btn" onClick={onQuote}>Request a Quote</button>
          </div>
        </div>
      </div>
      <header className="header" id="top">
        <div className="container header-inner">
          <Logo />
          <button className="menu-toggle" onClick={() => setMobileOpen(v => !v)} aria-label="Toggle menu">
            <span/><span/><span/>
          </button>
          <nav className={`nav ${mobileOpen ? 'open' : ''}`}>
            <a href="#top" onClick={() => setMobileOpen(false)}>Home</a>
            {navGroups.map(group => (
              <div className="nav-group" key={group.title}>
                <button>{group.title}<span>⌄</span></button>
                <div className="dropdown">
                  {group.items.map(item => <a key={item} href="#services" onClick={() => setMobileOpen(false)}>{item}</a>)}
                </div>
              </div>
            ))}
            <a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a>
          </nav>
        </div>
      </header>
    </>
  );
}

function Hero({ onQuote }) {
  return (
    <section className="hero">
      <div className="hero-bg-grid" />
      <div className="container hero-inner">
        <span className="eyebrow">RESEARCH CONSULTING · THESIS · PUBLICATIONS</span>
        <h1>Your Gateway to <span>Exemplary Academic Research</span></h1>
        <p>Practical research guidance for scholars who need a clear route from topic selection and research design to analysis, implementation, thesis development and journal submission.</p>
        <div className="hero-buttons">
          <button className="btn primary" onClick={onQuote}>Discuss Your Research <span>→</span></button>
          <a className="btn ghost" href="#services">Explore Services</a>
        </div>
      </div>
      <div className="hero-cta" onClick={onQuote} role="button" tabIndex="0">
        <span>Need help deciding where to start?</span>
        <strong>Request a research consultation</strong>
        <b>›</b>
      </div>
    </section>
  );
}

function IntroStats() {
  return (
    <section className="intro section">
      <div className="container intro-grid">
        <div>
          <span className="section-kicker">RESEARCH SUPPORT FROM START TO FINISH</span>
          <h2>Turn a difficult research journey into a structured process.</h2>
          <p>Doctoral work becomes expensive and slow when the topic, objectives, methodology and evidence are developed in isolation. Our workflow starts by aligning these pieces before the heavy work begins.</p>
          <p>Use the platform as a single place to organise research planning, questionnaire design, analysis, technical implementation, thesis improvement and publication preparation.</p>
          <a className="text-link" href="#services">See how the workflow is organised <span>→</span></a>
          <div className="feature-row">
            <div><Icon type="compass"/><div><b>Research-led planning</b><span>Objectives, variables and methods remain aligned.</span></div></div>
            <div><Icon type="chart"/><div><b>Evidence-first analysis</b><span>Tables, tests and conclusions follow the research questions.</span></div></div>
            <div><Icon type="shield"/><div><b>Transparent workflow</b><span>Clear deliverables, revisions and communication.</span></div></div>
          </div>
        </div>
        <aside className="stats-panel">
          <div className="stats-pattern" />
          <span className="panel-label">WHAT KEEPS US MOTIVATED?</span>
          <div className="stat"><strong>7,500+</strong><span>Research consultations & academic support interactions</span></div>
          <div className="stat"><strong>30+</strong><span>Research webinars, workshops & knowledge sessions</span></div>
          <div className="stat"><strong>1,700+</strong><span>Publication and manuscript-support milestones</span></div>
          <button className="stats-button">#1 RESEARCH HELP SERVICES</button>
        </aside>
      </div>
    </section>
  );
}

function PromiseStrip() {
  return (
    <section className="promise-strip">
      <div className="container promise-grid">
        <div><Icon type="book"/><div><h3>Our Services</h3><b>Covers a Wide Range</b><p>Research support organised across the entire doctoral journey.</p></div></div>
        <div><Icon type="code"/><div><h3>Our Experts</h3><b>Subject-Specific Precision</b><p>Academic, statistical, technical and editorial expertise for diverse domains.</p></div></div>
        <div><Icon type="edit"/><div><h3>Our Guarantee</h3><b>Effective & Efficient</b><p>Clear scope, documented delivery and structured revision cycles.</p></div></div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-heading centered">
          <span className="section-kicker">ACADEMIC RESEARCH SERVICES</span>
          <h2>Everything needed across the research lifecycle.</h2>
          <p>Browse the major service areas. Each card can later be connected to a dedicated service page without changing the overall design system.</p>
        </div>
        <div className="service-grid">
          {services.map(([title, desc], i) => (
            <article className="service-card" key={title}>
              <span className="service-no">{String(i + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
              <a href="#contact">Learn More <span>→</span></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Webinar() {
  return (
    <section className="webinar section">
      <div className="container webinar-grid">
        <div className="video-frame">
          <div className="video-dots"><span/><span/><span/></div>
          <div className="video-screen">
            <span className="play">▶</span>
            <strong>Research Webinar Library</strong>
            <small>Practical sessions on research design, literature review, statistics and publication planning.</small>
          </div>
        </div>
        <div>
          <span className="section-kicker">LEARN BEFORE YOU COMMIT</span>
          <h2>Short research sessions for common PhD roadblocks.</h2>
          <p>A serious research consultancy should explain the logic behind the work. This section is designed for webinars, recorded guidance, downloadable research planners and scholar resources.</p>
          <div className="ticks"><span>✓ Research topic & gap identification</span><span>✓ Questionnaire and hypothesis mapping</span><span>✓ Statistical analysis planning</span><span>✓ Journal submission preparation</span></div>
          <a className="btn dark" href="#samples">Browse Sample Work</a>
        </div>
      </div>
    </section>
  );
}

function SampleWork() {
  return (
    <section className="section samples" id="samples">
      <div className="container">
        <div className="section-heading">
          <span className="section-kicker">SAMPLE WRITE-UPS</span>
          <h2>Show the process, not vague promises.</h2>
        </div>
        <div className="sample-grid">
          {samples.map(item => (
            <article className="sample-card" key={item.title}>
              <span className="sample-type">{item.type}</span>
              <h3>{item.title}</h3>
              <small>{item.meta}</small>
              <p>{item.desc}</p>
              <a href="#contact">Request a similar plan <span>↗</span></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadForm({ compact = false, source = 'callback', afterSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [state, setState] = useState({ loading: false, message: '', ok: false });
  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setState({ loading: true, message: '', ok: false });
    try {
      const res = await fetch(`${API_BASE}/submit.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.message || 'Could not submit the form.');
      setState({ loading: false, message: data.message, ok: true });
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
      if (afterSubmit) setTimeout(afterSubmit, 900);
    } catch (err) {
      setState({ loading: false, message: err.message || 'Submission failed. Check that the PHP server is running.', ok: false });
    }
  }

  return (
    <form className={`lead-form ${compact ? 'compact' : ''}`} onSubmit={submit}>
      <div className="form-grid">
        <label><span>Name *</span><input required name="name" value={form.name} onChange={set} placeholder="Your name" /></label>
        <label><span>Email *</span><input required type="email" name="email" value={form.email} onChange={set} placeholder="you@example.com" /></label>
        <label><span>Phone</span><input name="phone" value={form.phone} onChange={set} placeholder="+91 ..." /></label>
        <label><span>Service</span><select name="service" value={form.service} onChange={set}><option value="">Choose service</option>{services.slice(0, 8).map(([s]) => <option key={s}>{s}</option>)}</select></label>
      </div>
      <label><span>Research Requirement *</span><textarea required name="message" value={form.message} onChange={set} rows={compact ? 3 : 5} placeholder="Briefly describe your topic, stage and support needed." /></label>
      <button className="btn primary full" disabled={state.loading}>{state.loading ? 'Submitting…' : 'Send Request →'}</button>
      {state.message && <div className={`form-message ${state.ok ? 'ok' : 'bad'}`}>{state.message}</div>}
    </form>
  );
}

function Callback() {
  return (
    <section className="callback section" id="contact">
      <div className="container callback-grid">
        <div className="callback-copy">
          <span className="section-kicker light">REQUEST A CALL BACK</span>
          <h2>Tell us where your research is stuck.</h2>
          <p>Use this local form to test the complete React + PHP flow. Submissions are stored as newline-delimited JSON in the backend storage folder.</p>
          <div className="contact-list">
            <a href="mailto:research@lordtech.example">✉ research@lordtech.example</a>
            <a href="tel:+910000000000">☎ +91 00000 00000</a>
            <span>◷ Mon–Sat · 10:00 AM–7:00 PM</span>
          </div>
        </div>
        <div className="form-panel">
          <h3>Research Enquiry</h3>
          <LeadForm source="homepage-callback" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-about"><Logo/><p>A clean-room React + PHP implementation inspired by the information architecture of a research consultancy website. Replace the demo contact information and copy with your final business content.</p></div>
        <div><h4>Research Services</h4><a href="#services">Topic & Proposal</a><a href="#services">Research Design</a><a href="#services">Questionnaire</a><a href="#services">Data Analysis</a><a href="#services">Chapter Guidance</a></div>
        <div><h4>Technical Support</h4><a href="#services">MATLAB</a><a href="#services">Python</a><a href="#services">Java</a><a href="#services">Ansys</a><a href="#services">Simulation</a></div>
        <div><h4>Publication</h4><a href="#services">Review Paper</a><a href="#services">Empirical Paper</a><a href="#services">Scopus Support</a><a href="#services">Editing</a><a href="#services">Formatting</a></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Lord-Tech Datus Thesis. Demo local website.</span><span>Privacy · Terms · Sitemap</span></div>
    </footer>
  );
}

function QuoteModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <span className="section-kicker">REQUEST A QUOTE</span>
        <h2>Share your research requirement.</h2>
        <p>Fill this form to test the PHP submission endpoint locally.</p>
        <LeadForm compact source="quote-modal" afterSubmit={onClose} />
      </div>
    </div>
  );
}

export default function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const openQuote = () => setQuoteOpen(true);
  return (
    <div className="site-shell">
      <Header onQuote={openQuote} />
      <main>
        <Hero onQuote={openQuote} />
        <IntroStats />
        <PromiseStrip />
        <Services />
        <Webinar />
        <SampleWork />
        <Callback />
      </main>
      <Footer />
      <button className="floating-call" onClick={openQuote} aria-label="Request a call">☎<span>Request a Call</span></button>
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
