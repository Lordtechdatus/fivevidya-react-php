import ServiceNextSteps from '../components/services/ServiceNextSteps.jsx';
import React from 'react';
import { Link } from 'react-router-dom';
import { MegaIcon } from '../MegaServicePanel.jsx';
import { Section, AdmissionProcess, Testimonials } from '../components/services/AdmissionSections.jsx';
import { ModelVisual, ImplementationTimeline, TechnicalCTA } from '../components/services/ImplementationBlocks.jsx';
import { implementationReviews } from '../data/implementationPages.js';
import './phdAdmission.css';
import './researchStart.css';
import './implementation.css';
import ImplementationSections from '../components/services/ImplementationSections.jsx';

function TechnicalCards({ items }) {
  return <div className={`implementation-card-group implementation-card-group--${items.length}`}><AdmissionProcess services={items.map(item => ({ ...item, intro: item.text }))}/></div>;
}

export default function ImplementationPage({ data, onQuote, onOpenImplementation, callbackForm }) {
  return <div className="admission-page research-start-page implementation-page">
    <nav className="container ad-breadcrumb" aria-label="Breadcrumb"><ol><li><Link to="/">Home</Link></li><li><button onClick={onOpenImplementation}>Other Services</button></li><li><Link to="/implementation">Implementation</Link></li><li aria-current="page">{data.label}</li></ol></nav>
    <section className="ad-hero"><div className="container ad-hero-grid"><div><span className="section-kicker">IMPLEMENTATION THAT SUPPORTS YOUR RESEARCH</span><h1>{data.title}</h1><p>{data.intro}</p><div className="ad-actions"><a className="btn primary" href="#contact">{data.cta} <span aria-hidden="true">↗</span></a><a className="btn ghost" href="#sample-models">Explore Sample Models</a></div></div><aside className="ad-hero-visual" aria-label={`${data.label} overview`}><div className="ad-visual-orbit" aria-hidden="true"><MegaIcon type={data.icon}/></div><span className="ad-visual-label">FROM RESEARCH QUESTION TO TESTABLE IMPLEMENTATION</span><h2>{data.label}</h2><ul>{data.highlights.map(point => <li key={point}><span aria-hidden="true">✓</span>{point}</li>)}</ul><div className="ad-visual-footer">PLAN → IMPLEMENT → VALIDATE</div></aside></div></section>
    {data.sections ? <ImplementationSections data={data}/> : <><Section className="ad-soft" title={data.whyTitle} intro={data.whyIntro}><TechnicalCards items={data.features}/><div className="implementation-sources"><span>Official product information:</span>{data.sources.map(source => <a className="text-link" key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>)}</div></Section>
    {data.details && <Section title="MATLAB Implementation Highlights" intro="Good implementation starts with the problem, the available data and the evidence needed to assess the result."><TechnicalCards items={data.details}/></Section>}
    <Section id="sample-models" className="ad-soft" title={data.details ? 'MATLAB Sample Model' : 'Sample Models'} intro="Original diagrams show possible model structures. They are illustrative starting points, not downloadable software or verified project results."><div className="implementation-model-grid">{data.models.map(model => <ModelVisual key={model.title} model={model}/>)}</div></Section>
    <Section title={`Benefits of Our ${data.details ? 'MATLAB' : 'Simulink'} Support`} intro="Receive practical implementation support with documented assumptions, clear explanations and checks that relate to your project objectives."><TechnicalCards items={data.benefits}/></Section>
    {data.process && <><Section className="ad-soft" title="Simulink Implementation Process" intro="A clear sequence keeps model development connected to requirements and validation."><ImplementationTimeline items={data.process}/></Section><TechnicalCTA light title="Need help with modelling, simulation, implementation or analysis?" text="Discuss your model, current challenges and the outcomes you need to investigate." button="Contact Our Technical Team" href="#contact"/></>}
    </>}
    <ServiceNextSteps data={data} onQuote={onQuote} />
    <Section title="What Research Scholars Say"><Testimonials items={implementationReviews}/></Section>
    <Section id="contact" className="ad-soft" title="Request a Callback" intro={`Tell us what you need for ${data.label} and a convenient time to speak.`}><div className="ad-consult-grid"><aside><span className="section-kicker">DISCUSS YOUR TECHNICAL REQUIREMENTS</span><h3>A clear brief makes a stronger starting point.</h3><p>Include your research objective, available data, software version and any toolbox requirements. Describe what you have already tried and where you need support.</p><p className="ad-note">Required fields are marked with an asterisk.</p></aside><div className="ad-card">{callbackForm}</div></div></Section>
  </div>;
}

