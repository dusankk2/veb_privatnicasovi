# Sistem za Zakazivanje Privatnih Časova - Frontend

## Opis

Frontend dio web aplikacije koja simulira rad online sistema za zakazivanje termina za privatne časove i konsultacije sa predavačima.

## Karakteristike

### Tri tipa korisnika:

1. **Gost (Guest)**
   - Pregled dostupnih predmeta i predavača
   - Pregled osnovnih informacija o terminima
   - Redirekcija na prijavu/registraciju za zakazivanje

2. **Registrovani korisnik (User)**
   - Pregled svih dostupnih predmeta
   - Odabir predavača
   - Zakazivanje termina
   - Odabir načina plaćanja
   - Upravljanje vlastitim terminima
   - Pregled i ažuriranje profila

3. **Administrator (Admin)**
   - Upravljanje predmetima (dodavanje, izmena, brisanje)
   - Upravljanje predavačima (dodavanje, izmena, brisanje)
   - Pregled i organizacija zakazanih termina
   - Pristup admin panel-u

## Tehnologije

- **React.js** 19.2.5
- **React Router** v7.14.1 - Za rutiranje
- **React Bootstrap** 2.10.10 - Za komponente UI-a
- **React Icons** 5.6.0 - Za ikonice
- **React Toastify** 11.1.0 - Za notifikacije
- **Axios** 1.16.0 - Za HTTP zahteve
- **CSS3** - Za stilizovanje

## Instalacija

### Preduslovi

- Node.js (v14 ili više)
- npm ili yarn

### Koraci

1. Klonirajte repozitorijum:

```bash
git clone https://github.com/dusankk2/veb_privatnicasovi.git
cd veb_privatnicasovi/frontend
```

2. Instalirajte zavisnosti:

```bash
npm install
```

3. Kreirajte `.env` fajl u root direktorijumu frontend-a:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Pokrenite development server:

```bash
npm start
```

Aplikacija će se otvoriti na `http://localhost:3000`

## Struktura Projekta

```
frontend/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── cards/
│   │   │   ├── SubjectCard.jsx
│   │   │   └── TeacherCard.jsx
│   │   ├── common/
│   │   │   ├── Loader.jsx
│   │   │   ├── Message.jsx
│   │   │   └── CheckoutSteps.jsx
│   │   ├── auth/
│   │   │   └── PrivateRoute.jsx
│   │   └── forms/
│   │       └── FormContainer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Booking.jsx
│   │   ├── Profile.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── MyAppointments.jsx
│   │   └── NotFound.jsx
│   ├── context/
│   │   └── AuthContext.js
│   ├── utils/
│   │   ├── api.js
│   │   └── helpers.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   ├── constants.js
│   └── store.js
├── package.json
├── package-lock.json
└── README.md
```

## Stranice i Rute

| Ruta | Komponenta | Pristup | Opis |
|------|-----------|--------|------|
| `/` | Home | Svi | Početna stranica |
| `/login` | Login | Svi | Prijava korisnika |
| `/register` | Register | Svi | Registracija novog korisnika |
| `/booking/:subjectId` | Booking | Registrovani | Zakazivanje Časa |
| `/profile` | Profile | Registrovani | Profil korisnika |
| `/admin` | AdminDashboard | Admin | Admin panel |
| `/my-appointments` | MyAppointments | Registrovani | Moji zakazani termini |
| `*` | NotFound | Svi | 404 stranica |

## Autentifikacija

Aplicija koristi **AuthContext** za upravljanje autentifikacijom:

- Token se čuva u `localStorage` 
- Korisničke informacije su dostupne kroz `useAuth()` hook
- `PrivateRoute` komponenta štića privatne stranice

## Komunikacija sa Backend-om

### API Endpoints (planiran)

```
POST   /api/auth/login          - Prijava
POST   /api/auth/register       - Registracija
GET    /api/subjects            - Lista predmeta
GET    /api/teachers            - Lista predavača
GET    /api/appointments        - Moji termini
POST   /api/appointments        - Kreiranje termina
GET    /api/admin/dashboard     - Admin panel podaci
```

## Development

### Dostupne komande

```bash
# Pokretanje development servera
npm start

# Pravljenje production build-a
npm run build

# Pokretanje testova
npm test

# Eject (ne preporučuje se)
npm run eject
```

## CSS Stilizovanje

Aplicija koristi:
- **CSS3** sa media queries za responzivni dizajn
- **CSS Grid** i **Flexbox** za layout
- **CSS Variables** za teme i boje
- **Transitions** i **Animations** za interaktivnost

## Boje i Tema

- **Primarnią boja**: #007bff (Plava)
- **Sekundarna boja**: #667eea (Svetloplava)
- **Uspeh**: #28a745 (Zelena)
- **Greška**: #dc3545 (Crvena)
- **Upozorenje**: #ffc107 (Zuta)
- **Pozadina**: #f5f5f5 (Svetlosiva)

## Responzivni Dizajn

Aplicija je optimizovana za:
- Desktop računare (1024px i više)
- Tablete (768px - 1023px)
- Mobilne uređaje (manje od 768px)

## Poznati Problemi

Nema poznatih problema u ovoj verziji.

## Buduća Poboljšanja

- [ ] Integracija sa backend API-jem
- [ ] Implementacija Redux-a za kompleksnije stanje
- [ ] Dodavanje unit testova
- [ ] Dodavanje end-to-end testova
- [ ] Implementacija chat-a sa predavačima
- [ ] Dodavanje video poziva
- [ ] Notifikacije u realnom vremenu
- [ ] PWA (Progressive Web App) podrška

## Doprinos

Za doprinos projektu, molimo:

1. Forkujte repozitorijum
2. Kreirajte branch za vašu funkcionalnost (`git checkout -b feature/AmazingFeature`)
3. Commitujte vaše izmene (`git commit -m 'Add some AmazingFeature'`)
4. Push-ujte na branch (`git push origin feature/AmazingFeature`)
5. Otvorite Pull Request

## Licenca

MIT

## Kontakt

- **Autor**: Dusan Kuzmanovic
- **GitHub**: [@dusankk2](https://github.com/dusankk2)

## Zahvalnice

- React zajednica
- Bootstrap za CSS framework
- Sve zajednice koje su doprinele zavisnostima
