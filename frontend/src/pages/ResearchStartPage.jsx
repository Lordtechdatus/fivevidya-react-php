import ServiceNextSteps from '../components/services/ServiceNextSteps.jsx';
import React from 'react';
import { Link } from 'react-router-dom';
import { Section, Testimonials } from '../components/services/AdmissionSections.jsx';
import PatentConsultation from '../components/services/PatentConsultation.jsx';
import { MegaIcon } from '../MegaServicePanel.jsx';
import { startRelatedServices, researchStartReviews } from '../data/researchStartPages.js';
import { admissionPath } from '../data/phdAdmissionAssistance.js';
import { fastTrackPath } from '../data/fastTrackPhd.js';
import { embarkingPath } from '../data/phdEmbarking.js';
import './phdAdmission.css';
import './researchStart.css';

function ContentCards({ cards, layout }) {
  return <div className={`ad-grid ${layout === 'steps' || layout === 'four' ? 'ad-grid--two' : 'ad-grid--three'} ${layout === 'timeline' ? 'rs-timeline' : ''}`}>{cards.map((item, index) => <article className="ad-card rs-card" key={item.title}><div className="ad-card-top"><MegaIcon type={item.icon}/>{['steps', 'timeline'].includes(layout) && <span>Step {String(index + 1).padStart(2, '0')}</span>}</div><h3>{item.title}</h3><p>{item.text}</p>{item.points && <ul className="ad-checklist">{item.points.map(point => <li key={point}>{point}</li>)}</ul>}</article>)}</div>;
}

const related = [
  { path: admissionPath, label: 'PhD Admission Assistance', icon: 'graduate' },
  { path: fastTrackPath, label: 'Fast-Track PhD by Research Publication', icon: 'book' },
  { path: embarkingPath, label: 'PhD – Embarking the Journey', icon: 'compass' },
  ...startRelatedServices,
];

export default function ResearchStartPage({ data, onQuote, onOpenStart, callbackForm, apiBase }) {
  return <div className="admission-page research-start-page">
    <nav className="container ad-breadcrumb" aria-label="Breadcrumb"><ol><li><Link to="/">Home</Link></li><li><button onClick={onOpenStart}>Research Services</button></li><li aria-current="page">{data.label}</li></ol></nav>
    <section className="ad-hero"><div className="container ad-hero-grid"><div><span className="section-kicker">{data.eyebrow}</span><h1>{data.title}</h1><p>{data.intro}</p><div className="ad-actions"><a className="btn primary" href={data.patent ? '#consultation' : '#contact'}>{data.cta} <span aria-hidden="true">↗</span></a><a className="btn ghost" href="#service-overview">Explore Our Support</a></div></div><aside className="ad-hero-visual" aria-label={`${data.label} overview`}><div className="ad-visual-orbit" aria-hidden="true"><MegaIcon type={data.icon}/></div><span className="ad-visual-label">RESEARCH SUPPORT WITH A CLEAR PURPOSE</span><h2>{data.label}</h2><ul>{data.benefits.map(point => <li key={point}><span aria-hidden="true">✓</span>{point}</li>)}</ul><div className="ad-visual-footer"><span>YOUR IDEAS. A CONSIDERED NEXT STEP.</span></div></aside></div></section>
    {data.patent && <><Section><ContentCards cards={data.highlights} layout="four"/></Section><Section id="consultation" className="ad-soft" title="Request a Patent Consultation" intro="Tell us your general research area and what you would like to discuss. Keep the initial enquiry at an overview level."><div className="ad-card"><PatentConsultation apiBase={apiBase}/></div></Section></>}
    {data.sections.map((section, index) => <Section key={section.title} id={index === 0 ? 'service-overview' : undefined} className={index % 2 === 0 ? 'ad-soft' : ''} title={section.title} intro={section.intro}><ContentCards cards={section.cards} layout={section.layout}/></Section>)}
    {data.patent && <div className="container rs-disclaimer"><p>Patent filing is a legal/regulatory process. Final legal advice and representation should be provided by a qualified patent professional where required.</p><a className="text-link" href="https://www.wipo.int/en/web/patents/faq_patents" target="_blank" rel="noreferrer">WIPO: general patent information ↗</a></div>}
    <section className="ad-cta ad-cta--light"><div className="container ad-cta-inner"><div><h2>{data.cta}</h2><p>Discuss your current stage, research objectives and the guidance you need next.</p></div><a className="btn primary" href={data.patent ? '#consultation' : '#contact'}>{data.cta}</a></div></section>
    {data.patent && <Section title="Other Services" intro="Find related support for the early decisions in your research journey."><div className="ad-grid ad-grid--three">{related.filter(item => item.path !== data.path).map(item => <Link className="ad-card rs-related" key={item.path} to={item.path}><MegaIcon type={item.icon}/><strong>{item.label}</strong><span aria-hidden="true">↗</span></Link>)}</div></Section>}
    {data.patent ? <section className="ad-cta"><div className="container ad-cta-inner"><h2>Discuss your requirements</h2><button className="btn primary" onClick={onQuote}>Request a Quote</button></div></section> : <ServiceNextSteps data={data} onQuote={onQuote} />}
    <Section title="What Research Scholars Say"><Testimonials items={researchStartReviews}/></Section>
    <Section id="contact" className="ad-soft" title="Request a Callback" intro={`Tell us about your ${data.label.toLowerCase()} requirements and a convenient time to speak.`}><div className="ad-consult-grid"><aside><span className="section-kicker">START WITH A CONVERSATION</span><h3>Make your next research decision with a clearer plan.</h3><p>Share your current stage, the support you need and any relevant deadlines. Our team can help you identify practical next steps.</p><p className="ad-note">Required fields are marked with an asterisk.</p></aside><div className="ad-card">{callbackForm}</div></div></Section>
  </div>;
}
