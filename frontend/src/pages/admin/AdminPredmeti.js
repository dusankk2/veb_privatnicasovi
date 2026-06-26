import { useState, useEffect } from 'react';
import { useGetPredavaciQuery } from '../../slices/predavaciApiSlice';
import {
  useGetPredmetiQuery,
  useCreatePredmetMutation,
  useUpdatePredmetMutation,
  useDeletePredmetMutation,
} from '../../slices/predmetiApiSlice';

const AdminPredmeti = () => {
  const { data: predmeti = [], isLoading: loadingPredmeti } = useGetPredmetiQuery();
  const { data: predavaci = [], isLoading: loadingPredavaci } = useGetPredavaciQuery();
  const [createPredmet] = useCreatePredmetMutation();
  const [updatePredmet] = useUpdatePredmetMutation();
  const [deletePredmetMutation] = useDeletePredmetMutation();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    naziv: '',
    opis: '',
    predavacId: '',
    predavacIme: '',
    cena: '',
    trajanje: '60',
  });



  const openCreate = () => {
    setEditingId(null);
    setForm({ naziv: '', opis: '', predavacId: '', predavacIme: '', cena: '', trajanje: '60' });
    setShowModal(true);
  };

  const openEdit = (predmet) => {
    setEditingId(predmet._id);
    setForm({
      naziv: predmet.naziv,
      opis: predmet.opis,
      predavacId: predmet.predavacId,
      predavacIme: predmet.predavacIme,
      cena: predmet.cena.toString(),
      trajanje: predmet.trajanje.toString(),
    });
    setShowModal(true);
  };

  const handlePredavacChange = (e) => {
    const id = e.target.value;
    const predavac = predavaci.find((p) => p._id === id);
    setForm({ ...form, predavacId: id, predavacIme: predavac?.ime || '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...form,
      cena: Number(form.cena),
      trajanje: Number(form.trajanje),
    };

    try {
      if (editingId) {
        await updatePredmet({ id: editingId, ...data }).unwrap();
      } else {
        await createPredmet(data).unwrap();
      }
      setShowModal(false);
    } catch (err) {
      alert('Greška: ' + (err?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Da li ste sigurni da želite da obrišete ovaj predmet?')) return;
    try {
      await deletePredmetMutation(id).unwrap();
    } catch (err) {
      alert('Greška prilikom brisanja');
    }
  };

  if (loadingPredmeti || loadingPredavaci) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="page" id="admin-predmeti-page">
      <div className="page-header">
        <div>
          <h1> Upravljanje predmetima</h1>
          <p>Dodaj, izmeni ili obriši predmete</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate} id="add-predmet-btn">
           Dodaj predmet
        </button>
      </div>

      <div className="table-container">
        <table className="table" id="predmeti-table">
          <thead>
            <tr>
              <th>Naziv</th>
              <th>Opis</th>
              <th>Predavač</th>
              <th>Trajanje</th>
              <th>Cena</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {predmeti.map((p) => (
              <tr key={p._id}>
                <td style={{ fontWeight: 600 }}>{p.naziv}</td>
                <td className="text-muted" style={{ maxWidth: '300px', fontSize: '0.85rem' }}>
                  {p.opis.length > 80 ? p.opis.slice(0, 80) + '...' : p.opis}
                </td>
                <td>{p.predavacIme}</td>
                <td>{p.trajanje} min</td>
                <td className="text-accent" style={{ fontWeight: 600 }}>{p.cena} RSD</td>
                <td>
                  <div className="table-actions">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => openEdit(p)}
                      id={`edit-predmet-${p._id}`}
                    >
                      ️ Izmeni
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(p._id)}
                      id={`delete-predmet-${p._id}`}
                    >
                      ️ Obriši
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
          <div className="modal" onClick={(e) => e.stopPropagation()} id="predmet-modal">
            <h3>{editingId ? '️ Izmeni predmet' : ' Novi predmet'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Naziv predmeta</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.naziv}
                  onChange={(e) => setForm({ ...form, naziv: e.target.value })}
                  required
                  id="modal-naziv"
                />
              </div>
              <div className="form-group">
                <label>Opis</label>
                <textarea
                  className="form-control"
                  value={form.opis}
                  onChange={(e) => setForm({ ...form, opis: e.target.value })}
                  required
                  id="modal-opis"
                />
              </div>
              <div className="form-group">
                <label>Predavač</label>
                <select
                  className="form-control"
                  value={form.predavacId}
                  onChange={handlePredavacChange}
                  required
                  id="modal-predavac"
                >
                  <option value="">-- Odaberi predavača --</option>
                  {predavaci.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.ime}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Trajanje (minuti)</label>
                <select
                  className="form-control"
                  value={form.trajanje}
                  onChange={(e) => setForm({ ...form, trajanje: e.target.value })}
                  id="modal-trajanje"
                >
                  <option value="30">30 minuta</option>
                  <option value="45">45 minuta</option>
                  <option value="60">60 minuta</option>
                  <option value="90">90 minuta</option>
                  <option value="120">120 minuta</option>
                </select>
              </div>
              <div className="form-group">
                <label>Cena (RSD)</label>
                <input
                  type="number"
                  className="form-control"
                  value={form.cena}
                  onChange={(e) => setForm({ ...form, cena: e.target.value })}
                  required
                  min="0"
                  id="modal-cena"
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
                  {editingId ? 'Sačuvaj izmene' : 'Kreiraj predmet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPredmeti;
