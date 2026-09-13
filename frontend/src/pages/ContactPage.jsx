import { Link } from 'react-router-dom';
import CompanyContact from '../components/CompanyContact.jsx';
import { companyInfo, officeAddress, officeMapUrl, officeMapEmbedUrl } from '../data/companyInfo.js';
import './servicePage.css';

export default function ContactPage({ form, onQuote }) {
  return <div className="service-detail">
    <section className="service-detail__hero"><div className="service-detail__container">
      <nav aria-label="Breadcrumb"><ol><li><Link to="/">Home</Link></li><li aria-current="page">Contact</li></ol></nav>
      <h1>Contact {companyInfo.name}</h1><p>Contact {companyInfo.name} to discuss your research, the stage you have reached and the support you need next. Visit our Gwalior office, call either contact number, or share your requirements through the enquiry form.</p>
    </div></section>
    <div className="service-detail__container service-detail__contact-layout">
      <section><h2>Company Contact Information</h2><CompanyContact stacked /><div className="service-detail__contact-intro"><h2>Start with your research brief</h2><p>You do not need a finished proposal to ask about support. A clear account of your question and current difficulty is a useful starting point. If you already have supervisor feedback, summarise the decisions it asks you to address.</p></div>
        <ul><li>Your discipline and current research stage.</li><li>The service or output you want help with.</li><li>What you have already completed and what remains unresolved.</li><li>Any relevant deadline, format or software requirements.</li></ul>
        <h2>What happens next?</h2><p>Your enquiry provides the starting point for reviewing a suitable scope of support. Keep the first message at an overview level; do not include confidential participant data, unpublished invention details or account credentials. The form confirms whether the request was successfully received.</p>
        <p>Unsure which service fits? Browse <Link className="text-link" to="/research-services">Research Services</Link> or <Link className="text-link" to="/other-services">Other Services</Link> to compare the available pathways.</p>
        <button className="btn primary" onClick={onQuote}>Request a Quote</button>
      </section>
      <section className="service-detail__contact-form" aria-labelledby="contact-form-heading"><h2 id="contact-form-heading">Research enquiry</h2>{form}</section>
    </div>
    <section className="service-detail__container service-detail__office-map" aria-labelledby="office-map-heading">
      <h2 id="office-map-heading">Our Office Location</h2><p>{officeAddress}</p>
      <iframe title={`${companyInfo.name} office location in Gwalior`} src={officeMapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      <a className="text-link" href={officeMapUrl} target="_blank" rel="noreferrer">Open this address in Google Maps ↗</a>
    </section>
  </div>;
}
