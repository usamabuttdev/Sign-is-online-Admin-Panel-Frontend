import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const productsApi = createApi({
  reducerPath: "products",
  tagTypes: ['Products'],
  baseQuery: createCustomFetchBaseQuery(),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ pageno, search }) => ({
        url: `/api/admin/products?pageno=${pageno}&search=${search}`,
        method: "GET",
      }),
      providesTags: ['Products'],
      transformResponse: (res) => res,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
} = productsApi;
