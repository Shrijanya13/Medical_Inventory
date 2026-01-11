import { useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/Auth.css'; // Import styles

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      // Store the login state in localStorage
      localStorage.setItem('loggedIn', 'true');
      console.log("Login successful! Redirecting to home...");
      router.push('/login'); // Redirect to home page
    } else {
      alert('Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input 
          placeholder="Username" 
          onChange={e => setForm({ ...form, username: e.target.value })} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={e => setForm({ ...form, password: e.target.value })} 
          required 
        />
        <button type="submit">Login</button>
      </form>
      <p>New user? <a href="/register">Register</a></p>
    </div>
  );
}
