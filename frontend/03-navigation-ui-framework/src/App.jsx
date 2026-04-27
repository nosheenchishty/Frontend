import { useMemo, useState } from 'react';

const sections = [
  {
    id: 'workspace',
    label: 'Workspace',
    pages: [
      { id: 'overview', label: 'Overview', description: 'Snapshot of key activity and team focus.' },
      { id: 'projects', label: 'Projects', description: 'Access active initiatives and workstreams.' },
    ],
  },
  {
    id: 'operations',
    label: 'Operations',
    pages: [
      { id: 'tasks', label: 'Tasks', description: 'Track execution with owners, due dates, and status.' },
      { id: 'reports', label: 'Reports', description: 'Review analytics, summaries, and exports.' },
    ],
  },
];

const tabs = ['Summary', 'Activity', 'Files'];

export default function App() {
  const [sectionId, setSectionId] = useState('workspace');
  const [pageId, setPageId] = useState('overview');
  const [activeTab, setActiveTab] = useState('Summary');

  const activeSection = useMemo(() => sections.find((section) => section.id === sectionId) ?? sections[0], [sectionId]);
  const activePage = useMemo(
    () => activeSection.pages.find((page) => page.id === pageId) ?? activeSection.pages[0],
    [activeSection, pageId],
  );

  return (
    <div className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">React Boilerplate</p>
          <h1>Navigation & UI Framework</h1>
          <p className="hero-copy">A reusable app shell with side navigation, breadcrumbs, and tabbed content regions.</p>
        </div>
        <div className="status-card">
          <span className="pill">App shell</span>
          <strong>{activeSection.label}</strong>
          <span>{activePage.label}</span>
        </div>
      </header>

      <main className="navigation-layout">
        <aside className="panel sidebar">
          <h2>Sections</h2>
          <div className="stack">
            {sections.map((section) => (
              <button
                key={section.id}
                className={section.id === activeSection.id ? 'nav-button active' : 'nav-button'}
                onClick={() => {
                  setSectionId(section.id);
                  setPageId(section.pages[0].id);
                }}
                type="button"
              >
                {section.label}
              </button>
            ))}
          </div>
          <h3>Pages</h3>
          <div className="stack">
            {activeSection.pages.map((page) => (
              <button
                key={page.id}
                className={page.id === activePage.id ? 'nav-button active' : 'nav-button'}
                onClick={() => setPageId(page.id)}
                type="button"
              >
                {page.label}
              </button>
            ))}
          </div>
        </aside>

        <section className="panel">
          <div className="breadcrumb">Home / {activeSection.label} / {activePage.label}</div>
          <h2>{activePage.label}</h2>
          <p>{activePage.description}</p>

          <div className="tab-row">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={tab === activeTab ? 'tab active' : 'tab'}
                onClick={() => setActiveTab(tab)}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="summary-grid">
            <article className="metric-card">
              <span className="metric-label">Current view</span>
              <strong>{activeTab}</strong>
            </article>
            <article className="metric-card">
              <span className="metric-label">Navigation style</span>
              <strong>Sidebar + Tabs</strong>
            </article>
            <article className="metric-card">
              <span className="metric-label">Scalability</span>
              <strong>Feature-module ready</strong>
            </article>
          </div>

          <div className="info-card">
            <strong>Boilerplate note</strong>
            <p>Promote routes, layout state, and menu configuration into dedicated modules when expanding this demo.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
