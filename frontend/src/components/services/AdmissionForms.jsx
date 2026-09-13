import React, { useState } from 'react';

export function ConsultationForm({ apiBase }) {
  const [status, setStatus] = useState({ loading: false, ok: false, message: '' });
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    if (!fields.name.trim()) { setStatus({ loading: false, ok: false, message: 'Please enter your full name.' }); return; }
    if ((fields.phone.match(/\d/g) || []).length < 7) { setStatus({ loading: false, ok: false, message: 'Please enter a valid phone number with at least seven digits.' }); return; }
    setStatus({ loading: true, ok: false, message: '' });
    try {
      const response = await fetch(`${apiBase}/submit.php`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        name: fields.name.trim(), email: fields.email.trim(), phone: fields.phone,
        service: 'PhD Admission Assistance', source: 'phd-admission-consultation',
        message: `Country: ${fields.country || 'Not specified'}\nHighest degree: ${fields.degree}\nTarget region: ${fields.region}\nResearch area: ${fields.research || 'Not specified'}\nRequirement: ${fields.message || 'Admission consultation requested'}`,
      }) });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.message || 'Unable to submit your request. Please try again.');
      setStatus({ loading: false, ok: true, message: 'Your consultation request has been received. Thank you for sharing your academic goals.' });
      form.reset();
    } catch {
      setStatus({ loading: false, ok: false, message: 'We could not send your request. Please try again when the enquiry service is available. Your details are still in the form.' });
    }
  }
  return <form className="lead-form ad-form" onSubmit={submit}>
    <div className="form-grid">
      <label><span>Full Name *</span><input name="name" autoComplete="name" required maxLength={120}/></label>
      <label><span>Email Address *</span><input name="email" type="email" autoComplete="email" required maxLength={190}/></label>
      <label><span>Phone Number *</span><input name="phone" type="tel" autoComplete="tel" required pattern="[+0-9() .\-]{7,25}" title="Enter a phone number using digits, spaces, +, brackets or hyphens." maxLength={25}/></label>
      <label><span>Country</span><input name="country" autoComplete="country-name" maxLength={100}/></label>
      <label><span>Highest Degree Earned *</span><select name="degree" required defaultValue=""><option value="" disabled>Select degree</option><option>Bachelor's</option><option>Master's</option><option>Other</option></select></label>
      <label><span>Target Region *</span><select name="region" required defaultValue=""><option value="" disabled>Select region</option>{['USA', 'UK', 'Europe', 'Australia', 'Canada', 'Not Decided'].map(region => <option key={region}>{region}</option>)}</select></label>
    </div>
    <label><span>Research Area</span><input name="research" placeholder="e.g. Computer science, public health, economics" maxLength={200}/></label>
    <label><span>Message / Requirement</span><textarea name="message" rows={4} maxLength={2500} placeholder="Tell us about your background, target universities and application timeline."/></label>
    <button className="btn primary" disabled={status.loading}>{status.loading ? 'Sending Request…' : 'Request Consultation'}</button>
    <p className="ad-note">By submitting, you ask AcademicEdge to contact you about this enquiry.</p>
    <div role="status" aria-live="polite">{status.message && <p className={`form-message ${status.ok ? 'ok' : 'bad'}`}>{status.message}</p>}</div>
  </form>;
}

export function BrochureForm({ url }) {
  const [message, setMessage] = useState('');
  return <form className="lead-form ad-form" onSubmit={event => { event.preventDefault(); setMessage(url ? 'Your brochure is ready below.' : 'The brochure is being prepared. Please use the consultation form for information about the support options. These details have not been submitted.'); }}>
    <div className="ad-grid ad-grid--three"><label><span>Name *</span><input name="name" autoComplete="name" required/></label><label><span>Email *</span><input name="email" autoComplete="email" type="email" required/></label><label><span>Phone *</span><input name="phone" autoComplete="tel" type="tel" required/></label></div>
    {!url && <p className="ad-note">Brochure coming soon. No download is available yet.</p>}
    <button className="btn primary">Download Brochure</button><div role="status">{message && <p>{message}</p>}{message && url && <a className="text-link" href={url} download>Download the brochure PDF</a>}</div>
  </form>;
}
