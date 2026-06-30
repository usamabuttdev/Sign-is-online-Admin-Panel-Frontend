import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const metricsApi = createApi({
  reducerPath: "metrics",
  tagTypes: ['Metrics', 'MetricValues'],
  baseQuery: createCustomFetchBaseQuery(),
  endpoints: (builder) => ({
    getAllMetrics: builder.query({
      query: ({ pageno, search }) => ({
        url: `/api/admin/metrics?pageno=${pageno}&search=${search}`,
        method: "GET",
      }),
      providesTags: ['Metrics'],
      transformResponse: (res) => res,
    }),
    getMetricById: builder.query({
      query: (id) => ({
        url: `/api/admin/metrics/${id}`,
        method: "GET",
      }),
      transformResponse: (res) => res,
    }),
    getMetricValues: builder.query({
      query: ({ id, pageno }) => ({
        url: `/api/admin/metrics/${id}/values?pageno=${pageno}`,
        method: "GET",
      }),
      providesTags: ['MetricValues'],
      transformResponse: (res) => res,
    }),
  }),
});

export const {
  useGetAllMetricsQuery,
  useGetMetricByIdQuery,
  useGetMetricValuesQuery,
} = metricsApi;
