import { apiSlice } from './apiSlice';
import { TERMINI_URL } from '../constants';

export const terminiApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMojiTermini: builder.query({
      query: () => ({
        url: `${TERMINI_URL}/moji`,
      }),
      providesTags: ['Termin'],
      keepUnusedDataFor: 5,
    }),
    getTermini: builder.query({
      query: () => ({
        url: TERMINI_URL,
      }),
      providesTags: ['Termin'],
      keepUnusedDataFor: 5,
    }),
    getDostupniTermini: builder.query({
      query: (predavacId) => ({
        url: `${TERMINI_URL}/dostupni/${predavacId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createTermin: builder.mutation({
      query: (data) => ({
        url: TERMINI_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Termin', 'Predavac'],
    }),
    updateTerminStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `${TERMINI_URL}/${id}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Termin'],
    }),
    deleteTermin: builder.mutation({
      query: (id) => ({
        url: `${TERMINI_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Termin'],
    }),
  }),
});

export const {
  useGetMojiTerminiQuery,
  useGetTerminiQuery,
  useGetDostupniTerminiQuery,
  useCreateTerminMutation,
  useUpdateTerminStatusMutation,
  useDeleteTerminMutation,
} = terminiApiSlice;
