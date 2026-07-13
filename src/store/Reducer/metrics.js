import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const metricsApi = createApi({
    reducerPath: "metrics",
    baseQuery: createCustomFetchBaseQuery(),
    tagTypes: ['Metrics'],
    endpoints: (builder) => ({

        getAllMetrics: builder.query({
            query: ({ pageno, search }) => ({
                url: `api/admin/metrics?pageno=${pageno}&search=${search}`,
                method: "GET",
                transformResponse: (res) => res,
            }),
            providesTags: ['Metrics'],
        }),

        getMetricById: builder.query({
            query: (id) => `api/admin/metrics/${id}`,
            providesTags: ['Metrics'],
        }),

        getMetricValues: builder.query({
            query: ({ id, pageno }) => ({
                url: `api/admin/metrics/${id}/values?pageno=${pageno}`,
                method: "GET",
                transformResponse: (res) => res,
            }),
            providesTags: ['Metrics'],
        }),

        addNewMetric: builder.mutation({
            query: (newMetric) => ({
                url: `api/admin/metrics`,
                method: "POST",
                body: newMetric,
            }),
            invalidatesTags: ['Metrics'],
        }),

        updateMetric: builder.mutation({
            query: ({ id, data }) => ({
                url: `api/admin/metrics/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ['Metrics'],
        }),

    }),
});

export const {
    useGetAllMetricsQuery,
    useGetMetricByIdQuery,
    useGetMetricValuesQuery,
    useAddNewMetricMutation,
    useUpdateMetricMutation,
} = metricsApi;
