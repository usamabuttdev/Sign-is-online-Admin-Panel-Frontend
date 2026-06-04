import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
let token="";
// Define a function that returns a configured fetchBaseQuery with token implementation
export const createCustomFetchBaseQuery = ( headers) => fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (defaultHeaders, { getState }) => {
      // Merge default headers with provided headers
      const mergedHeaders = {
        ...defaultHeaders,
        ...headers,
      };
      
      // Add token to headers if available
      if (token) {
        mergedHeaders.Authorization = `Bearer ${token}`;
      }

      return mergedHeaders;
    },
  });