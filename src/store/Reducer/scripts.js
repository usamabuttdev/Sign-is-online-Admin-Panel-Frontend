import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const scriptsApi = createApi({
  reducerPath: "scripts",
  tagTypes: ['Scripts', 'ScriptLogs'],
  baseQuery: createCustomFetchBaseQuery(),
  endpoints: (builder) => ({
    getAllScripts: builder.query({
      query: ({ pageno, search }) => ({
        url: `/api/admin/scripts?pageno=${pageno}&search=${search}`,
        method: "GET",
      }),
      providesTags: ['Scripts'],
      transformResponse: (res) => res,
    }),
    getScriptById: builder.query({
      query: (id) => ({
        url: `/api/admin/scripts/${id}`,
        method: "GET",
      }),
      transformResponse: (res) => res,
    }),
    getScriptLogs: builder.query({
      query: ({ id, pageno }) => ({
        url: `/api/admin/scripts/${id}/logs?pageno=${pageno}`,
        method: "GET",
      }),
      providesTags: ['ScriptLogs'],
      transformResponse: (res) => res,
    }),
  }),
});

export const {
  useGetAllScriptsQuery,
  useGetScriptByIdQuery,
  useGetScriptLogsQuery,
} = scriptsApi;
