/* eslint-disable prettier/prettier */

import { baseApi } from '../../api/baseApi';

export const jobAssignsApi = baseApi.injectEndpoints({
  tagTypes: ['JobAssigns'], // Define the tag for caching
  endpoints: (builder) => ({
    // Fetch all job assigns
    getJobAssigns: builder.query({
      query: () => ({
        url: '/jobAssigns/get-jobAssigns',
        method: 'GET',
      }),
      providesTags: ['JobAssigns'], // Tag the fetched data
    }),

    // Fetch a single job assign by ID
    getJobAssignById: builder.query({
      query: (jobAssignsID) => ({
        url: `/jobAssigns/get-jobAssign/${jobAssignsID}`,
        method: 'GET',
      }),
      providesTags: (result, error, jobAssignsID) => [
        { type: 'JobAssigns', id: jobAssignsID }, // Tag individual JobAssign
      ],
    }),
  }),
});

export const {
  useGetJobAssignsQuery,
  useGetJobAssignByIdQuery,
} = jobAssignsApi;

export default jobAssignsApi;
