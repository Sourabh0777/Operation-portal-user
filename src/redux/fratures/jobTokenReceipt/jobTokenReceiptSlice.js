/* eslint-disable prettier/prettier */

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  jobTokenReceipts: [],
  selectedJobTokenReceipt: null,
  status: 'idle',
  error: null,
}

const jobTokenReceiptsSlice = createSlice({
  name: 'jobTokenReceipts',
  initialState,
  reducers: {
    setJobTokenReceipts: (state, action) => {
      state.jobTokenReceipts = action.payload
    },
    setSelectedJobTokenReceipt: (state, action) => {
      state.selectedJobTokenReceipt = action.payload
    },
    clearSelectedJobTokenReceipt: (state) => {
      state.selectedJobTokenReceipt = null
    },
  },
})

export const { setJobTokenReceipts, setSelectedJobTokenReceipt, clearSelectedJobTokenReceipt } =
  jobTokenReceiptsSlice.actions

export default jobTokenReceiptsSlice.reducer

// Selectors
export const selectAllJobTokenReceipts = (state) => state.jobTokenReceipts.jobTokenReceipts
export const selectSelectedJobTokenReceipt = (state) =>
  state.jobTokenReceipts.selectedJobTokenReceipt
export const selectJobTokenReceiptsStatus = (state) => state.jobTokenReceipts.status
export const selectJobTokenReceiptsError = (state) => state.jobTokenReceipts.error
