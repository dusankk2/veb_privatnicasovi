import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetPredmetiQuery } from '../slices/predmetiApiSlice';

const Predmeti = () => {
  const { userInfo: user } = useSelector((state) => state.auth);
  const isAuth = !!user;
  const { data: predmeti = [], isLoading: loading, isError } = useGetPredmetiQuery();
  const [search, setSearch] = useState('');

  const filtered = predmeti.filter(
    (p) =>
      p.naziv.toLowerCase().includes(search.toLowerCase()) ||
      p.opis.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-danger text-center mt-4">
        Došlo je do greške prilikom učitavanja predmeta.
      </div>
    );
  }

  return (
    <div className="page" id="predmeti-page">
      <div className="page-header">
        <div>
          <h1> Predmeti</h1>
          <p>Pregledaj sve dostupne predmete za privatne časove</p>
        </div>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          className="form-control"
          placeholder=" Pretraži predmete..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="predmeti-search"
        />
      </div>

      <div className="card-grid">
        {filtered.map((predmet) => (
          <div className="card" key={predmet._id} id={`predmet-card-${predmet._id}`}>
            <div className="card-header">
              <h3 className="card-title">{predmet.naziv}</h3>
              <span className="card-badge badge-primary">{predmet.trajanje} min</span>
            </div>
            <div className="card-body">
              <p>{predmet.opis}</p>
            </div>
            <div className="card-footer">
              <div className="card-meta">
                 {predmet.predavacIme}
              </div>
              <span className="card-price">{predmet.cena} RSD</span>
            </div>
            <div style={{ marginTop: '16px' }}>
              {isAuth ? (
                <Link
                  to={`/zakazivanje?predmet=${predmet._id}`}
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%' }}
                  id={`zakazivanje-btn-${predmet._id}`}
                >
                   Zakaži čas
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%' }}
                  id={`login-btn-${predmet._id}`}
                >
                   Prijavi se za zakazivanje
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center mt-4">
          <p className="text-muted">Nema pronađenih predmeta.</p>
        </div>
      )}
    </div>
  );
};

export default Predmeti;
