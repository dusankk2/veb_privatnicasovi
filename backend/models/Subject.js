const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  naziv: {
    type: String,
    required: true,
  },
  opis: {
    type: String,
    required: true,
  },
  predavac: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  predavacIme: {
    type: String,
    required: true,
  },
  cena: {
    type: Number,
    required: true,
  },
  trajanje: {
    type: Number,
    default: 60,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Subject', SubjectSchema);
