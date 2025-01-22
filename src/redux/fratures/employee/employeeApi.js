/* eslint-disable prettier/prettier */
import { baseApi } from '../../api/baseApi'

export const employeeApi = baseApi.injectEndpoints({
  tagTypes: ['employees'],
  endpoints: (builder) => ({
    getEmployeeProfiles: builder.query({
      query: () => {
        return {
          url: `/employeeProfiles/get-employeeProfiles`,
          method: 'GET',
        }
      },
      providesTags: ['employeeProfiles'], // Tag the fetched data
    }),
    getEmployeeProfileById: builder.query({
      query: (employeeID) => ({
        url: `/employeeProfiles/get-employeeProfile/${employeeID}`,
        method: 'GET',
      }),
      providesTags: (result, error, employeeID) => [{ type: 'employees', id: employeeApi }],
    }),
  }),
})

export const { useGetEmployeeProfilesQuery, useGetEmployeeProfileByIdQuery } = employeeApi

export default employeeApi
