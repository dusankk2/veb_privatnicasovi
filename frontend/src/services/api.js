import axios from 'axios';



const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// Interceptor za JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ============================================================
// MOCK PODACI (Fallback)
// ============================================================

const mockPredmeti = [
  {
    _id: '1',
    naziv: 'Matematika',
    opis: 'Osnove matematike, algebra, geometrija, analiza. Priprema za sve nivoe obrazovanja.',
    predavacId: '1',
    predavacIme: 'Prof. Marko Petrović',
    cena: 1500,
    trajanje: 60,
  },
  {
    _id: '2',
    naziv: 'Fizika',
    opis: 'Mehanika, termodinamika, elektromagnetizam. Eksperimentalni i teorijski pristup.',
    predavacId: '2',
    predavacIme: 'Dr. Ana Jovanović',
    cena: 1800,
    trajanje: 60,
  },
  {
    _id: '3',
    naziv: 'Programiranje',
    opis: 'Uvod u programiranje, JavaScript, Python, strukture podataka i algoritmi.',
    predavacId: '3',
    predavacIme: 'Ing. Nikola Đorđević',
    cena: 2000,
    trajanje: 90,
  },
  {
    _id: '4',
    naziv: 'Engleski jezik',
    opis: 'Konverzacija, gramatika, priprema za Cambridge i IELTS ispite.',
    predavacId: '4',
    predavacIme: 'Prof. Jelena Nikolić',
    cena: 1200,
    trajanje: 60,
  },
  {
    _id: '5',
    naziv: 'Hemija',
    opis: 'Opšta, organska i neorganska hemija. Priprema za prijemne ispite.',
    predavacId: '2',
    predavacIme: 'Dr. Ana Jovanović',
    cena: 1600,
    trajanje: 60,
  },
  {
    _id: '6',
    naziv: 'Baze podataka',
    opis: 'SQL, NoSQL, modelovanje podataka, MongoDB, PostgreSQL.',
    predavacId: '3',
    predavacIme: 'Ing. Nikola Đorđević',
    cena: 2200,
    trajanje: 90,
  },
];

const mockPredavaci = [
  {
    _id: '1',
    ime: 'Prof. Marko Petrović',
    email: 'marko@privatnicasovi.rs',
    biografija: 'Profesor matematike sa 15 godina iskustva u nastavi. Specijalizacija za pripremu prijemnih ispita na tehničkim fakultetima.',
    predmeti: ['Matematika'],
    ocena: 4.8,
    brojCasova: 230,
  },
  {
    _id: '2',
    ime: 'Dr. Ana Jovanović',
    email: 'ana@privatnicasovi.rs',
    biografija: 'Doktor fizičkih nauka, predaje fiziku i hemiju. Iskustvo u radu sa srednjoškolcima i studentima.',
    predmeti: ['Fizika', 'Hemija'],
    ocena: 4.9,
    brojCasova: 185,
  },
  {
    _id: '3',
    ime: 'Ing. Nikola Đorđević',
    email: 'nikola@privatnicasovi.rs',
    biografija: 'Software inženjer sa iskustvom u IT industriji. Predaje programiranje i baze podataka počtnicima i naprednim studentima.',
    predmeti: ['Programiranje', 'Baze podataka'],
    ocena: 4.7,
    brojCasova: 150,
  },
  {
    _id: '4',
    ime: 'Prof. Jelena Nikolić',
    email: 'jelena@privatnicasovi.rs',
    biografija: 'Diplomirani anglista sa sertifikatom CELTA. Priprema kandidate za međunarodne ispite engleskog jezika.',
    predmeti: ['Engleski jezik'],
    ocena: 4.9,
    brojCasova: 310,
  },
];

const mockTermini = [
  {
    _id: 't1',
    predmetId: '1',
    predmetNaziv: 'Matematika',
    predavacId: '1',
    predavacIme: 'Prof. Marko Petrović',
    korisnikId: 'u1',
    korisnikIme: 'Petar Simić',
    datum: '2026-06-02',
    vreme: '10:00',
    trajanje: 60,
    status: 'zakazan',
    nacinPlacanja: 'kartica',
    cena: 1500,
  },
  {
    _id: 't2',
    predmetId: '3',
    predmetNaziv: 'Programiranje',
    predavacId: '3',
    predavacIme: 'Ing. Nikola Đorđević',
    korisnikId: 'u1',
    korisnikIme: 'Petar Simić',
    datum: '2026-06-03',
    vreme: '14:00',
    trajanje: 90,
    status: 'zakazan',
    nacinPlacanja: 'gotovina',
    cena: 2000,
  },
  {
    _id: 't3',
    predmetId: '2',
    predmetNaziv: 'Fizika',
    predavacId: '2',
    predavacIme: 'Dr. Ana Jovanović',
    korisnikId: 'u2',
    korisnikIme: 'Milica Ilić',
    datum: '2026-05-28',
    vreme: '16:00',
    trajanje: 60,
    status: 'zavrsen',
    nacinPlacanja: 'kartica',
    cena: 1800,
  },
  {
    _id: 't4',
    predmetId: '4',
    predmetNaziv: 'Engleski jezik',
    predavacId: '4',
    predavacIme: 'Prof. Jelena Nikolić',
    korisnikId: 'u2',
    korisnikIme: 'Milica Ilić',
    datum: '2026-06-05',
    vreme: '11:00',
    trajanje: 60,
    status: 'zakazan',
    nacinPlacanja: 'paypal',
    cena: 1200,
  },
];

const mockKorisnici = [
  { _id: 'admin1', ime: 'Admin', email: 'admin@privatnicasovi.rs', role: 'admin' },
  { _id: 'u1', ime: 'Petar Simić', email: 'petar@gmail.com', role: 'user' },
  { _id: 'u2', ime: 'Milica Ilić', email: 'milica@gmail.com', role: 'user' },
];

const dostupniTermini = [
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

// Helper za proveru mrežnih grešaka i prelazak na mock
const handleApiCall = async (apiCallFn, mockFallbackFn, actionName) => {
  try {
    return await apiCallFn();
  } catch (error) {
    if (error.code === 'ERR_NETWORK' || !error.response || error.response.status === 502 || error.response.status === 504) {
      console.warn(`⚠️ [API] Backend nije dostupan za akciju "${actionName}". Koristim MOCK podatke.`);
      return await mockFallbackFn();
    }
    
    throw new Error(error.response?.data?.message || error.message);
  }
};

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

// ============================================================
// API FUNKCIJE
// ============================================================

// --- AUTH ---
export const apiLogin = async (email, password) => {
  return handleApiCall(
    async () => {
      const res = await api.post('/auth/login', { email, password });
      return res.data;
    },
    async () => {
      await delay();
      const user = mockKorisnici.find((u) => u.email === email);
      if (user) {
        return {
          user: { _id: user._id, ime: user.ime, email: user.email, role: user.role },
          token: 'mock-jwt-token-' + user._id,
        };
      }
      throw new Error('Pogrešan email ili lozinka (Mock)');
    },
    'Prijava'
  );
};

export const apiRegister = async (ime, email, password) => {
  return handleApiCall(
    async () => {
      const res = await api.post('/auth/register', { ime, email, password });
      return res.data;
    },
    async () => {
      await delay();
      const exists = mockKorisnici.find((u) => u.email === email);
      if (exists) throw new Error('Korisnik sa ovim emailom već postoji (Mock)');
      const newUser = { _id: 'u' + Date.now(), ime, email, role: 'user' };
      mockKorisnici.push(newUser);
      return {
        user: newUser,
        token: 'mock-jwt-token-' + newUser._id,
      };
    },
    'Registracija'
  );
};

// --- PREDMETI ---
export const apiGetPredmeti = async () => {
  return handleApiCall(
    async () => {
      const res = await api.get('/predmeti');
      return res.data;
    },
    async () => {
      await delay();
      return [...mockPredmeti];
    },
    'Preuzimanje predmeta'
  );
};

export const apiGetPredmet = async (id) => {
  return handleApiCall(
    async () => {
      const res = await api.get(`/predmeti/${id}`);
      return res.data;
    },
    async () => {
      await delay();
      const predmet = mockPredmeti.find((p) => p._id === id);
      if (!predmet) throw new Error('Predmet nije pronađen (Mock)');
      return { ...predmet };
    },
    'Preuzimanje jednog predmeta'
  );
};

export const apiCreatePredmet = async (data) => {
  return handleApiCall(
    async () => {
      const res = await api.post('/predmeti', data);
      return res.data;
    },
    async () => {
      await delay();
      const newPredmet = { ...data, _id: 'p' + Date.now() };
      mockPredmeti.push(newPredmet);
      return newPredmet;
    },
    'Kreiranje predmeta'
  );
};

export const apiUpdatePredmet = async (id, data) => {
  return handleApiCall(
    async () => {
      const res = await api.put(`/predmeti/${id}`, data);
      return res.data;
    },
    async () => {
      await delay();
      const index = mockPredmeti.findIndex((p) => p._id === id);
      if (index === -1) throw new Error('Predmet nije pronađen (Mock)');
      mockPredmeti[index] = { ...mockPredmeti[index], ...data };
      return mockPredmeti[index];
    },
    'Izmena predmeta'
  );
};

export const apiDeletePredmet = async (id) => {
  return handleApiCall(
    async () => {
      const res = await api.delete(`/predmeti/${id}`);
      return res.data;
    },
    async () => {
      await delay();
      const index = mockPredmeti.findIndex((p) => p._id === id);
      if (index === -1) throw new Error('Predmet nije pronađen (Mock)');
      mockPredmeti.splice(index, 1);
      return { message: 'Predmet obrisan (Mock)' };
    },
    'Brisanje predmeta'
  );
};

// --- PREDAVAČI ---
export const apiGetPredavaci = async () => {
  return handleApiCall(
    async () => {
      const res = await api.get('/predavaci');
      return res.data;
    },
    async () => {
      await delay();
      return [...mockPredavaci];
    },
    'Preuzimanje predavača'
  );
};

export const apiGetPredavac = async (id) => {
  return handleApiCall(
    async () => {
      const res = await api.get(`/predavaci/${id}`);
      return res.data;
    },
    async () => {
      await delay();
      const predavac = mockPredavaci.find((p) => p._id === id);
      if (!predavac) throw new Error('Predavač nije pronađen (Mock)');
      return { ...predavac };
    },
    'Preuzimanje jednog predavača'
  );
};

export const apiCreatePredavac = async (data) => {
  return handleApiCall(
    async () => {
      const res = await api.post('/predavaci', data);
      return res.data;
    },
    async () => {
      await delay();
      const newPredavac = { ...data, _id: 'pr' + Date.now() };
      mockPredavaci.push(newPredavac);
      return newPredavac;
    },
    'Kreiranje predavača'
  );
};

export const apiUpdatePredavac = async (id, data) => {
  return handleApiCall(
    async () => {
      const res = await api.put(`/predavaci/${id}`, data);
      return res.data;
    },
    async () => {
      await delay();
      const index = mockPredavaci.findIndex((p) => p._id === id);
      if (index === -1) throw new Error('Predavač nije pronađen (Mock)');
      mockPredavaci[index] = { ...mockPredavaci[index], ...data };
      return mockPredavaci[index];
    },
    'Izmena predavača'
  );
};

export const apiDeletePredavac = async (id) => {
  return handleApiCall(
    async () => {
      const res = await api.delete(`/predavaci/${id}`);
      return res.data;
    },
    async () => {
      await delay();
      const index = mockPredavaci.findIndex((p) => p._id === id);
      if (index === -1) throw new Error('Predavač nije pronađen (Mock)');
      mockPredavaci.splice(index, 1);
      return { message: 'Predavač obrisan (Mock)' };
    },
    'Brisanje predavača'
  );
};

// --- TERMINI ---
export const apiGetTermini = async () => {
  return handleApiCall(
    async () => {
      const res = await api.get('/termini');
      return res.data;
    },
    async () => {
      await delay();
      return [...mockTermini];
    },
    'Preuzimanje svih termina'
  );
};

export const apiGetMojiTermini = async (korisnikId) => {
  return handleApiCall(
    async () => {
      const res = await api.get('/termini/moji');
      return res.data;
    },
    async () => {
      await delay();
      return mockTermini.filter((t) => t.korisnikId === korisnikId);
    },
    'Preuzimanje ličnih termina'
  );
};

export const apiGetDostupniTermini = async (predavacId) => {
  return handleApiCall(
    async () => {
      const res = await api.get(`/termini/dostupni/${predavacId}`);
      return res.data;
    },
    async () => {
      await delay();
      return [...dostupniTermini];
    },
    'Preuzimanje dostupnih termina'
  );
};

export const apiCreateTermin = async (data) => {
  return handleApiCall(
    async () => {
      const res = await api.post('/termini', data);
      return res.data;
    },
    async () => {
      await delay();
      const newTermin = { ...data, _id: 't' + Date.now(), status: 'zakazan' };
      mockTermini.push(newTermin);
      return newTermin;
    },
    'Zakazivanje termina'
  );
};

export const apiUpdateTerminStatus = async (id, status) => {
  return handleApiCall(
    async () => {
      const res = await api.put(`/termini/${id}/status`, { status });
      return res.data;
    },
    async () => {
      await delay();
      const index = mockTermini.findIndex((t) => t._id === id);
      if (index === -1) throw new Error('Termin nije pronađen (Mock)');
      mockTermini[index].status = status;
      return mockTermini[index];
    },
    'Ažuriranje statusa termina'
  );
};

export const apiDeleteTermin = async (id) => {
  return handleApiCall(
    async () => {
      const res = await api.delete(`/termini/${id}`);
      return res.data;
    },
    async () => {
      await delay();
      const index = mockTermini.findIndex((t) => t._id === id);
      if (index === -1) throw new Error('Termin nije pronađen (Mock)');
      mockTermini.splice(index, 1);
      return { message: 'Termin obrisan (Mock)' };
    },
    'Brisanje termina'
  );
};
