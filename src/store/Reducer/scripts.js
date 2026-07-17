import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const scriptsApi = createApi({
    reducerPath: "scripts",
    baseQuery: createCustomFetchBaseQuery(),
    tagTypes: ['Scripts'],
    endpoints: (builder) => ({

        getAllScripts: builder.query({
            query: ({ pageno, search }) => ({
                url: `/api/admin/scripts?pageno=${pageno}&search=${search}`,
                method: "GET",
                transformResponse: (res) => res,
            }),
            providesTags: ['Scripts'],
        }),

        getScriptById: builder.query({
            query: (id) => `/api/admin/scripts/${id}`,
            providesTags: ['Scripts'],
        }),

        getScriptLogs: builder.query({
            query: ({ id, pageno }) => ({
                url: `/api/admin/scripts/${id}/logs?pageno=${pageno}`,
                method: "GET",
                transformResponse: (res) => res,
            }),
            providesTags: ['Scripts'],
        }),

        addNewScript: builder.mutation({
            query: (newScript) => ({
                url: `/api/admin/scripts`,
                method: "POST",
                body: newScript,
            }),
            invalidatesTags: ['Scripts'],
        }),

        updateScript: builder.mutation({
            query: ({ id, data }) => ({
                url: `/api/admin/scripts/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ['Scripts'],
        }),

        deleteScript: builder.mutation({
            query: (id) => ({
                url: `/api/admin/scripts/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Scripts'],
        }),

    }),
});

export const {
    useGetAllScriptsQuery,
    useGetScriptByIdQuery,
    useGetScriptLogsQuery,
    useAddNewScriptMutation,
    useUpdateScriptMutation,
    useDeleteScriptMutation,
} = scriptsApi;
