/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
// ActionButtons.js
import React from 'react'
import PropTypes from 'prop-types'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilCheckCircle, cilMedicalCross, cilX } from '@coreui/icons'
import { userTypes } from '../../utils/userTypes'
import { jobStatuses } from '../../utils/jobStatuses'

const ActionButtons = ({
  onEdit,
  onDelete,
  onApprove,
  onReject,
  userType,
  jobStatus,
  tokenReceipt,
  onTokenApprove,
}) => (
  <div>
    {userType &&
      (userType === userTypes.ACCOUNTS || userType === userTypes.ADMIN) &&
      jobStatus === jobStatuses.APPROVE &&
      tokenReceipt[0]?.screenshot_url &&
      !tokenReceipt?.approvalStatus && (
        <CButton color="success" size="sm" className="me-2 text-white" onClick={onTokenApprove}>
          <CIcon icon={cilCheckCircle} /> Approve Token
        </CButton>
      )}
    {userType &&
      (userType === userTypes.MARKETING ||
        userType === userTypes.OPERATION ||
        userType === userTypes.ADMIN) &&
      jobStatus === jobStatuses.PENDING && (
        <CButton color="success" size="sm" className="me-2 text-white" onClick={onApprove}>
          <CIcon icon={cilCheckCircle} />
        </CButton>
      )}
    {userType &&
      (userType === userTypes.MARKETING ||
        userType === userTypes.OPERATION ||
        userType === userTypes.ADMIN) &&
      jobStatus === jobStatuses.PENDING && (
        <CButton color="danger" size="sm" className="me-2 text-white" onClick={onReject}>
          <CIcon icon={cilX} />
        </CButton>
      )}
    {(userType === userTypes.MARKETING ||
      userType === userTypes.SALES ||
      userType === userTypes.OPERATION ||
      userType === userTypes.ADMIN) && (
      <>
        <CButton color="primary" size="sm" className="me-2" onClick={onEdit}>
          <CIcon icon={cilPencil} />
        </CButton>
        <CButton color="danger" size="sm" onClick={onDelete}>
          <CIcon icon={cilTrash} className="text-white" />
        </CButton>
      </>
    )}
  </div>
)

ActionButtons.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onApprove: PropTypes.func, // Optional, as it may not always be used
  userType: PropTypes.string.isRequired,
  jobStatus: PropTypes.string.isRequired,
}

export default ActionButtons
