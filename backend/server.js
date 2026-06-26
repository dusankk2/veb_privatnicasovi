const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Učitaj environment varijable
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Konekcija na MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/privatnicasovi');
    console.log('✅ MongoDB konekcija uspešna');
  } catch (err) {
    console.error('❌ MongoDB greška:', err.message);
    process.exit(1);
  }
};

// Rute
app.use('/api/auth', require('./routes/auth'));
app.use('/api/predmeti', require('./routes/predmeti'));
app.use('/api/predavaci', require('./routes/predavaci'));
app.use('/api/termini', require('./routes/termini'));
app.use('/api/paypal', require('./routes/paypal'));

// Osnovna ruta
app.get('/', (req, res) => {
  res.json({ message: 'Privatni Časovi API - Server radi!' });
});

// Pokretanje servera
const PORT = process.env.PORT || 5000;

const seedData = require('./seeder');

connectDB().then(async () => {
  // Seed data if database is empty
  await seedData();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server pokrenut na portu ${PORT}`);
  });
});
