import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: createCustomFetchBaseQuery(),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: ({ pageno, search }) => ({
        url: `/api/admin/products?pageno=${pageno}&search=${search || ""}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (id) => `/api/admin/products/${id}`,
      transformResponse: (res) => res.data,
      providesTags: ["Products"],
    }),
    addNewProduct: builder.mutation({
      query: (newProduct) => ({
        url: `/api/admin/products`,
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/admin/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/admin/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetProductByIdQuery,
  useAddNewProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
