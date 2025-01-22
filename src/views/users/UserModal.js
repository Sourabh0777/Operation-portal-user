/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
// UserModal.js
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import OPModal from '../../components/modals/OPModal'
import UserForm from '../../components/forms/users/UserForm'
import { useGetEmployeeProfileByIdQuery } from '../../redux/fratures/employee/employeeApi'

const UserModal = ({
  submitType,
  selectedUser,
  visible,
  setVisible,
  onSaveUser,
  formikInstance,
  setFormikInstance,
}) => {
  useEffect(() => {
    if (!visible) {
      setFormikInstance(null)
    }
  }, [visible, setFormikInstance])

  useEffect(() => {
    // Reset formikInstance when submitType changes
    setFormikInstance(null)
  }, [submitType, setFormikInstance])

  const handleSubmit = () => {
    if (submitType === 'delete') {
      onSaveUser()
    } else if (formikInstance) {
      formikInstance.handleSubmit()
    }
  }
  const renderModalContent = () => {
    // const {
    //   data: empResponse,
    //   isEmpLoading,
    //   empError,
    // } = useGetEmployeeProfileByIdQuery(selectedUser?.employeeId)
    if (submitType === 'delete') {
      return <p>Are you sure you want to delete the user "{selectedUser?.name}"?</p>
    }
    return (
      <UserForm
        submitType={submitType}
        user={selectedUser}
        onSubmit={onSaveUser}
        setFormikInstance={setFormikInstance}
        // emp={empResponse}
      />
    )
  }

  return (
    <OPModal
      title={
        submitType === 'create'
          ? 'Create New User'
          : submitType === 'edit'
            ? 'Edit User'
            : 'Delete User'
      }
      buttonText={submitType === 'delete' ? 'Confirm' : 'Submit'}
      visible={visible}
      setVisible={setVisible}
      // onClick={submitType === 'delete' ? () => onSaveUser() : undefined}
      onClick={handleSubmit}
      formik={formikInstance}
    >
      {renderModalContent()}
    </OPModal>
  )
}

UserModal.propTypes = {
  submitType: PropTypes.string.isRequired,
  selectedUser: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  onSaveUser: PropTypes.func.isRequired,
  formikInstance: PropTypes.object,
}

export default UserModal
