import { apiSlice } from './apiSlice';
import { PREDMETI_URL } from '../constants';

export const predmetiApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPredmeti: builder.query({
      query: () => ({
        url: PREDMETI_URL,
      }),
      providesTags: ['Predmet'],
      keepUnusedDataFor: 5,
    }),
    getPredmetDetails: builder.query({
      query: (id) => ({
        url: `${PREDMETI_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createPredmet: builder.mutation({
      query: (data) => ({
        url: PREDMETI_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Predmet'],
    }),
    updatePredmet: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${PREDMETI_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Predmet'],
    }),
    deletePredmet: builder.mutation({
      query: (id) => ({
        url: `${PREDMETI_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Predmet'],
    }),
  }),
});

export const {
  useGetPredmetiQuery,
  useGetPredmetDetailsQuery,
  useCreatePredmetMutation,
  useUpdatePredmetMutation,
  useDeletePredmetMutation,
} = predmetiApiSlice;
