const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const PAYPAL_API_BASE = process.env.PAYPAL_MODE === 'sandbox'
  ? 'https://api-m.sandbox.paypal.com'
  : 'https://api-m.paypal.com';

// Pomoćna funkcija: Dobij PayPal access token
const getPayPalAccessToken = async () => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`PayPal auth greška: ${data.error_description || 'Nepoznata greška'}`);
  }

  return data.access_token;
};

// @route   GET /api/paypal/config
// @desc    Vrati PayPal Client ID za frontend
// @access  Public
router.get('/config', (req, res) => {
  res.json({
    clientId: process.env.PAYPAL_CLIENT_ID,
    mode: process.env.PAYPAL_MODE || 'sandbox',
  });
});

// @route   POST /api/paypal/create-order
// @desc    Kreiraj PayPal order (sandbox simulacija)
// @access  Private
router.post('/create-order', protect, async (req, res) => {
  const { cena, predmetNaziv } = req.body;

  try {
    const accessToken = await getPayPalAccessToken();

    // Konverzija RSD u USD (fiksni kurs za sandbox simulaciju)
    const cenaUSD = (cena * 0.0093).toFixed(2); // Približni kurs RSD -> USD

    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: cenaUSD,
          },
          description: `Privatni čas: ${predmetNaziv}`,
        },
      ],
      application_context: {
        brand_name: 'Privatni Časovi',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: 'http://localhost:3000/zakazivanje',
        cancel_url: 'http://localhost:3000/zakazivanje',
      },
    };

    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const order = await response.json();

    if (!response.ok) {
      console.error('PayPal create order greška:', order);
      return res.status(500).json({
        message: 'Greška prilikom kreiranja PayPal narudžbine',
        details: order,
      });
    }

    res.json({
      orderId: order.id,
      status: order.status,
      cenaUSD,
    });
  } catch (error) {
    console.error('PayPal greška:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/paypal/capture-order
// @desc    Izvrši (capture) PayPal plaćanje nakon odobrenja korisnika
// @access  Private
router.post('/capture-order', protect, async (req, res) => {
  const { orderId } = req.body;

  try {
    const accessToken = await getPayPalAccessToken();

    const response = await fetch(
      `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const captureData = await response.json();

    if (!response.ok) {
      console.error('PayPal capture greška:', captureData);
      return res.status(500).json({
        message: 'Greška prilikom izvršavanja PayPal plaćanja',
        details: captureData,
      });
    }

    // Izvuci transaction ID iz capture odgovora
    const transactionId =
      captureData.purchase_units?.[0]?.payments?.captures?.[0]?.id || null;

    res.json({
      status: captureData.status,
      orderId: captureData.id,
      transactionId,
      captureData,
    });
  } catch (error) {
    console.error('PayPal capture greška:', error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
