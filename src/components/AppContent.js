import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import Login from '../views/pages/login/Login'
import { useSelector } from 'react-redux'
import { logout, useCurrentToken } from '../redux/fratures/auth/authSlice'
import { verifyToken } from '../utils/verifyToken'
import { useDispatch } from 'react-redux'

const AppContent = () => {
  const token = useSelector(useCurrentToken)

  let user

  if (token) {
    user = verifyToken(token)
  }

  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route
            path="/"
            element={<Navigate to={`${token && user ? '/dashboard' : '/login'}`} replace />}
          />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
