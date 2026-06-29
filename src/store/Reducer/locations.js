import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const locationsApi = createApi({
  reducerPath: "locations",
  tagTypes: ['Locations'],
  baseQuery: createCustomFetchBaseQuery(),
  endpoints: (builder) => ({
    getAllLocations: builder.query({
      query: ({ pageno, search }) => ({
        url: `/api/admin/locations?pageno=${pageno}&search=${search}`,
        method: "GET",
      }),
      providesTags: ['Locations'],
      transformResponse: (res) => res,
    }),
    getLocationById: builder.query({
      query: (id) => ({
        url: `/api/admin/locations/${id}`,
        method: "GET",
      }),
      transformResponse: (res) => res,
    }),
  }),
});

export const {
  useGetAllLocationsQuery,
  useGetLocationByIdQuery,
} = locationsApi;
