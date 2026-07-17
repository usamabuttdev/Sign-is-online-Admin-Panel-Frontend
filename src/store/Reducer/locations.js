import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const locationsApi = createApi({
    reducerPath: "locations",
    baseQuery: createCustomFetchBaseQuery(),
    tagTypes: ['Locations'],
    endpoints: (builder) => ({

        getAllLocations: builder.query({
            query: ({ pageno, search }) => ({
                url: `/api/admin/locations?pageno=${pageno}&search=${search}`,
                method: "GET",
                transformResponse: (res) => res,
            }),
            providesTags: ['Locations'],
        }),

        getLocationById: builder.query({
            query: (id) => `/api/admin/locations/${id}`,
            providesTags: ['Locations'],
        }),

        addNewLocation: builder.mutation({
            query: (newLocation) => ({
                url: `/api/admin/locations`,
                method: "POST",
                body: newLocation,
            }),
            invalidatesTags: ['Locations'],
        }),

        updateLocation: builder.mutation({
            query: ({ id, data }) => ({
                url: `/api/admin/locations/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ['Locations'],
        }),

        deleteLocation: builder.mutation({
            query: (id) => ({
                url: `/api/admin/locations/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Locations'],
        }),

    }),
});

export const {
    useGetAllLocationsQuery,
    useGetLocationByIdQuery,
    useAddNewLocationMutation,
    useUpdateLocationMutation,
    useDeleteLocationMutation,
} = locationsApi;
