import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const devicesApi = createApi({
    reducerPath: "devices",
    baseQuery: createCustomFetchBaseQuery(),
    tagTypes: ['Devices'],
    endpoints: (builder) => ({

        getAllDevices: builder.query({
            query: ({ pageno, search }) => ({
                url: `/api/admin/devices?pageno=${pageno}&search=${search}`,
                method: "GET",
                transformResponse: (res) => res,
            }),
            providesTags: ['Devices'],
        }),

        addNewDevice: builder.mutation({
            query: (newDevice) => ({
                url: `/api/admin/devices`,
                method: "POST",
                body: newDevice,
            }),
            invalidatesTags: ['Devices'],
        }),

        updateDevice: builder.mutation({
            query: ({ id, data }) => ({
                url: `/api/admin/devices/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ['Devices'],
        }),

        deleteDevice: builder.mutation({
            query: (id) => ({
                url: `/api/admin/devices/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Devices'],
        }),

    }),
});

export const {
    useGetAllDevicesQuery,
    useAddNewDeviceMutation,
    useUpdateDeviceMutation,
    useDeleteDeviceMutation,
} = devicesApi;
