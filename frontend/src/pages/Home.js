import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const { userInfo: user } = useSelector((state) => state.auth);
  const isAuth = !!user;

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
             Platforma za online učenje
          </div>
          <h1>
            Pronađi svog idealnog{' '}
            <span className="highlight">predavača</span>
          </h1>
          <p>
            Zakaži privatne časove i konsultacije sa vrhunskim predavačima.
            Odaberi predmet, predavača i termin koji ti odgovara.
          </p>
          <div className="hero-buttons">
            <Link to="/predmeti" className="btn btn-primary btn-lg" id="hero-cta-predmeti">
               Pregledaj predmete
            </Link>
            {!isAuth ? (
              <Link to="/register" className="btn btn-secondary btn-lg" id="hero-cta-register">
                Registruj se besplatno →
              </Link>
            ) : (
              <Link to="/zakazivanje" className="btn btn-secondary btn-lg" id="hero-cta-zakazivanje">
                 Zakaži termin →
              </Link>
            )}
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="stat-number">6+</div>
              <div className="stat-label">Predmeta</div>
            </div>
            <div className="hero-stat">
              <div className="stat-number">4</div>
              <div className="stat-label">Predavača</div>
            </div>
            <div className="hero-stat">
              <div className="stat-number">875+</div>
              <div className="stat-label">Održanih časova</div>
            </div>
            <div className="hero-stat">
              <div className="stat-number">4.8</div>
              <div className="stat-label">Prosečna ocena</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features-section">
        <div className="section-header">
          <h2>Kako funkcioniše?</h2>
          <p>Jednostavan proces u samo nekoliko koraka</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>Pregledaj predmete</h3>
            <p>
              Istraži našu ponudu predmeta - od matematike i fizike do
              programiranja i stranih jezika. Svaki predmet ima detaljan opis.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">‍</div>
            <h3>Odaberi predavača</h3>
            <p>
              Pogledaj profile predavača, njihove kvalifikacije, ocene i iskustvo.
              Izaberi onog ko ti najviše odgovara.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>Zakaži termin</h3>
            <p>
              Izaberi datum i vreme koje ti odgovara. Odaberi način plaćanja
              i potvrdi zakazivanje u par klikova.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>Fleksibilno plaćanje</h3>
            <p>
              Podržavamo više načina plaćanja: karticom, gotovinom ili putem
              PayPal-a. Izaberi ono što ti najviše odgovara.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>Prati termine</h3>
            <p>
              Pregled svih zakazanih, završenih i otkazanih termina na jednom
              mestu. Uvek imaš potpunu kontrolu.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">️</div>
            <h3>Administracija</h3>
            <p>
              Administratori upravljaju predmetima, predavačima i terminima.
              Kompletna kontrola nad sistemom.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="features-section" id="cta-section">
        <div className="section-header">
          <h2>Spreman za učenje?</h2>
          <p>Registruj se danas i zakaži svoj prvi privatni čas</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          {!isAuth ? (
            <Link to="/register" className="btn btn-primary btn-lg" id="cta-register">
              Započni sada →
            </Link>
          ) : (
            <Link to="/zakazivanje" className="btn btn-primary btn-lg" id="cta-zakazivanje">
               Zakaži termin →
            </Link>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
