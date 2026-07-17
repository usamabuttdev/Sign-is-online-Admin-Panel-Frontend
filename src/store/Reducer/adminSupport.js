import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const adminSupportApi = createApi({
    reducerPath: "support",
    baseQuery: createCustomFetchBaseQuery(),
    tagTypes: ['Support'],
    endpoints: (builder) => ({

        getAllSupportQueries: builder.query({
            query: ({ status, pageno, keyword, limit }) => ({
                url: `/api/admin/support-requests?${status ? `status=${status}&` : ''}page=${pageno + 1}&keyword=${keyword}&limit=${limit}`,
                method: "GET",
            }),
            transformResponse: (res) => ({
                data: res.data,
                requestsCount: res.meta.requestsCount,
                total_length: res.data.length > 0 ? res.meta.totalRecords : 0,
            }),
            providesTags: ['Support'],
        }),

        replySupportQuery: builder.mutation({
            query: (newFaq) => ({
                url: `/communications/send-email-brevo`,
                method: "POST",
                body: newFaq,
            }),
            invalidatesTags: ['Support'],
        }),

        updateSupportQueryStatus: builder.mutation({
            query: ({ _id, data }) => ({
                url: `/api/admin/support-requests/${_id}`,
                method: 'PUT',
                body: data,
            }),
            transformResponse: (res) => res,
            invalidatesTags: ['Support'],
        }),

        deleteSupportQuery: builder.mutation({
            query: (_id) => ({
                url: `/api/admin/support-requests/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Support'],
        }),

    }),
});

export const {
    useGetAllSupportQueriesQuery,
    useReplySupportQueryMutation,
    useUpdateSupportQueryStatusMutation,
    useDeleteSupportQueryMutation
} = adminSupportApi;