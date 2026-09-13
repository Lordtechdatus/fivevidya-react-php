import React, { useState } from 'react';

export default function PatentConsultation({ apiBase }) {
  const [status, setStatus] = useState({ busy: false, ok: false, message: '' });
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    if (!values.name.trim() || (values.phone.match(/\d/g) || []).length < 7) {
      setStatus({ busy: false, ok: false, message: 'Enter your full name and a phone number with at least seven digits.' }); return;
    }
    setStatus({ busy: true, ok: false, message: '' });
    try {
      const response = await fetch(`${apiBase}/submit.php`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: values.name.trim(), email: values.email.trim(), phone: values.phone, service: 'Patent Support and Consulting', source: 'patent-consultation', message: `Research/Invention Area: ${values.area}\n${values.message}` }) });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error('Submission failed');
      form.reset();
      setStatus({ busy: false, ok: true, message: 'Your consultation request has been received.' });
    } catch {
      setStatus({ busy: false, ok: false, message: 'Your request could not be sent. Please try again when the enquiry service is available. Your details remain in the form.' });
    }
  }
  return <form className="lead-form ad-form" onSubmit={submit}><div className="form-grid"><label><span>Full Name *</span><input required name="name" autoComplete="name" maxLength={120}/></label><label><span>Email *</span><input required name="email" type="email" autoComplete="email" maxLength={190}/></label><label><span>Phone / WhatsApp *</span><input required name="phone" type="tel" autoComplete="tel" maxLength={30}/></label><label><span>Research/Invention Area *</span><input required name="area" maxLength={200}/></label></div><label><span>Message *</span><textarea required name="message" rows={4} maxLength={3000} placeholder="Share your general research area and the support you need."/></label><button className="btn primary" disabled={status.busy}>{status.busy ? 'Sending…' : 'Request Consultation'}</button><div role="status" aria-live="polite">{status.message && <p className={`form-message ${status.ok ? 'ok' : 'bad'}`}>{status.message}</p>}</div></form>;
}
