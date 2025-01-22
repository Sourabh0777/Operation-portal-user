/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: false,
  theme: 'light',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSidebarShow: (state, action) => {
      state.sidebarShow = action.payload
    },
    toggleSidebarUnfoldable: (state) => {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
  },
})

export const { setSidebarShow, toggleSidebarUnfoldable, setTheme } = uiSlice.actions

export default uiSlice.reducer

// Selectors
export const selectSidebarShow = (state) => state.ui.sidebarShow
export const selectSidebarUnfoldable = (state) => state.ui.sidebarUnfoldable
export const selectTheme = (state) => state.ui.theme
