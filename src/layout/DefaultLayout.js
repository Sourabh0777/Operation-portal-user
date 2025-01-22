import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useSelector } from 'react-redux'
import { logout, useCurrentToken } from '../redux/fratures/auth/authSlice'
import { useDispatch } from 'react-redux'
import { verifyToken } from '../utils/verifyToken'
import { Navigate } from 'react-router-dom'

import { Chat } from '../components/chat/ChatContainer'

const DefaultLayout = () => {
  const token = useSelector(useCurrentToken)


  let user

  if (token) {
    user = verifyToken(token)
  }

  const dispatch = useDispatch()

  // if (!token || !user) {
  //   dispatch(logout())
  //   return <Navigate to="/login" replace={true} />
  // }

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <Chat />
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
