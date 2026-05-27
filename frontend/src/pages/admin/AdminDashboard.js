import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiGetPredmeti, apiGetPredavaci, apiGetTermini } from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ predmeti: 0, predavaci: 0, termini: 0, zakazani: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [predmeti, predavaci, termini] = await Promise.all([
          apiGetPredmeti(),
          apiGetPredavaci(),
          apiGetTermini(),
        ]);
        setStats({
          predmeti: predmeti.length,
          predavaci: predavaci.length,
          termini: termini.length,
          zakazani: termini.filter((t) => t.status === 'zakazan').length,
        });
      } catch (err) {
        console.error('Greška:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="page" id="admin-dashboard">
      <div className="page-header">
        <div>
          <h1> Admin Panel</h1>
          <p>Upravljanje sistemom za privatne časove</p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card" id="stat-predmeti">
          <div className="stat-icon"></div>
          <div className="stat-value">{stats.predmeti}</div>
          <div className="stat-label">Predmeta</div>
        </div>
        <div className="stat-card" id="stat-predavaci">
          <div className="stat-icon"></div>
          <div className="stat-value">{stats.predavaci}</div>
          <div className="stat-label">Predavača</div>
        </div>
        <div className="stat-card" id="stat-termini">
          <div className="stat-icon"></div>
          <div className="stat-value">{stats.termini}</div>
          <div className="stat-label">Ukupno termina</div>
        </div>
        <div className="stat-card" id="stat-zakazani">
          <div className="stat-icon"></div>
          <div className="stat-value">{stats.zakazani}</div>
          <div className="stat-label">Aktivnih termina</div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="section-header" style={{ textAlign: 'left' }}>
        <h2>Brzi pristup</h2>
      </div>

      <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <Link to="/admin/predmeti" className="card" style={{ textDecoration: 'none' }} id="admin-link-predmeti">
          <div className="feature-icon"></div>
          <h3 className="card-title">Upravljanje predmetima</h3>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>
            Dodaj, izmeni ili obriši predmete iz sistema.
          </p>
        </Link>

        <Link to="/admin/predavaci" className="card" style={{ textDecoration: 'none' }} id="admin-link-predavaci">
          <div className="feature-icon"></div>
          <h3 className="card-title">Upravljanje predavačima</h3>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>
            Upravljaj profilima i podacima predavača.
          </p>
        </Link>

        <Link to="/admin/termini" className="card" style={{ textDecoration: 'none' }} id="admin-link-termini">
          <div className="feature-icon"></div>
          <h3 className="card-title">Pregled termina</h3>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>
            Pregledaj i organizuj sve zakazane termine.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
