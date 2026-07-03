import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const trainerApi = createApi({
  reducerPath: "trainers",
  baseQuery: createCustomFetchBaseQuery(),
  endpoints: (builder) => ({
    getAllTrainers: builder.query({
      query: ({ pageno, search }) => ({
        url: `/api/admin/trainers?pageno=${pageno}&search=${search}`,
        method: "GET",
        transformResponse: (res) => res,
      }),
      providesTags: ['Trainers'], // Provides 'Trainers' tag for caching
    }),

    getTrainerById: builder.query({
      query: (id) => `/trainers/${id}`,
      providesTags: ['Trainer'], // Provides 'Trainer' tag for each individual trainer
    }),
    
    updateTrainer: builder.mutation({
      query: ({ id, updatedTrainer }) => ({
        url: `/trainers/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: updatedTrainer,
      }),
      invalidatesTags: ['Trainers'], // Invalidates the 'Trainers' tag, triggering a refetch for all trainers
    }),
  }),
});

export const {
  useGetAllTrainersQuery,
  useGetTrainerByIdQuery,
  useUpdateTrainerMutation,
} = trainerApi;
