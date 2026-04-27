import { useMemo, useState } from 'react';

const catalog = [
  { id: 1, title: 'API Design Handbook', category: 'Docs', status: 'Published', owner: 'Mina', score: 92 },
  { id: 2, title: 'Revenue Dashboard', category: 'Analytics', status: 'Draft', owner: 'Omar', score: 81 },
  { id: 3, title: 'Account Security Playbook', category: 'Docs', status: 'Published', owner: 'Aisha', score: 88 },
  { id: 4, title: 'Customer Feedback Stream', category: 'Research', status: 'Archived', owner: 'Nora', score: 73 },
  { id: 5, title: 'Notifications Audit', category: 'Operations', status: 'Published', owner: 'Mina', score: 95 },
];

export default function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [sortBy, setSortBy] = useState('score');

  const results = useMemo(() => {
    return catalog
      .filter((item) => {
        const matchesQuery = [item.title, item.category, item.owner].join(' ').toLowerCase().includes(query.toLowerCase());
        const matchesCategory = category === 'All' || item.category === category;
        const matchesStatus = status === 'All' || item.status === status;
        return matchesQuery && matchesCategory && matchesStatus;
      })
      .sort((left, right) => {
        if (sortBy === 'title') {
          return left.title.localeCompare(right.title);
        }
        return right.score - left.score;
      });
  }, [category, query, sortBy, status]);

  return (
    <div className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">React Boilerplate</p>
          <h1>Search & Filtering</h1>
          <p className="hero-copy">Start with structured search state, composable filters, and predictable result rendering.</p>
        </div>
        <div className="status-card">
          <span className="pill">{results.length} results</span>
          <strong>{category}</strong>
          <span>{status}</span>
        </div>
      </header>

      <main className="grid-layout">
        <section className="panel">
          <h2>Search Controls</h2>
          <div className="stack">
            <label>
              Search
              <input placeholder="Search by title, category, or owner" value={query} onChange={(event) => setQuery(event.target.value)} />
            </label>
            <label>
              Category
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                <option value="All">All</option>
                <option value="Docs">Docs</option>
                <option value="Analytics">Analytics</option>
                <option value="Research">Research</option>
                <option value="Operations">Operations</option>
              </select>
            </label>
            <label>
              Status
              <select value={status} onChange={(event) => setStatus(event.target.value)}>
                <option value="All">All</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
            </label>
            <label>
              Sort by
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                <option value="score">Top score</option>
                <option value="title">Title</option>
              </select>
            </label>
          </div>
        </section>

        <section className="panel">
          <h2>Results</h2>
          {results.length ? (
            <div className="stack">
              {results.map((item) => (
                <article className="list-card" key={item.id}>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.category} · {item.owner}</p>
                  </div>
                  <div className="align-right">
                    <span className="pill">{item.status}</span>
                    <strong>{item.score}</strong>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <strong>No matches found</strong>
              <p>Try widening your query or clearing one of the active filters.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
