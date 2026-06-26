const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');
const Teacher = require('../models/Teacher');
const { protect, admin } = require('../middleware/auth');

// @route   GET /api/predmeti
// @desc    Preuzmi sve predmete
// @access  Public
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find({});
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/predmeti/:id
// @desc    Preuzmi predmet po ID-u
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (subject) {
      res.json(subject);
    } else {
      res.status(404).json({ message: 'Predmet nije pronađen' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/predmeti
// @desc    Kreiraj nov predmet
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  const { naziv, opis, predavacId, cena, trajanje } = req.body;

  try {
    // Proveri da li predavač postoji
    const teacher = await Teacher.findById(predavacId);
    if (!teacher) {
      return res.status(400).json({ message: 'Predavač sa ovim ID-em ne postoji' });
    }

    const subject = new Subject({
      naziv,
      opis,
      predavac: predavacId,
      predavacIme: teacher.ime,
      cena,
      trajanje: trajanje || 60,
    });

    const createdSubject = await subject.save();

    // Dodaj predmet u listu predmeta predavača ako već nije tamo
    if (!teacher.predmeti.includes(naziv)) {
      teacher.predmeti.push(naziv);
      await teacher.save();
    }

    res.status(201).json(createdSubject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/predmeti/:id
// @desc    Izmeni predmet
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  const { naziv, opis, predavacId, cena, trajanje } = req.body;

  try {
    const subject = await Subject.findById(req.params.id);

    if (subject) {
      subject.naziv = naziv || subject.naziv;
      subject.opis = opis || subject.opis;
      subject.cena = cena !== undefined ? cena : subject.cena;
      subject.trajanje = trajanje !== undefined ? trajanje : subject.trajanje;

      if (predavacId && predavacId !== subject.predavac.toString()) {
        const teacher = await Teacher.findById(predavacId);
        if (!teacher) {
          return res.status(400).json({ message: 'Predavač ne postoji' });
        }
        subject.predavac = predavacId;
        subject.predavacIme = teacher.ime;
      }

      const updatedSubject = await subject.save();
      res.json(updatedSubject);
    } else {
      res.status(404).json({ message: 'Predmet nije pronađen' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/predmeti/:id
// @desc    Obriši predmet
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);

    if (subject) {
      await Subject.deleteOne({ _id: req.params.id });
      res.json({ message: 'Predmet uspešno obrisan' });
    } else {
      res.status(404).json({ message: 'Predmet nije pronađen' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
