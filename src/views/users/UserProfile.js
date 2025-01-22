import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
  CRow,
  CCol,
  CFormLabel,
  CSpinner,
} from '@coreui/react'
import { useGetUsersQuery, useUpdateUserMutation } from '../../redux/fratures/users/usersApi'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../redux/fratures/auth/authSlice'
import { users_emp_type } from '../../utils/userEmployeeTypes'

const UserProfile = () => {
  // const { id } = useParams()
  const { data: userData, isLoading } = useGetUsersQuery()
  const [updateUser] = useUpdateUserMutation()
  const [isEditing, setIsEditing] = useState(false)
  const currentUserData = useSelector(selectCurrentUser)

  const [formData, setFormData] = useState({})

  React.useEffect(() => {
    if (currentUserData?.user) {
      setFormData(currentUserData?.user)
      console.log('Current user data:', currentUserData?.user)
    }
  }, [currentUserData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const toastId = toast.loading('Updating profile...')

    try {
      // console.log('id', currentUserData?.user?.id)

      // const newFormData = {

      // }
      await updateUser({
        userID: currentUserData?.user?.id,
        userData: {
          ...formData,
          // employeeId: currentUserData?.user?.employeeId, // Ensure employeeId remains unchanged
          // emp_type: currentUserData?.user?.emp_type, // Ensure emp_type remains unchanged
          status: currentUserData?.user?.status, // Ensure status remains unchanged
        },
        employeeData: {
          employeeId: currentUserData?.user?.employeeId, // Ensure employeeId remains unchanged
          emp_type: currentUserData?.user?.emp_type, // Ensure emp_type remains unchanged
        },
      }).unwrap()
      toast.success('Profile updated successfully!', { id: toastId })
      setIsEditing(false)
    } catch (error) {
      console.error('Update failed:', error)
      toast.error('Failed to update profile. Please try again.', { id: toastId })
    }
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
        <CSpinner color="primary" />
      </div>
    )
  }

  if (!currentUserData) {
    return <div>User not found</div>
  }

  return (
    <div className="container-lg">
      <CCard className="mb-4">
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">User Profile</h4>
          <CButton
            color={isEditing ? 'danger' : 'primary'}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CRow>
              {/* Basic Information Section */}
              <CCol md={6}>
                <h5 className="mb-3">Basic Information</h5>

                <div className="mb-3">
                  <CFormLabel>Employee ID</CFormLabel>
                  <CFormInput
                    name="employeeId"
                    value={formData.employeeId || ''}
                    disabled // Always disabled
                  />
                </div>

                <div className="mb-3">
                  <CFormLabel>Name</CFormLabel>
                  <CFormInput
                    name="name"
                    value={formData.name || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="mb-3">
                  <CFormLabel>Email</CFormLabel>
                  <CFormInput
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="mb-3">
                  <CFormLabel>Mobile Number</CFormLabel>
                  <CFormInput
                    name="mobileNumber"
                    value={formData.mobileNumber || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </CCol>

              {/* Professional Information Section */}
              <CCol md={6}>
                <h5 className="mb-3">Professional Information</h5>

                <div className="mb-3">
                  <CFormLabel>Designation</CFormLabel>
                  <CFormInput
                    name="designation"
                    value={formData.designation || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="mb-3">
                  <CFormLabel>Employee Type</CFormLabel>
                  <CFormSelect
                    name="emp_type"
                    value={formData.emp_type || ''}
                    disabled // Always disabled
                  >
                    <option value="">Select Status</option>
                    {Object.entries(users_emp_type).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </CFormSelect>
                </div>

                <div className="mb-3">
                  <CFormLabel>Status</CFormLabel>
                  <CFormSelect
                    name="status"
                    value={formData.status || 'Active'}
                    disabled // Always disabled
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </CFormSelect>
                </div>

                <div className="mb-3">
                  <CFormLabel>Sex</CFormLabel>
                  <CFormSelect
                    name="sex"
                    value={formData.sex || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </CFormSelect>
                </div>
              </CCol>
            </CRow>

            {isEditing && (
              <div className="d-flex justify-content-end mt-4">
                <CButton type="submit" color="primary">
                  Save Changes
                </CButton>
              </div>
            )}
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default UserProfile
