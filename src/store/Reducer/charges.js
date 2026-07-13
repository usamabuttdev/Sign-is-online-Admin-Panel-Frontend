import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const chargesApi = createApi({
    reducerPath: "charges",
    baseQuery: createCustomFetchBaseQuery(),
    tagTypes: ['Charges'],
    endpoints: (builder) => ({

        getAllCharges: builder.query({
            query: ({ pageno, search }) => ({
                url: `api/admin/charges?pageno=${pageno}&search=${search}`,
                method: "GET",
                transformResponse: (res) => res,
            }),
            providesTags: ['Charges'],
        }),

        getChargeById: builder.query({
            query: (id) => `api/admin/charges/${id}`,
            providesTags: ['Charges'],
        }),

        addNewCharge: builder.mutation({
            query: (newCharge) => ({
                url: `api/admin/charges`,
                method: "POST",
                body: newCharge,
            }),
            invalidatesTags: ['Charges'],
        }),

        updateCharge: builder.mutation({
            query: ({ id, data }) => ({
                url: `api/admin/charges/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ['Charges'],
        }),

    }),
});

export const {
    useGetAllChargesQuery,
    useGetChargeByIdQuery,
    useAddNewChargeMutation,
    useUpdateChargeMutation,
} = chargesApi;
