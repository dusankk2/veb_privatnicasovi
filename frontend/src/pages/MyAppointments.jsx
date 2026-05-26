import React from 'react';
import { useAuth } from '../../context/AuthContext';
import PrivateRoute from '../../components/auth/PrivateRoute';
import './MyAppointments.css';

const MyAppointments = () => {
  const { user } = useAuth();

  // Mock podataka
  const mockAppointments = [
    {
      id: 1,
      subject: 'Matematika',
      teacher: 'Prof. Dr. Marko Marković',
      date: '2026-06-01',
      time: '10:00',
      price: 1500,
      status: 'confirmed',
    },
    {
      id: 2,
      subject: 'Engleski Jezik',
      teacher: 'Jelena Jovanović',
      date: '2026-06-03',
      time: '14:00',
      price: 1200,
      status: 'pending',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return '#d4edda';
      case 'pending':
        return '#fff3cd';
      case 'cancelled':
        return '#f8d7da';
      default:
        return '#e9ecef';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Potvrđeno';
      case 'pending':
        return 'U čekanju';
      case 'cancelled':
        return 'Otkazano';
      default:
        return 'Nepoznato';
    }
  };

  return (
    <PrivateRoute
      element={
        <div className="my-appointments-page">
          <div className="appointments-header">
            <h1>📅 Moji Zakazani Termini</h1>
            <p>Pregled svih vaših zakazanih termina sa predavačima</p>
          </div>

          {mockAppointments.length > 0 ? (
            <div className="appointments-list">
              {mockAppointments.map((appointment) => (
                <div key={appointment.id} className="appointment-card">
                  <div
                    className="appointment-status"
                    style={{ backgroundColor: getStatusColor(appointment.status) }}
                  >
                    {getStatusText(appointment.status)}
                  </div>

                  <div className="appointment-content">
                    <div className="appointment-title">
                      <h3>{appointment.subject}</h3>
                      <span className="teacher-name">{appointment.teacher}</span>
                    </div>

                    <div className="appointment-details">
                      <div className="detail-item">
                        <span className="label">📅 Datum:</span>
                        <span className="value">{appointment.date}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">⏰ Vreme:</span>
                        <span className="value">{appointment.time}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">💰 Cena:</span>
                        <span className="value">{appointment.price} RSD</span>
                      </div>
                    </div>
                  </div>

                  <div className="appointment-actions">
                    <button className="btn-edit">Izmeni</button>
                    <button className="btn-cancel">Otkaži</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-appointments">
              <div className="no-appointments-icon">📭</div>
              <h2>Nema Zakazanih Termina</h2>
              <p>Još uvek niste zakazali nijedan termin. Posjetite početnu stranicu da zakazete čas.</p>
              <a href="/" className="btn-home">
                Nazad na Početnu
              </a>
            </div>
          )}
        </div>
      }
    />
  );
};

export default MyAppointments;