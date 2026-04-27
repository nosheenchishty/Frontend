import { useMemo, useState } from 'react';

const initialForm = {
  fullName: '',
  email: '',
  purpose: 'feedback',
  budget: '1000-5000',
  notes: '',
  termsAccepted: false,
};

function validate(form) {
  const nextErrors = {};

  if (!form.fullName.trim()) nextErrors.fullName = 'Full name is required.';
  if (!form.email.includes('@')) nextErrors.email = 'Enter a valid email address.';
  if (form.notes.trim().length < 15) nextErrors.notes = 'Notes should be at least 15 characters.';
  if (!form.termsAccepted) nextErrors.termsAccepted = 'You must accept the terms.';

  return nextErrors;
}

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(null);
  const errors = useMemo(() => validate(form), [form]);
  const canSubmit = Object.keys(errors).length === 0;

  const updateField = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    setSubmitted({
      submittedAt: new Date().toLocaleString(),
      payload: form,
    });
  };

  return (
    <div className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">React Boilerplate</p>
          <h1>Data Input & Forms</h1>
          <p className="hero-copy">A structured starting point for form state, validation, and polished submission UX.</p>
        </div>
        <div className="status-card">
          <span className="pill">{canSubmit ? 'Valid' : 'Needs review'}</span>
          <strong>{form.purpose}</strong>
          <span>{Object.keys(errors).length} validation hints</span>
        </div>
      </header>

      <main className="grid-layout">
        <section className="panel">
          <h2>Request Form</h2>
          <form className="stack" onSubmit={handleSubmit}>
            <label>
              Full name
              <input value={form.fullName} onChange={(event) => updateField('fullName', event.target.value)} />
              {errors.fullName ? <span className="field-error">{errors.fullName}</span> : null}
            </label>
            <label>
              Email
              <input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} />
              {errors.email ? <span className="field-error">{errors.email}</span> : null}
            </label>
            <label>
              Purpose
              <select value={form.purpose} onChange={(event) => updateField('purpose', event.target.value)}>
                <option value="feedback">Feedback</option>
                <option value="registration">Registration</option>
                <option value="transaction">Transaction</option>
              </select>
            </label>
            <label>
              Budget
              <select value={form.budget} onChange={(event) => updateField('budget', event.target.value)}>
                <option value="under-1000">Under $1,000</option>
                <option value="1000-5000">$1,000 to $5,000</option>
                <option value="5000-plus">$5,000+</option>
              </select>
            </label>
            <label>
              Notes
              <textarea rows={5} value={form.notes} onChange={(event) => updateField('notes', event.target.value)} />
              {errors.notes ? <span className="field-error">{errors.notes}</span> : null}
            </label>
            <label className="checkbox">
              <input
                checked={form.termsAccepted}
                onChange={(event) => updateField('termsAccepted', event.target.checked)}
                type="checkbox"
              />
              I accept the terms and conditions
            </label>
            {errors.termsAccepted ? <span className="field-error">{errors.termsAccepted}</span> : null}
            <button className="primary-button" disabled={!canSubmit} type="submit">
              Submit Request
            </button>
          </form>
        </section>

        <section className="panel">
          <h2>Submission Preview</h2>
          {submitted ? (
            <div className="stack">
              <div className="info-card">
                <strong>Submitted at</strong>
                <p>{submitted.submittedAt}</p>
              </div>
              <pre className="code-block">{JSON.stringify(submitted.payload, null, 2)}</pre>
            </div>
          ) : (
            <div className="empty-state">
              <strong>No submission yet</strong>
              <p>Complete the form and submit to preview the shaped payload.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
