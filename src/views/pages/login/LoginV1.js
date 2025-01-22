/* eslint-disable prettier/prettier */
import React from 'react'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { toast } from 'sonner'
import { useLoginMutation } from '../../../redux/fratures/auth/authApi'
import { verifyToken } from '../../../utils/verifyToken'
import { useDispatch } from 'react-redux'
import { setUser, useCurrentToken } from '../../../redux/fratures/auth/authSlice'
import { useSelector } from 'react-redux'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const token = useSelector(useCurrentToken)

  let user

  if (token) {
    user = verifyToken(token)
  }

  if (token && user) {
    return <Navigate to="/dashboard" replace={true} />
  }

  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }))
  }

  const [login] = useLoginMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('User Details:', userDetails)

    const toastId = toast.loading('Signing in...')
    try {
      const userInfo = {
        email: userDetails.username,
        password: userDetails.password,
      }
      console.log('present', userInfo)

      const res = await login(userInfo).unwrap()

      const user = verifyToken(res.data.accessToken)

      dispatch(setUser({ user: user, token: res.data.accessToken }))
      toast.success('Logged in', { id: toastId, duration: 2000 })

      navigate(`/dashboard`)
    } catch (err) {
      console.log('🚀 ~ handleSubmit ~ err:', err)

      toast.error('Something went wrong', { id: toastId, duration: 2000 })
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="username"
                        placeholder="Username"
                        autoComplete="username"
                        value={userDetails.username}
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={userDetails.password}
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Don&#39;t have an account on the website? Get yourself an account right away!
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
