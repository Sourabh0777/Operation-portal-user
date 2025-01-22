/* eslint-disable prettier/prettier */

import { baseApi } from '../../api/baseApi'

export const clientsApi = baseApi.injectEndpoints({
  tagTypes: ['Clients'],
  endpoints: (builder) => ({
    createClient: builder.mutation({
      query: (clientData) => {
        console.log('Client Data:', clientData) // Log the clientData
        return {
          url: '/client/register-client',
          method: 'POST',
          body: clientData,
        }
      },
      invalidatesTags: ['Clients'], // Invalidate the clients cache after creation
    }),

    getClients: builder.query({
      query: () => ({
        url: '/client/get-clients',
        method: 'GET',
      }),
      providesTags: ['Clients'], // Tag the fetched data
    }),
    getClientById: builder.query({
      query: (clientID) => ({
        url: `/client/get-client/${clientID}`,
        method: 'GET',
      }),
      providesTags: (result, error, clientID) => [{ type: 'Clients', id: clientID }], // Tag individual client
    }),
    updateClient: builder.mutation({
      query: ({ clientID, clientData }) => ({
        url: `/client/update-client/${clientID}`,
        method: 'PATCH',
        body: clientData,
      }),
      invalidatesTags: (result, error, { clientID }) => [
        { type: 'Clients', id: clientID },
        'Clients',
      ], // Invalidate both specific client and the full list
    }),
    deleteClient: builder.mutation({
      query: (clientID) => ({
        url: `/client/delete-client/${clientID}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, clientID) => [{ type: 'Clients', id: clientID }, 'Clients'], // Invalidate the deleted client and the full list
    }),
  }),
})

export const {
  useCreateClientMutation,
  useGetClientsQuery,
  useGetClientByIdQuery,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientsApi

export default clientsApi
