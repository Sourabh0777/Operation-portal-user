/* eslint-disable prettier/prettier */

import { baseApi } from '../../api/baseApi'

export const jobFilterApi = baseApi.injectEndpoints({
  tagTypes: ['productionCapacity'],
  endpoints: (builder) => ({
    getFilteredJobs: builder.query({
      query: ({ startDate, type, endDate, monthIndex, year }) => {
        const params = new URLSearchParams()
        if (type) params.append('type', type)
        if (startDate) params.append('startDate', startDate)
        if (endDate) params.append('endDate', endDate)
        if (monthIndex !== null && monthIndex !== undefined)
          params.append('monthIndex', monthIndex.toString())
        if (year !== null && year !== undefined) params.append('year', year.toString())

        return {
          url: `/jobFilter/filter-jobs?${params.toString()}`,
          method: 'GET',
        }
      },
      providesTags: ['FilteredJobs'], // Tag the fetched data
    }),
    getProductionCapacity: builder.query({
      query: ({ startDate, type, endDate, monthIndex, year }) => {
        const params = new URLSearchParams()
        if (type) params.append('type', type)
        if (startDate) params.append('startDate', startDate)
        if (endDate) params.append('endDate', endDate)
        if (monthIndex !== null && monthIndex !== undefined)
          params.append('monthIndex', monthIndex.toString())
        if (year !== null && year !== undefined) params.append('year', year.toString())

        return {
          url: `/jobFilter/production-capacity?${params.toString()}`,
          method: 'GET',
        }
      },
      providesTags: ['productionCapacity'], // Tag the fetched data
    }),
  }),
})

export const { useGetFilteredJobsQuery, useGetProductionCapacityQuery } = jobFilterApi

export default jobFilterApi
