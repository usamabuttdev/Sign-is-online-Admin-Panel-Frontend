import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const historyApi = createApi({
  reducerPath: "history",
  tagTypes: ['History'],
  baseQuery: createCustomFetchBaseQuery(),
  endpoints: (builder) => ({
    getAllHistory: builder.query({
      query: ({ pageno, search }) => ({
        url: `/api/admin/history?pageno=${pageno}&search=${search}`,
        method: "GET",
      }),
      providesTags: ['History'],
      transformResponse: (res) => res,
    }),
  }),
});

export const {
  useGetAllHistoryQuery,
} = historyApi;
