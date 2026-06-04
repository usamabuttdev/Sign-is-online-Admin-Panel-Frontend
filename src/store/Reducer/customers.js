import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const  customersApi = createApi({
  reducerPath: "trainers",
  tagTypes: ['Customers'],
  baseQuery: createCustomFetchBaseQuery(),
  endpoints: (builder) => ({

    getAllCustomers: builder.query({
      query: ({ pageno, search }) => ({
        url: `api/admin/customers?pageno=${pageno}&search=${search}`,
        method: "GET",
        transformResponse: (res) => res,
      }),
      providesTags: ['Customers']
    }),
    updateCustomerStatus: builder.mutation({
      query: (id) => ({
        url: `api/admin/customer/status/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ['Customers']
    }),

    updateCustomerApprovalStatus: builder.mutation({
      query: (id) => ({
        url: `api/admin/customer/account/approve/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }),
    }),

    getCustomerById: builder.query({
      query: (id) => `api/admin/customer/${id}`,
    }),

    addNewCustomer: builder.mutation({
      query: (newCustomer) => ({
        url: `api/admin/customer`,
        method: "POST",
        body: newCustomer,
      }),
    }),

    updateCustomer: builder.mutation({
      query: (updatedCustomer) => ({
        url: `api/admin/customer/edit`,
        method: "PUT",
        body: updatedCustomer,
      }),
      invalidatesTags: ['Customers']
    }),

    customerWithdraw: builder.mutation({
      query: (data) => ({
        url: `api/admin/customer/balance/topup_withdrawal`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Customers']
    }),

    customerTopUp: builder.mutation({
      query: (data) => ({
        url: `api/admin/customer/balance/topup_withdrawal`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Customers']
    }),

    customerAccToAcc: builder.mutation({
      query: (data) => ({
        url: `api/admin/customer/balance/topup_withdrawal`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Customers']
    }),

    getCustomerBookings: builder.query({
      query: ({ id, pageno }) => ({
        url: `api/admin/customer/transactions/history/${id}?pageno=${pageno}`,
        method: "GET",
        transformResponse: (res) => res,
        providesTags: ['Customers']
      }),
    }),

  




  }),
});

export const {
  useGetAllCustomersQuery,
  useGetCustomerByIdQuery,
  useAddNewCustomerMutation,
  useUpdateCustomerMutation,
  useUpdateCustomerStatusMutation,
  useUpdateCustomerApprovalStatusMutation,
  useCustomerWithdrawMutation,
  useCustomerTopUpMutation,
  useCustomerAccToAccMutation,
  useGetCustomerBookingsQuery,
} = customersApi;
