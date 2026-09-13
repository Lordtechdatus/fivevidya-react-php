import React from 'react';
import { Link } from 'react-router-dom';
import { MegaIcon } from '../MegaServicePanel.jsx';
import { phdAdmissionData as data } from '../data/phdAdmissionAssistance.js';
import { Section, StatsGrid, AdmissionProcess, PackageComparison, ServiceCTA, FAQAccordion, UniversityGrid, ScholarshipGrid, WhyChooseUs, Testimonials } from '../components/services/AdmissionSections.jsx';
import { ConsultationForm, BrochureForm } from '../components/services/AdmissionForms.jsx';
import './phdAdmission.css';

function AdmissionHero() {
  return <section className="ad-hero"><div className="container ad-hero-grid"><div>
    <span className="section-kicker">PH.D. ADMISSION SUPPORT</span><h1>{data.title}</h1><p className="ad-regions">United States • United Kingdom • Europe • Australia • Canada</p>
    <p>A PhD is a defining academic decision. A strong application brings together a clear research direction, suitable faculty and carefully prepared documents — not simply a completed form.</p>
    <p>From shortlisting programmes to reviewing your statement and proposal, we help you plan each step. Your background and ambitions shape the support, so the application remains personal, purposeful and yours.</p>
    <div className="ad-actions"><a className="btn primary" href="#consultation">Book a Consultation <span aria-hidden="true">↗</span></a><a className="btn ghost" href="#admission-process">Explore Our Process</a></div>
  </div><aside className="ad-hero-visual" aria-label="PhD admission assistance benefits"><div className="ad-visual-orbit" aria-hidden="true"><MegaIcon type="graduate"/></div><span className="ad-visual-label">YOUR NEXT ACADEMIC CHAPTER</span><h2>PhD Admission<br/>Assistance</h2><ul>{data.benefits.map(benefit => <li key={benefit}><span aria-hidden="true">✓</span>{benefit}</li>)}</ul><div className="ad-visual-footer"><span>YOUR RESEARCH.</span><strong>A clearer direction.</strong></div></aside></div></section>;
}

export default function PhdAdmissionAssistance({ apiBase, onOpenStart, onContact }) {
  return <div className="admission-page">
    <nav className="container ad-breadcrumb" aria-label="Breadcrumb"><ol><li><Link to="/">Home</Link></li><li><button onClick={onOpenStart}>Research Services</button></li><li aria-current="page">PhD Admission Assistance</li></ol></nav>
    <AdmissionHero/>
    <Section className="ad-stat-section"><StatsGrid items={data.stats}/><p className="ad-note">Illustrative statistics supplied for this page layout; not verified performance claims.</p></Section>
    <Section id="consultation" className="ad-soft" eyebrow="LET’S START WITH YOUR GOALS" title="Apply for PhD Admission Consultation" intro="Share your academic profile, preferred country or university, and the questions you want to work through. We’ll help you identify a practical starting point."><div className="ad-consult-grid"><aside><span className="ad-step">01 / A CONVERSATION FIRST</span><h3>Tell us where you want your research to take you.</h3><p>You do not need a finished proposal to begin. Bring your interests, experience and questions.</p><ul className="ad-checklist"><li>Your academic background</li><li>Your preferred destinations</li><li>Your research ambitions</li><li>Your application timeline</li></ul><p className="ad-note">Required fields are marked with an asterisk.</p></aside><div className="ad-card"><ConsultationForm apiBase={apiBase}/></div></div></Section>
    <Section className="ad-radar" eyebrow="BEYOND UNIVERSITY SHORTLISTING" title="Professor Intelligence & Funding Radar for PhD Applications" intro="A relevant research group can matter as much as a university name. Explore faculty interests, laboratory work and advertised opportunities to focus your applications where your research could fit. Funding announcements provide context; they do not automatically mean a lab is recruiting."><StatsGrid items={data.radar} radar/><p className="ad-note">Illustrative tracking metrics and service framework; this panel is not a live vacancy or funding feed.</p></Section>
    <Section id="admission-process" eyebrow="FROM INTEREST TO APPLICATION" title="Our PhD Admission Support Process" intro="Four connected areas of guidance help you make informed choices and prepare applications that reflect your own academic work."><AdmissionProcess services={data.services}/></Section>
    <Section className="ad-soft" title="Choose Your PhD Admission Support Plan" intro="Start with the guidance you need today, with room to discuss a wider scope as your application develops."><PackageComparison packages={data.packages} rows={data.packageRows}/></Section>
    <ServiceCTA secondary title="Schedule a Quick Call" text="Discuss your academic profile, target universities and current application stage with our team."/>
    <Section title="Frequently Asked Questions" intro="Practical answers before you begin your doctoral application journey."><FAQAccordion items={data.faqs}/></Section>
    <Section className="ad-soft" eyebrow="POPULAR CHOICES OF RESEARCH SCHOLARS" title="University Preferences" intro="Your shortlist should reflect your discipline, funding needs, research facilities and faculty alignment. These institutions are examples to explore, not partner universities or a promise of admission."><UniversityGrid items={data.universities}/></Section>
    <Section title="Scholarship Opportunities for PhD Aspirants" intro="Full or partial funding may be available depending on nationality, discipline, academic stage and institutional requirements. Use the official programme information to assess which opportunities are relevant to you."><ScholarshipGrid items={data.scholarships}/><p className="ad-note">Scholarship eligibility, deadlines and funding conditions may change. Applicants should verify current requirements from the official scholarship or university website. Admission and funding are not guaranteed.</p></Section>
    <Section className="ad-soft" title="Why Choose Our PhD Admission Support?"><WhyChooseUs items={data.whyChooseUs}/></Section>
    <Section title="What Research Scholars Say"><Testimonials items={data.reviews}/></Section>
    <ServiceCTA title="Begin Your PhD Journey With a Clear Application Strategy" text="A doctoral application is more than a set of forms. A focused research direction, a thoughtful university shortlist and well-prepared documents help you present your academic potential with clarity." onContact={onContact}/>
    <Section title="Download PhD Application Support Brochure" intro="Enter your details to receive an overview of the PhD admission assistance process and available support options."><div className="ad-card"><BrochureForm url={data.brochureUrl}/></div></Section>
    <Section className="ad-soft ad-profile" eyebrow="BUILD A STRONGER FOUNDATION" title="Want to Strengthen Your Research Profile Before Applying?" intro="Explore research profile review, publication planning, academic CV improvement and research visibility. Where relevant, discuss patent and other research-output guidance as part of a longer-term academic plan.">
      {/* TODO: Replace with researcher-profile-enhancement route once that service page is created. */}
      <a className="btn ghost" href="#" onClick={event => event.preventDefault()} aria-describedby="profile-coming-soon">Explore Research Profile Enhancement <span aria-hidden="true">↗</span></a><p className="ad-note" id="profile-coming-soon">Service page coming soon. You can discuss profile support during your consultation.</p>
    </Section>
  </div>;
}
