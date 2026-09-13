import { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { pageById, sidebarFor, pathFor } from '../data/navigation.js';
import { servicePageByPath } from '../data/servicePages.js';
import './servicePage.css';

export function ServiceSidebar({ page }) {
  const navigate = useNavigate();
  const items = sidebarFor(page);
  const group = pageById[page.group];
  return <aside className="service-detail__sidebar">
    <nav className="service-detail__desktop-nav" aria-label={`${group?.title || page.title} services`}>
      <h2>{group?.displayTitle || group?.title || page.title}</h2>
      {items.map(item => <NavLink key={item.id} to={item.path} end>{item.displayTitle || item.title}</NavLink>)}
    </nav>
    <label className="service-detail__mobile-nav">
      <span>Browse {group?.displayTitle || group?.title || 'related services'}</span>
      <select aria-label="Browse category services" value={page.path} onChange={event => navigate(event.target.value)}>
        {items.map(item => <option key={item.id} value={item.path}>{item.displayTitle || item.title}</option>)}
      </select>
    </label>
    <div className="service-detail__sidebar-help"><h3>Plan your next step</h3><p>Share your current stage and the research decision you need to make.</p><Link to={`${pathFor('contact')}?service=${encodeURIComponent(page.title)}`}>Discuss your requirements →</Link></div>
  </aside>;
}

export default function ServicePage({ page, onQuote }) {
  const data = servicePageByPath[page.path];
  useEffect(() => {
    document.title = data.seoTitle;
    document.querySelector('meta[name="description"]')?.setAttribute('content', data.description);
  }, [data]);
  const ancestors = [...new Set([data.parent, data.group].filter(id => id && id !== data.id))].map(id => pageById[id]);
  const related = data.related.slice(0, 4).map(id => pageById[id]);
  return <div className="service-detail">
    <section className="service-detail__hero">
      <div className="service-detail__container">
        <nav aria-label="Breadcrumb"><ol><li><Link to="/">Home</Link></li>{ancestors.map(item => <li key={item.id}><Link to={item.path}>{item.displayTitle || item.title}</Link></li>)}<li aria-current="page">{data.title}</li></ol></nav>
        <h1>{data.title}</h1><p>{data.intro}</p>
      </div>
    </section>
    <div className="service-detail__container service-detail__layout">
      <ServiceSidebar page={data} />
      <article className="service-detail__content">
        {data.overview && <section className="service-detail__options" aria-label="Explore this category">
          {sidebarFor(data).filter(item => item.id !== data.id).map(item => <Link to={item.path} key={item.id}>{item.displayTitle || item.title}<span aria-hidden="true">↗</span></Link>)}
        </section>}
        {data.sections.map(([heading, text]) => <section key={heading}><h2>{heading}</h2><p>{text}</p></section>)}
        <section><h2>Our process</h2><ol className="service-detail__process">{data.process.map((step, index) => <li key={step}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><p>{step}</p></li>)}</ol></section>
        <section className="service-detail__deliverables"><h2>Key deliverables</h2><p>The final scope and file formats are agreed around your research requirements.</p><ul>{data.deliverables.map(item => <li key={item}>{item}</li>)}</ul></section>
        <section className="service-detail__faq"><h2>Frequently asked questions</h2>{data.faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
        <section><h2>Related services</h2><div className="service-detail__related">{related.map(item => <Link key={item.id} to={item.path}>{item.displayTitle || item.title} <span aria-hidden="true">↗</span></Link>)}</div></section>
      </article>
    </div>
    <section className="service-detail__cta"><div className="service-detail__container"><div><h2>Need support with your research?</h2><p>Discuss your {data.title.toLowerCase()} requirements and identify a suitable approach for your next step.</p></div><div className="service-detail__actions"><Link className="btn primary" to={`${pathFor('contact')}?service=${encodeURIComponent(data.title)}`}>Discuss Your Research</Link><button className="btn ghost" onClick={onQuote}>Request a Quote</button></div></div></section>
  </div>;
}
