const User = require('./models/User');
const Teacher = require('./models/Teacher');
const Subject = require('./models/Subject');
const Appointment = require('./models/Appointment');

const seedData = async () => {
  try {
    // Proveri da li ima već korisnika
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('🌱 Baza podataka već ima podatke, preskačem seed.');
      return;
    }

    console.log('🌱 Započinjem seed baze podataka...');

    // 1. Kreiraj korisnike
    const admin = await User.create({
      ime: 'Admin',
      email: 'admin@privatnicasovi.rs',
      password: 'admin123',
      role: 'admin',
    });

    const user1 = await User.create({
      ime: 'Petar Simić',
      email: 'petar@gmail.com',
      password: 'user123',
      role: 'user',
    });

    const user2 = await User.create({
      ime: 'Milica Ilić',
      email: 'milica@gmail.com',
      password: 'user123',
      role: 'user',
    });

    console.log('✅ Korisnici uspešno kreirani.');

    // 2. Kreiraj predavače
    const t1 = await Teacher.create({
      ime: 'Prof. Marko Petrović',
      email: 'marko@privatnicasovi.rs',
      biografija: 'Profesor matematike sa 15 godina iskustva u nastavi. Specijalizacija za pripremu prijemnih ispita na tehničkim fakultetima.',
      predmeti: ['Matematika'],
      ocena: 4.8,
      brojCasova: 1,
    });

    const t2 = await Teacher.create({
      ime: 'Dr. Ana Jovanović',
      email: 'ana@privatnicasovi.rs',
      biografija: 'Doktor fizičkih nauka, predaje fiziku i hemiju. Iskustvo u radu sa srednjoškolcima i studentima.',
      predmeti: ['Fizika', 'Hemija'],
      ocena: 4.9,
      brojCasova: 1,
    });

    const t3 = await Teacher.create({
      ime: 'Ing. Nikola Đorđević',
      email: 'nikola@privatnicasovi.rs',
      biografija: 'Software inženjer sa iskustvom u IT industriji. Predaje programiranje i baze podataka početnicima i naprednim studentima.',
      predmeti: ['Programiranje', 'Baze podataka'],
      ocena: 4.7,
      brojCasova: 1,
    });

    const t4 = await Teacher.create({
      ime: 'Prof. Jelena Nikolić',
      email: 'jelena@privatnicasovi.rs',
      biografija: 'Diplomirani anglista sa sertifikatom CELTA. Priprema kandidate za međunarodne ispite engleskog jezika.',
      predmeti: ['Engleski jezik'],
      ocena: 4.9,
      brojCasova: 1,
    });

    console.log('✅ Predavači uspešno kreirani.');

    // 3. Kreiraj predmete
    const p1 = await Subject.create({
      naziv: 'Matematika',
      opis: 'Osnove matematike, algebra, geometrija, analiza. Priprema za sve nivoe obrazovanja.',
      predavac: t1._id,
      predavacIme: t1.ime,
      cena: 1500,
      trajanje: 60,
    });

    const p2 = await Subject.create({
      naziv: 'Fizika',
      opis: 'Mehanika, termodinamika, elektromagnetizam. Eksperimentalni i teorijski pristup.',
      predavac: t2._id,
      predavacIme: t2.ime,
      cena: 1800,
      trajanje: 60,
    });

    const p3 = await Subject.create({
      naziv: 'Programiranje',
      opis: 'Uvod u programiranje, JavaScript, Python, strukture podataka i algoritmi.',
      predavac: t3._id,
      predavacIme: t3.ime,
      cena: 2000,
      trajanje: 90,
    });

    const p4 = await Subject.create({
      naziv: 'Engleski jezik',
      opis: 'Konverzacija, gramatika, priprema za Cambridge i IELTS ispite.',
      predavac: t4._id,
      predavacIme: t4.ime,
      cena: 1200,
      trajanje: 60,
    });

    const p5 = await Subject.create({
      naziv: 'Hemija',
      opis: 'Opšta, organska i neorganska hemija. Priprema za prijemne ispite.',
      predavac: t2._id,
      predavacIme: t2.ime,
      cena: 1600,
      trajanje: 60,
    });

    const p6 = await Subject.create({
      naziv: 'Baze podataka',
      opis: 'SQL, NoSQL, modelovanje podataka, MongoDB, PostgreSQL.',
      predavac: t3._id,
      predavacIme: t3.ime,
      cena: 2200,
      trajanje: 90,
    });

    console.log('✅ Predmeti uspešno kreirani.');

    // 4. Kreiraj inicijalne termine
    await Appointment.create({
      predmetId: p1._id,
      predmetNaziv: p1.naziv,
      predavacId: t1._id,
      predavacIme: t1.ime,
      korisnikId: user1._id,
      korisnikIme: user1.ime,
      datum: '2026-06-02',
      vreme: '10:00',
      trajanje: p1.trajanje,
      status: 'zakazan',
      nacinPlacanja: 'kartica',
      cena: p1.cena,
    });

    await Appointment.create({
      predmetId: p3._id,
      predmetNaziv: p3.naziv,
      predavacId: t3._id,
      predavacIme: t3.ime,
      korisnikId: user1._id,
      korisnikIme: user1.ime,
      datum: '2026-06-03',
      vreme: '14:00',
      trajanje: p3.trajanje,
      status: 'zakazan',
      nacinPlacanja: 'gotovina',
      cena: p3.cena,
    });

    await Appointment.create({
      predmetId: p2._id,
      predmetNaziv: p2.naziv,
      predavacId: t2._id,
      predavacIme: t2.ime,
      korisnikId: user2._id,
      korisnikIme: user2.ime,
      datum: '2026-05-28',
      vreme: '16:00',
      trajanje: p2.trajanje,
      status: 'zavrsen',
      nacinPlacanja: 'kartica',
      cena: p2.cena,
    });

    await Appointment.create({
      predmetId: p4._id,
      predmetNaziv: p4.naziv,
      predavacId: t4._id,
      predavacIme: t4.ime,
      korisnikId: user2._id,
      korisnikIme: user2.ime,
      datum: '2026-06-05',
      vreme: '11:00',
      trajanje: p4.trajanje,
      status: 'zakazan',
      nacinPlacanja: 'paypal',
      cena: p4.cena,
    });

    console.log('✅ Termini uspešno kreirani.');
    console.log('🎉 Seed baze podataka završen uspešno!');
  } catch (error) {
    console.error('❌ Greška prilikom seedovanja baze:', error);
  }
};

module.exports = seedData;
