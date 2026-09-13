import { Link } from 'react-router-dom';
import { services } from '../../data/services.js';
import { pathFor } from '../../data/navigation.js';

// Retained custom pages share the same catalogue as the homepage and navigation.
export default function ServiceNextSteps({ data, onQuote }) {
  const current = services.find(service => service.path === data.path);
  if (!current) return null;
  const ids = current.category === 'where-to-start'
    ? ['topic-and-research-proposal', 'problem-statement', 'base-papers', 'research-design']
    : ['matlab-projects', 'simulink-projects', 'python-projects', 'java-projects', 'ansys-projects', 'implementation'];
  const related = ids.filter(id => id !== current.id).slice(0, 4).map(id => services.find(service => service.id === id));
  return <>
    <section className="section"><div className="container"><h2>Related Services</h2><div className="ad-grid ad-grid--three">
      {related.map(service => <Link className="ad-card rs-related" key={service.id} to={service.path}>{service.title}<span aria-hidden="true">↗</span></Link>)}
    </div></div></section>
    <section className="ad-cta"><div className="container ad-cta-inner"><div><h2>Need Support With Your Research?</h2><p>Discuss your academic writing, research and publication requirements with the AcademicEdge team.</p></div><div className="ad-actions">
      <Link className="btn primary" to={`${pathFor('contact')}?service=${encodeURIComponent(current.title)}`}>Discuss Your Research</Link>
      <button className="btn primary" onClick={onQuote}>Request a Quote</button>
    </div></div></section>
  </>;
}
