import { useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/Auth.css'; // Import the CSS file

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) router.push('/login');
    else alert('Registration failed');
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        <input
          placeholder="Username"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">Register</button>
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}
