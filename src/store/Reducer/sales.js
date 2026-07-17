import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const salesApi = createApi({
    reducerPath: "sales",
    baseQuery: createCustomFetchBaseQuery(),
    tagTypes: ['Sales'],
    endpoints: (builder) => ({

        getAllSales: builder.query({
            query: () => ({
                url: `/api/admin/sales`,
                method: "GET",
                transformResponse: (res) => res,
            }),
            providesTags: ['Sales'],
        }),

        getSaleById: builder.query({
            query: (id) => `/api/admin/sales/${id}`,
            providesTags: ['Sales'],
        }),

        getSalesByProduct: builder.query({
            query: (productId) => `/api/admin/sales/product/${productId}`,
            providesTags: ['Sales'],
        }),

        addNewSale: builder.mutation({
            query: (newSale) => ({
                url: `/api/admin/sales`,
                method: "POST",
                body: newSale,
            }),
            invalidatesTags: ['Sales'],
        }),

        updateSale: builder.mutation({
            query: ({ id, data }) => ({
                url: `/api/admin/sales/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ['Sales'],
        }),

    }),
});

export const {
    useGetAllSalesQuery,
    useGetSaleByIdQuery,
    useGetSalesByProductQuery,
    useAddNewSaleMutation,
    useUpdateSaleMutation,
} = salesApi;
