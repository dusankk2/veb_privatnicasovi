import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { user, isAuth, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon"></span>
          <span>Privatni Časovi</span>
        </Link>

        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Otvori meni"
          id="hamburger-btn"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li>
            <NavLink to="/" onClick={closeMenu} id="nav-home">
               Početna
            </NavLink>
          </li>
          <li>
            <NavLink to="/predmeti" onClick={closeMenu} id="nav-predmeti">
               Predmeti
            </NavLink>
          </li>
          <li>
            <NavLink to="/predavaci" onClick={closeMenu} id="nav-predavaci">
               Predavači
            </NavLink>
          </li>

          {isAuth && user?.role === 'user' && (
            <>
              <li>
                <NavLink to="/zakazivanje" onClick={closeMenu} id="nav-zakazivanje">
                   Zakaži termin
                </NavLink>
              </li>
              <li>
                <NavLink to="/moji-termini" onClick={closeMenu} id="nav-moji-termini">
                   Moji termini
                </NavLink>
              </li>
            </>
          )}

          {isAuth && user?.role === 'admin' && (
            <>
              <li>
                <NavLink to="/admin" onClick={closeMenu} id="nav-admin">
                   Admin Panel
                </NavLink>
              </li>
            </>
          )}

          {!isAuth ? (
            <>
              <li>
                <NavLink to="/login" onClick={closeMenu} className="btn-nav-outline" id="nav-login">
                  Prijava
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" onClick={closeMenu} className="btn-nav-primary" id="nav-register">
                  Registracija
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <span className="navbar-user-badge">
                  {user?.role === 'admin' ? '' : ''} {user?.ime}
                </span>
              </li>
              <li>
                <button onClick={handleLogout} className="btn-logout" id="nav-logout">
                   Odjava
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
