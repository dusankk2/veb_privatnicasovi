import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FormContainer from '../../components/forms/FormContainer';
import PrivateRoute from '../../components/auth/PrivateRoute';
import './Booking.css';

const Booking = () => {
  const { user } = useAuth();
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Choose teacher, 2: Choose time, 3: Payment
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [notes, setNotes] = useState('');

  // Mock podataka
  const mockSubject = {
    id: subjectId,
    name: 'Matematika',
  };

  const mockTeachers = [
    {
      id: 1,
      name: 'Prof. Dr. Marko Marković',
      rating: 4.8,
      hourlyRate: 1500,
    },
    {
      id: 2,
      name: 'Dr. Ana Anić',
      rating: 4.9,
      hourlyRate: 1600,
    },
  ];

  const availableTimes = [
    '09:00',
    '10:00',
    '11:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ];

  const handleConfirmBooking = () => {
    if (!selectedTeacher || !selectedDate || !selectedTime) {
      alert('Popunite sve potrebne podatke');
      return;
    }

    // Simulacija rezervacije
    const booking = {
      subject: mockSubject.name,
      teacher: selectedTeacher.name,
      date: selectedDate,
      time: selectedTime,
      payment: paymentMethod,
      notes: notes,
      price: selectedTeacher.hourlyRate,
    };

    console.log('Rezervacija:', booking);
    alert('Termin je uspešno rezervisan!');
    navigate('/');
  };

  return (
    <div className="booking-page">
      <FormContainer title="Zakazivanje Časa" subtitle={`Predmet: ${mockSubject.name}`}>
        {/* Step 1: Choose Teacher */}
        {step === 1 && (
          <div className="booking-step">
            <h3>Korak 1: Izaberite Predavača</h3>
            <div className="teachers-list">
              {mockTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className={`teacher-item ${selectedTeacher?.id === teacher.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTeacher(teacher)}
                >
                  <div className="teacher-info">
                    <h4>{teacher.name}</h4>
                    <p>★ {teacher.rating}/5 | {teacher.hourlyRate} RSD/sat</p>
                  </div>
                  <input
                    type="radio"
                    name="teacher"
                    checked={selectedTeacher?.id === teacher.id}
                    onChange={() => setSelectedTeacher(teacher)}
                  />
                </div>
              ))}
            </div>
            <button
              className="btn-next"
              onClick={() => setStep(2)}
              disabled={!selectedTeacher}
            >
              Sledeće
            </button>
          </div>
        )}

        {/* Step 2: Choose Time */}
        {step === 2 && (
          <div className="booking-step">
            <h3>Korak 2: Izaberite Datum i Vreme</h3>
            <div className="form-group">
              <label>Datum</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Vreme</label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Izaberite vreme</option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Napomene (opciono)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Unesite sve dodatne napomene ili pitanja"
              />
            </div>
            <div className="step-buttons">
              <button className="btn-back" onClick={() => setStep(1)}>
                Nazad
              </button>
              <button
                className="btn-next"
                onClick={() => setStep(3)}
                disabled={!selectedDate || !selectedTime}
              >
                Sledeće
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="booking-step">
            <h3>Korak 3: Izbor Načina Plaćanja</h3>
            <div className="booking-summary">
              <h4>Rezime Rezervacije</h4>
              <div className="summary-item">
                <span>Predmet:</span>
                <strong>{mockSubject.name}</strong>
              </div>
              <div className="summary-item">
                <span>Predavač:</span>
                <strong>{selectedTeacher?.name}</strong>
              </div>
              <div className="summary-item">
                <span>Datum:</span>
                <strong>{selectedDate}</strong>
              </div>
              <div className="summary-item">
                <span>Vreme:</span>
                <strong>{selectedTime}</strong>
              </div>
              <div className="summary-item total">
                <span>Cena:</span>
                <strong>{selectedTeacher?.hourlyRate} RSD</strong>
              </div>
            </div>

            <div className="payment-methods">
              <h4>Način Plaćanja</h4>
              {[
                { value: 'creditCard', label: '💳 Kreditna Kartica' },
                { value: 'bankTransfer', label: '🏦 Bankovni Transfer' },
                { value: 'paypal', label: '📱 PayPal' },
              ].map((method) => (
                <label key={method.value} className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value={method.value}
                    checked={paymentMethod === method.value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  {method.label}
                </label>
              ))}
            </div>

            <div className="step-buttons">
              <button className="btn-back" onClick={() => setStep(2)}>
                Nazad
              </button>
              <button className="btn-confirm" onClick={handleConfirmBooking}>
                Potvrdi Rezervaciju
              </button>
            </div>
          </div>
        )}
      </FormContainer>
    </div>
  );
};

export default Booking;