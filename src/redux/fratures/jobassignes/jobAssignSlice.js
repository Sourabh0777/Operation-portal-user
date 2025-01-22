/* eslint-disable prettier/prettier */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobAssigns: [],
  selectedJobAssign: null,
  status: 'idle',
  error: null,
};

const jobAssignsSlice = createSlice({
  name: 'jobAssigns',
  initialState,
  reducers: {
    setJobAssigns: (state, action) => {
      state.jobAssigns = action.payload;
    },
    setSelectedJobAssign: (state, action) => {
      state.selectedJobAssign = action.payload;
    },
    clearSelectedJobAssign: (state) => {
      state.selectedJobAssign = null;
    },
  },
});

export const {
  setJobAssigns,
  setSelectedJobAssign,
  clearSelectedJobAssign,
} = jobAssignsSlice.actions;

export default jobAssignsSlice.reducer;

// Selectors
export const selectAllJobAssigns = (state) => state.jobAssigns.jobAssigns;
export const selectSelectedJobAssign = (state) => state.jobAssigns.selectedJobAssign;
export const selectJobAssignsStatus = (state) => state.jobAssigns.status;
export const selectJobAssignsError = (state) => state.jobAssigns.error;
