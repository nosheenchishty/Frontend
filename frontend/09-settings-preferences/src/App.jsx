import { useState } from 'react';

const initialSettings = {
  theme: 'light',
  language: 'English',
  density: 'comfortable',
  profileVisibility: 'team',
  analytics: true,
  marketingEmails: false,
};

export default function App() {
  const [settings, setSettings] = useState(initialSettings);
  const [message, setMessage] = useState('Your preferences are saved locally in component state.');

  const updateField = (key, value) => setSettings((current) => ({ ...current, [key]: value }));

  const saveSettings = () => setMessage('Preferences saved successfully.');
  const resetSettings = () => {
    setSettings(initialSettings);
    setMessage('Preferences restored to defaults.');
  };

  return (
    <div className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">React Boilerplate</p>
          <h1>Settings & Preferences</h1>
          <p className="hero-copy">A maintainable baseline for user controls across theme, language, privacy, and notifications.</p>
        </div>
        <div className="status-card">
          <span className="pill">{settings.theme}</span>
          <strong>{settings.language}</strong>
          <span>{settings.profileVisibility} visibility</span>
        </div>
      </header>

      <main className="grid-layout">
        <section className="panel">
          <h2>General Settings</h2>
          <div className="stack">
            <label>
              Theme
              <select value={settings.theme} onChange={(event) => updateField('theme', event.target.value)}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </label>
            <label>
              Language
              <select value={settings.language} onChange={(event) => updateField('language', event.target.value)}>
                <option value="English">English</option>
                <option value="Urdu">Urdu</option>
                <option value="Arabic">Arabic</option>
              </select>
            </label>
            <label>
              Density
              <select value={settings.density} onChange={(event) => updateField('density', event.target.value)}>
                <option value="comfortable">Comfortable</option>
                <option value="compact">Compact</option>
              </select>
            </label>
            <label>
              Profile visibility
              <select
                value={settings.profileVisibility}
                onChange={(event) => updateField('profileVisibility', event.target.value)}
              >
                <option value="private">Private</option>
                <option value="team">Team</option>
                <option value="public">Public</option>
              </select>
            </label>
            <label className="checkbox">
              <input
                checked={settings.analytics}
                onChange={(event) => updateField('analytics', event.target.checked)}
                type="checkbox"
              />
              Allow product analytics
            </label>
            <label className="checkbox">
              <input
                checked={settings.marketingEmails}
                onChange={(event) => updateField('marketingEmails', event.target.checked)}
                type="checkbox"
              />
              Receive marketing emails
            </label>
          </div>
          <div className="actions">
            <button className="primary-button" onClick={saveSettings} type="button">
              Save Settings
            </button>
            <button className="secondary-button" onClick={resetSettings} type="button">
              Reset Defaults
            </button>
          </div>
        </section>

        <section className="panel">
          <h2>Current Preference Snapshot</h2>
          <pre className="code-block">{JSON.stringify(settings, null, 2)}</pre>
          <p className="message-banner">{message}</p>
        </section>
      </main>
    </div>
  );
}
