import React, { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import ImplementationPage from './pages/ImplementationPage.jsx';
import { implementationPages as originalImplementationPages } from './data/implementationPages.js';
import { remainingImplementationPages } from './data/remainingImplementationPages.js';
const implementationPages = [...originalImplementationPages, ...remainingImplementationPages];
import ResearchStartPage from './pages/ResearchStartPage.jsx';
import { researchStartPages } from './data/researchStartPages.js';
import PhdEmbarking from './pages/PhdEmbarking.jsx';
import { embarkingPath, embarkingData } from './data/phdEmbarking.js';
import FastTrackPhd from './pages/FastTrackPhd.jsx';
import { fastTrackPath, fastTrackData } from './data/fastTrackPhd.js';
import PhdAdmissionAssistance from './pages/PhdAdmissionAssistance.jsx';
import { admissionPath, phdAdmissionData } from './data/phdAdmissionAssistance.js';
import MegaServicePanel, { MegaIcon } from './MegaServicePanel.jsx';
import { activeHeaderKey, headerNavigation } from './data/headerNavigation.js';
import ServicesSection from './components/ServicesSection.jsx';
const ServicePage = lazy(() => import('./pages/ServicePage.jsx'));
import ContactPage from './pages/ContactPage.jsx';
import CompanyContact from './components/CompanyContact.jsx';
import Footer from './components/Footer.jsx';
import { companyInfo } from './data/companyInfo.js';
import { Mail, Phone } from 'lucide-react';
import { navigationPages, pageById, pageForPath, pathFor, routeAliases } from './data/navigation.js';
const newServicePages = navigationPages.filter(page => !page.existing && page.id !== 'contact');

const API_BASE = import.meta.env.VITE_API_BASE || (import.meta.env.DEV ? 'http://localhost:8000/api' : '/api');

const samples = [
  { type: 'Thesis', title: 'Short Literature Review', meta: 'Literature Review · Chapter Guidance', desc: 'A structured short review organised around themes, research gaps and evidence mapping.' },
  { type: 'Thesis', title: 'Introduction Chapter Plan', meta: 'Introduction · Thesis Structure', desc: 'A research-focused chapter architecture covering background, problem, aims, scope and chapterisation.' },
  { type: 'Technical', title: 'Technical Proposal Development', meta: 'Synopsis · Research Design', desc: 'A proposal framework connecting the technical problem, methodology, validation and expected outcomes.' },
  { type: 'Analysis', title: 'Quantitative Analysis Plan', meta: 'SPSS / R · Statistical Tests', desc: 'A hypothesis-wise workflow covering reliability, descriptive statistics, assumptions and suitable inferential tests.' },
];

function Logo() {
  return (
    <Link className="brand" to="/" aria-label="AcademicEdge Writing & Publication Services home">
      <span className="brand-mark" aria-hidden="true">
        <span className="mark-line a" />
        <span className="mark-line b" />
        <span className="mark-dot" />
      </span>
      <span>
        <strong>{companyInfo.shortName.toUpperCase()}</strong>
        <small>{companyInfo.tagline.toUpperCase()}</small>
      </span>
    </Link>
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

function Header({ onQuote, activeMegaMenu, setActiveMegaMenu }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [compactNavigation, setCompactNavigation] = useState(() => window.matchMedia('(max-width: 1199px)').matches);
  const [displayedMenu, setDisplayedMenu] = useState(activeMegaMenu);
  const toggleRef = useRef(null);
  const location = useLocation();
  const currentPage = pageForPath(location.pathname);
  const activeKey = activeHeaderKey(location.pathname);

  const triggerRefs = useRef({});
  const headerRef = useRef(null);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 1199px)');
    const update = () => { setCompactNavigation(query.matches); setMobileOpen(false); setActiveMegaMenu(null); };
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, [setActiveMegaMenu]);
  useEffect(() => {
    if (activeMegaMenu) {
      setDisplayedMenu(activeMegaMenu);
      if (compactNavigation) setMobileOpen(true);
      return;
    }
    const timer = window.setTimeout(() => setDisplayedMenu(null), 200);
    return () => window.clearTimeout(timer);
  }, [activeMegaMenu, compactNavigation]);
  const closePanel = () => {
    setActiveMegaMenu(null);
    triggerRefs.current[activeMegaMenu]?.focus({ preventScroll: true });
  };
  const closeNavigation = () => {
    setActiveMegaMenu(null);
    setMobileOpen(false);
  };
  useEffect(() => {
    const handleEscape = event => {
      if (event.key !== 'Escape') return;
      if (activeMegaMenu) {
        setActiveMegaMenu(null);
        triggerRefs.current[activeMegaMenu]?.focus({ preventScroll: true });
      } else {
        setMobileOpen(false);
        if (mobileOpen) toggleRef.current?.focus({ preventScroll: true });
      }
    };
    const handleOutsidePointer = event => {
      if (!headerRef.current?.contains(event.target)) {
        setActiveMegaMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('pointerdown', handleOutsidePointer);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('pointerdown', handleOutsidePointer);
    };
  }, [activeMegaMenu, mobileOpen, setActiveMegaMenu]);
  const displayedItem = headerNavigation.find(item => item.key === displayedMenu);
  const panel = displayedItem && <MegaServicePanel
    menu={displayedItem}
    isOpen={Boolean(activeMegaMenu)}
    labelledBy={`mega-trigger-${displayedItem.key}`}
    onClose={closePanel}
    onSelect={closeNavigation}
    mobile={compactNavigation}
  />;
  const shouldRenderHeaderPanel = !compactNavigation && displayedItem?.mega;
  return (
    <>
      <div className="accent-line" />
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Professional Research, Writing &amp; Publication Services</span>
          <div className="top-actions">
            <a className="topbar-email" href={`mailto:${companyInfo.email}`} aria-label={`Email ${companyInfo.email}`}><Mail size={15} aria-hidden="true"/><span>{companyInfo.email}</span></a>
            <a className="topbar-phone" href={`tel:${companyInfo.phones[0].value}`}><Phone size={15} aria-hidden="true"/><span>{companyInfo.phones[0].label}</span></a>
            <button className="mini-btn" onClick={onQuote}>Request a Quote</button>
          </div>
        </div>
      </div>
      <header className="header" id="top" ref={headerRef}>
        <div className="container header-inner">
          <Logo />
          <button ref={toggleRef} className="menu-toggle" onClick={() => { setMobileOpen(v => !v); setActiveMegaMenu(null); }} aria-label="Toggle menu" aria-expanded={mobileOpen} aria-controls="main-navigation">
            <span/><span/><span/>
          </button>
          <nav id="main-navigation" aria-label="Main navigation" className={`nav ${mobileOpen ? 'open' : ''}`}>
            {headerNavigation.map(item => item.groups ? (
              <div className="nav-group" key={item.key}>
                <button
                  type="button"
                  id={`mega-trigger-${item.key}`}
                  ref={element => { triggerRefs.current[item.key] = element; }}
                  aria-expanded={activeMegaMenu === item.key}
                  aria-haspopup="true"
                  className={activeKey === item.key ? 'nav-parent-active' : undefined}
                  aria-controls={activeMegaMenu === item.key ? `mega-panel-${item.key}` : undefined}
                  onClick={() => setActiveMegaMenu(current => current === item.key ? null : item.key)}
                >{item.label}<MegaIcon type="chevron"/></button>
                {displayedMenu === item.key && (compactNavigation || !item.mega) && panel}
              </div>
            ) : <Link key={item.key} to={item.path} onClick={closeNavigation} aria-current={activeKey === item.key ? 'page' : undefined}>{item.label}</Link>)}
          </nav>
        </div>
        {shouldRenderHeaderPanel && panel}
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
          <Link className="btn ghost" to="/#services">Explore Services</Link>
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
          <Link className="text-link" to="/#services">See how the workflow is organised <span>→</span></Link>
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
              <Link to="/#contact">Request a similar plan <span>↗</span></Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadForm({ compact = false, source = 'callback', afterSubmit, initialService = '' }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: initialService, message: '' });
  const [state, setState] = useState({ loading: false, message: '', ok: false });
  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setState({ loading: true, message: '', ok: false });
    try {
      const endpoint = source === 'quote-modal' ? 'quote.php' : source === 'contact-page' ? 'contact.php' : 'submit.php';
      const res = await fetch(`${API_BASE}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source }),
      });
      const data = await res.json();
      if (!res.ok || !(data.ok || data.success)) throw new Error(data.message || 'Could not submit the form.');
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
        <label><span>Email *</span><input required type="email" name="email" autoComplete="email" value={form.email} onChange={set} placeholder="Your email address" /></label>
        <label><span>{source === 'quote-modal' ? 'Phone *' : 'Phone'}</span><input required={source === 'quote-modal'} name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={set} placeholder="Your phone number" /></label>
        <label><span>{source === 'contact-page' ? 'Research Requirement' : 'Service'}</span><select name="service" value={form.service} onChange={set}><option value="">Choose service</option>{navigationPages.filter(page => !['home', 'contact'].includes(page.id)).map(page => <option key={page.id} value={page.displayTitle || page.title}>{page.displayTitle || page.title}</option>)}</select></label>
      </div>
      <label><span>{source === 'contact-page' ? 'Message *' : 'Research Requirement *'}</span><textarea required name="message" value={form.message} onChange={set} rows={compact ? 3 : 5} placeholder="Briefly describe your topic, stage and support needed." /></label>
      <button className="btn primary full" disabled={state.loading}>{state.loading ? 'Submitting…' : source === 'contact-page' ? 'Submit Enquiry' : 'Send Request →'}</button>
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
          <p>Share your current research stage, the support you need and a convenient way to reach you.</p>
          <CompanyContact compact />
        </div>
        <div className="form-panel">
          <h3>Research Enquiry</h3>
          <LeadForm source="homepage-callback" />
        </div>
      </div>
    </section>
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
        <p>Tell {companyInfo.name} about your research, or contact us directly.</p>
        <CompanyContact compact />
        <LeadForm compact source="quote-modal" afterSubmit={onClose} />
      </div>
    </div>
  );
}

export default function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const location = useLocation();
  const requestedService = new URLSearchParams(location.search).get('service') || '';
  const contactService = navigationPages.some(page => (page.displayTitle || page.title) === requestedService) ? requestedService : '';
  useEffect(() => {
    setActiveMegaMenu(null);
    const isAdmission = location.pathname.replace(/\/$/, '') === admissionPath;
    const isFastTrack = location.pathname.replace(/\/$/, '') === fastTrackPath;
    const isEmbarking = location.pathname.replace(/\/$/, '') === embarkingPath;
    const researchPage = [...researchStartPages, ...implementationPages].find(page => page.path === location.pathname.replace(/\/$/, ''));
    if (pageForPath(location.pathname)?.existing) {
      document.title = researchPage ? `${researchPage.label} | ${companyInfo.shortName}` : isEmbarking ? `${embarkingData.title} | ${companyInfo.shortName}` : isFastTrack ? `${fastTrackData.title} | ${companyInfo.shortName}` : isAdmission ? `PhD Admission Assistance | ${companyInfo.shortName}` : companyInfo.name;
      document.querySelector('meta[name="description"]')?.setAttribute('content', researchPage ? researchPage.description : isEmbarking ? embarkingData.description : isFastTrack ? fastTrackData.description : isAdmission ? phdAdmissionData.description : 'AcademicEdge Writing & Publication Services provides academic writing, research, thesis, journal manuscript, book publication, editing, formatting and technical research support.');
    } else if (location.pathname.replace(/\/$/, '') === '/contact') {
      document.title = `Contact ${companyInfo.name}`;
      document.querySelector('meta[name="description"]')?.setAttribute('content', 'Discuss your academic writing, research and publication requirements with the AcademicEdge team. Share your current stage, service needs and timeline through the research enquiry form.');
    } else if (!pageForPath(location.pathname) && !routeAliases.some(alias => alias.path === location.pathname)) {
      document.title = `Page Not Found | ${companyInfo.shortName}`;
      document.querySelector('meta[name="description"]')?.setAttribute('content', `This page could not be found. Explore ${companyInfo.shortName} research services or contact the team for help finding the right support.`);
    }
    const frame = requestAnimationFrame(() => {
      if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
      else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [location]);
  const openQuote = () => setQuoteOpen(true);
  return (
    <div className="site-shell">
      <Header onQuote={openQuote} activeMegaMenu={activeMegaMenu} setActiveMegaMenu={setActiveMegaMenu} />
      <main><Routes><Route path="/" element={<>
        <Hero onQuote={openQuote} />
        <IntroStats />
        <PromiseStrip />
        <ServicesSection />
        <Webinar />
        <SampleWork />
        <Callback />
      </>}/><Route path={admissionPath} element={<PhdAdmissionAssistance apiBase={API_BASE} onContact={openQuote} onOpenStart={() => { setActiveMegaMenu('research-services'); }}/>} />
<Route path={fastTrackPath} element={<FastTrackPhd onEnquire={openQuote} onOpenStart={() => { setActiveMegaMenu('research-services'); }}/>} />
<Route path={embarkingPath} element={<PhdEmbarking onQuote={openQuote} callbackForm={<LeadForm source="phd-embarking-callback"/>} onOpenStart={() => { setActiveMegaMenu('research-services'); }}/>} />
{researchStartPages.map(data => <Route key={data.path} path={data.path} element={<ResearchStartPage key={data.path} data={data} apiBase={API_BASE} onQuote={openQuote} callbackForm={<LeadForm source={data.path.slice(10) + '-callback'}/>} onOpenStart={() => { setActiveMegaMenu('research-services'); }}/>} />)}
{implementationPages.map(data => <Route key={data.path} path={data.path} element={<ImplementationPage key={data.path} data={data} onQuote={openQuote} callbackForm={<LeadForm source={data.path.slice(10) + '-callback'}/>} onOpenImplementation={() => { setActiveMegaMenu('other-services'); }}/>} />)}
      {newServicePages.map(page => <Route key={page.path} path={page.path} element={<Suspense fallback={<p className="container section" role="status">Loading research support…</p>}><ServicePage key={page.path} page={page} onQuote={openQuote} /></Suspense>} />)}
      <Route path={pathFor('contact')} element={<ContactPage onQuote={openQuote} form={<LeadForm key={contactService} source="contact-page" initialService={contactService} />} />} />
      {routeAliases.map(alias => <Route key={alias.path} path={alias.path} element={<Navigate to={{ pathname: alias.to, search: location.search, hash: location.hash }} replace />} />)}
      <Route path="*" element={<section className="service-detail"><div className="service-detail__container section"><span className="section-kicker">404 · PAGE NOT FOUND</span><h1>Let’s find the right research support.</h1><p>This address does not match a page on this website. Choose a service from the navigation or contact {companyInfo.shortName} with your requirement.</p><div className="service-detail__actions"><Link className="btn primary" to="/">Return Home</Link><Link className="btn ghost" to={pathFor('contact')}>Contact {companyInfo.shortName}</Link></div></div></section>}/></Routes></main>
      <Footer logo={<Logo />} />
      <a className="floating-call" href={`tel:${companyInfo.phones[0].value}`} aria-label={`Call ${companyInfo.name} on ${companyInfo.phones[0].label}`}>☎<span>Request a Call</span></a>
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
