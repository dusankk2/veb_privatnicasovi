import { apiSlice } from './apiSlice';
import { PREDAVACI_URL } from '../constants';

export const predavaciApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPredavaci: builder.query({
      query: () => ({
        url: PREDAVACI_URL,
      }),
      providesTags: ['Predavac'],
      keepUnusedDataFor: 5,
    }),
    getPredavacDetails: builder.query({
      query: (id) => ({
        url: `${PREDAVACI_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createPredavac: builder.mutation({
      query: (data) => ({
        url: PREDAVACI_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Predavac'],
    }),
    updatePredavac: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${PREDAVACI_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Predavac'],
    }),
    deletePredavac: builder.mutation({
      query: (id) => ({
        url: `${PREDAVACI_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Predavac'],
    }),
  }),
});

export const {
  useGetPredavaciQuery,
  useGetPredavacDetailsQuery,
  useCreatePredavacMutation,
  useUpdatePredavacMutation,
  useDeletePredavacMutation,
} = predavaciApiSlice;
