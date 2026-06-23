import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * ProtectedRoute - ograničava pristup stranicama na osnovu uloge korisnika.
 * @param {string} role - 'user' ili 'admin'
 */
const ProtectedRoute = ({ children, role }) => {
  const { userInfo: user } = useSelector((state) => state.auth);
  const isAuth = !!user;

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    // Admin može pristupiti svemu, korisnik samo svojoj roli
    if (!(role === 'user' && user?.role === 'admin')) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
