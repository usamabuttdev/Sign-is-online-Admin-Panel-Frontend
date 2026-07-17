import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const trainerApi = createApi({
  reducerPath: "trainers",
  baseQuery: createCustomFetchBaseQuery(),
  tagTypes: ['Trainers'],
  endpoints: (builder) => ({
    getAllTrainers: builder.query({
      query: ({ pageno, search }) => ({
        url: `/api/admin/trainers?pageno=${pageno}&search=${search}`,
        method: "GET",
        transformResponse: (res) => res,
      }),
      providesTags: ['Trainers'],
    }),
    getTrainerById: builder.query({
      query: (id) => `/api/admin/trainers/${id}`,
      providesTags: ['Trainers'],
    }),
    addNewTrainer: builder.mutation({
      query: (newTrainer) => ({ url: `/api/admin/trainers`, method: "POST", body: newTrainer }),
      invalidatesTags: ['Trainers'],
    }),
    updateTrainer: builder.mutation({
      query: ({ id, data }) => ({ url: `/api/admin/trainers/${id}`, method: "PUT", body: data }),
      invalidatesTags: ['Trainers'],
    }),
  }),
});

export const { useGetAllTrainersQuery, useGetTrainerByIdQuery, useAddNewTrainerMutation, useUpdateTrainerMutation } = trainerApi;
