import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { companyInfo, officeAddressLines } from '../data/companyInfo.js';
import { footerGroups, pathFor } from '../data/navigation.js';
import './footer.css';

export default function Footer({ logo }) {
  return <footer className="footer">
    <div className="footer-container">
      <div className="footer-main">
        <div className="footer-company">{logo}<p className="footer-company-description">{companyInfo.name} provides professional support for academic writing, research development, thesis preparation, journal manuscripts, book publications, technical research, editing, formatting and publication-readiness.</p>
      <div className="footer-company-info">
        <div><h3><MapPin size={16} aria-hidden="true"/>Office Location</h3><address>{officeAddressLines.map((line, index) => <span key={line}>{line}{index < officeAddressLines.length - 1 ? ',' : ''}</span>)}</address></div>
        <div><h3>Quick Contact</h3><div className="footer-company-links">{companyInfo.phones.map(phone => <a key={phone.value} href={`tel:${phone.value}`}><Phone size={16} aria-hidden="true"/><span>{phone.label}</span></a>)}</div></div>
        <div><h3>Email</h3><div className="footer-company-links"><a href={`mailto:${companyInfo.email}`}><Mail size={16} aria-hidden="true"/><span>{companyInfo.email}</span></a></div></div>
      </div>
        </div>
        {footerGroups.map(group => <nav key={group.title} aria-label={`Footer ${group.title}`}>
          <h2>{group.title}</h2>
          <div className="footer-links">{group.items.map(([label, id]) => <Link key={id} to={pathFor(id)}>{label}</Link>)}</div>
        </nav>)}
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} {companyInfo.name}. All Rights Reserved.</span><span>Privacy · Terms · Sitemap</span></div>
    </div>
  </footer>;
}
