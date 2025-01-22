/* eslint-disable prettier/prettier */

import { baseApi } from '../../api/baseApi'

export const usersApi = baseApi.injectEndpoints({
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: ({ userData, employeeData }) => ({
        url: '/user/register-user',
        method: 'POST',
        body: { userData, employeeData },
      }),
      invalidatesTags: ['Users'], // Invalidate the users cache after creation
    }),
    getUsers: builder.query({
      query: () => ({
        url: '/User/get-users',
        method: 'GET',
      }),
      providesTags: ['Users'], // Tag the fetched data
    }),
    getUserById: builder.query({
      query: (userID) => ({
        url: `/user/get-user/${userID}`,
        method: 'GET',
      }),
      providesTags: (result, error, userID) => [{ type: 'Users', id: userID }], // Tag individual User
    }),
    updateUser: builder.mutation({
      query: ({ userID, userData }) => {
        console.log('🚀 ~ userData:', userData)
        return {
          url: `/user/update-user/${userID}`,
          method: 'PATCH',
          body: { userData },
        }
      },
      invalidatesTags: (result, error, { userID }) => [{ type: 'Users', id: userID }, 'Users'], // Invalidate both specific user and the full list
    }),
    deleteUser: builder.mutation({
      query: (userID) => ({
        url: `/user/delete-user/${userID}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, userID) => [{ type: 'Users', id: userID }, 'Users'], // Invalidate the deleted user and the full list
    }),
  }),
})

export const {
  useCreateUserMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi

export default usersApi
