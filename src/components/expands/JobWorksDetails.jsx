/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import CIcon from '@coreui/icons-react'
import { useDispatch } from 'react-redux'
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
import { addOrUpdateChat, getAllChats } from '../../redux/fratures/chat/chatSlice'
import { Link } from 'react-router-dom'
import { useCreateJobTokenReceiptMutation } from '../../redux/fratures/jobTokenReceipt/jobTokenReceiptApi'
import { useSelector } from 'react-redux'
import { selectCurrentUser, selectCurrentUserType } from '../../redux/fratures/auth/authSlice'
import { toast } from 'sonner'
import {
  useAppendJobFilesMutation,
  useDeleteJobFileMutation,
} from '../../redux/fratures/jobWorks/jobWorksApi'

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

const JobWorkDetails = ({ data }) => {
  console.log('🚀 ~ JobWorkDetails ~ data:', data)
  const [image, setImage] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)

  const [createJobTokenReceipt] = useCreateJobTokenReceiptMutation()
  const [selectedFiles, setSelectedFiles] = useState(null)

  const currentUser = JSON.parse(localStorage.getItem('user_detail'))

  const chats = useSelector(getAllChats)
  const dispatch = useDispatch()

  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)
  const handleShowUploadModal = () => setShowUploadModal(true)
  const handleCloseUploadModal = () => setShowUploadModal(false)

  const handleEnableChat = () => {
    window.dispatchEvent(new Event('chatToggle'))
    const existingChat = chats.find((chat) => chat.chatId === data.id)
    if (!existingChat) {
      dispatch(
        addOrUpdateChat({
          userId: currentUser.id,
          chatId: data.id,
          recipientId: data.jobassigns[0].user_id,
          chatOpenState: true,
          messages: [],
        }),
      )
    } else {
      dispatch(
        addOrUpdateChat({
          chatId: data.id,
          chatOpenState: true,
        }),
      )
    }
  }

  const handleFileSelection = (files) => {
    setSelectedFiles(files) // Store selected files in state
  }

  return (
    <div className="p-3">
      <div className="p-4 border rounded shadow-sm bg-white">
        <div className="d-flex justify-content-end align-items-center mb-4">
          {/* Add a button for approved job status */}
          {data.status === jobStatuses.APPROVE &&
            !data?.job_token_money_receipt[0]?.screenshot_url &&
            (userType === userTypes.SALES || userType === userTypes.ADMIN) && (
              <CButton color="primary" onClick={handleShowModal}>
                Upload Token Money Screenshot
              </CButton>
            )}
          {
            // data.status === jobStatuses.STARTED
            // &&
            <CButton color="primary" onClick={handleEnableChat}>
              Start Chat
            </CButton>
          }
        </div>
        z
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
          <div className={`d-flex align-items-start mb-2 col-12`}>
            <div className="me-3">
              <CIcon icon={cilPaperclip} size="" className="text-muted" />
            </div>
            <div>
              <p className="text-muted p-0 m-0 mb-1">Attachments</p>
              <div>
                {JSON.parse(data?.attachment)?.map((item, i) => (
                  <div key={i} className="d-flex justify-content-between align-items-center mb-2">
                    <Link
                      to={`${encodeURIComponent(item)}`}
                      className="text-primary hover:underline"
                    >
                      {i + 1}. {item}
                    </Link>
                    <CIcon
                      icon={cilTrash}
                      className="text-danger cursor-pointer"
                      onClick={() => {
                        handleDeleteAttachment(item)
                        // console.log('iterm', item)
                      }}
                    />
                  </div>
                ))}
                <CButton color="primary" onClick={handleShowUploadModal}>
                  Add More Attachments
                </CButton>
              </div>
            </div>
          </div>
        </div>
        <div className=" row mt-4">
          {data?.job_token_money_receipt[0]?.screenshot_url &&
          data?.job_token_money_receipt[0]?.approvalStatus ? (
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
      {/* <OPModal
        title="Upload Payment Screenshot"
        visible={showModal}
        setVisible={setShowModal}
        buttonText="Upload"
        backdrop={true}
        onClick={handleUploadTokenMoneySS}
      >
        <UploadScreenshot image={image} setImage={setImage} onClose={handleCloseModal} />
      </OPModal> */}
      {/* <OPModal
        title="Add Attachments"
        visible={showUploadModal}
        setVisible={setShowUploadModal}
        buttonText="Upload"
        backdrop={true}
        onClick={(e) => handleAddAttachment(e.target.files)}
      >
        <input
          type="file"
          multiple
          className="form-control"
          onChange={(e) => handleAddAttachment(e.target.files)}
        />
      </OPModal> */}
      {/* <OPModal
        title="Add Attachments"
        visible={showUploadModal}
        setVisible={setShowUploadModal}
        buttonText="Upload"
        backdrop={true}
        onClick={handleUploadAttachments} // Trigger upload only on button click
      >
        <input
          type="file"
          multiple
          className="form-control"
          onChange={(e) => handleFileSelection(e.target.files)} // Store selected files
        />
      </OPModal> */}
    </div>
  )
}

export default JobWorkDetails
