import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const accountsApi = createApi({
  reducerPath: "accounts",
  tagTypes: ['Accounts'],
  baseQuery: createCustomFetchBaseQuery(),
  endpoints: (builder) => ({
    getAllAccounts: builder.query({
      query: ({ pageno, search }) => ({
        url: `/api/admin/accounts?pageno=${pageno}&search=${search}`,
        method: "GET",
      }),
      providesTags: ['Accounts'],
      transformResponse: (res) => res,
    }),
    getAccountById: builder.query({
      query: (id) => ({
        url: `/api/admin/accounts/${id}`,
        method: "GET",
      }),
      transformResponse: (res) => res,
    }),
  }),
});

export const {
  useGetAllAccountsQuery,
  useGetAccountByIdQuery,
} = accountsApi;
