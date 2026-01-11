import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/Auth.css';

export default function Home() {
  const [form, setForm] = useState({ name: '', quantity: '', expiryDate: '' });
  const [editingId, setEditingId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true'; 
    console.log("Checking login status:", isLoggedIn); // Debugging line
    
    if (!isLoggedIn) {
      console.log("User not logged in. Redirecting to login page...");
      router.push('/'); // Redirect to login page if not authenticated
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const body = editingId ? { _id: editingId, ...form } : form;

    await fetch('/api/medicines', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    setForm({ name: '', quantity: '', expiryDate: '' });
    setEditingId(null);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f0f4ff' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', width: '100%', maxWidth: '500px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem', color: '#1e3a8a' }}>Medical Inventory</h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Medicine Name"
            required
            style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #ccc' }}
          />
          <input
            type="number"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            placeholder="Quantity"
            required
            style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #ccc' }}
          />
          <input
            type="date"
            value={form.expiryDate}
            onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
            required
            style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #ccc' }}
          />
          <button
            type="submit"
            style={{ backgroundColor: '#2563eb', color: 'white', padding: '1rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
           
          >
            {editingId ? 'Update Medicine' : 'Add Medicine'}
          </button>
        </form>

        <button
          onClick={() => router.push('/medicines')}
          style={{ marginTop: '1.5rem', backgroundColor: '#10b981', color: 'white', padding: '1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', width: '100%' }}
        >
          View Medicines
        </button>
      </div>
    </div>
  );
}