import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const specializationApi = createApi({
  reducerPath: "specializations",
  baseQuery: createCustomFetchBaseQuery(),
  endpoints: (builder) => ({
    getAllSpecializations: builder.query({
      query: ({ page , limit   , keyword ,isActive }) => {
        let url = `/specializations?page=${page}&limit=${limit}`; 
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
      transformResponse: (res) => res,
      providesTags: ['Specializations'],
    }),

    addSpecialization: builder.mutation({
      query: (newSpecialization) => ({
        url: `/specializations`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newSpecialization,
      }),
      invalidatesTags: ['Specializations'],
    }),

    updateSpecialization: builder.mutation({
      query: ({ id, updatedSpecialization }) => ({
        url: `/specializations/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: updatedSpecialization,
      }),
      invalidatesTags: ['Specializations'],
    }),

    deleteSpecialization: builder.mutation({
      query: (id) => ({
        url: `/specializations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Specializations'],
    }),
  }),
});

export const {
  useGetAllSpecializationsQuery,
  useAddSpecializationMutation,
  useUpdateSpecializationMutation,
  useDeleteSpecializationMutation,
} = specializationApi;
