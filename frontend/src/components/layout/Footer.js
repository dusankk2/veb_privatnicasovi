const Footer = () => {
  return (
    <footer className="footer" id="main-footer">
      <div className="footer-inner">
        <div className="footer-brand">
           Privatni Časovi
          <span>| Online zakazivanje termina</span>
        </div>
        <ul className="footer-links">
          <li><a href="/">Početna</a></li>
          <li><a href="/predmeti">Predmeti</a></li>
          <li><a href="/predavaci">Predavači</a></li>
        </ul>
        <div className="footer-copy">
           {new Date().getFullYear()} Privatni Časovi. Sva prava zadržana. | Projektni zadatak
        </div>
      </div>
    </footer>
  );
};

export default Footer;
