const metrics = [
  { label: 'Monthly revenue', value: '$84.2k', change: '+12%' },
  { label: 'Active users', value: '18,490', change: '+4.8%' },
  { label: 'Completion rate', value: '93%', change: '+1.4%' },
];

const activities = [
  'Finance team exported Q2 reporting package.',
  'Marketing dashboard received updated campaign data.',
  'Support feed resolved 24 priority tickets.',
];

const insights = [
  'Revenue growth is strongest in subscription renewals.',
  'Mobile engagement is up after the latest onboarding refresh.',
  'Customer satisfaction improved after response-time automation.',
];

export default function App() {
  return (
    <div className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">React Boilerplate</p>
          <h1>Content Display / Dashboard</h1>
          <p className="hero-copy">A polished dashboard shell for metrics, activity, and insight-rich content surfaces.</p>
        </div>
        <div className="status-card">
          <span className="pill">Live overview</span>
          <strong>Executive Dashboard</strong>
          <span>Ready for API integration</span>
        </div>
      </header>

      <main className="dashboard-layout">
        <section className="panel full-span">
          <h2>Core Metrics</h2>
          <div className="summary-grid">
            {metrics.map((metric) => (
              <article className="metric-card" key={metric.label}>
                <span className="metric-label">{metric.label}</span>
                <strong>{metric.value}</strong>
                <span className="metric-change">{metric.change}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>Activity Feed</h2>
          <div className="stack">
            {activities.map((item) => (
              <article className="list-card" key={item}>
                <strong>{item}</strong>
                <p>Updated moments ago</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>Insights</h2>
          <div className="stack">
            {insights.map((item) => (
              <article className="info-card" key={item}>
                <strong>Insight</strong>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
