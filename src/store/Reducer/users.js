import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const usersApi = createApi({
    reducerPath: "users",
    baseQuery: createCustomFetchBaseQuery(),
    tagTypes: ['users', 'DocumentsVerification'],
    endpoints: (builder) => ({

        // ---------------------- USERS ----------------------
        getUserById: builder.query({
            query: ({ id }) => ({
                url: `/api/admin/users/${id}`,
                method: "GET",
            }),
            transformResponse: (res) => res.data,
            providesTags: ['users'],
        }),

        getAllusersList: builder.query({
            query: ({  page, limit , keyword , isActive  , userType}) => {
                let url = `/api/admin/all-users?page=${page}&limit=${limit}`; 
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
                usersCount: res.total,
                total_length: res.total,
            }),
            providesTags: ['users'],
        }),

        getusersByListing: builder.query({
            query: ({ _id, pageno }) => ({
                url: `/api/admin/listings-by-user/${_id}?&page=${pageno + 1}`,
                method: "GET",
            }),
            transformResponse: (res) => ({
                data: res.data,
                total_length: res.data.length > 0 ? res.meta.totalRecords : 0,
            }),
        }),

        updateUserStatus: builder.mutation({
            query: ({ _id, data }) => ({
                url: `/api/admin/users/${_id}/account-state`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['users'],
        }),

        updateUser: builder.mutation({
            query: ({ _id, data }) => ({
                url: `/api/admin/users/${_id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ['users'],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data: response } = await queryFulfilled;
                    const updatedUser = response?.data;
                    if (updatedUser) {
                        dispatch(
                            usersApi.util.updateQueryData('getUserById', { id: arg._id }, (draft) => {
                                Object.assign(draft, updatedUser);
                            })
                        );
                    }
                } catch {
                }
            },
        }),

        createUser: builder.mutation({
            query: (data) => ({
                url: `/api/admin/users`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['users'],
        }),

        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/api/admin/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['users'],
        }),

        getusersBookings: builder.query({
            query: ({ _id, pageno }) => ({
                url: `/api/admin/user-bookings/${_id}?&page=${pageno + 1}`,
                method: "GET",
            }),
            transformResponse: (res) => ({
                data: res.data,
                total_length: res.data.length > 0 ? res.meta.totalRecords : 0,
            }),
        }),

        getusersRentals: builder.query({
            query: ({ _id, pageno }) => ({
                url: `/api/admin/user-rentals/${_id}?&page=${pageno + 1}`,
                method: "GET",
            }),
            transformResponse: (res) => ({
                data: res.data,
                total_length: res.data.length > 0 ? res.meta.totalRecords : 0,
            }),
        }),

        getusersEarnings: builder.query({
            query: ({ _id, pageno }) => ({
                url: `/api/admin/user-earnings/${_id}?&page=${pageno + 1}`,
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
                url: `/api/admin/documents-verification?status=${status}&page=${pageno + 1}&keyword=${keyword}`,
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
                url: `/api/admin/documents/${_id}/status`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['DocumentsVerification'],
        }),
    })
});

export const {
    useGetUserByIdQuery,
    useGetAllusersListQuery,
    useGetusersByListingQuery,
    useGetusersBookingsQuery,
    useGetusersRentalsQuery,
    useGetusersEarningsQuery,
    useUpdateUserStatusMutation,
    useUpdateUserMutation,
    useCreateUserMutation,
    useDeleteUserMutation,

    useGetAllDocumentsVerificationListQuery,
    useUpdateDocumentsVerificationStatusMutation
} = usersApi;
