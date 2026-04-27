import { useMemo, useState } from 'react';

const initialProfile = {
  fullName: 'Areeba Siddiqui',
  title: 'Product Designer',
  email: 'areeba@demo.app',
  phone: '+92 300 555 0191',
  location: 'Karachi, Pakistan',
  timezone: 'GMT+5',
  bio: 'Design systems enthusiast building thoughtful product experiences.',
  interests: ['Accessibility', 'Design ops', 'Research'],
  newsletter: true,
  visibility: 'team',
};

export default function App() {
  const [profile, setProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);
  const [message, setMessage] = useState('Profile loaded and ready to edit.');

  const completion = useMemo(() => {
    const fields = [draft.fullName, draft.title, draft.email, draft.phone, draft.location, draft.bio];
    const completed = fields.filter(Boolean).length;
    return Math.round((completed / fields.length) * 100);
  }, [draft]);

  const saveChanges = (event) => {
    event.preventDefault();
    setProfile(draft);
    setMessage('Profile changes saved successfully.');
  };

  const resetDraft = () => {
    setDraft(profile);
    setMessage('Draft reset to the last saved profile.');
  };

  return (
    <div className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">React Boilerplate</p>
          <h1>User Profile Management</h1>
          <p className="hero-copy">Build personal details, preferences, and account controls with a clear editing flow.</p>
        </div>
        <div className="status-card">
          <span className="pill">{completion}% complete</span>
          <strong>{profile.fullName}</strong>
          <span>{profile.title}</span>
        </div>
      </header>

      <main className="grid-layout">
        <section className="panel">
          <h2>Edit Profile</h2>
          <form className="stack" onSubmit={saveChanges}>
            <label>
              Full name
              <input value={draft.fullName} onChange={(event) => setDraft({ ...draft, fullName: event.target.value })} />
            </label>
            <label>
              Title
              <input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
            </label>
            <label>
              Email
              <input value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} type="email" />
            </label>
            <label>
              Phone
              <input value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} />
            </label>
            <label>
              Location
              <input value={draft.location} onChange={(event) => setDraft({ ...draft, location: event.target.value })} />
            </label>
            <label>
              Bio
              <textarea value={draft.bio} onChange={(event) => setDraft({ ...draft, bio: event.target.value })} rows={4} />
            </label>
            <label>
              Visibility
              <select value={draft.visibility} onChange={(event) => setDraft({ ...draft, visibility: event.target.value })}>
                <option value="private">Private</option>
                <option value="team">Team</option>
                <option value="public">Public</option>
              </select>
            </label>
            <label className="checkbox">
              <input
                checked={draft.newsletter}
                onChange={(event) => setDraft({ ...draft, newsletter: event.target.checked })}
                type="checkbox"
              />
              Receive the design newsletter
            </label>
            <div className="actions">
              <button className="primary-button" type="submit">
                Save Profile
              </button>
              <button className="secondary-button" onClick={resetDraft} type="button">
                Reset Draft
              </button>
            </div>
          </form>
        </section>

        <section className="panel">
          <h2>Profile Summary</h2>
          <div className="summary-grid">
            <article className="metric-card">
              <span className="metric-label">Location</span>
              <strong>{profile.location}</strong>
            </article>
            <article className="metric-card">
              <span className="metric-label">Timezone</span>
              <strong>{profile.timezone}</strong>
            </article>
            <article className="metric-card">
              <span className="metric-label">Visibility</span>
              <strong>{profile.visibility}</strong>
            </article>
          </div>
          <div className="info-card">
            <strong>Interests</strong>
            <div className="role-picker">
              {profile.interests.map((interest) => (
                <span className="tag active" key={interest}>
                  {interest}
                </span>
              ))}
            </div>
          </div>
          <p className="message-banner">{message}</p>
        </section>
      </main>
    </div>
  );
}
