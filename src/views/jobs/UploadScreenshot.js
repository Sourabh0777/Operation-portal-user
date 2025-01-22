/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { CButton, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilX } from '@coreui/icons'

const UploadScreenshot = ({ onClose, image, setImage }) => {
  const [previewUrl, setPreviewUrl] = useState(image ? URL.createObjectURL(image) : null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    setPreviewUrl(null)
    document.getElementById('payment-screenshot').value = ''
  }

  const handleInputClick = (e) => {
    e.stopPropagation()
  }

  return (
    <div>
      <CRow>
        <CCol md={12}>
          <div className="mb-3 position-relative">
            <label className="form-label">Choose Screenshot</label>
            <input
              type="file"
              id="payment-screenshot"
              name="payment-screenshot"
              accept="image/*"
              onChange={handleFileChange}
              className="form-control"
              onClick={handleInputClick}
            />
          </div>
        </CCol>
      </CRow>

      {previewUrl && (
        <div className="mb-3 position-relative">
          <img src={previewUrl} alt="Preview" className="img-fluid rounded" />
          <CButton
            color="danger"
            size="sm"
            className="position-absolute top-0 end-0"
            onClick={handleRemoveImage}
          >
            <CIcon icon={cilX} className="text-white" />
          </CButton>
        </div>
      )}
    </div>
  )
}

export default UploadScreenshot
