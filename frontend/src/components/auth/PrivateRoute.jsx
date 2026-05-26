import React from 'react';
import './PrivateRoute.css';

const PrivateRoute = ({ element, requiredRole = null }) => {
  const user = JSON.parse(localStorage.getItem('userInfo')) || null;

  if (!user) {
    return (
      <div className="private-route-error">
        <div className="error-message">
          <h2>🔐 Pristup Odbijen</h2>
          <p>Morate se prijaviti da pristupite ovoj stranici.</p>
          <a href="/login" className="btn-login">Prijavi se</a>
        </div>
      </div>
    );
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="private-route-error">
        <div className="error-message">
          <h2>⚠️ Nedovoljna Dozvola</h2>
          <p>Nemate dozvolu da pristupite ovoj stranici.</p>
          <a href="/" className="btn-home">Nazad na Početnu</a>
        </div>
      </div>
    );
  }

  return element;
};

export default PrivateRoute;