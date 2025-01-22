/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component'
import { CButton } from '@coreui/react'
import { toast } from 'sonner'
import JobWorkDetails from '../../components/expands/JobWorksDetails'
import ActionButtons from '../../components/buttons/ActionButtons'
import FilterInput from '../../components/filter/FilterInput'
import debounce from 'lodash.debounce'
import JobModal from './JobModal'
import { userTypes } from '../../utils/userTypes'
import OPModal from '../../components/modals/OPModal'
import JobTypeSelector from './JobTypeSelector'
import payment from '../../assets/images/payment.png'
import { selectCurrentUser, selectCurrentUserType } from '../../redux/fratures/auth/authSlice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  useCreateJobWorkMutation,
  useDeleteJobWorkMutation,
  useGetJobWorksQuery,
  useUpdateJobWorkMutation,
} from '../../redux/fratures/jobWorks/jobWorksApi'
import { jobStatuses } from '../../utils/jobStatuses'
import { useGetJobAssignsQuery } from '../../redux/fratures/jobassignes/jobAssignsApi'
const JobWorks = () => {
  const [visible, setVisible] = useState(false)
  const [approvevisible, setApproveVisible] = useState(false)
  const [tokenApprovevisible, setTokenApproveVisible] = useState(false)
  const [submitType, setSubmitType] = useState('create')
  const [filterText, setFilterText] = useState('')
  const [selectedJob, setSelectedJob] = useState(null)
  const [debouncedFilterText, setDebouncedFilterText] = useState('')
  const [formikInstance, setFormikInstance] = useState(null)
  const [approvalDetails, setApprovalDetails] = useState(null)
  const [errors, setErrors] = useState({})
  const userType = useSelector(selectCurrentUserType)
  const currentUser = useSelector(selectCurrentUser)

  // const { data: jobAssignData, isLoading: jobAssignIsLoading } = useGetJobAssignsQuery()
  const navigate = useNavigate()
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user_detail')) || '')

  const { data: jobData, isLoading } = useGetJobWorksQuery({ client_id: Number(userData.id) })

  useEffect(() => {
    if (!userData) {
      navigate('/login')
    }
  }, [userData])

  const columns = useMemo(
    () => [
      {
        name: 'Job Number',
        selector: (row) => row.jobnumber,
        sortable: true,
      },
      {
        name: 'Job Type',
        selector: (row) => row.jobtype,
        sortable: true,
      },
      {
        name: 'Category',
        selector: (row) => row.category,
      },
      {
        name: 'Client',
        selector: (row) => row.client?.clientname,
      },
      {
        name: 'Deadline',
        selector: (row) => new Date(row?.deadline)?.toDateString(),
        sortable: true,
      },
      {
        name: 'Price',
        selector: (row) => row?.price,
        sortable: true,
      },
      {
        name: 'Status',
        selector: (row) => row.status,
        sortable: true,
      },
      {
        name: 'Actions',
        cell: (row) => (
          <ActionButtons
            onEdit={() => handleEditJob(row)}
            onDelete={() => handleDeleteJob(row)}
            onApprove={() => handleApproveJob(row)}
            onReject={() => handleRejectJob(row)}
            onTokenApprove={() => handleApproveTokenMoney(row)}
            userType={userType}
            jobStatus={row.status}
            tokenReceipt={row?.job_token_money_receipt}
          />
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width: userType === userTypes.ADMIN ? '230px' : '160px',
      },
    ],
    [userType],
  )
  const [filteredData, setFilteredData] = useState([])
  console.log('🚀 ~ JobWorks ~ filteredData:', filteredData)

  useEffect(() => {
    if (jobData) {
      const jobDataCopy = jobData.data

      const filterData = jobDataCopy.map((job) => {
        // Create a shallow copy of the job object
        const updatedJob = { ...job }

        if (updatedJob?.jobassigns.length > 0) {
          try {
            updatedJob.status = updatedJob?.jobassigns[0].status
          } catch (error) {
            console.log('🚀 ~ filterData ~ error:', error)
          }
        }

        return updatedJob // Always return the updated job
      })

      setFilteredData(filterData)
    }
  }, [jobData, filterText])

  const handleApproveTokenMoney = (job) => {
    setSubmitType('approve_token')
    setTokenApproveVisible(true)
    setSelectedJob(job)
  }
  const handleApproveJob = (job) => {
    setSubmitType('approve')
    setApproveVisible(true)
    setSelectedJob(job)
  }
  const handleRejectJob = (job) => {
    setSubmitType('reject')
    setSelectedJob(job)
    setVisible(true)
  }

  const handleEditJob = (job) => {
    setSubmitType('edit')
    setSelectedJob(job)
    setVisible(true)
  }

  const handleDeleteJob = (job) => {
    setSubmitType('delete')
    setSelectedJob(job)
    setVisible(true)
  }

  const [createJob, { isLoading: isCreateJobLoading }] = useCreateJobWorkMutation()
  const [updateJob, { isLoading: isUpdateJobLoading }] = useUpdateJobWorkMutation()
  const [deleteJob, { isLoading: isDeleteJobLoading }] = useDeleteJobWorkMutation()
  const handleSaveJob = async (values) => {
    const toastId = toast.loading('Processing...')

    try {
      // Prepare FormData for API request
      const formData = new FormData()

      // Safely append attachments if any
      if (values?.attachment) {
        // Ensure attachment is a FileList or an array
        const attachments =
          values?.attachment instanceof FileList
            ? Array.from(values.attachment)
            : Array.isArray(values.attachment)
              ? values.attachment
              : [values.attachment]

        attachments.forEach((file) => {
          formData.append('attachments', file)
        })
      }

      // Collect job data to append to FormData
      const jobWorksData = {
        category: values?.category,
        client_id: values?.client_id,
        // deadline: values?.deadline,
        deadline: values?.deadline ? new Date(values.deadline).toISOString() : null,
        drive_link: values?.drive_link,
        extra_notes: values?.extra_notes,
        jobnumber: values?.jobnumber,
        jobtype: values?.jobtype,
        // price: values.price,
        receive_date: values?.receive_date,
        requirement: values?.requirement,
        status: 'pending',
        words: values?.words,
        user_id: currentUser?.user?.id,
      }

      // Append jobData as a JSON string
      formData.append('jobData', JSON.stringify(jobWorksData))

      // Perform validation for approval action
      if (submitType === 'approve') {
        const validationErrors = {}

        if (!values?.jobType) {
          validationErrors.jobtype = 'Please select a job type'
        }

        if (!values?.price || values.price <= 0) {
          validationErrors.price = 'Please enter a valid price'
        }

        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors)
          toast.error('Please fill in all required fields', { id: toastId })
          return
        }
      }

      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          // console.log(key, value.name, value.type, value.size)
        } else {
          // console.log(key, value)
        }
      }

      // Handle different submit actions
      switch (submitType) {
        case 'create':
          await createJob(formData).unwrap()
          toast.success('Job created successfully!', { id: toastId })
          break

        case 'edit':
          if (!selectedJob?.id) {
            throw new Error('Job ID is required for editing.')
          }
          // For edit, we need to handle attachments differently
          // const editFormData = new FormData()
          // editFormData.append(
          //   'jobData',
          //   JSON.stringify({
          //     ...jobWorksData,
          //     id: selectedJob.id,
          //   }),
          // )
          // if (values.attachment) {
          //   const attachments =
          //     values.attachment instanceof FileList
          //       ? Array.from(values.attachment)
          //       : Array.isArray(values.attachment)
          //         ? values.attachment
          //         : [values.attachment]
          //   attachments.forEach((file) => {
          //     editFormData.append('attachments', file)
          //   })
          // }
          await updateJob({
            jobWorksID: selectedJob?.id,
            jobWorksData: jobWorksData,
          }).unwrap()
          toast.success('Job updated successfully!', { id: toastId })
          break
        case 'delete':
          if (!selectedJob?.id) {
            throw new Error('Job ID is required for deletion.')
          }
          await deleteJob(selectedJob?.id).unwrap()
          toast.success('Job deleted successfully!', { id: toastId })
          break

        case 'approve':
          await updateJob({
            jobWorksID: selectedJob?.id,
            jobWorksData: {
              jobtype: values?.jobType?.value,
              price: +values?.price,
              status: jobStatuses?.APPROVE,
            },
          }).unwrap()
          toast.success('Job approved successfully!', { id: toastId })
          break

        case 'reject':
          await updateJob({
            jobWorksID: selectedJob?.id,
            jobWorksData: {
              status: jobStatuses?.REJECTED,
            },
          }).unwrap()
          toast.success('Job rejected successfully!', { id: toastId })
          break

        case 'approve_token':
          await updateJob({
            jobWorksID: selectedJob?.id,
            jobWorksData: {
              status: jobStatuses?.TOKEN_APPROVED,
            },
          }).unwrap()
          toast.success('Token receipt approved successfully!', { id: toastId })
          break

        default:
          throw new Error('Unknown action type.')
      }
    } catch (error) {
      console.error('Error in handleSaveJob:', error)
      toast.error(error?.response?.data?.message || 'An error occurred. Please try again.', {
        id: toastId,
      })
    } finally {
      // Reset visibility states
      setVisible(false)
      setApproveVisible(false)
      setTokenApproveVisible(false)
    }
  }

  const handleFilterChange = (value) => {
    setFilterText(value)
  }

  // useEffect(() => {
  //   const debounceFilter = debounce(() => {
  //     setDebouncedFilterText(filterText)
  //   }, 500)

  //   debounceFilter()

  //   return () => {
  //     debounceFilter.cancel()
  //   }
  // }, [filterText])

  return (
    <div>
      <div className="mb-3 row gx-3 align-items-center">
        <div className="col-12 col-lg-6">
          <FilterInput
            value={filterText}
            onChange={handleFilterChange}
            placeholder="Filter jobs..."
          />
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
          expandableRowsComponent={(props) => <JobWorkDetails data={props.data} />}
          pagination
          highlightOnHover
        />
      )}

      {/* <JobModal
        submitType={submitType}
        selectedJob={selectedJob}
        visible={visible}
        setVisible={setVisible}
        onSaveJob={handleSaveJob}
        formikInstance={formikInstance}
        setFormikInstance={setFormikInstance}
      /> */}
      <OPModal
        title="Approve Job"
        visible={approvevisible}
        setVisible={setApproveVisible}
        onClick={() => handleSaveJob(approvalDetails)}
        buttonText="Submit"
      >
        <JobTypeSelector
          jobTypes={['Fresh', 'Rework', 'Demo']}
          onChange={(details) => {
            setApprovalDetails(details)
            // setErrors((prevErrors) => {
            //   const newErrors = { ...prevErrors }
            //   if (details.jobType) {
            //     delete newErrors.jobType
            //   }
            //   if (details.price) {
            //     delete newErrors.price
            //   }
            //   return newErrors
            // })
          }}
          validationErrors={errors}
        />
      </OPModal>
      {/* <OPModal
        title="Approve Token Money"
        visible={tokenApprovevisible}
        setVisible={setTokenApproveVisible}
        onClick={() => handleSaveJob()}
        buttonText="Approve"
      >
        Image preview for token money receipt
        {selectedJob?.job_token_money_receipt[0]?.screenshot_url ? (
          <div className="text-center">
            <img
              src={selectedJob.job_token_money_receipt[0]?.screenshot_url}
              alt="Token Money Receipt"
              style={{
                maxWidth: '100%',
                maxHeight: '300px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
            <p className="text-muted mt-2">Token Money Receipt</p>
          </div>
        ) : (
          <p className="text-danger text-center">No receipt available.</p>
        )}
      </OPModal> */}
    </div>
  )
}

export default JobWorks
