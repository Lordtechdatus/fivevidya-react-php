import { Mail, MapPin, Phone } from 'lucide-react';
import { companyInfo, officeAddressLines } from '../data/companyInfo.js';
import './companyContact.css';

export default function CompanyContact({ compact = false, stacked = false }) {
  const phones = companyInfo.phones.map(phone => <a className="company-contact__link" key={phone.value} href={`tel:${phone.value}`}><Phone size={20} aria-hidden="true"/><span>{phone.label}</span></a>);
  const email = <a className="company-contact__link" href={`mailto:${companyInfo.email}`}><Mail size={20} aria-hidden="true"/><span>{companyInfo.email}</span></a>;
  if (compact) return <div className="company-contact company-contact--compact">{phones}{email}</div>;
  return <div className={`company-contact${stacked ? ' company-contact--stacked' : ''}`}>
    <div><h3><MapPin size={22} aria-hidden="true"/>Office Location</h3><address>{officeAddressLines.map((line, index) => <span key={line}>{line}{index < officeAddressLines.length - 1 ? ',' : ''}</span>)}</address></div>
    <div><h3>Quick Contact</h3>{phones}</div>
    <div><h3>Email</h3>{email}</div>
  </div>;
}
