const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  ime: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  biografija: {
    type: String,
    required: true,
  },
  predmeti: {
    type: [String],
    default: [],
  },
  ocena: {
    type: Number,
    default: 5.0,
  },
  brojCasova: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Teacher', TeacherSchema);
