import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const languageApi = createApi({
  reducerPath: "languages",
  baseQuery: createCustomFetchBaseQuery(),
  endpoints: (builder) => ({
    getAllLanguages: builder.query({
      query: ({ page =1 , limit=1 , keyword ='' , isActive  }) => {
        let url = `/languages?page=${page}&limit=${limit}`; 
        if (keyword) {
          url += `&keyword=${keyword}`;
        }
        if (typeof isActive === 'boolean') {
          url += `&isActive=${isActive}`;
        }
        return {
          url:url,
          method: 'GET',
        }
      },
      providesTags: ['Languages'],
    }),

    addLanguage: builder.mutation({
      query: (newLanguage) => ({
        url: `/api/admin/languages`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newLanguage,
      }),
      invalidatesTags: ['Languages'],
    }),

    updateLanguage: builder.mutation({
      query: ({ id, updatedLanguage }) => ({
        url: `/api/admin/languages/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: updatedLanguage,
      }),
      invalidatesTags: ['Languages'],
    }),

    deleteLanguage: builder.mutation({
      query: (id) => ({
        url: `/api/admin/languages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Languages'],
    }),
  }),
});

export const {
  useGetAllLanguagesQuery,
  useAddLanguageMutation,
  useUpdateLanguageMutation,
  useDeleteLanguageMutation,
} = languageApi;
