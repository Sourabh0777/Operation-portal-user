/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilPencil,
  cilTrash,
  cilUser,
  cilEnvelopeOpen,
  cilPhone,
  cilDollar,
  cilLocationPin,
  cilInfo,
  cilClock,
  cilBriefcase,
  cilFlagAlt,
} from '@coreui/icons'

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

const UserDetails = ({ data }) => {
  return (
    <div className="p-3">
      <div className="p-4 border rounded shadow-sm bg-white">
        <div className="d-flex justify-content-between align-items-center mb-4">
          {/* Uncomment for edit and delete actions */}
          {/* 
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-outline-primary">
              <CIcon icon={cilPencil} />
            </button>
            <button className="btn btn-sm btn-outline-danger">
              <CIcon icon={cilTrash} />
            </button>
          </div>
          */}
        </div>

        <div className="row">
          <InfoItem icon={cilUser} label="Name" value={data.name} />
          <InfoItem icon={cilEnvelopeOpen} label="Email" value={data.email} />
          <InfoItem icon={cilPhone} label="Phone Number" value={data.mobileNumber || 'N/A'} />
          <InfoItem icon={cilBriefcase} label="Designation" value={data.designation || 'N/A'} />
          <InfoItem icon={cilDollar} label="Employee Type" value={data.emp_type} />
          <InfoItem icon={cilUser} label="Employee ID" value={data.employeeId} />
          <InfoItem icon={cilUser} label="Manager ID" value={data.reportingManagerId} />
          <InfoItem icon={cilFlagAlt} label="Status" value={data.status} />
          <InfoItem
            icon={cilClock}
            label="Email Verified At"
            value={
              data.email_verified_at ? new Date(data.email_verified_at).toLocaleString() : 'N/A'
            }
          />
          <InfoItem
            icon={cilClock}
            label="Created At"
            value={data.created_at ? new Date(data.created_at).toLocaleString() : 'N/A'}
          />
          <InfoItem
            icon={cilClock}
            label="Updated At"
            value={data.updated_at ? new Date(data.updated_at).toLocaleString() : 'N/A'}
          />
          <InfoItem
            icon={cilLocationPin}
            label="Parent ID"
            value={data.parent_id !== 0 ? data.parent_id : 'N/A'}
            fullWidth
          />
        </div>
      </div>
    </div>
  )
}

export default UserDetails
