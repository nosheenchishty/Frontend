import { useMemo, useState } from 'react';

const roles = {
  admin: ['Manage users', 'Review audit logs', 'Publish system updates'],
  editor: ['Create content', 'Approve drafts', 'Schedule changes'],
  user: ['View dashboard', 'Update profile', 'Manage personal settings'],
};

const initialSession = {
  email: 'maya@demo.app',
  role: 'admin',
  status: 'verified',
};

export default function App() {
  const [activeTab, setActiveTab] = useState('login');
  const [session, setSession] = useState(initialSession);
  const [message, setMessage] = useState('Signed in as a verified admin session.');
  const [loginForm, setLoginForm] = useState({
    email: 'maya@demo.app',
    password: 'SecurePass!23',
    remember: true,
  });
  const [signupForm, setSignupForm] = useState({
    name: 'Maya Khan',
    email: 'maya@demo.app',
    password: 'SecurePass!23',
    role: 'user',
  });
  const [otpCode, setOtpCode] = useState('482901');

  const permissions = useMemo(() => roles[session.role] ?? [], [session.role]);

  const handleLogin = (event) => {
    event.preventDefault();
    setSession({
      email: loginForm.email,
      role: session.role,
      status: 'verified',
    });
    setMessage(`Logged in as ${loginForm.email}.`);
  };

  const handleSignup = (event) => {
    event.preventDefault();
    setSession({
      email: signupForm.email,
      role: signupForm.role,
      status: 'pending-otp',
    });
    setActiveTab('otp');
    setMessage('Account created. Continue with OTP verification.');
  };

  const handleOtpVerification = (event) => {
    event.preventDefault();
    setSession((current) => ({ ...current, status: otpCode.length === 6 ? 'verified' : 'invalid' }));
    setMessage(otpCode.length === 6 ? 'OTP verified successfully.' : 'Enter a valid 6-digit OTP.');
  };

  return (
    <div className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">React Boilerplate</p>
          <h1>User Authentication & Authorization</h1>
          <p className="hero-copy">
            A clean foundation for sign-in, sign-up, OTP verification, and role-aware access patterns.
          </p>
        </div>
        <div className="status-card">
          <span className="pill">{session.status}</span>
          <strong>{session.email}</strong>
          <span>Role: {session.role}</span>
        </div>
      </header>

      <main className="grid-layout">
        <section className="panel">
          <div className="tab-row">
            {['login', 'signup', 'otp'].map((tab) => (
              <button
                key={tab}
                className={tab === activeTab ? 'tab active' : 'tab'}
                onClick={() => setActiveTab(tab)}
                type="button"
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {activeTab === 'login' ? (
            <form className="stack" onSubmit={handleLogin}>
              <label>
                Email
                <input
                  value={loginForm.email}
                  onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })}
                  type="email"
                />
              </label>
              <label>
                Password
                <input
                  value={loginForm.password}
                  onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })}
                  type="password"
                />
              </label>
              <label className="checkbox">
                <input
                  checked={loginForm.remember}
                  onChange={(event) => setLoginForm({ ...loginForm, remember: event.target.checked })}
                  type="checkbox"
                />
                Remember this device
              </label>
              <div className="actions">
                <button className="primary-button" type="submit">
                  Login
                </button>
                <button className="secondary-button" onClick={() => setMessage('Social auth clicked.')} type="button">
                  Social Login
                </button>
              </div>
            </form>
          ) : null}

          {activeTab === 'signup' ? (
            <form className="stack" onSubmit={handleSignup}>
              <label>
                Full name
                <input
                  value={signupForm.name}
                  onChange={(event) => setSignupForm({ ...signupForm, name: event.target.value })}
                />
              </label>
              <label>
                Email
                <input
                  value={signupForm.email}
                  onChange={(event) => setSignupForm({ ...signupForm, email: event.target.value })}
                  type="email"
                />
              </label>
              <label>
                Password
                <input
                  value={signupForm.password}
                  onChange={(event) => setSignupForm({ ...signupForm, password: event.target.value })}
                  type="password"
                />
              </label>
              <label>
                Role
                <select
                  value={signupForm.role}
                  onChange={(event) => setSignupForm({ ...signupForm, role: event.target.value })}
                >
                  <option value="user">User</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
              <button className="primary-button" type="submit">
                Create Account
              </button>
            </form>
          ) : null}

          {activeTab === 'otp' ? (
            <form className="stack" onSubmit={handleOtpVerification}>
              <label>
                One-time passcode
                <input value={otpCode} maxLength={6} onChange={(event) => setOtpCode(event.target.value)} />
              </label>
              <div className="actions">
                <button className="primary-button" type="submit">
                  Verify OTP
                </button>
                <button className="secondary-button" onClick={() => setMessage('OTP resent to the user.')} type="button">
                  Resend OTP
                </button>
              </div>
            </form>
          ) : null}

          <p className="message-banner">{message}</p>
        </section>

        <section className="panel">
          <h2>Permission Matrix</h2>
          <div className="role-picker">
            {Object.keys(roles).map((role) => (
              <button
                key={role}
                className={session.role === role ? 'tag active' : 'tag'}
                onClick={() => setSession((current) => ({ ...current, role }))}
                type="button"
              >
                {role}
              </button>
            ))}
          </div>
          <ul className="list">
            {permissions.map((permission) => (
              <li key={permission}>{permission}</li>
            ))}
          </ul>
          <div className="info-card">
            <strong>Recommended structure</strong>
            <p>Keep auth state, token persistence, and policy checks isolated behind hooks or service modules.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
