import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const metricsApi = createApi({
  reducerPath: "metrics",
  tagTypes: ['Metrics'],
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
  }),
});

export const {
  useGetAllMetricsQuery,
} = metricsApi;
