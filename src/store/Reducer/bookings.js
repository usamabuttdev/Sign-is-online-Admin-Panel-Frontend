import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const bookingApi = createApi({
  reducerPath: "bookings",
  baseQuery: createCustomFetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: ({ page , limit   , keyword ,isActive }) => {
        let url = `admin/bookings?page=${page}&limit=${limit}`; 
        if (keyword) {
          url += `&keyword=${keyword}`;
        }
        if (typeof isActive === 'boolean') {
          url += `&isActive=${isActive}`;
        }
        return {
          url:url,
          method: 'GET',
        };
      },
      providesTags: ['Bookings'],
    }),

    getBookingById: builder.query({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "GET",
      }),
      providesTags: ['Booking'],  // Static tag for this query
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useGetBookingByIdQuery, 
} = bookingApi;
