import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>O Sistemu</h4>
            <p>Sistem za zakazivanje privatnih časova i konsultacija sa predavačima.</p>
          </div>
          <div className="footer-section">
            <h4>Brzi Linkovi</h4>
            <ul>
              <li><a href="/">Početna</a></li>
              <li><a href="/login">Prijava</a></li>
              <li><a href="/register">Registracija</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Kontakt</h4>
            <p>Email: info@satnicasovi.rs</p>
            <p>Telefon: +381 (0)21 123-4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} Sistem za Zakazivanje Časova. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;