import { useState, useEffect } from 'react';
import {
  apiGetPredavaci,
  apiCreatePredavac,
  apiUpdatePredavac,
  apiDeletePredavac,
} from '../../services/api';

const AdminPredavaci = () => {
  const [predavaci, setPredavaci] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    ime: '',
    email: '',
    biografija: '',
    predmeti: '',
    ocena: '5.0',
    brojCasova: '0',
  });

  const fetchData = async () => {
    try {
      const data = await apiGetPredavaci();
      setPredavaci(data);
    } catch (err) {
      console.error('Greška:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm({ ime: '', email: '', biografija: '', predmeti: '', ocena: '5.0', brojCasova: '0' });
    setShowModal(true);
  };

  const openEdit = (predavac) => {
    setEditingId(predavac._id);
    setForm({
      ime: predavac.ime,
      email: predavac.email,
      biografija: predavac.biografija,
      predmeti: predavac.predmeti.join(', '),
      ocena: predavac.ocena.toString(),
      brojCasova: predavac.brojCasova.toString(),
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...form,
      predmeti: form.predmeti.split(',').map((p) => p.trim()).filter(Boolean),
      ocena: parseFloat(form.ocena),
      brojCasova: parseInt(form.brojCasova),
    };

    try {
      if (editingId) {
        await apiUpdatePredavac(editingId, data);
      } else {
        await apiCreatePredavac(data);
      }
      setShowModal(false);
      setLoading(true);
      await fetchData();
    } catch (err) {
      alert('Greška: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Da li ste sigurni da želite da obrišete ovog predavača?')) return;
    try {
      await apiDeletePredavac(id);
      setPredavaci(predavaci.filter((p) => p._id !== id));
    } catch (err) {
      alert('Greška prilikom brisanja');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="page" id="admin-predavaci-page">
      <div className="page-header">
        <div>
          <h1>👨‍🏫 Upravljanje predavačima</h1>
          <p>Dodaj, izmeni ili obriši predavače</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate} id="add-predavac-btn">
          ➕ Dodaj predavača
        </button>
      </div>

      <div className="table-container">
        <table className="table" id="predavaci-table">
          <thead>
            <tr>
              <th>Ime</th>
              <th>Email</th>
              <th>Predmeti</th>
              <th>Ocena</th>
              <th>Br. časova</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {predavaci.map((p) => (
              <tr key={p._id}>
                <td style={{ fontWeight: 600 }}>{p.ime}</td>
                <td className="text-muted">{p.email}</td>
                <td>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {p.predmeti.map((pr, i) => (
                      <span className="card-badge badge-primary" key={i} style={{ fontSize: '0.7rem' }}>
                        {pr}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <span style={{ color: 'var(--warning)', fontWeight: 600 }}>
                     {p.ocena}
                  </span>
                </td>
                <td>{p.brojCasova}</td>
                <td>
                  <div className="table-actions">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => openEdit(p)}
                      id={`edit-predavac-${p._id}`}
                    >
                       Izmeni
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(p._id)}
                      id={`delete-predavac-${p._id}`}
                    >
                       Obriši
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} id="predavac-modal">
            <h3>{editingId ? ' Izmeni predavača' : '➕ Novi predavač'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Ime i prezime</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.ime}
                  onChange={(e) => setForm({ ...form, ime: e.target.value })}
                  required
                  id="modal-ime"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  id="modal-email"
                />
              </div>
              <div className="form-group">
                <label>Biografija</label>
                <textarea
                  className="form-control"
                  value={form.biografija}
                  onChange={(e) => setForm({ ...form, biografija: e.target.value })}
                  required
                  id="modal-biografija"
                />
              </div>
              <div className="form-group">
                <label>Predmeti (razdvojeni zarezom)</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.predmeti}
                  onChange={(e) => setForm({ ...form, predmeti: e.target.value })}
                  placeholder="npr. Matematika, Fizika"
                  required
                  id="modal-predmeti"
                />
              </div>
              <div className="form-group">
                <label>Ocena (1-5)</label>
                <input
                  type="number"
                  className="form-control"
                  value={form.ocena}
                  onChange={(e) => setForm({ ...form, ocena: e.target.value })}
                  step="0.1"
                  min="1"
                  max="5"
                  id="modal-ocena"
                />
              </div>
              <div className="form-group">
                <label>Broj održanih časova</label>
                <input
                  type="number"
                  className="form-control"
                  value={form.brojCasova}
                  onChange={(e) => setForm({ ...form, brojCasova: e.target.value })}
                  min="0"
                  id="modal-brojcasova"
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Otkaži
                </button>
                <button type="submit" className="btn btn-primary" id="modal-submit">
                  {editingId ? 'Sačuvaj izmene' : 'Kreiraj predavača'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPredavaci;
