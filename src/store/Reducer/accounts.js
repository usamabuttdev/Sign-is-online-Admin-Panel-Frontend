import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const accountsApi = createApi({
    reducerPath: "accounts",
    baseQuery: createCustomFetchBaseQuery(),
    tagTypes: ['Accounts'],
    endpoints: (builder) => ({

        getAllAccounts: builder.query({
            query: ({ pageno, search }) => ({
                url: `/api/admin/accounts?pageno=${pageno}&search=${search}`,
                method: "GET",
                transformResponse: (res) => res,
            }),
            providesTags: ['Accounts'],
        }),

        getAccountById: builder.query({
            query: (id) => `/api/admin/accounts/${id}`,
            providesTags: ['Accounts'],
        }),

        addNewAccount: builder.mutation({
            query: (newAccount) => ({
                url: `/api/admin/accounts`,
                method: "POST",
                body: newAccount,
            }),
            invalidatesTags: ['Accounts'],
        }),

        updateAccount: builder.mutation({
            query: ({ id, data }) => ({
                url: `/api/admin/accounts/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ['Accounts'],
        }),

        deleteAccount: builder.mutation({
            query: (id) => ({
                url: `/api/admin/accounts/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Accounts'],
        }),

    }),
});

export const {
    useGetAllAccountsQuery,
    useGetAccountByIdQuery,
    useAddNewAccountMutation,
    useUpdateAccountMutation,
    useDeleteAccountMutation,
} = accountsApi;
