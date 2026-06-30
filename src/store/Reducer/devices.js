import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const devicesApi = createApi({
  reducerPath: "devices",
  tagTypes: ['Devices'],
  baseQuery: createCustomFetchBaseQuery(),
  endpoints: (builder) => ({
    getAllDevices: builder.query({
      query: ({ pageno, search }) => ({
        url: `/api/admin/devices?pageno=${pageno}&search=${search}`,
        method: "GET",
      }),
      providesTags: ['Devices'],
      transformResponse: (res) => res,
    }),
  }),
});

export const {
  useGetAllDevicesQuery,
} = devicesApi;
