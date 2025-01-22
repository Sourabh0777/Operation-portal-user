/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import DataTable from 'react-data-table-component'
import { toast } from 'sonner'
import { CButton } from '@coreui/react'
import FilterInput from '../../components/filter/FilterInput'
import UserModal from './UserModal'
import UserDetails from '../../components/expands/UserDetails'
import UserActionButtons from '../../components/buttons/UserActionButtons'
import { userTypes } from '../../utils/userTypes'
import { selectCurrentUserType } from '../../redux/fratures/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from '../../redux/fratures/users/usersApi'
import { useGetEmployeeProfileByIdQuery } from '../../redux/fratures/employee/employeeApi'

const Users = () => {
  const [visible, setVisible] = useState(false)
  const [submitType, setSubmitType] = useState('create')
  const [selectedUser, setSelectedUser] = useState(null) // To handle selected user data
  const [selectedEmp, setSelectedEmp] = useState(null)
  const [filterText, setFilterText] = useState('') // State for filtering logic
  const [formikInstance, setFormikInstance] = useState(null)

  const userType = useSelector(selectCurrentUserType)

  const { data: userData, isLoading } = useGetUsersQuery()
  console.log('🚀 ~ Users ~ userData:', userData)
  const columns = useMemo(
    () => [
      { name: 'ID', selector: (row) => row.id.toString(), sortable: true },
      { name: 'Employee ID', selector: (row) => row.employeeId, sortable: true },
      { name: 'Name', selector: (row) => row.name, sortable: true },
      { name: 'Email', selector: (row) => row.email },
      { name: 'Phone Number', selector: (row) => row.mobileNumber },
      { name: 'Designation', selector: (row) => row.designation },
      { name: 'Type', selector: (row) => row.emp_type },
      {
        name: 'Actions',
        cell: (row) => (
          <UserActionButtons
            onEdit={() => handleEditUser(row)}
            onDelete={() => handleDeleteUser(row)}
            userType={userType}
          />
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ],
    [userType],
  )

  const filteredData = useMemo(() => {
    if (!userData?.data) return []

    if (!filterText.trim()) {
      return userData.data // Return all data if filter text is empty
    }

    return userData.data.filter((item) =>
      ['name', 'email', 'mobileNumber', 'employeeId', 'designation'].some((key) =>
        item[key]?.toLowerCase().includes(filterText.toLowerCase()),
      ),
    )
  }, [userData, filterText])

  const handleInputChange = (value) => {
    setFilterText(value) // Update filter immediately
  }

  const handleEditUser = (user) => {
    setSubmitType('edit')
    setSelectedUser(user)
    setVisible(true)
  }

  const handleDeleteUser = (user) => {
    setSubmitType('delete')
    setSelectedUser(user)
    setVisible(true)
  }

  const [createUser, { isLoading: isCreateUserLoading }] = useCreateUserMutation()
  const [updateUser, { isLoading: isUpdateClientLoading }] = useUpdateUserMutation()
  const [deleteUser, { isLoading: isDeleteClientLoading }] = useDeleteUserMutation()

  const handleSaveUser = async (values) => {
    console.log('VL', values)

    const toastId = toast.loading('Processing...')
    const newUserData = {
      userData: {
        // employeeId: null,
        reportingManagerId: values?.reportingManagerId,
        name: values?.name,
        sex: values?.sex,
        designation: values?.designation,
        email: values?.email,
        mobileNumber: values?.mobileNumber,
        password: values?.password,
        emp_type: values?.emp_type,
        status: values?.status,
      },
      employeeData: {
        doj: values?.doj,
        mob: values?.mobileNumber,
        type_speed: values?.type_speed,
        experience: values?.experience,
        area_of_exp: values?.area_of_exp,
      },
    }
    console.log('newD', newUserData)

    try {
      // let response
      console.log('ST', submitType)

      switch (submitType) {
        case 'create':
          await createUser(newUserData).unwrap()
          toast.success('User created successfully!', { id: toastId })
          break
        case 'edit':
          await updateUser({
            userID: selectedUser?.id,
            // userData: { name: 'updated from client' },
            userData: newUserData?.userData,
            employeeData: newUserData?.employeeData,
          }).unwrap()
          toast.success('User updated successfully!', { id: toastId })
          break
        case 'delete':
          await deleteUser(selectedUser?.id).unwrap()
          toast.success('User deleted successfully!', { id: toastId })
          break
        default:
          throw new Error('Unknown action!')
      }
    } catch (error) {
      console.log('🚀 ~ handleSaveUser ~ error:', error)
      toast.error('An error occurred. Please try again.', { id: toastId })
    } finally {
      setVisible(false)
    }
  }

  return (
    <div>
      <div className="mb-3 row gx-3 align-items-center">
        <div className="col-12 col-lg-6">
          <FilterInput
            value={filterText} // Directly bind to filterText
            onChange={handleInputChange}
            placeholder="Filter Users..."
          />
        </div>
        <div className="col-12 col-lg-6 text-lg-end">
          <CButton
            className="bg-primary text-white"
            onClick={() => {
              setSubmitType('create')
              setSelectedUser(null)
              setVisible(true)
            }}
          >
            Create New User
          </CButton>
        </div>
      </div>

      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: '300px' }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredData}
          expandableRows
          expandableRowsComponent={(props) => <UserDetails data={props.data} />}
          pagination
          highlightOnHover
        />
      )}

      <UserModal
        submitType={submitType}
        selectedUser={selectedUser}
        visible={visible}
        setVisible={setVisible}
        onSaveUser={handleSaveUser}
        formikInstance={formikInstance}
        setFormikInstance={setFormikInstance}
      />
    </div>
  )
}

Users.propTypes = {
  data: PropTypes.array,
  filterText: PropTypes.string,
  submitType: PropTypes.string,
}

export default Users
