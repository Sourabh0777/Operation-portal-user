/* eslint-disable prettier/prettier */

import { baseApi } from '../../api/baseApi'

export const jobTokenReceiptsApi = baseApi.injectEndpoints({
  tagTypes: ['JobTokenReceipts'],
  endpoints: (builder) => ({
    createJobTokenReceipt: builder.mutation({
      query: (formData) => ({
        url: '/jobToken/create-jobTokenReceipt',
        method: 'POST',
        body: formData,
        formData: true, // This ensures that the content type is set to multipart/form-data
      }),
      invalidatesTags: ['JobTokenReceipts', 'JobWorks'],
    }),
    getJobTokenReceipts: builder.query({
      query: ({ startDate, type, endDate, monthIndex, year }) => {
        const params = new URLSearchParams()
        if (type) params.append('type', type)
        if (startDate) params.append('startDate', startDate)
        if (endDate) params.append('endDate', endDate)
        if (monthIndex !== null && monthIndex !== undefined)
          params.append('monthIndex', monthIndex.toString())
        if (year !== null && year !== undefined) params.append('year', year.toString())

        return {
          url: `/jobToken/get-jobTokenReceipts?${params.toString()}`,
          method: 'GET',
        }
      },
      providesTags: ['JobTokenReceipts'], // Tag the fetched data
    }),
    getJobTokenReceiptById: builder.query({
      query: (jobTokenID) => ({
        url: `/jobToken/get-jobTokenReceipt/${jobTokenID}`,
        method: 'GET',
      }),
      providesTags: (result, error, jobTokenID) => [{ type: 'JobTokenReceipts', id: jobTokenID }], // Tag individual jobToken
    }),
    updateJobTokenReceipt: builder.mutation({
      query: ({ jobTokenID, jobTokenReceiptData }) => ({
        url: `/jobToken/update-jobTokenReceipt/${jobTokenID}`,
        method: 'PATCH',
        body: jobTokenReceiptData,
      }),
      invalidatesTags: (result, error, { jobTokenID }) => [
        { type: 'JobTokenReceipts', id: jobTokenID },
        'JobTokenReceipts',
      ], // Invalidate both specific jobToken and the full list
    }),
    deleteJobTokenReceipt: builder.mutation({
      query: (jobTokenID) => ({
        url: `/jobToken/delete-jobTokenReceipt/${jobTokenID}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, jobTokenID) => [
        { type: 'JobTokenReceipts', id: jobTokenID },
        'JobTokenReceipts',
      ], // Invalidate the deleted jobToken and the full list
    }),
  }),
})

export const {
  useCreateJobTokenReceiptMutation,
  useGetJobTokenReceiptsQuery,
  useGetJobTokenReceiptByIdQuery,
  useUpdateJobTokenReceiptMutation,
  useDeleteJobTokenReceiptMutation,
} = jobTokenReceiptsApi

export default jobTokenReceiptsApi
