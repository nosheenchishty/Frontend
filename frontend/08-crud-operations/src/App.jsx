import { useMemo, useState } from 'react';

const initialItems = [
  { id: 1, name: 'Starter Template', status: 'Published' },
  { id: 2, name: 'Release Checklist', status: 'Draft' },
  { id: 3, name: 'Team Handbook', status: 'Archived' },
];

export default function App() {
  const [items, setItems] = useState(initialItems);
  const [draft, setDraft] = useState({ id: null, name: '', status: 'Draft' });

  const isEditing = useMemo(() => draft.id !== null, [draft.id]);

  const resetDraft = () => setDraft({ id: null, name: '', status: 'Draft' });

  const saveItem = (event) => {
    event.preventDefault();
    if (!draft.name.trim()) return;

    if (isEditing) {
      setItems((current) => current.map((item) => (item.id === draft.id ? draft : item)));
    } else {
      setItems((current) => [...current, { ...draft, id: Date.now() }]);
    }

    resetDraft();
  };

  const editItem = (item) => setDraft(item);
  const deleteItem = (id) => setItems((current) => current.filter((item) => item.id !== id));

  return (
    <div className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">React Boilerplate</p>
          <h1>CRUD Operations</h1>
          <p className="hero-copy">A simple but production-minded scaffold for create, read, update, and delete flows.</p>
        </div>
        <div className="status-card">
          <span className="pill">{items.length} records</span>
          <strong>{isEditing ? 'Editing record' : 'Create mode'}</strong>
          <span>In-memory demo state</span>
        </div>
      </header>

      <main className="grid-layout">
        <section className="panel">
          <h2>{isEditing ? 'Edit Record' : 'Create Record'}</h2>
          <form className="stack" onSubmit={saveItem}>
            <label>
              Name
              <input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
            </label>
            <label>
              Status
              <select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value })}>
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Archived">Archived</option>
              </select>
            </label>
            <div className="actions">
              <button className="primary-button" type="submit">
                {isEditing ? 'Update Record' : 'Create Record'}
              </button>
              <button className="secondary-button" onClick={resetDraft} type="button">
                Clear
              </button>
            </div>
          </form>
        </section>

        <section className="panel">
          <h2>Records</h2>
          <div className="stack">
            {items.map((item) => (
              <article className="list-card" key={item.id}>
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.status}</p>
                </div>
                <div className="actions compact">
                  <button className="secondary-button" onClick={() => editItem(item)} type="button">
                    Edit
                  </button>
                  <button className="danger-button" onClick={() => deleteItem(item.id)} type="button">
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
