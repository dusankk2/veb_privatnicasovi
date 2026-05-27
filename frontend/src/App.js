import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

// Javne stranice (Svi korisnici i gosti)
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Predmeti from './pages/Predmeti';
import Predavaci from './pages/Predavaci';
import NotFound from './pages/NotFound';

// Zaštićene stranice (Samo registrovani korisnici)
import Zakazivanje from './pages/Zakazivanje';
import MojiTermini from './pages/MojiTermini';



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
            
            {/* 404 stranica */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
