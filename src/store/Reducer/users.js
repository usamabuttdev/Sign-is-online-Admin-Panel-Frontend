import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const usersApi = createApi({
    reducerPath: "users",
    baseQuery: createCustomFetchBaseQuery(),
    tagTypes: ['users', 'DocumentsVerification'],
    endpoints: (builder) => ({

        // ---------------------- USERS ----------------------
        getAllusersList: builder.query({
            query: ({  page, limit , keyword , isActive  , userType}) => {
                let url = `admin/all-users?page=${page}&limit=${limit}`; 
                if (keyword) {
                  url += `&keyword=${keyword}`;
                }
                if (typeof isActive === 'boolean') {
                  url += `&isActive=${isActive}`;
                }
                if (userType) {
                  url += `&userType=${userType}`;
                }
                return {
                  url:url,
                  method: 'GET',
                };
            },
            transformResponse: (res) => ({
                data: res.data,
                usersCount: res.meta.usersCount,
                total_length: res.data.length > 0 ? res.meta.totalRecords : 0,
            }),
            providesTags: ['users'],
        }),

        getusersByListing: builder.query({
            query: ({ _id, pageno }) => ({
                url: `admin/listings-by-user/${_id}?&page=${pageno + 1}`,
                method: "GET",
            }),
            transformResponse: (res) => ({
                data: res.data,
                total_length: res.data.length > 0 ? res.meta.totalRecords : 0,
            }),
        }),

        updateUserStatus: builder.mutation({
            query: ({ _id, data }) => ({
                url: `/admin/users/${_id}/account-state`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['users'],
        }),

        getusersBookings: builder.query({
            query: ({ _id, pageno }) => ({
                url: `admin/user-bookings/${_id}?&page=${pageno + 1}`,
                method: "GET",
            }),
            transformResponse: (res) => ({
                data: res.data,
                total_length: res.data.length > 0 ? res.meta.totalRecords : 0,
            }),
        }),

        getusersRentals: builder.query({
            query: ({ _id, pageno }) => ({
                url: `admin/user-rentals/${_id}?&page=${pageno + 1}`,
                method: "GET",
            }),
            transformResponse: (res) => ({
                data: res.data,
                total_length: res.data.length > 0 ? res.meta.totalRecords : 0,
            }),
        }),

        getusersEarnings: builder.query({
            query: ({ _id, pageno }) => ({
                url: `admin/user-earnings/${_id}?&page=${pageno + 1}`,
                method: "GET",
            }),
            transformResponse: (res) => ({
                data: res.data,
                total_length: res.data.length > 0 ? res.meta.totalRecords : 0,
            }),
        }),

        // ---------------------- DOCUMENTS VERIFICATION ----------------------

        getAllDocumentsVerificationList: builder.query({
            query: ({ status, pageno, keyword }) => ({
                url: `admin/documents-verification?status=${status}&page=${pageno + 1}&keyword=${keyword}`,
                method: "GET",
            }),
            transformResponse: (res) => ({
                data: res.data,
                documentsCount: res.meta.documentsCount,
                total_length: res.data.length > 0 ? res.meta.totalRecords : 0,
            }),
            providesTags: ['DocumentsVerification'],
        }),

        updateDocumentsVerificationStatus: builder.mutation({
            query: ({ _id, data }) => ({
                url: `/admin/documents/${_id}/status`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['DocumentsVerification'],
        }),
    })
});

export const {
    useGetAllusersListQuery,
    useGetusersByListingQuery,
    useGetusersBookingsQuery,
    useGetusersRentalsQuery,
    useGetusersEarningsQuery,
    useUpdateUserStatusMutation,

    useGetAllDocumentsVerificationListQuery,
    useUpdateDocumentsVerificationStatusMutation
} = usersApi;
