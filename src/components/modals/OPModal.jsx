/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'
import { CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react'

const OPModal = ({
  title,
  onClick,
  buttonText,
  children,
  visible,
  setVisible,
  formik,
  backdrop = false,
}) => {
  const handleButtonClick = () => {
    if (formik && formik.handleSubmit) {
      formik.handleSubmit()
    } else if (onClick) {
      onClick()
    }
  }

  // console.log('ISVALID', formik.isValid)
  // console.log('Formik', formik)

  return (
    <>
      {backdrop ? (
        <CModal
          scrollable
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="OPModalLabel"
          backdrop="static"
        >
          <CModalHeader>
            <CModalTitle id="OPModalLabel">{title}</CModalTitle>
          </CModalHeader>
          <CModalBody>{children}</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton
              color="primary"
              onClick={handleButtonClick}
              disabled={formik ? !formik.isValid || formik.isSubmitting : false}
            >
              {buttonText}
            </CButton>
          </CModalFooter>
        </CModal>
      ) : (
        <CModal
          scrollable
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="OPModalLabel"
        >
          <CModalHeader>
            <CModalTitle id="OPModalLabel">{title}</CModalTitle>
          </CModalHeader>
          <CModalBody>{children}</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton
              color="primary"
              onClick={handleButtonClick}
              disabled={formik ? !formik.isValid || formik.isSubmitting : false}
            >
              {buttonText}
            </CButton>
          </CModalFooter>
        </CModal>
      )}
    </>
  )
}

OPModal.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  buttonText: PropTypes.string,
  children: PropTypes.node,
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  formik: PropTypes.object,
}

OPModal.defaultProps = {
  onClick: null,
  buttonText: 'Save changes',
  children: null,
  formik: null,
}

export default OPModal
