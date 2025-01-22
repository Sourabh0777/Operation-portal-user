/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
import { CButton, CCol, CRow } from '@coreui/react'
import React from 'react'

const ButtonOutline = ({ buttonList, variant = 'outline', onClick }) => {
  return (
    <CRow>
      {buttonList.map((button, index) => (
        <CCol key={index}>
          <CButton
            color={button.color}
            variant={variant}
            active={button.state === 'active'}
            disabled={button.state === 'disabled'}
            onClick={() => onClick(button.id)}
          >
            {button.btnData}
          </CButton>
        </CCol>
      ))}
    </CRow>
  )
}

export default ButtonOutline
