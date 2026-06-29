import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const chargesApi = createApi({
  reducerPath: "charges",
  tagTypes: ['Charges'],
  baseQuery: createCustomFetchBaseQuery(),
  endpoints: (builder) => ({
    getAllCharges: builder.query({
      query: ({ pageno, search }) => ({
        url: `/api/admin/charges?pageno=${pageno}&search=${search}`,
        method: "GET",
      }),
      providesTags: ['Charges'],
      transformResponse: (res) => res,
    }),
    getChargeById: builder.query({
      query: (id) => ({
        url: `/api/admin/charges/${id}`,
        method: "GET",
      }),
      transformResponse: (res) => res,
    }),
  }),
});

export const {
  useGetAllChargesQuery,
  useGetChargeByIdQuery,
} = chargesApi;
