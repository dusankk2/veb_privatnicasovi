import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import PrivateRoute from '../../components/auth/PrivateRoute';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    bio: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert('Profil ažuran!');
  };

  return (
    <PrivateRoute
      element={
        <div className="profile-page">
          <div className="profile-container">
            <div className="profile-header">
              <div className="profile-avatar">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
              <div className="profile-title">
                <h1>{user?.name}</h1>
                <p className="role-badge">{user?.role === 'admin' ? 'Administrator' : 'Registrovani Korisnik'}</p>
              </div>
            </div>

            <div className="profile-content">
              {!isEditing ? (
                <div className="profile-view">
                  <div className="profile-section">
                    <h2>Lini Podaci</h2>
                    <div className="profile-item">
                      <span className="label">Email:</span>
                      <span className="value">{user?.email}</span>
                    </div>
                    <div className="profile-item">
                      <span className="label">Ime:</span>
                      <span className="value">{user?.name}</span>
                    </div>
                    <div className="profile-item">
                      <span className="label">Uloga:</span>
                      <span className="value">{user?.role}</span>
                    </div>
                  </div>

                  <div className="profile-actions">
                    <button
                      className="btn-edit"
                      onClick={() => setIsEditing(true)}
                    >
                      Uredi Profil
                    </button>
                    <button
                      className="btn-logout"
                      onClick={logout}
                    >
                      Odjava
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="profile-edit">
                  <div className="form-group">
                    <label htmlFor="name">Ime i Prezime</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
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
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Telefon</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="bio">Biografija</label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Reči nešto o sebi"
                    />
                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      className="btn-save"
                    >
                      Sačuvaj
                    </button>
                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={() => setIsEditing(false)}
                    >
                      Otkaži
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      }
    />
  );
};

export default Profile;