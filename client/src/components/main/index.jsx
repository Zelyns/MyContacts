import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './style.module.css'; 

function Main() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });

  useEffect(() => {
    axios.get('/api/contacts', { withCredentials: true })
      .then(res => setContacts(res.data));
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/contacts', form, { withCredentials: true });
    setContacts([...contacts, res.data]);
    setForm({ name: '', phone: '', email: '' });
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/contacts/${id}`, { withCredentials: true });
    setContacts(contacts.filter(c => c._id !== id));
  };
const handleLogout = async () => {
  await axios.post('/api/auth/logout', {}, { withCredentials: true });
  window.location.href = '/login';
};

  return (
    <div className={style.main}>
      {/* Navbar */}
      <nav className={style.navbar}>
        <h1>Mycontact</h1>
        <button className={style.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className={style.main_container}>
        <h1>Mes Contacts</h1>
        <form onSubmit={handleAdd}>
          <input placeholder="Nom" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <input placeholder="Téléphone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <button type="submit">Ajouter</button>
        </form>
        <ul>
          {contacts.map(c => (
            <li key={c._id}>
              {c.name} ({c.phone}) {c.email}
              <button onClick={() => handleDelete(c._id)}>Supprimer</button>
              {/* Ajoute ici le bouton/modale pour modifier */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Main;