import React, { useState } from 'react';
import { MegaIcon } from '../../MegaServicePanel.jsx';

export function Section({ id, eyebrow, title, intro, className = '', children }) {
  return <section id={id} className={`ad-section ${className}`}><div className="container">
    {(title || eyebrow) && <div className="ad-section-heading">{eyebrow && <span className="section-kicker">{eyebrow}</span>}{title && <h2>{title}</h2>}{intro && <p>{intro}</p>}</div>}
    {children}
  </div></section>;
}

export function StatsGrid({ items, radar = false }) {
  return <div className={`ad-stats ${radar ? 'ad-stats--radar' : ''}`}>{items.map(item => <div key={item.label} className="ad-stat">
    {item.icon && <MegaIcon type={item.icon}/>}<strong>{item.value}</strong><span>{item.label}</span>
  </div>)}</div>;
}

export function ServiceCTA({ title, text, secondary = false, onContact }) {
  return <section className={`ad-cta ${secondary ? 'ad-cta--light' : ''}`}><div className="container ad-cta-inner"><div><h2>{title}</h2><p>{text}</p></div><div className="ad-actions"><a className="btn primary" href="#consultation">{secondary ? 'Schedule Consultation' : 'Book a Consultation'} <span aria-hidden="true">↗</span></a>{onContact && <button className="btn ghost" onClick={onContact}>Contact Us</button>}</div></div></section>;
}

export function AdmissionProcess({ services }) {
  return <div className="ad-grid ad-grid--two">{services.map((service, index) => <article className="ad-card ad-process-card" key={service.title}>
    <div className="ad-card-top"><MegaIcon type={service.icon}/><span>{String(index + 1).padStart(2, '0')}</span></div><h3>{service.title}</h3><p>{service.intro}</p>
    {service.groups ? <dl>{service.groups.map(group => <div key={group.title}><dt>{group.title}</dt><dd>{group.text}</dd></div>)}</dl> : <ul className="ad-checklist">{service.points.map(point => <li key={point}>{point}</li>)}</ul>}
  </article>)}</div>;
}

export function PackageComparison({ packages, rows }) {
  return <><p className="ad-note">Illustrative plan scope. We confirm inclusions and pricing during your consultation.</p>
    <table className="ad-comparison"><caption className="ad-sr-only">Compare Standard and Advanced PhD admission support</caption><thead><tr><th scope="col">Service</th>{packages.map(plan => <th key={plan.id} scope="col"><h3>{plan.title}</h3><p>{plan.description}</p><strong>{plan.price}</strong></th>)}</tr></thead><tbody>{rows.map(row => <tr key={row[0]}><th scope="row">{row[0]}</th><td>{row[1]}</td><td>{row[2]}</td></tr>)}</tbody><tfoot><tr><td>Find your fit</td>{packages.map(plan => <td key={plan.id}><a className="btn primary" href="#consultation" aria-label={`Discuss ${plan.title} plan`}>Discuss {plan.title}</a></td>)}</tr></tfoot></table>
    <div className="ad-package-mobile">{packages.map((plan, index) => <article className="ad-card" key={plan.id}><span className="section-kicker">{plan.title}</span><h3>{plan.price}</h3><p>{plan.description}</p><dl>{rows.map(row => <div className="ad-package-row" key={row[0]}><dt>{row[0]}</dt><dd>{row[index + 1]}</dd></div>)}</dl><a className="btn primary full" href="#consultation">Discuss {plan.title}</a></article>)}</div>
  </>;
}

export function FAQAccordion({ items }) {
  const [open, setOpen] = useState(null);
  return <div className="ad-faq">{items.map(([question, answer], index) => <div className={`ad-faq-item ${open === index ? 'is-open' : ''}`} key={question}>
    <h3><button id={`faq-question-${index}`} type="button" aria-expanded={open === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(open === index ? null : index)}>{question}<MegaIcon type="chevron"/></button></h3>
    <div className="ad-faq-answer" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} aria-hidden={open !== index}><div><p>{answer}</p></div></div>
  </div>)}</div>;
}

export function UniversityGrid({ items }) {
  return <div className="ad-grid ad-grid--four">{items.map(([name, country]) => <article className="ad-card ad-university" key={name}><MegaIcon type="graduate"/><span className="ad-country">{country}</span><h3>{name}</h3><p>Research destination to explore</p></article>)}</div>;
}

export function ScholarshipGrid({ items }) {
  return <div className="ad-grid ad-grid--three">{items.map(item => <article className="ad-card ad-scholarship" key={item.name}><span className="ad-country">{item.region}</span><h3>{item.name}</h3><p>{item.text}</p><a className="text-link" href={item.url} target="_blank" rel="noreferrer">Official scholarship information <span aria-hidden="true">↗</span><span className="ad-sr-only"> (opens in a new tab)</span></a></article>)}</div>;
}

export function WhyChooseUs({ items }) {
  return <div className="ad-grid ad-grid--four">{items.map(item => <article className="ad-card" key={item.title}><MegaIcon type={item.icon}/><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>;
}

export function Testimonials({ items }) {
  return <><p className="ad-note">Illustrative feedback examples only — these are not verified customer testimonials.</p><div className="ad-grid ad-grid--three">{items.map(item => <figure className="ad-card ad-review" key={item.name}><span aria-hidden="true" className="ad-quote">“</span><blockquote>{item.text}</blockquote><figcaption><strong>{item.name}</strong><span>{item.context}</span></figcaption></figure>)}</div></>;
}
