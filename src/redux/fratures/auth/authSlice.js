/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
  userType: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload
      state.user = user
      state.token = token
      state.userType = user?.user?.emp_type
    },
    logout: (state) => {
      console.log('🚀 ~ state:', state)

      state.user = null
      state.token = null
      state.userType = null
    },
  },
})

export const { setUser, logout } = authSlice.actions

export default authSlice.reducer

export const useCurrentToken = (state) => state.auth.token
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentUserType = (state) => state.auth.userType
