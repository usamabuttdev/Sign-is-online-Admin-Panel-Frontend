import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const adminSettingsApi = createApi({
    reducerPath: "adminSettings",
    baseQuery: createCustomFetchBaseQuery(),
    tagTypes: ['adminSettings'],
    endpoints: (builder) => ({

        getPrivacyPolicy: builder.query({
            query: () => ({
                url: `/api/admin/content/privacy-policy`,
                method: "GET",
            }),
            transformResponse: (res) => res.data,
            providesTags: ['adminSettings']
        }),

        getAboutUs: builder.query({
            query: () => ({
                url: `/api/admin/content/about-us`,
                method: "GET",
                transformResponse: (res) => res.data,
            }),
            providesTags: ['adminSettings']
        }),

        getTermsConditions: builder.query({
            query: () => ({
                url: `/api/admin/content/terms-conditions`,
                method: "GET",
            }),
            transformResponse: (res) => res.data,
            providesTags: ['adminSettings']
        }),

        updateSetting: builder.mutation({
            // Legacy — prefer updateContent with a title slug
            query: ({ title, html, data }) => ({
                url: `/api/admin/content/${title || data?.title || 'about-us'}`,
                method: 'PUT',
                body: { html: html || data?.html || data?.content },
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