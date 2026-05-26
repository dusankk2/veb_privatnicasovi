// API Configuration
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
  },
  // Subjects
  SUBJECTS: {
    LIST: '/subjects',
    DETAIL: '/subjects/:id',
    CREATE: '/subjects',
    UPDATE: '/subjects/:id',
    DELETE: '/subjects/:id',
  },
  // Teachers
  TEACHERS: {
    LIST: '/teachers',
    DETAIL: '/teachers/:id',
    CREATE: '/teachers',
    UPDATE: '/teachers/:id',
    DELETE: '/teachers/:id',
  },
  // Appointments
  APPOINTMENTS: {
    LIST: '/appointments',
    MY_APPOINTMENTS: '/appointments/my',
    DETAIL: '/appointments/:id',
    CREATE: '/appointments',
    UPDATE: '/appointments/:id',
    CANCEL: '/appointments/:id/cancel',
  },
  // Admin
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    STATS: '/admin/stats',
  },
};

// Error Messages
export const ERROR_MESSAGES = {
  AUTH_REQUIRED: 'Morate biti prijavljeni za pristup ovoj stranici',
  UNAUTHORIZED: 'Nemate dozvolu za ovu akciju',
  NOT_FOUND: 'Resurs nije pronađen',
  SERVER_ERROR: 'Greška na serveru. Pokušajte kasnije.',
  NETWORK_ERROR: 'Greška u mrežnoj konekciji',
  VALIDATION_ERROR: 'Proverite da ste dobro popunili sve polje',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Uspešno ste se prijavili',
  REGISTER_SUCCESS: 'Registracija je uspešna. Sada se možete prijaviti.',
  APPOINTMENT_BOOKED: 'Termin je uspešno rezervisan',
  PROFILE_UPDATED: 'Profil je uspešno ažuriran',
  APPOINTMENT_CANCELLED: 'Termin je otkazan',
};
