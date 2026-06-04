import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const trainingModeApi = createApi({
  reducerPath: "trainingModes",
  baseQuery: createCustomFetchBaseQuery(),
  endpoints: (builder) => ({
    getAllTrainingModes: builder.query({
      query: ({ page, limit, keyword, isActive }) => {
        let url = `/training-modes?page=${page}&limit=${limit}`; 
        if (keyword) {
          url += `&keyword=${keyword}`;
        }
        if (typeof isActive === 'boolean') {
          url += `&isActive=${isActive}`;
        }
        return {
          url:url,
          method: 'GET',
        };
      },
      providesTags: ['TrainingModes'],
    }),
    

    addTrainingMode: builder.mutation({
      query: (newTrainingMode) => ({
        url: `/training-modes`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newTrainingMode,
      }),
      invalidatesTags: ['TrainingModes'],
    }),

    updateTrainingMode: builder.mutation({
      query: ({ id, updatedTrainingMode }) => ({
        url: `/training-modes/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: updatedTrainingMode,
      }),
      invalidatesTags: ['TrainingModes'],
    }),

    deleteTrainingMode: builder.mutation({
      query: (id) => ({
        url: `/training-modes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['TrainingModes'],
    }),
  }),
});

export const {
  useGetAllTrainingModesQuery,
  useAddTrainingModeMutation,
  useUpdateTrainingModeMutation,
  useDeleteTrainingModeMutation,
} = trainingModeApi;
