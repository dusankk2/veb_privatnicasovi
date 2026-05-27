import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiGetMojiTermini, apiDeleteTermin } from '../services/api';

const statusConfig = {
  zakazan: { badge: 'badge-primary', label: ' Zakazan' },
  zavrsen: { badge: 'badge-success', label: ' Završen' },
  otkazan: { badge: 'badge-danger', label: ' Otkazan' },
};

const MojiTermini = () => {
  const { user } = useAuth();
  const [termini, setTermini] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('svi');

  useEffect(() => {
    const fetchTermini = async () => {
      try {
        const data = await apiGetMojiTermini(user?._id);
        setTermini(data);
      } catch (err) {
        console.error('Greška:', err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchTermini();
  }, [user]);

  const handleCancel = async (id) => {
    if (!window.confirm('Da li ste sigurni da želite da otkažete termin?')) return;
    try {
      await apiDeleteTermin(id);
      setTermini(termini.filter((t) => t._id !== id));
    } catch (err) {
      alert('Greška prilikom otkazivanja');
    }
  };

  const filtered = filter === 'svi'
    ? termini
    : termini.filter((t) => t.status === filter);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="page" id="moji-termini-page">
      <div className="page-header">
        <div>
          <h1>📋 Moji termini</h1>
          <p>Pregled svih tvojih zakazanih privatnih časova</p>
        </div>
      </div>

      <div className="filter-bar">
        <select
          className="form-control"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          id="termini-filter"
        >
          <option value="svi">Svi termini</option>
          <option value="zakazan">Zakazani</option>
          <option value="zavrsen">Završeni</option>
          <option value="otkazan">Otkazani</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center mt-4">
          <p className="text-muted">Nema termina za prikaz.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table" id="termini-table">
            <thead>
              <tr>
                <th>Predmet</th>
                <th>Predavač</th>
                <th>Datum</th>
                <th>Vreme</th>
                <th>Trajanje</th>
                <th>Plaćanje</th>
                <th>Cena</th>
                <th>Status</th>
                <th>Akcije</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t._id} id={`termin-row-${t._id}`}>
                  <td>{t.predmetNaziv}</td>
                  <td>{t.predavacIme}</td>
                  <td>{t.datum}</td>
                  <td>{t.vreme}</td>
                  <td>{t.trajanje} min</td>
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
                    {t.status === 'zakazan' && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleCancel(t._id)}
                        id={`cancel-termin-${t._id}`}
                      >
                        Otkaži
                      </button>
                    )}
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

export default MojiTermini;
