import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: createCustomFetchBaseQuery(),
  endpoints: (builder) => ({
   
    login: builder.mutation({
      query: (login) => ({
        url: `/auth/login`,
        method: "POST",
        headers: { 'x-admin-access-token': process.env.REACT_APP_LOGIN_TOKEN },
        body: login,
      }),
    }),

    register: builder.mutation({
      query: (register ) => ({
        url: `/auth/signup`,
        method: "POST",
        // headers: { "Content-Type": "multipart/form-data" },
        body: register,
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: `/auth/resetPassword`,
        method: "PUT",
        body: data,
      }),
    }),

    verifyEmail: builder.mutation({
      query: (data) => ({
        url: `/auth/verify`,
        method: "POST",
        body: data,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `/auth/forgotpassword`,
        method: "POST",
        body:data,
      }),
    }),
  })
});

export const {
 useForgotPasswordMutation,useLoginMutation,useRegisterMutation,useChangePasswordMutation,useVerifyEmailMutation,
} = authApi;