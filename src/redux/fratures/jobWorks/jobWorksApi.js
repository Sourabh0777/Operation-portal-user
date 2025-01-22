/* eslint-disable prettier/prettier */

import { baseApi } from '../../api/baseApi'

export const jobWorksApi = baseApi.injectEndpoints({
  tagTypes: ['JobWorks'],
  endpoints: (builder) => ({
    createJobWork: builder.mutation({
      query: (formData) => ({
        url: '/jobWorks/create-jobWorks',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['JobWorks'],
    }),

    getJobWorks: builder.query({
      query: (userId) => ({
        url: '/client/get-client-jobWorks',
        method: 'POST',
        body:userId
      }),
      providesTags: ['JobWorks'], // Tag the fetched data
    }),
    getJobWorkById: builder.query({
      query: (jobWorksID) => ({
        url: `/jobWorks/get-jobWorks/${jobWorksID}`,
        method: 'GET',
      }),
      providesTags: (result, error, jobWorksID) => [{ type: 'JobWorks', id: jobWorksID }], // Tag individual JobWork
    }),
    updateJobWork: builder.mutation({
      query: ({ jobWorksID, jobWorksData }) => ({
        url: `/jobWorks/update-jobWork/${jobWorksID}`,
        method: 'PATCH',
        body: { jobWorksData },
      }),
      invalidatesTags: (result, error, { jobWorksID }) => [
        { type: 'JobWorks', id: jobWorksID },
        'JobWorks',
      ], // Invalidate both specific JobWork and the full list
    }),
    deleteJobWork: builder.mutation({
      query: (jobWorksID) => ({
        url: `/jobWorks/delete-jobWork/${jobWorksID}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, jobWorksID) => [
        { type: 'JobWorks', id: jobWorksID },
        'JobWorks',
      ], // Invalidate the deleted JobWork and the full list
    }),
    appendJobFiles: builder.mutation({
      query: ({ formData, jobWorksID }) => ({
        url: `/jobWorks/append-files/${jobWorksID}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: (result, error, { jobWorksID }) => [
        { type: 'JobWorks', id: jobWorksID },
        'JobWorks',
      ], // Invalidate both specific JobWork and the full list
    }),
    deleteJobFile: builder.mutation({
      query: ({ jobWorksID, filePath }) => ({
        url: `/jobWorks/delete-job-file/${jobWorksID}`,
        method: 'DELETE',
        body: { filePath },
      }),
      invalidatesTags: (result, error, jobWorksID) => [
        { type: 'JobWorks', id: jobWorksID },
        'JobWorks',
      ], // Invalidate the deleted JobWork and the full list
    }),
  }),
})

export const {
  useCreateJobWorkMutation,
  useGetJobWorksQuery,
  useGetJobWorkByIdQuery,
  useUpdateJobWorkMutation,
  useDeleteJobWorkMutation,
  useAppendJobFilesMutation,
  useDeleteJobFileMutation,
} = jobWorksApi

export default jobWorksApi
