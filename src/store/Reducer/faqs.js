import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const FaqsApi = createApi({
    reducerPath: "faqs",
    baseQuery: createCustomFetchBaseQuery(),
    tagTypes: ['Faqs'],
    endpoints: (builder) => ({

        getAllHomeFaqs: builder.query({
            query: () => ({
                url: `settings/faqs`,
                method: "GET",
                transformResponse: (res) => ({
                    data: res.data,
                    total_length: res.data.length > 0 ? res.meta.totalRecords : 0,
                }),
            }),
            providesTags: ['Faqs'],
        }),

        getAllFaqs: builder.query({
            query: () => ({
                url: `admin/faqs`,
                method: "GET",
                transformResponse: (res) => ({
                    data: res.data,
                    total_length: res.data.length > 0 ? res.meta.totalRecords : 0,
                }),
            }),
            providesTags: ['Faqs'],
        }),

        addNewFaq: builder.mutation({
            query: (newFaq) => ({
                url: `admin/faqs`,
                method: "POST",
                body: newFaq,
            }),
            invalidatesTags: ['Faqs'],
        }),

        updateFaq: builder.mutation({
            query: ({ _id, data }) => ({
                url: `/admin/faqs/${_id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Faqs'],
        }),

        deleteFaq: builder.mutation({
            query: (_id) => ({
                url: `/admin/faqs/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Faqs'],
        }),

    }),
});

export const {
    useGetAllHomeFaqsQuery,
    useGetAllFaqsQuery,
    useAddNewFaqMutation,
    useUpdateFaqMutation,
    useDeleteFaqMutation
} = FaqsApi;