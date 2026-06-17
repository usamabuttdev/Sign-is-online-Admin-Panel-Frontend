import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const contactApi = createApi({
    reducerPath: "contact",
    baseQuery: createCustomFetchBaseQuery(),
    tagTypes: ['Contact'],
    endpoints: (builder) => ({
        getAllContactUs: builder.query({
            query: ({ status, pageno, keyword, limit }) => ({
                url: `/admin/contact-us?${status ? `status=${status}&` : ''}page=${pageno + 1}&keyword=${keyword}&limit=${limit}`,
                method: "GET",
            }),
            transformResponse: (res) => ({
                data: res.data,
                requestsCount: res.meta.requestsCount,
                total_length: res.data.length > 0 ? res.meta.totalRecords : 0,
            }),
            providesTags: ['Contact'],
        }),

        replyContactUsQuery: builder.mutation({
            query: (newFaq) => ({
                url: `/communications/send-email-brevo`,
                method: "POST",
                body: newFaq,
            }),
            invalidatesTags: ['Contact'],
        }),

        updateContactUs: builder.mutation({
            query: ({ _id, data }) => ({
                url: `/admin/contact-us/${_id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Contact'],
        }),

        deleteContactUs: builder.mutation({
            query: (_id) => ({
                url: `/admin/contact-us/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Contact'],
        }),

    }),
});

export const {
    useGetAllContactUsQuery,
    useReplyContactUsQueryMutation,
    useUpdateContactUsMutation,
    useDeleteContactUsMutation
} = contactApi;