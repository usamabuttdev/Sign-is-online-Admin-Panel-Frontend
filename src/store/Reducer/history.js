import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const historyApi = createApi({
    reducerPath: "history",
    baseQuery: createCustomFetchBaseQuery(),
    tagTypes: ['History'],
    endpoints: (builder) => ({

        getAllHistory: builder.query({
            query: ({ pageno, search }) => ({
                url: `api/admin/history?pageno=${pageno}&search=${search}`,
                method: "GET",
                transformResponse: (res) => res,
            }),
            providesTags: ['History'],
        }),

    }),
});

export const {
    useGetAllHistoryQuery,
} = historyApi;
