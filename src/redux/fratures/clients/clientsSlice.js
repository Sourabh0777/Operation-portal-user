/* eslint-disable prettier/prettier */

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  clients: [],
  selectedClient: null,
  status: 'idle',
  error: null,
}

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload
    },
    setSelectedClient: (state, action) => {
      state.selectedClient = action.payload
    },
    clearSelectedClient: (state) => {
      state.selectedClient = null
    },
  },
})

export const { setClients, setSelectedClient, clearSelectedClient } = clientsSlice.actions

export default clientsSlice.reducer

// Selectors
export const selectAllClients = (state) => state.clients.clients
export const selectSelectedClient = (state) => state.clients.selectedClient
export const selectClientsStatus = (state) => state.clients.status
export const selectClientsError = (state) => state.clients.error
