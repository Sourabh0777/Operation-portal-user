/* eslint-disable prettier/prettier */

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  selectedUser: null,
  status: 'idle',
  error: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
    },
    setSelectedClient: (state, action) => {
      state.selectedClient = action.payload
    },
    clearSelectedClient: (state) => {
      state.selectedClient = null
    },
  },
})

export const { setUsers, setSelectedClient, clearSelectedClient } = usersSlice.actions

export default usersSlice.reducer

// Selectors
export const selectAllUsers = (state) => state.users.users
export const selectSelectedClient = (state) => state.users.selectedClient
export const selectUsersStatus = (state) => state.users.status
export const selectUsersError = (state) => state.users.error
