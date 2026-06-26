import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginApi, { isLoading: loading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Molimo popunite sva polja');
      return;
    }

    try {
      const res = await loginApi({ email, password }).unwrap();
      dispatch(setCredentials({ ...res.user, token: res.token }));
      navigate(res.user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError(err?.data?.message || err.message || 'Greška prilikom prijave');
    }
  };

  return (
    <div className="form-page" id="login-page">
      <div className="form-container">
        <div className="form-card">
          <h2> Dobrodošli nazad</h2>
          <p className="form-subtitle">Prijavite se na vaš nalog</p>

          {error && (
            <div className="alert alert-error" id="login-error">
              ️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="login-email">Email adresa</label>
              <input
                type="email"
                id="login-email"
                className="form-control"
                placeholder="vas@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="login-password">Lozinka</label>
              <input
                type="password"
                id="login-password"
                className="form-control"
                placeholder="Unesite lozinku"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary form-btn"
              disabled={loading}
              id="login-submit"
            >
              {loading ? 'Prijavljivanje...' : ' Prijavi se'}
            </button>
          </form>

          <div className="form-link">
            Nemate nalog?{' '}
            <Link to="/register">Registrujte se</Link>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Login;
