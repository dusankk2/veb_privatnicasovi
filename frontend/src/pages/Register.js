import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiRegister } from '../services/api';

const Register = () => {
  const [ime, setIme] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!ime || !email || !password || !confirmPassword) {
      setError('Molimo popunite sva polja');
      return;
    }

    if (password !== confirmPassword) {
      setError('Lozinke se ne poklapaju');
      return;
    }

    if (password.length < 6) {
      setError('Lozinka mora imati najmanje 6 karaktera');
      return;
    }

    setLoading(true);
    try {
      const data = await apiRegister(ime, email, password);
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Greška prilikom registracije');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page" id="register-page">
      <div className="form-container">
        <div className="form-card">
          <h2>🎓 Kreiraj nalog</h2>
          <p className="form-subtitle">Registruj se i zakaži svoj prvi čas</p>

          {error && (
            <div className="alert alert-error" id="register-error">
               {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="register-ime">Ime i prezime</label>
              <input
                type="text"
                id="register-ime"
                className="form-control"
                placeholder="Vaše ime i prezime"
                value={ime}
                onChange={(e) => setIme(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-email">Email adresa</label>
              <input
                type="email"
                id="register-email"
                className="form-control"
                placeholder="vas@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-password">Lozinka</label>
              <input
                type="password"
                id="register-password"
                className="form-control"
                placeholder="Minimum 6 karaktera"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-confirm">Potvrdi lozinku</label>
              <input
                type="password"
                id="register-confirm"
                className="form-control"
                placeholder="Ponovite lozinku"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary form-btn"
              disabled={loading}
              id="register-submit"
            >
              {loading ? 'Registracija...' : ' Registruj se'}
            </button>
          </form>

          <div className="form-link">
            Već imate nalog?{' '}
            <Link to="/login">Prijavite se</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
