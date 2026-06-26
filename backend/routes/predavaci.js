const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');
const { protect, admin } = require('../middleware/auth');

// @route   GET /api/predavaci
// @desc    Preuzmi sve predavače
// @access  Public
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find({});
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/predavaci/:id
// @desc    Preuzmi predavača po ID-u
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (teacher) {
      res.json(teacher);
    } else {
      res.status(404).json({ message: 'Predavač nije pronađen' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/predavaci
// @desc    Kreiraj novog predavača
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  const { ime, email, biografija, predmeti, ocena, brojCasova } = req.body;

  try {
    const teacher = new Teacher({
      ime,
      email,
      biografija,
      predmeti: predmeti || [],
      ocena: ocena || 5.0,
      brojCasova: brojCasova || 0,
    });

    const createdTeacher = await teacher.save();
    res.status(201).json(createdTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/predavaci/:id
// @desc    Izmeni predavača
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  const { ime, email, biografija, predmeti, ocena, brojCasova } = req.body;

  try {
    const teacher = await Teacher.findById(req.params.id);

    if (teacher) {
      teacher.ime = ime || teacher.ime;
      teacher.email = email || teacher.email;
      teacher.biografija = biografija || teacher.biografija;
      if (predmeti) teacher.predmeti = predmeti;
      if (ocena !== undefined) teacher.ocena = ocena;
      if (brojCasova !== undefined) teacher.brojCasova = brojCasova;

      const updatedTeacher = await teacher.save();
      res.json(updatedTeacher);
    } else {
      res.status(404).json({ message: 'Predavač nije pronađen' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/predavaci/:id
// @desc    Obriši predavača
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (teacher) {
      await Teacher.deleteOne({ _id: req.params.id });
      res.json({ message: 'Predavač uspešno obrisan' });
    } else {
      res.status(404).json({ message: 'Predavač nije pronađen' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
