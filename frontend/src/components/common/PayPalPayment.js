import { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

const PayPalPayment = ({ cena, predmetNaziv, onSuccess, onError }) => {
  const [status, setStatus] = useState('idle');

  // Konverzija RSD u USD za PayPal (okvirni kurs za simulaciju)
  const cenaUSD = (cena * 0.0093).toFixed(2);

  const createOrder = (data, actions) => {
    // Kreiranje ordera 100% na frontendu
    return actions.order.create({
      purchase_units: [
        {
          description: `Privatni čas: ${predmetNaziv}`,
          amount: {
            currency_code: 'USD',
            value: cenaUSD,
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    setStatus('processing');
    try {
      // Hvatanje uplate 100% na frontendu
      const order = await actions.order.capture();
      setStatus('success');
      
      // Vraćamo simulirane podatke roditeljskoj komponenti
      onSuccess({
        orderId: order.id,
        transactionId: order.purchase_units[0].payments.captures[0].id,
        status: order.status
      });
    } catch (err) {
      console.error('Greška pri plaćanju:', err);
      setStatus('error');
      onError('Došlo je do greške prilikom obrade plaćanja.');
    }
  };

  return (
    <div className="paypal-container">
      <div className="paypal-sandbox-notice mb-3 text-center">
        <span className="badge-warning px-2 py-1" style={{ borderRadius: '4px', fontSize: '0.8rem' }}>
          ️ Sandbox Mode (Samo frontend simulacija)
        </span>
      </div>
      
      {status === 'processing' && (
        <div className="alert alert-info text-center mb-3">
          Procesiranje uplate...
        </div>
      )}

      <PayPalButtons
        style={{ layout: 'vertical', color: 'blue', shape: 'rect' }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={(err) => {
          console.error('PayPal button error:', err);
          onError('Došlo je do greške u PayPal widget-u');
        }}
        disabled={status === 'processing' || status === 'success'}
      />
    </div>
  );
};

export default PayPalPayment;

