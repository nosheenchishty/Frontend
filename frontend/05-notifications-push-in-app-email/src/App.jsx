import { useMemo, useState } from 'react';

const seedNotifications = [
  { id: 1, title: 'Deployment complete', channel: 'In-app', read: false, time: '2 min ago' },
  { id: 2, title: 'Weekly usage digest', channel: 'Email', read: true, time: '1 hour ago' },
  { id: 3, title: 'Security alert', channel: 'Push', read: false, time: 'Today' },
];

export default function App() {
  const [notifications, setNotifications] = useState(seedNotifications);
  const [preferences, setPreferences] = useState({
    push: true,
    inApp: true,
    email: false,
    digest: true,
  });
  const [toast, setToast] = useState('Notification preferences are synced.');

  const unreadCount = useMemo(() => notifications.filter((item) => !item.read).length, [notifications]);

  const markAllRead = () => {
    setNotifications((current) => current.map((item) => ({ ...item, read: true })));
    setToast('All notifications marked as read.');
  };

  const addNotification = () => {
    setNotifications((current) => [
      {
        id: Date.now(),
        title: 'New product announcement',
        channel: preferences.email ? 'Email' : 'In-app',
        read: false,
        time: 'Just now',
      },
      ...current,
    ]);
    setToast('A sample notification was generated.');
  };

  return (
    <div className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">React Boilerplate</p>
          <h1>Notifications (Push/In-App/Email)</h1>
          <p className="hero-copy">Model delivery preferences, toast feedback, and read states without UI sprawl.</p>
        </div>
        <div className="status-card">
          <span className="pill">{unreadCount} unread</span>
          <strong>Notification Center</strong>
          <span>Channels configured</span>
        </div>
      </header>

      <main className="grid-layout">
        <section className="panel">
          <h2>Delivery Preferences</h2>
          <div className="stack">
            {Object.entries(preferences).map(([key, value]) => (
              <label className="checkbox" key={key}>
                <input
                  checked={value}
                  onChange={(event) => {
                    setPreferences({ ...preferences, [key]: event.target.checked });
                    setToast(`${key} preference updated.`);
                  }}
                  type="checkbox"
                />
                Enable {key}
              </label>
            ))}
          </div>
          <div className="actions">
            <button className="primary-button" onClick={addNotification} type="button">
              Trigger Sample
            </button>
            <button className="secondary-button" onClick={markAllRead} type="button">
              Mark All Read
            </button>
          </div>
          <p className="message-banner">{toast}</p>
        </section>

        <section className="panel">
          <h2>Recent Notifications</h2>
          <div className="stack">
            {notifications.map((item) => (
              <article className="list-card" key={item.id}>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.channel} · {item.time}</p>
                </div>
                <button
                  className={item.read ? 'tag' : 'tag active'}
                  onClick={() =>
                    setNotifications((current) =>
                      current.map((entry) => (entry.id === item.id ? { ...entry, read: !entry.read } : entry)),
                    )
                  }
                  type="button"
                >
                  {item.read ? 'Read' : 'Unread'}
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
