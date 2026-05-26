import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FormContainer from '../../components/forms/FormContainer';
import Message from '../../components/common/Message';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Lozinke se ne poklapaju');
      return;
    }

    setLoading(true);

    try {
      // Simulacija API poziva
      const mockUser = {
        id: '1',
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };
      login(mockUser, 'mock-jwt-token');
      navigate('/');
    } catch (err) {
      setError('Greška pri registraciji');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer title="Registracija" subtitle="Kreiraj svoj nalog">
      {error && (
        <Message
          type="error"
          title="Greška pri registraciji"
          message={error}
          onClose={() => setError('')}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Puno Ime</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Vaše ime i prezime"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="vas@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Lozinka</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Najmanje 6 karaktera"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Potvrdite Lozinku</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Ponovite lozinku"
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Tip Korisnika</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">Registrovani Korisnik</option>
            <option value="admin">Administrator</option>
          </select>
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Učitavanje...' : 'Registruj se'}
        </button>
      </form>

      <div className="auth-link">
        <p>
          Već imaš nalog? <Link to="/login">Prijavi se ovde</Link>
        </p>
      </div>
    </FormContainer>
  );
};

export default Register;