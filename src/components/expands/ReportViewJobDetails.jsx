/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilPencil,
  cilTrash,
  cilClipboard,
  cilFlagAlt,
  cilClock,
  cilUser,
  cilInbox,
  cilPaperclip,
  cilInfo,
  cilCalendar,
} from '@coreui/icons'
import OPModal from '../modals/OPModal'
import UploadScreenshot from '../../views/jobs/UploadScreenshot'
import { CButton } from '@coreui/react'
import { userTypes } from '../../utils/userTypes'
import { jobStatuses } from '../../utils/jobStatuses'

const InfoItem = ({ icon, label, value, fullWidth = false }) => (
  <div className={`d-flex align-items-start mb-2 ${fullWidth ? 'col-12' : 'col-md-6'}`}>
    <div className="me-3">
      <CIcon icon={icon} size="" className="text-muted" />
    </div>
    <div>
      <p className="text-muted p-0 m-0 mb-1">{label}</p>
      <p className="fw-bold text-dark p-0 m-0">{value}</p>
    </div>
  </div>
)

const ReportViewJobDetails = ({ data }) => {
  console.log('🚀 ~ ReportViewJobDetails ~ data:', data)
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  const userType = userTypes.ADMIN

  return (
    <div className="p-3">
      <div className="p-4 border rounded shadow-sm bg-white">
        <div className="row">
          <InfoItem icon={cilClipboard} label="Job Number" value={data.jobnumber} />
          <InfoItem icon={cilInbox} label="Category" value={data.category} />
          <InfoItem icon={cilFlagAlt} label="Status" value={data.status} />
          <InfoItem
            icon={cilCalendar}
            label="Receive Date"
            value={new Date(data.receive_date).toLocaleDateString()}
          />
          <InfoItem
            icon={cilClock}
            label="Deadline"
            value={new Date(data.deadline).toLocaleDateString()}
          />
          <InfoItem icon={cilUser} label="Assigned User ID" value={data.user_id} />
          <InfoItem
            icon={cilInfo}
            label="Extra Notes"
            value={data.extra_notes || 'N/A'}
            fullWidth
          />
          <InfoItem
            icon={cilPaperclip}
            label="Attachment"
            value={data.attachment || 'No Attachment'}
          />
        </div>
        <div className=" row mt-4">
          {data?.job_token_money_receipt?.url && data?.job_token_money_receipt?.approvalStatus ? (
            <div>
              <InfoItem icon={cilClipboard} label="Receipt" value={'Token Money Receipt'} />
              <img
                src={data?.job_token_money_receipt?.url}
                alt="Preview"
                className="rounded"
                style={{
                  height: '300px',
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default ReportViewJobDetails
