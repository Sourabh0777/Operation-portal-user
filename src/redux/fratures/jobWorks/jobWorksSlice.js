/* eslint-disable prettier/prettier */

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  jobWorks: [],
  selectedJobWork: null,
  status: 'idle',
  error: null,
}

const jobWorksSlice = createSlice({
  name: 'jobWorks',
  initialState,
  reducers: {
    setJobWorks: (state, action) => {
      state.jobWorks = action.payload
    },
    setSelectedJobWork: (state, action) => {
      state.selectedJobWork = action.payload
    },
    clearSelectedJobWork: (state) => {
      state.selectedJobWork = null
    },
  },
})

export const { setJobWorks, setSelectedJobWork, clearSelectedJobWork } = jobWorksSlice.actions

export default jobWorksSlice.reducer

// Selectors
export const selectAllJobWorks = (state) => state.jobWorks.jobWorks
export const selectSelectedJobWork = (state) => state.jobWorks.selectedJobWork
export const selectJobWorksStatus = (state) => state.jobWorks.status
export const selectJobWorksError = (state) => state.jobWorks.error
