const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generiši JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'privatnicasovi_secret_key_2026', {
    expiresIn: '30d',
  });
};

// @route   POST /api/auth/register
// @desc    Registracija novog korisnika
// @access  Public
router.post('/register', async (req, res) => {
  const { ime, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Korisnik sa tim emailom već postoji' });
    }

    // Za kreiranje prvog korisnika, ako je email admin@privatnicasovi.rs, možemo mu dati admin rolu automatski
    const role = email.toLowerCase() === 'admin@privatnicasovi.rs' ? 'admin' : 'user';

    const user = await User.create({
      ime,
      email,
      password,
      role,
    });

    if (user) {
      res.status(201).json({
        user: {
          _id: user._id,
          ime: user.ime,
          email: user.email,
          role: user.role,
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Neispravni podaci o korisniku' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Autentifikacija korisnika i dobijanje tokena
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        user: {
          _id: user._id,
          ime: user.ime,
          email: user.email,
          role: user.role,
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Pogrešan email ili lozinka' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
