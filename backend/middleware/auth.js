const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Dobavi token iz zaglavlja
      token = req.headers.authorization.split(' ')[1];

      // Verifikuj token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'privatnicasovi_secret_key_2026');

      // Dobavi korisnika iz tokena i dodaj u req
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({ message: 'Niste autorizovani, korisnik ne postoji' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Niste autorizovani, neispravan token' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Niste autorizovani, nema tokena' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Niste autorizovani kao administrator' });
  }
};

module.exports = { protect, admin };
