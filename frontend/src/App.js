import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Predmeti from './pages/Predmeti';
import Predavaci from './pages/Predavaci';
import NotFound from './pages/NotFound';

// Protected pages (user)
import Zakazivanje from './pages/Zakazivanje';
import MojiTermini from './pages/MojiTermini';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPredmeti from './pages/admin/AdminPredmeti';
import AdminPredavaci from './pages/admin/AdminPredavaci';
import AdminTermini from './pages/admin/AdminTermini';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            {/* Javne rute */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/predmeti" element={<Predmeti />} />
            <Route path="/predavaci" element={<Predavaci />} />

            {/* Zaštićene rute - registrovani korisnik */}
            <Route
              path="/zakazivanje"
              element={
                <ProtectedRoute role="user">
                  <Zakazivanje />
                </ProtectedRoute>
              }
            />
            <Route
              path="/moji-termini"
              element={
                <ProtectedRoute role="user">
                  <MojiTermini />
                </ProtectedRoute>
              }
            />

            {/* Zaštićene rute - admin */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/predmeti"
              element={
                <ProtectedRoute role="admin">
                  <AdminPredmeti />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/predavaci"
              element={
                <ProtectedRoute role="admin">
                  <AdminPredavaci />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/termini"
              element={
                <ProtectedRoute role="admin">
                  <AdminTermini />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;