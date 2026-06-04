import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomFetchBaseQuery } from "../baseQuery";

export const fileApi = createApi({
  reducerPath: "files",
  baseQuery: createCustomFetchBaseQuery(),
  endpoints: (builder) => ({
    uploadNewFile: builder.mutation({

      query: (fileData) => {
        const formData = new FormData();
        formData.append("files", fileData);
        return {
          url: "upload/s3", // Update the URL here
          method: "POST",
          body: formData,
        };
    
      },
      transformResponse: (res) =>res.data ,
    }),
    deleteFile: builder.mutation({
      query: (filename) => ({
        url: `/upload/s3`,
        method: "DELETE",
        body: { fileKey:filename },
      }),
    }),
  }),
});

export const { useUploadNewFileMutation, useDeleteFileMutation } = fileApi;
