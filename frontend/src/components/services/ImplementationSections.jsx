import React from 'react';
import { Code2, ChartNoAxesCombined, Microscope, CircleCheck, Settings2, PanelsTopLeft } from 'lucide-react';
import { Section } from './AdmissionSections.jsx';
import { ImplementationTimeline } from './ImplementationBlocks.jsx';
import './implementationSections.css';
const icons = { code: Code2, chart: ChartNoAxesCombined, research: Microscope, check: CircleCheck, settings: Settings2 };
function Sample({ item }) {
  return <figure className="ad-card imp-sample"><figcaption><span className="section-kicker">ILLUSTRATIVE WORKFLOW</span><h3>{item.title}</h3></figcaption><div className="imp-preview"><div className="imp-preview-bar" aria-hidden="true"><PanelsTopLeft size={18}/><span>RESEARCH WORKSPACE</span><span>•••</span></div>
    {item.kind === 'matrix' && <div className="imp-matrix" aria-label="Example matrix structure: diagonal cells compare a variable with itself; other cells represent pairwise comparisons">{['', 'A', 'B', 'C', 'A', 'Self', 'A / B', 'A / C', 'B', 'B / A', 'Self', 'B / C', 'C', 'C / A', 'C / B', 'Self'].map((value, i) => <span key={i} className={value === 'Self' ? 'imp-cell-strong' : ''}>{value}</span>)}</div>}
    {item.kind === 'mesh' && <svg className="imp-mesh" viewBox="0 0 300 180" role="img" aria-label="Original schematic of a cuboid with a surface mesh"><g fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M60 65 165 20 245 65 245 130 140 170 60 125Z M60 65 140 110 245 65 M140 110V170"/>{[1,2,3,4].map(n => <React.Fragment key={n}><path d={`M${60+n*21} ${65-n*9}l80 45v60 M${60+n*16} ${65+n*9}l105 -45 M60 ${65+n*12}l80 45 105 -45`}/></React.Fragment>)}</g></svg>}
    <ul className={item.kind === 'code' ? 'imp-code' : 'imp-preview-list'}>{item.lines.map((line, i) => <li key={line}>{item.kind !== 'code' && <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>}<code>{line}</code></li>)}</ul></div><p className="ad-note">Concept preview only; no project data, measured results or vendor screenshots are shown.</p></figure>;
}
export default function ImplementationSections({ data }) {
  return <>{data.sections.map((section, index) => <Section key={section.title} id={section.type === 'samples' ? 'sample-models' : undefined} className={index % 2 === 0 ? 'ad-soft' : ''} title={section.title} intro={section.intro}>
    {section.type === 'timeline' ? <ImplementationTimeline items={section.items}/> : section.type === 'samples' ? <div className="ad-grid ad-grid--two">{section.items.map(item => <Sample key={item.title} item={item}/>)}</div> : <div className={`ad-grid ad-grid--${section.items.length === 3 || section.items.length === 6 ? 'three' : 'two'} ${section.items.length === 1 ? 'imp-single' : ''}`}>{section.items.map(item => { const Icon = icons[item.icon] || Code2; return <article className="ad-card" key={item.title}><Icon className="imp-icon" size={30} strokeWidth={1.8} aria-hidden="true"/><h3>{item.title}</h3><p>{item.text}</p>{item.points.length > 0 && <ul className="ad-checklist">{item.points.map(point => <li key={point}>{point}</li>)}</ul>}</article>; })}</div>}
    {index === 0 && <div className="implementation-sources"><span>Official platform information:</span>{data.sources.map(source => <a className="text-link" key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>)}</div>}
  </Section>)}</>;
}
