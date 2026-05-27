import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found" id="not-found-page">
      <h1>404</h1>
      <h2>Stranica nije pronađena</h2>
      <p>Stranica koju tražite ne postoji ili je premeštena.</p>
      <Link to="/" className="btn btn-primary" id="not-found-home">
         Vrati se na početnu
      </Link>
    </div>
  );
};

export default NotFound;
