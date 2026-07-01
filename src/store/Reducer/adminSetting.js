import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const adminSettingsApi = createApi({
    reducerPath: "adminSettings",
    baseQuery: createCustomFetchBaseQuery(),
    tagTypes: ['adminSettings'],
    endpoints: (builder) => ({

        getPrivacyPolicy: builder.query({
            query: () => ({
                url: `/settings/privacy-policy`,
                method: "GET",
            }),
            transformResponse: (res) => res.data,
            providesTags: ['adminSettings']
        }),

        getAboutUs: builder.query({
            query: () => ({
                url: `/settings/about-us`,
                method: "GET",
                transformResponse: (res) => res.data,
            }),
            providesTags: ['adminSettings']
        }),

        getTermsConditions: builder.query({
            query: () => ({
                url: `/settings/terms-conditions`,
                method: "GET",
            }),
            transformResponse: (res) => res.data,
            providesTags: ['adminSettings']
        }),

        updateSetting: builder.mutation({
            query: ({ _id, data }) => ({
                url: `/settings/update/${_id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['adminSettings'],
        }),

        getContent: builder.query({
            query: (title) => ({
                url: `/api/admin/content/${title}`,
                method: "GET",
            }),
            transformResponse: (res) => res.data,
            providesTags: ['adminSettings']
        }),

        updateContent: builder.mutation({
            query: ({ title, html }) => ({
                url: `/api/admin/content/${title}`,
                method: 'PUT',
                body: { html },
            }),
            invalidatesTags: ['adminSettings'],
        }),
    }),
});

export const {
    useGetPrivacyPolicyQuery,
    useGetAboutUsQuery,
    useGetTermsConditionsQuery,
    useUpdateSettingMutation,
    useGetContentQuery,
    useUpdateContentMutation,
    useLazyGetContentQuery,
} = adminSettingsApi;