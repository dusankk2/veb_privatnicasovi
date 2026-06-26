const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  predmetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  predmetNaziv: {
    type: String,
    required: true,
  },
  predavacId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  predavacIme: {
    type: String,
    required: true,
  },
  korisnikId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  korisnikIme: {
    type: String,
    required: true,
  },
  datum: {
    type: String,
    required: true,
  },
  vreme: {
    type: String,
    required: true,
  },
  trajanje: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['zakazan', 'zavrsen', 'otkazan'],
    default: 'zakazan',
  },
  nacinPlacanja: {
    type: String,
    enum: ['kartica', 'gotovina', 'paypal'],
    default: 'gotovina',
  },
  cena: {
    type: Number,
    required: true,
  },
  paypalOrderId: {
    type: String,
    default: null,
  },
  paypalTransactionId: {
    type: String,
    default: null,
  },
  paypalStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', null],
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
