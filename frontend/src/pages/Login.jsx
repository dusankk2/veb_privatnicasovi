import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FormContainer from '../../components/forms/FormContainer';
import Message from '../../components/common/Message';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulacija API poziva - kasnije će biti zamenjeno sa pravim API-jem
      if (email && password) {
        const mockUser = {
          id: '1',
          name: email.split('@')[0],
          email: email,
          role: 'user', // ili 'admin'
        };
        login(mockUser, 'mock-jwt-token');
        navigate('/');
      }
    } catch (err) {
      setError('Neispravni email ili lozinka');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer title="Prijava" subtitle="Prijavi se na svoj nalog">
      {error && (
        <Message
          type="error"
          title="Greška pri prijavi"
          message={error}
          onClose={() => setError('')}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="vas@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Lozinka</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Vaša lozinka"
          />
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Učitavanje...' : 'Prijavi se'}
        </button>
      </form>

      <div className="auth-link">
        <p>
          Nemaš nalog? <Link to="/register">Registruj se ovde</Link>
        </p>
      </div>
    </FormContainer>
  );
};

export default Login;