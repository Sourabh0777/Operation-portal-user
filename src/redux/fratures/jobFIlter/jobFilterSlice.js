/* eslint-disable prettier/prettier */

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filteredJobs: [],
  selectedJob: null,
  status: 'idle',
  error: null,
}

const jobFilterSlice = createSlice({
  name: 'filteredJobs',
  initialState,
  reducers: {
    setFilteredJobs: (state, action) => {
      state.filteredJobs = action.payload
    },
    setSelectedFilteredJobs: (state, action) => {
      state.selectedJob = action.payload
    },
    clearSelectedFilteredJobs: (state) => {
      state.selectedJob = null
    },
  },
})

export const { setFilteredJobs, setSelectedFilteredJobs, clearSelectedFilteredJobs } =
  jobFilterSlice.actions

export default jobFilterSlice.reducer
