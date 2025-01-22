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
  flagSet,
  cilFlagAlt,
} from '@coreui/icons'
import { useGetUserByIdQuery } from '../../redux/fratures/users/usersApi'
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

const ClientDetails = ({ data }) => {
  console.log('🚀 ~ ClientDetails ~ data:', data)
  const { data: userResponse, isLoading, error } = useGetUserByIdQuery(data.user_id)
  const user = userResponse?.data || []
  return (
    <div className="p-3">
      <div className="p-4 border rounded shadow-sm bg-white">
        <div className="d-flex justify-content-between align-items-center mb-4">
          {/* <h5 className="text-primary fw-bold">Client Details</h5> */}
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
          <InfoItem icon={cilUser} label="Name" value={data.clientname} />
          <InfoItem icon={cilEnvelopeOpen} label="Email" value={data.email} />
          <InfoItem icon={cilPhone} label="Phone" value={data.mob} />
          <InfoItem icon={cilFlagAlt} label="Country" value={data.country} />
          <InfoItem icon={cilDollar} label="Price" value={`${data.price} ${data.currency}`} />
          <InfoItem icon={cilUser} label="Created By" value={user?.name} />
          <InfoItem icon={cilLocationPin} label="Address" value={data.address || 'N/A'} fullWidth />
          <InfoItem icon={cilInfo} label="Extra Info" value={data.extra_info || 'N/A'} fullWidth />
          <InfoItem
            icon={cilClock}
            label="Created At"
            value={new Date(data.created_at).toLocaleString()}
          />
        </div>
      </div>
    </div>
  )
}

export default ClientDetails
