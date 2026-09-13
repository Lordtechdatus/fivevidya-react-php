import React from 'react';
import { Link } from 'react-router-dom';
import { MegaIcon } from '../../MegaServicePanel.jsx';

export function RelatedServices({ items, currentPath }) {
  return <div className="ad-grid ad-grid--three">{items.filter(item => item.path !== currentPath).map(item => <Link className="ad-card rs-related" key={item.path} to={item.path}><MegaIcon type={item.icon}/><strong>{item.label}</strong><span aria-hidden="true">↗</span></Link>)}</div>;
}

export function ModelVisual({ model }) {
  return <figure className="ad-card implementation-model"><figcaption><span className="section-kicker">ORIGINAL CONCEPT DIAGRAM</span><h3>{model.title}</h3><p>{model.caption}</p></figcaption><ol className="implementation-blocks" aria-label={`${model.title} signal flow`}>{model.blocks.map(([title, detail]) => <li key={title}><strong>{title}</strong><span>{detail}</span></li>)}</ol><p className="ad-note">{model.note}</p></figure>;
}

export function ImplementationTimeline({ items }) {
  return <ol className="implementation-timeline">{items.map((item, index) => <li key={item.title}><span className="implementation-step">Step {index + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></li>)}</ol>;
}

export function TechnicalCTA({ title, text, button, onClick, href, light = false }) {
  return <section className={`ad-cta ${light ? 'ad-cta--light' : ''}`}><div className="container ad-cta-inner"><div><h2>{title}</h2><p>{text}</p></div>{href ? <a className="btn primary" href={href}>{button} <span aria-hidden="true">↗</span></a> : <button className="btn primary" onClick={onClick}>{button} <span aria-hidden="true">↗</span></button>}</div></section>;
}
