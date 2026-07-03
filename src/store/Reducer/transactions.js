import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const transactionApi = createApi({
  reducerPath: "transactions",
  baseQuery: createCustomFetchBaseQuery(),
  endpoints: (builder) => ({
    getAllTransactions: builder.query({
      query: ({ pageno, search }) => {
        const searchParam = search ? `&search=${search}` : "";
        return {
          url: `/transactions?pageno=${pageno}${searchParam}`,
          method: "GET",
        };
      },
      providesTags: ['Transactions'],
    }),
  }),
});

export const {
  useGetAllTransactionsQuery,
} = transactionApi;
