import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const apisApi = createApi({
    reducerPath: "apis",
    baseQuery: createCustomFetchBaseQuery(),
    tagTypes: ['Apis'],
    endpoints: (builder) => ({

        getAllApis: builder.query({
            query: ({ pageno, search }) => ({
                url: `/api/admin/apis?pageno=${pageno}&search=${search}`,
                method: "GET",
                transformResponse: (res) => res,
            }),
            providesTags: ['Apis'],
        }),

        getApiById: builder.query({
            query: (id) => `/api/admin/apis/${id}`,
            providesTags: ['Apis'],
        }),

        addNewApi: builder.mutation({
            query: (newApi) => ({
                url: `/api/admin/apis`,
                method: "POST",
                body: newApi,
            }),
            invalidatesTags: ['Apis'],
        }),

        updateApi: builder.mutation({
            query: ({ id, data }) => ({
                url: `/api/admin/apis/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ['Apis'],
        }),

        deleteApi: builder.mutation({
            query: (id) => ({
                url: `/api/admin/apis/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Apis'],
        }),

    }),
});

export const {
    useGetAllApisQuery,
    useGetApiByIdQuery,
    useAddNewApiMutation,
    useUpdateApiMutation,
    useDeleteApiMutation,
} = apisApi;
