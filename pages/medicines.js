import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [editMedicine, setEditMedicine] = useState(null);  // State to track medicine being edited
  const router = useRouter();

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    const res = await fetch('/api/medicines');
    const data = await res.json();
    setMedicines(data.data);
    setFiltered(data.data);
  };

  useEffect(() => {
    const filteredMeds = medicines.filter(med =>
      med.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredMeds);
  }, [search, medicines]);

  const handleDelete = async id => {
    if (!confirm('Are you sure you want to delete this medicine?')) return;

    await fetch(`/api/medicines`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: id }),
    });

    fetchMedicines();
  };

  const handleEdit = id => {
    const medicine = medicines.find(med => med._id === id);
    setEditMedicine({ ...medicine });  // Set the selected medicine to edit
  };

  const handleSave = async () => {
    // Save updated medicine details
    await fetch('/api/medicines', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editMedicine),
    });

    setEditMedicine(null);  // Reset edit state
    fetchMedicines();  // Reload medicines after saving
  };

  const handleChange = (e) => {
    setEditMedicine({
      ...editMedicine,
      [e.target.name]: e.target.value,
    });
  };

  if (editMedicine) {
    // Render the edit form when a medicine is being edited
    return (
      <div style={{ minHeight: '100vh', background: '#f0f4ff', padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', color: '#1e3a8a' }}>
          Edit Medicine
        </h1>

        <div style={{ maxWidth: '600px', margin: '1.5rem auto' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Medicine Name</label>
          <input
            type="text"
            name="name"
            value={editMedicine.name}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.8rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              marginBottom: '1.5rem',
            }}
          />

          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={editMedicine.quantity}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.8rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              marginBottom: '1.5rem',
            }}
          />

          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            value={editMedicine.expiryDate}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.8rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              marginBottom: '1.5rem',
            }}
          />

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: '#10b981',
                color: 'white',
                padding: '0.8rem 1.5rem',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                marginTop: '1rem',
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4ff', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', color: '#1e3a8a' }}>
        Medicine List
      </h1>

      <div style={{ maxWidth: '600px', margin: '1.5rem auto' }}>
        <input
          type="text"
          placeholder="Search by medicine name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '0.8rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '1.5rem',
          }}
        />
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No medicines found.</p>
        ) : (
          filtered.map(med => (
            <div
              key={med._id}
              style={{
                padding: '1rem',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 0 5px rgba(0,0,0,0.1)',
              }}
            >
              <h3 style={{ margin: 0 }}>{med.name}</h3>
              <p>Quantity: {med.quantity}</p>
              <p>Expiry: {new Date(med.expiryDate).toLocaleDateString()}</p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                  onClick={() => handleEdit(med._id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(med._id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link href="/login">
          <button
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              padding: '0.8rem 1.5rem',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Back to Form
          </button>
        </Link>
      </div>
    </div>
  );
}
