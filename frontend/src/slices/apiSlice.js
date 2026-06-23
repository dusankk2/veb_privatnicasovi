import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // Ako token postoji u auth state-u, dodaj ga u headers
    const token = getState().auth?.userInfo?.token || localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Predmet', 'Predavac', 'Termin', 'User'],
  endpoints: (builder) => ({}),
});
