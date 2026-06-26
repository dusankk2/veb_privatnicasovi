const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Subject = require('../models/Subject');
const Teacher = require('../models/Teacher');
const { protect, admin } = require('../middleware/auth');

// Mock dostupnih slots koji se obično vraćaju
const mockDostupniTermini = [
  { datum: '2026-06-02', vreme: '09:00' },
  { datum: '2026-06-02', vreme: '10:00' },
  { datum: '2026-06-02', vreme: '11:00' },
  { datum: '2026-06-02', vreme: '14:00' },
  { datum: '2026-06-02', vreme: '15:00' },
  { datum: '2026-06-03', vreme: '09:00' },
  { datum: '2026-06-03', vreme: '10:00' },
  { datum: '2026-06-03', vreme: '13:00' },
  { datum: '2026-06-03', vreme: '14:00' },
  { datum: '2026-06-04', vreme: '10:00' },
  { datum: '2026-06-04', vreme: '11:00' },
  { datum: '2026-06-04', vreme: '16:00' },
  { datum: '2026-06-05', vreme: '09:00' },
  { datum: '2026-06-05', vreme: '11:00' },
  { datum: '2026-06-05', vreme: '15:00' },
];

// @route   GET /api/termini
// @desc    Preuzmi sve zakazane termine (Admin)
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/termini/moji
// @desc    Preuzmi termine ulogovanog korisnika
// @access  Private
router.get('/moji', protect, async (req, res) => {
  try {
    const appointments = await Appointment.find({ korisnikId: req.user._id });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/termini/dostupni/:predavacId
// @desc    Preuzmi dostupne termine za predavača
// @access  Public
router.get('/dostupni/:predavacId', async (req, res) => {
  try {
    // U realnom sistemu, filtrirali bismo zauzete termine predavača.
    // Za potrebe simulacije, vraćamo definisanu listu slotova.
    const busyAppointments = await Appointment.find({
      predavacId: req.params.predavacId,
      status: 'zakazan'
    });

    const busySlots = busyAppointments.map(a => `${a.datum}T${a.vreme}`);

    const freeSlots = mockDostupniTermini.filter(slot => {
      return !busySlots.includes(`${slot.datum}T${slot.vreme}`);
    });

    res.json(freeSlots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/termini
// @desc    Zakaži novi termin
// @access  Private
router.post('/', protect, async (req, res) => {
  const { predmetId, predavacId, datum, vreme, nacinPlacanja, paypalOrderId, paypalTransactionId, paypalStatus } = req.body;

  try {
    const subject = await Subject.findById(predmetId);
    if (!subject) {
      return res.status(404).json({ message: 'Predmet nije pronađen' });
    }

    const teacher = await Teacher.findById(predavacId);
    if (!teacher) {
      return res.status(404).json({ message: 'Predavač nije pronađen' });
    }

    // Provera da li je termin već zauzet
    const alreadyBooked = await Appointment.findOne({
      predavacId,
      datum,
      vreme,
      status: 'zakazan',
    });

    if (alreadyBooked) {
      return res.status(400).json({ message: 'Ovaj termin je već zauzet kod izabranog predavača' });
    }

    const appointment = new Appointment({
      predmetId,
      predmetNaziv: subject.naziv,
      predavacId,
      predavacIme: teacher.ime,
      korisnikId: req.user._id,
      korisnikIme: req.user.ime,
      datum,
      vreme,
      trajanje: subject.trajanje,
      nacinPlacanja,
      cena: subject.cena,
      paypalOrderId,
      paypalTransactionId,
      paypalStatus,
    });

    const createdAppointment = await appointment.save();

    // Povećaj broj časova za predavača
    teacher.brojCasova += 1;
    await teacher.save();

    res.status(201).json(createdAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/termini/:id/status
// @desc    Ažuriraj status termina
// @access  Private
router.put('/:id/status', protect, async (req, res) => {
  const { status } = req.body;

  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Termin nije pronađen' });
    }

    // Samo admin ili ulogovani korisnik koji je vlasnik termina mogu promeniti status
    if (req.user.role !== 'admin' && appointment.korisnikId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Nemate dozvolu za izmenu ovog termina' });
    }

    appointment.status = status;
    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/termini/:id
// @desc    Obriši termin (Admin)
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
      await Appointment.deleteOne({ _id: req.params.id });
      res.json({ message: 'Termin uspešno obrisan' });
    } else {
      res.status(404).json({ message: 'Termin nije pronađen' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
