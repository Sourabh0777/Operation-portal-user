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
import axios from 'axios'

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
    mobileNumber: '',
  })
  console.log('🚀 ~ Login ~ userDetails:', userDetails)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('User Details:', userDetails)

    const toastId = toast.loading('Signing in...')
    try {
      const userInfo = {
        phoneNumber: userDetails.mobileNumber,
      }
      const res = await axios.post(`http://localhost:5500/apis/client/get-client`, userInfo
      )

      localStorage.setItem('user_detail',JSON.stringify(res.data.data))
      toast.success('Logged in', { id: toastId, duration: 2000 })
      //dispatch(setUser({ user: res.data.data.email, token: res.data.data.status }))
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
                        name="mobileNumber"
                        placeholder="Mobile Number"
                        autoComplete="additional-name"
                        value={userDetails.mobileNumber}
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
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
