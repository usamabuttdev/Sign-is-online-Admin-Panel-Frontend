import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const dashboardApi = createApi({
  reducerPath: "dashboard",
  baseQuery: createCustomFetchBaseQuery(),
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => ({
        url: `/api/admin/dashboard`,  // Assuming `/dashboard` is the endpoint for your dashboard data
        method: "GET",
      }),
      providesTags: ['Dashboard'], 
      transformResponse:(res)=>res.data, 
    }),
    getUserStats: builder.query({
      query: (year) => ({
        url: `/api/admin/user-stats-by-region?year=${year}`, 
        method: "GET",
      }),
      providesTags: ['Dashboard'], 
      transformResponse:(res)=>res.data, 
    }),
  }),
});

export const {
  useGetDashboardDataQuery,  // Hook for fetching the dashboard data,
  useGetUserStatsQuery,  // Hook for fetching user statistics by year
} = dashboardApi;
