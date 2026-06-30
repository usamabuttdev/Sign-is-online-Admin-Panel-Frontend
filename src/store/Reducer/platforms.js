import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const platformsApi = createApi({
  reducerPath: "platforms",
  tagTypes: ['Platforms'],
  baseQuery: createCustomFetchBaseQuery(),
  endpoints: (builder) => ({
    getAllPlatforms: builder.query({
      query: ({ pageno, search }) => ({
        url: `/api/admin/platforms?pageno=${pageno}&search=${search}`,
        method: "GET",
      }),
      providesTags: ['Platforms'],
      transformResponse: (res) => res,
    }),
    getPlatformById: builder.query({
      query: (id) => ({
        url: `/api/admin/platforms/${id}`,
        method: "GET",
      }),
      transformResponse: (res) => res,
    }),
  }),
});

export const {
  useGetAllPlatformsQuery,
  useGetPlatformByIdQuery,
} = platformsApi;
