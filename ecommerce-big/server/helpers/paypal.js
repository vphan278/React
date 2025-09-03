// server/helpers/paypal.js
require('dotenv').config();
const paypal = require('paypal-rest-sdk');

function ensureConfigured() {
  if (paypal._configured) return;

  const { PAYPAL_MODE, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

  // Only configure if a valid mode is set
  if (PAYPAL_MODE === 'sandbox' || PAYPAL_MODE === 'live') {
    paypal.configure({
      mode: PAYPAL_MODE,
      client_id: PAYPAL_CLIENT_ID,
      client_secret: PAYPAL_CLIENT_SECRET,
    });
    paypal._configured = true;
  } else {
    // Skip configuring in dev if not set; callers will see a clear error
    console.warn('PayPal not configured: set PAYPAL_MODE to "sandbox" or "live" in .env');
  }
}

module.exports = {
  createPayment(payload) {
    ensureConfigured();
    if (!paypal._configured) {
      throw new Error('PayPal not configured in this environment.');
    }
    return new Promise((resolve, reject) => {
      paypal.payment.create(payload, (err, payment) =>
        err ? reject(err) : resolve(payment)
      );
    });
  },

  executePayment(paymentId, details) {
    ensureConfigured();
    if (!paypal._configured) {
      throw new Error('PayPal not configured in this environment.');
    }
    return new Promise((resolve, reject) => {
      paypal.payment.execute(paymentId, details, (err, payment) =>
        err ? reject(err) : resolve(payment)
      );
    });
  },
};