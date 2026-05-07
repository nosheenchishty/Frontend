import { useState } from 'react';

const initialConfig = {
  host: 'smtp.mailtrap.io',
  port: '2525',
  username: 'demo-user',
  password: 'demo-password',
  encryption: 'tls',
  fromEmail: 'hello@demo.app',
};

export default function App() {
  const [config, setConfig] = useState(initialConfig);
  const [message, setMessage] = useState('SMTP configuration loaded.');

  function updateField(key, value) {
    setConfig((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">React Boilerplate</p>
          <h1>SMTP Config Frontend</h1>
          <p className="hero-copy">A maintainable setup for managing SMTP credentials, sender identity, and test email flows.</p>
        </div>
        <div className="status-card">
          <span className="pill">{config.encryption.toUpperCase()}</span>
          <strong>{config.host}</strong>
          <span>Port {config.port}</span>
        </div>
      </header>

      <main className="grid-layout">
        <section className="panel">
          <h2>Mail Server Settings</h2>
          <div className="stack">
            <label>
              Host
              <input value={config.host} onChange={(event) => updateField('host', event.target.value)} />
            </label>
            <label>
              Port
              <input value={config.port} onChange={(event) => updateField('port', event.target.value)} />
            </label>
            <label>
              Username
              <input value={config.username} onChange={(event) => updateField('username', event.target.value)} />
            </label>
            <label>
              Password
              <input type="password" value={config.password} onChange={(event) => updateField('password', event.target.value)} />
            </label>
            <label>
              Encryption
              <select value={config.encryption} onChange={(event) => updateField('encryption', event.target.value)}>
                <option value="tls">TLS</option>
                <option value="ssl">SSL</option>
                <option value="none">None</option>
              </select>
            </label>
            <label>
              From email
              <input value={config.fromEmail} onChange={(event) => updateField('fromEmail', event.target.value)} />
            </label>
          </div>
        </section>

        <section className="panel">
          <h2>Test Delivery</h2>
          <div className="info-card">
            <strong>Connection preview</strong>
            <p>{config.username}@{config.host}:{config.port}</p>
          </div>
          <div className="actions">
            <button className="primary-button" onClick={() => setMessage('Test email queued successfully.')} type="button">
              Send Test Email
            </button>
          </div>
          <p className="message-banner">{message}</p>
        </section>
      </main>
    </div>
  );
}
