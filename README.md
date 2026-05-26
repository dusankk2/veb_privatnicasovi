# Sistem za Zakazivanje Privatnih Časova

> Web aplikacija koja simulira rad online sistema za zakazivanje termina za privatne časove i konsultacije sa predavačima

## 📋 Tabela Sadržaja

- [Opis Projekta](#opis-projekta)
- [Karakteristike](#karakteristike)
- [Tehnologije](#tehnologije)
- [Struktura Projekta](#struktura-projekta)
- [Instalacija](#instalacija)
- [Pokretanje](#pokretanje)
- [Korisničke Uloge](#korisničke-uloge)
- [API Dokumentacija](#api-dokumentacija)
- [Doprinos](#doprinos)
- [Licenca](#licenca)

## 📝 Opis Projekta

Ovo je MERN stack aplikacija (MongoDB, Express.js, React.js, Node.js) za zakazivanje privatnih časova i konsultacija. Sistem omogućava korisnicima:

- **Pronalaženje predavača** - Pregled dostupnih predavanja i iskusnih instruktora
- **Zakazivanje termina** - Jednostavna rezervacija časova u preferiranom vremenu
- **Upravljanje terminima** - Pregled, izmena i otkazivanje zakazanih časova
- **Bezbedna plaćanja** - Podrška više načina plaćanja

## ✨ Karakteristike

### Funkcionalne karakteristike

✅ **Tri nivoa korisnika**
- **Gost**: Pregled sadržaja, redirekcija na prijavu
- **Registrovani korisnik**: Kompletan pristup zakazivanju
- **Administrator**: Upravljanje sistemom

✅ **Autentifikacija i Autorizacija**
- Registracija novih korisnika
- Sigurna prijava sa JWT tokenom
- Upravljanje sesijama

✅ **Upravljanje Zakazivanjem**
- Multi-step forma za zakazivanje
- Odabir predavanja, vremena i broja
- Fleksibilne opcije plaćanja
- Potvrda i notifikacije

✅ **Admin Panel**
- Upravljanje predmetima
- Upravljanje predavačima
- Monitoring zakazanih termina
- Statistike i izveštaji

✅ **Responzivni Dizajn**
- Desktop optimizovan
- Tablet podrška
- Mobilna verzija

## 🛠️ Tehnologije

### Frontend
- **React.js 19.2.5** - JavaScript biblioteka za UI
- **React Router v7.14.1** - Rutiranje aplikacije
- **React Bootstrap 2.10.10** - UI komponente
- **CSS3** - Stilizovanje
- **Axios** - HTTP klijent

### Backend (planiran)
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL baza podataka
- **JWT** - Autentifikacija

## 📁 Struktura Projekta

```
veb_privatnicasovi/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── cards/
│   │   │   ├── common/
│   │   │   ├── auth/
│   │   │   └── forms/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
├── backend/ (planiran)
├── .gitignore
└── README.md
```

## ⭐ Instalacija

### Preduslovi

- Node.js v14+
- npm ili yarn
- Git

### Koraci

1. **Kloniranje repozitorijuma**

```bash
git clone https://github.com/dusankk2/veb_privatnicasovi.git
cd veb_privatnicasovi
```

2. **Frontend Instalacija**

```bash
cd frontend
npm install
```

3. **Konfiguracija Okruženja**

```bash
cp .env.example .env
# Uredite .env fajl prema potrebi
```

## 🎬 Pokretanje

### Development Mode

**Frontend**

```bash
cd frontend
npm start
```

Aplicija je dostupna na: `http://localhost:3000`

**Backend** (kada je spreman)

```bash
cd backend
npm start
```

API je dostupan na: `http://localhost:5000`

### Production Build

```bash
cd frontend
npm run build
```

## 👥 Korisničke Uloge

### 1. Gost (Guest)
```
✔️  Pregled dostupnih predmeta
✔️  Pregled dostupnih predavača
✔️  Pregled osnovnih informacija
❌  Zakazivanje termina (zahteva prijavu)
```

### 2. Registrovani Korisnik (User)
```
✔️  Sve gost privilegije
✔️  Pregled svih dostupnih predmeta
✔️  Zakazivanje termina
✔️  Odabir načina plaćanja
✔️  Upravljanje vlastitim terminima
✔️  Pregled i izmena profila
```

### 3. Administrator (Admin)
```
✔️  Sve korisničke privilegije
✔️  Upravljanje predmetima (CRUD)
✔️  Upravljanje predavačima (CRUD)
✔️  Monitoring svih zakazanih termina
✔️  Pristup admin panel-u
✔️  Pregled statistike i izveštaja
```

## 📡 API Dokumentacija

### Planiran API (Backend)

#### Autentifikacija
```
POST   /api/auth/login              - Prijava korisnika
POST   /api/auth/register           - Registracija novog korisnika
POST   /api/auth/logout             - Odjava korisnika
GET    /api/auth/profile            - Pregled profila
```

#### Predmeti
```
GET    /api/subjects                - Lista svih predmeta
GET    /api/subjects/:id            - Detalji predmeta
POST   /api/subjects                - Kreiranje novog predmeta (Admin)
PUT    /api/subjects/:id            - Izmena predmeta (Admin)
DELETE /api/subjects/:id            - Brisanje predmeta (Admin)
```

#### PredavaČi
```
GET    /api/teachers                - Lista svih predavača
GET    /api/teachers/:id            - Detalji predavača
POST   /api/teachers                - Dodavanje novog predavača (Admin)
PUT    /api/teachers/:id            - Izmena predavača (Admin)
DELETE /api/teachers/:id            - Brisanje predavača (Admin)
```

#### Zakazivanja
```
GET    /api/appointments            - Moja zakazana zakazivanja
GET    /api/appointments/:id        - Detalji zakazivanja
POST   /api/appointments            - Novo zakazivanje
PUT    /api/appointments/:id        - Izmena zakazivanja
DELETE /api/appointments/:id        - Otkazivanje zakazivanja
```

#### Admin
```
GET    /api/admin/dashboard         - Dashboard podaci
GET    /api/admin/stats             - Statistika sistema
```

## 🚀 Karakteristike na Putu

- [ ] Backend API implementacija
- [ ] MongoDB integracija
- [ ] JWT autentifikacija
- [ ] Email notifikacije
- [ ] Plaćanja (Stripe/PayPal)
- [ ] Video pozivi
- [ ] Real-time chat
- [ ] Recenzije i rejtingi
- [ ] Sertifikati
- [ ] Mobile aplikacija

## 🐛 Poznati Problemi

Nema poznatih problema u ovoj verziji.

## 🤝 Doprinos

Dalje ispod opisanog procesa, molimo prijavite sve bugove, predloge ili probleme kroz [GitHub Issues](https://github.com/dusankk2/veb_privatnicasovi/issues).

### Proces doprinosa

1. Forkujte repozitorijum
2. Kreirajte feature branch (`git checkout -b feature/AmazingFeature`)
3. Commitujte izmene (`git commit -m 'Add AmazingFeature'`)
4. Push-ujte na branch (`git push origin feature/AmazingFeature`)
5. Otvorite Pull Request

## 📜 Licenca

Ovaj projekat je licenciran pod MIT licencom - vidite [LICENSE](LICENSE) fajl za detalje.

## 👤 Autor

**Dusan Kuzmanovic**

- GitHub: [@dusankk2](https://github.com/dusankk2)
- Email: sandupriv@gmail.com

## 🙏 Zahvalnice

Hvala svima koji su doprineli ovom projektu:
- React zajednica
- Bootstrap za CSS framework
- Svi autori zavisnosti koje se koriste

---

**Napomena**: Ovaj projekat je još uvek u razvoju. Backend je planiran.
