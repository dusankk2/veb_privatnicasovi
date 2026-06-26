import { useState } from 'react';
import { useGetPredavaciQuery } from '../slices/predavaciApiSlice';

const Predavaci = () => {
  const [search, setSearch] = useState('');
  const { data: predavaci = [], isLoading: loading, isError } = useGetPredavaciQuery();

  const filtered = predavaci.filter(
    (p) =>
      p.ime.toLowerCase().includes(search.toLowerCase()) ||
      p.biografija.toLowerCase().includes(search.toLowerCase()) ||
      p.predmeti.some((pr) => pr.toLowerCase().includes(search.toLowerCase()))
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
        Došlo je do greške prilikom učitavanja predavača.
      </div>
    );
  }

  return (
    <div className="page" id="predavaci-page">
      <div className="page-header">
        <div>
          <h1> Predavači</h1>
          <p>Upoznaj naše kvalifikovane predavače</p>
        </div>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          className="form-control"
          placeholder=" Pretraži predavače..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="predavaci-search"
        />
      </div>

      <div className="card-grid">
        {filtered.map((predavac) => (
          <div className="card" key={predavac._id} id={`predavac-card-${predavac._id}`}>
            <div className="card-header">
              <h3 className="card-title">{predavac.ime}</h3>
              <div className="predavac-rating">
                 {predavac.ocena}
              </div>
            </div>
            <div className="card-body">
              <p>{predavac.biografija}</p>
              <div className="predavac-subjects">
                {predavac.predmeti.map((pr, i) => (
                  <span className="subject-tag" key={i}>
                    {pr}
                  </span>
                ))}
              </div>
            </div>
            <div className="card-footer">
              <div className="card-meta">
                 {predavac.email}
              </div>
              <div className="card-meta">
                 {predavac.brojCasova} časova
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center mt-4">
          <p className="text-muted">Nema pronađenih predavača.</p>
        </div>
      )}
    </div>
  );
};

export default Predavaci;
