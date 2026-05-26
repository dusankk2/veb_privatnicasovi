import React from 'react';
import './CheckoutSteps.css';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="checkout-steps">
      <div className={`step ${step1 ? 'complete' : ''}`}>
        <div className="step-number">1</div>
        <div className="step-label">Prijava</div>
      </div>
      <div className={`step ${step2 ? 'complete' : ''}`}>
        <div className="step-number">2</div>
        <div className="step-label">Odabir</div>
      </div>
      <div className={`step ${step3 ? 'complete' : ''}`}>
        <div className="step-number">3</div>
        <div className="step-label">Plaćanje</div>
      </div>
      <div className={`step ${step4 ? 'complete' : ''}`}>
        <div className="step-number">4</div>
        <div className="step-label">Završetak</div>
      </div>
    </div>
  );
};

export default CheckoutSteps;