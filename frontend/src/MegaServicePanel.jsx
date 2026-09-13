import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export function MegaIcon({ type, className = '' }) {
  const path = type === 'close' ? <path d="m6 6 12 12M6 18 18 6"/> : <path d="m6 9 6 6 6-6"/>;
  return <svg className={`mega-icon ${className}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{path}</svg>;
}

function MenuGroup({ group, onSelect, mobile, secondary = false }) {
  const items = group.items.filter(item => item.path !== group.path || item.label !== group.label);
  if (mobile) return <details className="publication-menu__accordion">
    <summary>{group.label}<MegaIcon type="chevron"/></summary>
    <div>{group.path && <Link className="publication-menu__group-overview" to={group.path} onClick={onSelect}>Overview</Link>}{items.map(item => <Link key={`${item.label}-${item.path}`} to={item.path} onClick={onSelect}>{item.label}</Link>)}</div>
  </details>;
  return <section className={`publication-menu__group ${secondary ? 'publication-menu__group--secondary' : ''}`}>
    {group.path ? <Link className="publication-menu__heading" to={group.path} onClick={onSelect}>{group.label}</Link> : <h3 className="publication-menu__heading">{group.label}</h3>}
    <div className="publication-menu__links">{items.map(item => <Link key={`${item.label}-${item.path}`} to={item.path} onClick={onSelect}>{item.label}</Link>)}</div>
  </section>;
}

function MenuColumn({ entry, onSelect, mobile }) {
  const groups = entry.groups || [entry];
  if (mobile) return groups.map(group => <MenuGroup key={group.label} group={group} onSelect={onSelect} mobile />);
  return <div className="publication-menu__column">
    {groups.map((group, index) => <MenuGroup key={group.label} group={group} onSelect={onSelect} mobile={false} secondary={index > 0}/>)}
  </div>;
}

export default function MegaServicePanel({ menu, onClose, onSelect, labelledBy, isOpen = true, mobile = false }) {
  const panelRef = useRef(null);
  const [horizontalShift, setHorizontalShift] = useState(0);
  useEffect(() => { if (panelRef.current) panelRef.current.scrollTop = 0; }, [menu.key]);
  useLayoutEffect(() => {
    if (mobile || !isOpen) {
      setHorizontalShift(0);
      return undefined;
    }
    const clampPanel = () => {
      const panel = panelRef.current?.closest('.publication-menu');
      if (!panel) return;
      setHorizontalShift(0);
      requestAnimationFrame(() => {
        const rect = panel.getBoundingClientRect();
        const edge = 20;
        let nextShift = 0;
        if (rect.left < edge) nextShift = edge - rect.left;
        else if (rect.right > window.innerWidth - edge) nextShift = window.innerWidth - edge - rect.right;
        setHorizontalShift(Math.round(nextShift));
      });
    };
    clampPanel();
    window.addEventListener('resize', clampPanel);
    return () => window.removeEventListener('resize', clampPanel);
  }, [menu.key, isOpen, mobile]);
  return <section className={`mega-panel publication-menu publication-menu--${menu.mega || 'compact'} publication-menu--${menu.key} ${isOpen ? 'is-open' : 'is-closing'}`} style={{ '--menu-shift-x': `${horizontalShift}px` }} inert={!isOpen} id={`mega-panel-${menu.key}`} aria-labelledby={labelledBy}>
    {!mobile && <button className="mega-close" type="button" onClick={onClose} aria-label={`Close ${menu.label} menu`}><MegaIcon type="close"/></button>}
    <div ref={panelRef} className="publication-menu__inner">
      <div className="publication-menu__featured">
        <Link className="publication-menu__overview" to={menu.path} onClick={onSelect}>Explore {menu.label}<span aria-hidden="true">→</span></Link>
        {menu.featured?.map(item => <Link key={item.id} to={item.path} onClick={onSelect}>{item.label}</Link>)}
      </div>
      <div className="publication-menu__grid">{menu.groups.map(entry => <MenuColumn key={entry.label || entry.groups?.map(group => group.label).join('-')} entry={entry} onSelect={onSelect} mobile={mobile}/>)}</div>
    </div>
  </section>;
}
