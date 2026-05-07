import { useMemo, useState } from 'react';

const roleMap = {
  admin: ['users.read', 'users.write', 'reports.read', 'settings.write'],
  manager: ['users.read', 'reports.read'],
  support: ['users.read', 'tickets.write'],
};

const pages = [
  { id: 'dashboard', label: 'Dashboard', permission: 'reports.read' },
  { id: 'users', label: 'Users', permission: 'users.read' },
  { id: 'settings', label: 'Settings', permission: 'settings.write' },
];

export default function App() {
  const [role, setRole] = useState('admin');
  const [activePage, setActivePage] = useState('dashboard');
  const permissions = useMemo(() => roleMap[role] ?? [], [role]);
  const accessiblePages = pages.filter((page) => permissions.includes(page.permission));

  return (
    <div className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">React Boilerplate</p>
          <h1>RBAC Frontend</h1>
          <p className="hero-copy">A starter for role-aware navigation, guarded actions, and permission visibility rules.</p>
        </div>
        <div className="status-card">
          <span className="pill">{role}</span>
          <strong>{permissions.length} permissions</strong>
          <span>{accessiblePages.length} visible pages</span>
        </div>
      </header>

      <main className="grid-layout">
        <section className="panel">
          <h2>Role Switcher</h2>
          <div className="role-picker">
            {Object.keys(roleMap).map((entry) => (
              <button
                key={entry}
                className={entry === role ? 'tag active' : 'tag'}
                onClick={() => setRole(entry)}
                type="button"
              >
                {entry}
              </button>
            ))}
          </div>

          <h2>Available Navigation</h2>
          <div className="stack">
            {accessiblePages.map((page) => (
              <button
                key={page.id}
                className={activePage === page.id ? 'nav-button active' : 'nav-button'}
                onClick={() => setActivePage(page.id)}
                type="button"
              >
                {page.label}
              </button>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>Permission Matrix</h2>
          <ul className="list">
            {permissions.map((permission) => (
              <li key={permission}>{permission}</li>
            ))}
          </ul>
          <div className="info-card">
            <strong>Guarded action preview</strong>
            <p>
              {permissions.includes('settings.write')
                ? 'This role can edit platform settings.'
                : 'This role can view core content but cannot edit platform settings.'}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
