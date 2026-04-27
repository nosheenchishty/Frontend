import { useState } from 'react';

const scenarios = {
  idle: { title: 'Ready state', description: 'The screen is stable and waiting for user action.' },
  loading: { title: 'Loading state', description: 'Show progress and preserve layout while work is in progress.' },
  success: { title: 'Success state', description: 'Confirm completion and next best action.' },
  empty: { title: 'Empty state', description: 'Guide the user when there is no data yet.' },
  error: { title: 'Error state', description: 'Explain what went wrong and offer recovery.' },
};

export default function App() {
  const [scenario, setScenario] = useState('idle');
  const [confirmation, setConfirmation] = useState(false);

  return (
    <div className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">React Boilerplate</p>
          <h1>Error Handling & Feedback System</h1>
          <p className="hero-copy">Build trustworthy UX with clear loaders, confirmations, empty states, and recovery paths.</p>
        </div>
        <div className="status-card">
          <span className="pill">{scenario}</span>
          <strong>{scenarios[scenario].title}</strong>
          <span>{confirmation ? 'Confirmation open' : 'No confirmation'}</span>
        </div>
      </header>

      <main className="grid-layout">
        <section className="panel">
          <h2>Scenario Picker</h2>
          <div className="role-picker">
            {Object.keys(scenarios).map((key) => (
              <button
                key={key}
                className={scenario === key ? 'tag active' : 'tag'}
                onClick={() => setScenario(key)}
                type="button"
              >
                {key}
              </button>
            ))}
          </div>
          <div className="feedback-zone">
            {scenario === 'loading' ? <div className="loader" /> : null}
            {scenario === 'error' ? <div className="error-banner">Unable to fetch the latest records. Please retry.</div> : null}
            {scenario === 'success' ? <div className="success-banner">Changes saved successfully. Everything is up to date.</div> : null}
            {scenario === 'empty' ? (
              <div className="empty-state">
                <strong>No content yet</strong>
                <p>Create your first record to populate this module.</p>
              </div>
            ) : null}
            {scenario === 'idle' ? <div className="info-card"><strong>System ready</strong><p>{scenarios[scenario].description}</p></div> : null}
          </div>
          <div className="actions">
            <button className="primary-button" onClick={() => setConfirmation(true)} type="button">
              Open Confirmation
            </button>
            <button className="secondary-button" onClick={() => setScenario('loading')} type="button">
              Simulate Retry
            </button>
          </div>
        </section>

        <section className="panel">
          <h2>Guidance</h2>
          <div className="info-card">
            <strong>{scenarios[scenario].title}</strong>
            <p>{scenarios[scenario].description}</p>
          </div>
          {confirmation ? (
            <div className="confirmation-card">
              <strong>Delete this record?</strong>
              <p>This action can be reversed during the grace period.</p>
              <div className="actions">
                <button className="danger-button" onClick={() => setConfirmation(false)} type="button">
                  Confirm Delete
                </button>
                <button className="secondary-button" onClick={() => setConfirmation(false)} type="button">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="message-banner">Use scenario-specific messaging to reduce friction and build confidence.</p>
          )}
        </section>
      </main>
    </div>
  );
}
