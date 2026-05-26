import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SubjectCard from '../../components/cards/SubjectCard';
import TeacherCard from '../../components/cards/TeacherCard';
import Loader from '../../components/common/Loader';
import './Home.css';

const Home = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock podaci - kasnije će biti zamenjeni sa pravim API-jem
  const mockSubjects = [
    {
      id: 1,
      name: 'Matematika',
      category: 'STEM',
      description: 'Učenje matematike za sve nivoe - od osnovne aritmetike do napredne algebre',
      level: 'Osnovni/Srednji/Napredni',
      availableSlots: 5,
    },
    {
      id: 2,
      name: 'Engleski Jezik',
      category: 'Jezici',
      description: 'Konverzacija, gramatika i priprema za ispite',
      level: 'Početnički/Srednji/Naprednički',
      availableSlots: 3,
    },
    {
      id: 3,
      name: 'Fizika',
      category: 'STEM',
      description: 'Mehanika, elektricitet, termodinamika i optika',
      level: 'Srednji/Napredni',
      availableSlots: 2,
    },
    {
      id: 4,
      name: 'Istorija',
      category: 'Humanistika',
      description: 'Istorija od antike do modernog doba',
      level: 'Osnovni/Srednji',
      availableSlots: 4,
    },
  ];

  const mockTeachers = [
    {
      id: 1,
      name: 'Prof. Dr. Marko Marković',
      title: 'Doktor matematike',
      bio: 'Iskusan profesor sa 15 godina iskustva u podučavanju',
      rating: 4.8,
      reviewCount: 45,
      experience: 15,
      hourlyRate: 1500,
      subjects: ['Matematika'],
    },
    {
      id: 2,
      name: 'Jelena Jovanović',
      title: 'Diplomirani profesor engleskog',
      bio: 'Native speaker sa iskustvom u pripremi za međunarodne ispite',
      rating: 4.9,
      reviewCount: 52,
      experience: 10,
      hourlyRate: 1200,
      subjects: ['Engleski Jezik'],
    },
    {
      id: 3,
      name: 'Dr. Aleksandar Nikolić',
      title: 'Doktor fizike',
      bio: 'Naučnik i profesor sa publikacijama u međunarodnim časopisima',
      rating: 4.7,
      reviewCount: 38,
      experience: 12,
      hourlyRate: 1800,
      subjects: ['Fizika'],
    },
  ];

  const handleSelectSubject = (subject) => {
    if (!isAuth) {
      navigate('/login');
      return;
    }
    navigate(`/booking/${subject.id}`);
  };

  const handleSelectTeacher = (teacher) => {
    if (!isAuth) {
      navigate('/login');
      return;
    }
    navigate(`/teacher/${teacher.id}`);
  };

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Dobro došli u Sistem za Zakazivanje Časova!</h1>
          <p>Pronađi savršenog predavača za tvoje potrebe i zakaži termin časa u nekoliko klikova</p>
          {!isAuth && (
            <div className="hero-buttons">
              <button onClick={() => navigate('/login')} className="btn-primary">
                Prijavi se
              </button>
              <button onClick={() => navigate('/register')} className="btn-secondary">
                Registruj se
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="features">
        <h2>Zašto nas izabrati?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👨‍🏫</div>
            <h3>Iskusni Predavači</h3>
            <p>Odaberi iz liste certificiranih i iskusnih predavača</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Fleksibilno Zakazivanje</h3>
            <p>Zakaži čas u vremenu koje ti odgovara</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Prostrane Cene</h3>
            <p>Konkurentne cene prilagođene svim budžetima</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Recenzije i Rejting</h3>
            <p>Pročitaj recenzije od drugih učenika</p>
          </div>
        </div>
      </section>

      <section className="subjects-section">
        <h2>Dostupni Predmeti</h2>
        <div className="subjects-grid">
          {mockSubjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onSelect={handleSelectSubject}
            />
          ))}
        </div>
      </section>

      <section className="teachers-section">
        <h2>Preporučeni Predavači</h2>
        <div className="teachers-grid">
          {mockTeachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              onSelect={handleSelectTeacher}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;