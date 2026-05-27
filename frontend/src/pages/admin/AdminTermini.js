import { useState, useEffect } from 'react';
import { apiGetTermini, apiUpdateTerminStatus, apiDeleteTermin } from '../../services/api';

const statusConfig = {
  zakazan: { badge: 'badge-primary', label: ' Zakazan' },
  zavrsen: { badge: 'badge-success', label: ' Završen' },
  otkazan: { badge: 'badge-danger', label: ' Otkazan' },
};

const AdminTermini = () => {
  const [termini, setTermini] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('svi');
  const [filterPredmet, setFilterPredmet] = useState('');

  useEffect(() => {
    const fetchTermini = async () => {
      try {
        const data = await apiGetTermini();
        setTermini(data);
      } catch (err) {
        console.error('Greška:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTermini();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updated = await apiUpdateTerminStatus(id, newStatus);
      setTermini(termini.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      alert('Greška prilikom ažuriranja statusa');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Da li ste sigurni da želite da obrišete ovaj termin?')) return;
    try {
      await apiDeleteTermin(id);
      setTermini(termini.filter((t) => t._id !== id));
    } catch (err) {
      alert('Greška prilikom brisanja');
    }
  };

  // Get unique predmeti for filter
  const predmetiList = [...new Set(termini.map((t) => t.predmetNaziv))];

  const filtered = termini.filter((t) => {
    if (filterStatus !== 'svi' && t.status !== filterStatus) return false;
    if (filterPredmet && t.predmetNaziv !== filterPredmet) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="page" id="admin-termini-page">
      <div className="page-header">
        <div>
          <h1>Pregled termina</h1>
          <p>Svi zakazani termini u sistemu</p>
        </div>
      </div>

      <div className="filter-bar">
        <select
          className="form-control"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          id="filter-status"
        >
          <option value="svi">Svi statusi</option>
          <option value="zakazan">Zakazani</option>
          <option value="zavrsen">Završeni</option>
          <option value="otkazan">Otkazani</option>
        </select>
        <select
          className="form-control"
          value={filterPredmet}
          onChange={(e) => setFilterPredmet(e.target.value)}
          id="filter-predmet"
        >
          <option value="">Svi predmeti</option>
          {predmetiList.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center mt-4">
          <p className="text-muted">Nema termina za prikaz.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table" id="admin-termini-table">
            <thead>
              <tr>
                <th>Korisnik</th>
                <th>Predmet</th>
                <th>Predavač</th>
                <th>Datum</th>
                <th>Vreme</th>
                <th>Plaćanje</th>
                <th>Cena</th>
                <th>Status</th>
                <th>Akcije</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t._id} id={`admin-termin-${t._id}`}>
                  <td style={{ fontWeight: 600 }}>{t.korisnikIme}</td>
                  <td>{t.predmetNaziv}</td>
                  <td>{t.predavacIme}</td>
                  <td>{t.datum}</td>
                  <td>{t.vreme}</td>
                  <td style={{ textTransform: 'capitalize' }}>{t.nacinPlacanja}</td>
                  <td className="text-accent" style={{ fontWeight: 600 }}>
                    {t.cena} RSD
                  </td>
                  <td>
                    <span className={`card-badge ${statusConfig[t.status]?.badge}`}>
                      {statusConfig[t.status]?.label}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      {t.status === 'zakazan' && (
                        <>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleStatusChange(t._id, 'zavrsen')}
                            id={`complete-${t._id}`}
                          >
                            
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleStatusChange(t._id, 'otkazan')}
                            id={`cancel-${t._id}`}
                          >
                            
                          </button>
                        </>
                      )}
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleDelete(t._id)}
                        id={`delete-${t._id}`}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminTermini;
