import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**

 * @param {string} role - 'user' ili 'admin'
 */
const ProtectedRoute = ({ children, role }) => {
  const { user, isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    
    if (!(role === 'user' && user?.role === 'admin')) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
