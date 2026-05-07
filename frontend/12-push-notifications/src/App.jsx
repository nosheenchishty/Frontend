import { useMemo, useState } from 'react';

const seedDevices = [
  { id: 'dev-1', name: 'iPhone 15', channel: 'mobile', subscribed: true },
  { id: 'dev-2', name: 'Chrome Desktop', channel: 'web', subscribed: false },
];

export default function App() {
  const [devices, setDevices] = useState(seedDevices);
  const [message, setMessage] = useState('Push delivery settings are ready.');

  const subscribedCount = useMemo(() => devices.filter((device) => device.subscribed).length, [devices]);

  function toggleDevice(deviceId) {
    setDevices((current) =>
      current.map((device) =>
        device.id === deviceId ? { ...device, subscribed: !device.subscribed } : device,
      ),
    );
    setMessage('Subscription preference updated.');
  }

  function sendTestPush() {
    setMessage(`Test push prepared for ${subscribedCount} subscribed device(s).`);
  }

  return (
    <div className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">React Boilerplate</p>
          <h1>Push Notifications Frontend</h1>
          <p className="hero-copy">Model device subscriptions, consent state, and notification previews from a clean UI base.</p>
        </div>
        <div className="status-card">
          <span className="pill">{subscribedCount} active</span>
          <strong>{devices.length} devices</strong>
          <span>Push-ready controls</span>
        </div>
      </header>

      <main className="grid-layout">
        <section className="panel">
          <h2>Registered Devices</h2>
          <div className="stack">
            {devices.map((device) => (
              <article className="list-card" key={device.id}>
                <div>
                  <strong>{device.name}</strong>
                  <p>{device.channel}</p>
                </div>
                <button
                  className={device.subscribed ? 'tag active' : 'tag'}
                  onClick={() => toggleDevice(device.id)}
                  type="button"
                >
                  {device.subscribed ? 'Subscribed' : 'Paused'}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>Delivery Preview</h2>
          <div className="info-card">
            <strong>Sample message</strong>
            <p>Order shipped successfully. Tap to view delivery tracking.</p>
          </div>
          <div className="actions">
            <button className="primary-button" onClick={sendTestPush} type="button">
              Send Test Push
            </button>
          </div>
          <p className="message-banner">{message}</p>
        </section>
      </main>
    </div>
  );
}
