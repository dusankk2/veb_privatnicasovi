import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetPredmetiQuery } from '../slices/predmetiApiSlice';
import { useGetPredavaciQuery } from '../slices/predavaciApiSlice';
import { useGetDostupniTerminiQuery, useCreateTerminMutation } from '../slices/terminiApiSlice';

const STEPS = [
  { key: 'predmet', label: 'Predmet' },
  { key: 'predavac', label: 'Predavač' },
  { key: 'termin', label: 'Termin' },
  { key: 'placanje', label: 'Plaćanje' },
  { key: 'potvrda', label: 'Potvrda' },
];

const PAYMENT_OPTIONS = [
  { value: 'kartica', label: '💳 Kartica', desc: 'Platite kreditnom ili debitnom karticom' },
  { value: 'gotovina', label: '💵 Gotovina', desc: 'Plaćanje gotovinom pre početka časa' },
  { value: 'paypal', label: '🅿️ PayPal', desc: 'Platite putem PayPal naloga' },
];

const Zakazivanje = () => {
  const { userInfo: user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { data: predmeti = [], isLoading: loadingPredmeti } = useGetPredmetiQuery();
  const { data: predavaci = [], isLoading: loadingPredavaci } = useGetPredavaciQuery();
  const [createTermin] = useCreateTerminMutation();

  // Selected values
  const [selectedPredmet, setSelectedPredmet] = useState(null);
  const [selectedPredavac, setSelectedPredavac] = useState(null);
  const [selectedTermin, setSelectedTermin] = useState(null);
  const [selectedPlacanje, setSelectedPlacanje] = useState('');

  // Set initial selected item from URL when data loads
  useEffect(() => {
    const predmetId = searchParams.get('predmet');
    if (predmetId && predmeti.length > 0 && step === 0) {
      const found = predmeti.find((p) => p._id === predmetId);
      if (found) {
        setSelectedPredmet(found);
        setStep(1);
      }
    }
  }, [searchParams, predmeti, step]);

  const { data: dostupniTermini = [] } = useGetDostupniTerminiQuery(selectedPredavac?._id, {
    skip: !selectedPredavac,
  });

  const handleSelectPredmet = (predmet) => {
    setSelectedPredmet(predmet);
    setSelectedPredavac(null);
    setSelectedTermin(null);
    setSelectedPlacanje('');
    setStep(1);
  };

  const handleSelectPredavac = (predavac) => {
    setSelectedPredavac(predavac);
    setSelectedTermin(null);
    setSelectedPlacanje('');
    setStep(2);
  };

  const handleSelectTermin = (termin) => {
    setSelectedTermin(termin);
    setStep(3);
  };

  const handleSelectPlacanje = (value) => {
    setSelectedPlacanje(value);
    setStep(4);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      await createTermin({
        predmetId: selectedPredmet._id,
        predmetNaziv: selectedPredmet.naziv,
        predavacId: selectedPredavac._id,
        predavacIme: selectedPredavac.ime,
        datum: selectedTermin.datum,
        vreme: selectedTermin.vreme,
        trajanje: selectedPredmet.trajanje,
        nacinPlacanja: selectedPlacanje,
        cena: selectedPredmet.cena,
      }).unwrap();
      setSuccess(true);
    } catch (err) {
      setError(err?.data?.message || err.message || 'Greška prilikom zakazivanja');
    } finally {
      setSubmitting(false);
    }
  };

  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };

  if (loadingPredmeti || loadingPredavaci) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="page" id="zakazivanje-success">
        <div className="wizard">
          <div className="wizard-body text-center" style={{ padding: '60px 36px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</div>
            <h2>Termin uspešno zakazan!</h2>
            <p className="text-muted mt-2" style={{ fontSize: '1rem' }}>
              {selectedPredmet.naziv} sa {selectedPredavac.ime}
            </p>
            <p className="text-muted">
              {selectedTermin.datum} u {selectedTermin.vreme}
            </p>
            <div className="mt-3 flex" style={{ justifyContent: 'center', gap: '12px' }}>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/moji-termini')}
                id="go-to-termini"
              >
                📋 Moji termini
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setSuccess(false);
                  setStep(0);
                  setSelectedPredmet(null);
                  setSelectedPredavac(null);
                  setSelectedTermin(null);
                  setSelectedPlacanje('');
                }}
                id="zakazivanje-new"
              >
                ➕ Novi termin
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Filter predavaci for selected predmet
  const filteredPredavaci = selectedPredmet
    ? predavaci.filter((p) =>
        p.predmeti.some(
          (pr) => pr.toLowerCase() === selectedPredmet.naziv.toLowerCase()
        )
      )
    : [];

  return (
    <div className="page" id="zakazivanje-page">
      <div className="page-header" style={{ justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1>📅 Zakazivanje termina</h1>
          <p>Prati korake i zakaži svoj privatni čas</p>
        </div>
      </div>

      <div className="wizard">
        {/* Steps indicator */}
        <div className="wizard-steps">
          {STEPS.map((s, i) => (
            <div
              key={s.key}
              className={`wizard-step ${
                i === step ? 'active' : i < step ? 'completed' : ''
              }`}
            >
              <span className="wizard-step-number">
                {i < step ? '✓' : i + 1}
              </span>
              {s.label}
            </div>
          ))}
        </div>

        {/* Wizard body */}
        <div className="wizard-body">
          {error && (
            <div className="alert alert-error">⚠️ {error}</div>
          )}

          {/* Step 1: Predmet */}
          {step === 0 && (
            <>
              <h3>Odaberi predmet</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {predmeti.map((p) => (
                  <div
                    key={p._id}
                    className={`payment-option ${
                      selectedPredmet?._id === p._id ? 'selected' : ''
                    }`}
                    onClick={() => handleSelectPredmet(p)}
                    id={`select-predmet-${p._id}`}
                    style={{ cursor: 'pointer' }}
                  >
                    <div>
                      <div className="payment-label">{p.naziv}</div>
                      <div className="payment-desc">
                        {p.predavacIme} | {p.trajanje} min | {p.cena} RSD
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Step 2: Predavač */}
          {step === 1 && (
            <>
              <h3>Odaberi predavača za: {selectedPredmet?.naziv}</h3>
              {filteredPredavaci.length === 0 ? (
                <p className="text-muted">Nema dostupnih predavača za ovaj predmet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {filteredPredavaci.map((p) => (
                    <div
                      key={p._id}
                      className={`payment-option ${
                        selectedPredavac?._id === p._id ? 'selected' : ''
                      }`}
                      onClick={() => handleSelectPredavac(p)}
                      id={`select-predavac-${p._id}`}
                      style={{ cursor: 'pointer' }}
                    >
                      <div>
                        <div className="payment-label">
                          {p.ime} ⭐ {p.ocena}
                        </div>
                        <div className="payment-desc">{p.biografija}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="wizard-actions">
                <button className="btn btn-secondary" onClick={goBack}>
                  ← Nazad
                </button>
              </div>
            </>
          )}

          {/* Step 3: Termin */}
          {step === 2 && (
            <>
              <h3>Odaberi termin</h3>
              <p className="text-muted mb-2" style={{ fontSize: '0.85rem' }}>
                Predavač: {selectedPredavac?.ime}
              </p>
              <div className="time-slots">
                {dostupniTermini.map((t, i) => (
                  <button
                    key={i}
                    className={`time-slot ${
                      selectedTermin?.datum === t.datum && selectedTermin?.vreme === t.vreme
                        ? 'selected'
                        : ''
                    }`}
                    onClick={() => handleSelectTermin(t)}
                    id={`select-termin-${i}`}
                  >
                    <div className="slot-date">{t.datum}</div>
                    <div>{t.vreme}</div>
                  </button>
                ))}
              </div>
              <div className="wizard-actions">
                <button className="btn btn-secondary" onClick={goBack}>
                  ← Nazad
                </button>
              </div>
            </>
          )}

          {/* Step 4: Plaćanje */}
          {step === 3 && (
            <>
              <h3>Odaberi način plaćanja</h3>
              <div className="payment-options">
                {PAYMENT_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`payment-option ${
                      selectedPlacanje === opt.value ? 'selected' : ''
                    }`}
                    id={`payment-${opt.value}`}
                  >
                    <input
                      type="radio"
                      name="placanje"
                      value={opt.value}
                      checked={selectedPlacanje === opt.value}
                      onChange={() => handleSelectPlacanje(opt.value)}
                    />
                    <div>
                      <div className="payment-label">{opt.label}</div>
                      <div className="payment-desc">{opt.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
              <div className="wizard-actions">
                <button className="btn btn-secondary" onClick={goBack}>
                  ← Nazad
                </button>
              </div>
            </>
          )}

          {/* Step 5: Potvrda */}
          {step === 4 && (
            <>
              <h3>Potvrdi zakazivanje</h3>
              <div className="booking-summary">
                <div className="booking-summary-item">
                  <span className="summary-label">Predmet</span>
                  <span className="summary-value">{selectedPredmet?.naziv}</span>
                </div>
                <div className="booking-summary-item">
                  <span className="summary-label">Predavač</span>
                  <span className="summary-value">{selectedPredavac?.ime}</span>
                </div>
                <div className="booking-summary-item">
                  <span className="summary-label">Datum i vreme</span>
                  <span className="summary-value">
                    {selectedTermin?.datum} u {selectedTermin?.vreme}
                  </span>
                </div>
                <div className="booking-summary-item">
                  <span className="summary-label">Trajanje</span>
                  <span className="summary-value">{selectedPredmet?.trajanje} min</span>
                </div>
                <div className="booking-summary-item">
                  <span className="summary-label">Plaćanje</span>
                  <span className="summary-value">
                    {PAYMENT_OPTIONS.find((o) => o.value === selectedPlacanje)?.label}
                  </span>
                </div>
                <div className="booking-total">
                  <span>Ukupno</span>
                  <span className="total-price">{selectedPredmet?.cena} RSD</span>
                </div>
              </div>
              <div className="wizard-actions">
                <button className="btn btn-secondary" onClick={goBack}>
                  ← Nazad
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleSubmit}
                  disabled={submitting}
                  id="confirm-booking"
                >
                  {submitting ? 'Zakazivanje...' : '✅ Potvrdi zakazivanje'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Zakazivanje;
