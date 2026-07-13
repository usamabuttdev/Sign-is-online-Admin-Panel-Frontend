import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const platformsApi = createApi({
  reducerPath: "platforms",
  baseQuery: createCustomFetchBaseQuery(),
  tagTypes: ["Platforms", "Platform"],
  endpoints: (builder) => ({
    getAllPlatforms: builder.query({
      query: ({ pageno = 1, search = "" }) => ({
        url: `api/admin/platforms?pageno=${pageno}&search=${search}`,
        method: "GET",
      }),
      transformResponse: (res) => res,
      providesTags: ["Platforms"],
    }),

    getPlatformById: builder.query({
      query: (id) => `api/admin/platforms/${id}`,
      transformResponse: (res) => res,
      providesTags: (result, error, id) => [{ type: "Platform", id }],
    }),

    addNewPlatform: builder.mutation({
      query: (newPlatform) => ({
        url: `api/admin/platforms`,
        method: "POST",
        body: newPlatform,
      }),
      invalidatesTags: ["Platforms"],
    }),

    updatePlatform: builder.mutation({
      query: ({ id, data }) => ({
        url: `api/admin/platforms/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Platforms", "Platform"],
    }),
  }),
});

export const {
  useGetAllPlatformsQuery,
  useGetPlatformByIdQuery,
  useAddNewPlatformMutation,
  useUpdatePlatformMutation,
} = platformsApi;
