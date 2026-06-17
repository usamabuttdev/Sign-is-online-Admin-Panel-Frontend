// import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// // Define a function that returns a configured fetchBaseQuery with token implementation
// export const createCustomFetchBaseQuery = () => fetchBaseQuery({
//   baseUrl: process.env.REACT_APP_API_BASE_URL,
//   prepareHeaders: (headers, { getState }) => {
//     let token=getState()?.user?.token;
//     if (token) {
//       headers.set('authorization', `Bearer ${token}`)
//     }

//     return headers
//   },
// });


import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { enqueueSnackbar } from "notistack";

export const createCustomFetchBaseQuery = () => {
  
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_HOST_API,
    prepareHeaders: (headers, { getState }) => {
      const user = getState()?.user?.user;
      const token = user ? user.token : '';

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }); 

  return async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error) {
      const isParseError = result.error.status === 'PARSING_ERROR';
      const message = isParseError
        ? 'Server returned an unexpected response. Please try again or contact support.'
        : (result?.error?.data?.message || result?.error?.data?.error || 'Something went wrong');
      enqueueSnackbar(message, { variant: 'error' });
    }

    return result;
  };
};


