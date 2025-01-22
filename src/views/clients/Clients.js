/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import DataTable from 'react-data-table-component'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, selectCurrentUserType } from '../../redux/fratures/auth/authSlice'
import {
  useCreateClientMutation,
  useDeleteClientMutation,
  useGetClientsQuery,
  useUpdateClientMutation,
} from '../../redux/fratures/clients/clientsApi'
import ClientDetails from '../../components/expands/ClientDetails'
import ClientModal from './ClientModal'
import { CButton } from '@coreui/react'
import ActionButtons from '../../components/buttons/ActionButtons'
import FilterInput from '../../components/filter/FilterInput'

const Clients = () => {
  const [visible, setVisible] = useState(false)
  const [submitType, setSubmitType] = useState('create')
  const [selectedClient, setSelectedClient] = useState(null)
  const [filterText, setFilterText] = useState('')
  const [formikInstance, setFormikInstance] = useState(null)
  const currentUser = useSelector(selectCurrentUser)

  const dispatch = useDispatch()
  const userType = useSelector(selectCurrentUserType)

  const { data: clientData, isLoading } = useGetClientsQuery()
  console.log('🚀 ~ Clients ~ clientData:', clientData)

  const columns = useMemo(
    () => [
      { name: 'ID', selector: (row) => row?.id, sortable: true },
      { name: 'Client Name', selector: (row) => row?.clientname, sortable: true },
      { name: 'Email', selector: (row) => row?.email },
      { name: 'Phone Number', selector: (row) => row?.mob },
      { name: 'Status', selector: (row) => row?.status, sortable: true },
      // { name: 'Price', selector: (row) => `${row?.price}`, sortable: true },
      { name: 'Currency', selector: (row) => `${row?.currency}`, sortable: true },
      {
        name: 'Actions',
        cell: (row) => (
          <ActionButtons
            onEdit={() => handleEditClient(row)}
            onDelete={() => handleDeleteClient(row)}
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
    if (!clientData?.data) return []
    if (!filterText.trim()) return clientData.data

    return clientData.data.filter((item) =>
      ['clientname', 'email', 'mob', 'status'].some((key) =>
        item[key]?.toLowerCase().includes(filterText.toLowerCase()),
      ),
    )
  }, [clientData, filterText])

  const handleFilterChange = (value) => {
    setFilterText(value)
  }

  const handleEditClient = useCallback((client) => {
    setSubmitType('edit')
    setSelectedClient(client)
    setVisible(true)
  }, [])

  const handleDeleteClient = useCallback((client) => {
    setSubmitType('delete')
    setSelectedClient(client)
    setVisible(true)
  }, [])

  const [createClient, { isLoading: isCreateClientLoading }] = useCreateClientMutation()
  const [updateClient, { isLoading: isUpdateClientLoading }] = useUpdateClientMutation()
  const [deleteClient, { isLoading: isDeleteClientLoading }] = useDeleteClientMutation()

  const handleSaveClient = async (values) => {
    console.log('VAL', values)

    const toastId = toast.loading('Processing...')
    const clientData = {
      address: values?.address,
      clientname: values?.clientname,
      country: values?.country,
      currency: values?.currency,
      email: values?.email,
      extra_info: values?.extra_info,
      mob: values?.mob,
      // price: values?.price,
      status: values?.status,
      user_id: currentUser?.user?.id,
    }

    console.log('SType', submitType)

    try {
      // let response
      switch (submitType) {
        case 'create':
          console.log('client data', clientData)
          await createClient(clientData).unwrap()
          toast.success('Client created successfully!', { id: toastId })
          break
        case 'edit':
          await updateClient({
            clientID: selectedClient?.id,
            clientData: values,
          }).unwrap()
          toast.success('Client updated successfully!', { id: toastId })
          break
        case 'delete':
          if (!selectedClient?.id) {
            throw new Error('Client ID is required for deletion.')
          }
          await deleteClient(selectedClient?.id).unwrap()
          toast.success('Client deleted successfully!', { id: toastId })
          break
        default:
          throw new Error('Unknown action!')
      }
    } catch (error) {
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
            value={filterText}
            onChange={handleFilterChange}
            placeholder="Filter clients..."
          />
        </div>
        <div className="col-12 col-lg-6 text-lg-end">
          <CButton
            className="bg-primary text-white"
            onClick={() => {
              setSubmitType('create')
              setSelectedClient(null)
              setVisible(true)
            }}
          >
            Create New Client
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
          expandableRowsComponent={(props) => <ClientDetails data={props.data} />}
          pagination
          highlightOnHover
        />
      )}

      <ClientModal
        submitType={submitType}
        selectedClient={selectedClient}
        visible={visible}
        setVisible={setVisible}
        onSaveClient={handleSaveClient}
        formikInstance={formikInstance}
        setFormikInstance={setFormikInstance}
      />
    </div>
  )
}

Clients.propTypes = {
  data: PropTypes.array,
  filterText: PropTypes.string,
  submitType: PropTypes.string,
}

export default Clients
