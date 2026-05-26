import React from 'react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-icon">🔍</div>
        <h1>404</h1>
        <h2>Stranica nije pronađena</h2>
        <p>Izvinjavam se, stranica koju tražite ne postoji.</p>
        <a href="/" className="btn-home">
          Nazad na Početnu
        </a>
      </div>
    </div>
  );
};

export default NotFound;