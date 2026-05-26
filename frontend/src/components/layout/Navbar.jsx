import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuth } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          📚 Sistem za Zakazivanje Časova
        </Link>

        <div className="navbar-links">
          {!isAuth ? (
            <>
              <Link to="/login" className="nav-link">
                Prijava
              </Link>
              <Link to="/register" className="nav-link">
                Registracija
              </Link>
            </>
          ) : (
            <>
              <span className="user-greeting">Dobro došli, {user?.name || 'Korisniče'}!</span>
              {user?.role === 'admin' && (
                <Link to="/admin" className="nav-link admin-link">
                  Admin Panel
                </Link>
              )}
              <Link to="/my-appointments" className="nav-link">
                Moji Termini
              </Link>
              <Link to="/profile" className="nav-link">
                Profil
              </Link>
              <button className="logout-btn" onClick={logout}>
                Odjava
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;