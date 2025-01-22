// /* eslint-disable prettier/prettier */
// /* eslint-disable react/prop-types */
// /* eslint-disable prettier/prettier */
// /* eslint-disable react/no-unescaped-entities */
// /* eslint-disable prettier/prettier */
// // ClientModal.js
// import React from 'react'
// import PropTypes from 'prop-types'
// import OPModal from '../../components/modals/OPModal'
// import ClientForm from '../../components/forms/clients/ClientForm'

// const ClientModal = ({
//   submitType,
//   selectedClient,
//   visible,
//   setVisible,
//   onSaveClient,
//   formikInstance,
//   setFormikInstance,
// }) => {
//   const renderModalContent = () => {
//     if (submitType === 'delete') {
//       return <p>Are you sure you want to delete the client "{selectedClient?.clientname}"?</p>
//     }
//     return (
//       <ClientForm
//         submitType={submitType}
//         client={selectedClient}
//         onSubmit={onSaveClient}
//         setFormikInstance={setFormikInstance}
//       />
//     )
//   }

//   return (
//     <OPModal
//       title={
//         submitType === 'create'
//           ? 'Create New Client'
//           : submitType === 'edit'
//             ? 'Edit Client'
//             : 'Delete Client'
//       }
//       buttonText={submitType === 'delete' ? 'Confirm' : 'Submit'}
//       visible={visible}
//       setVisible={setVisible}
//       onClick={submitType === 'delete' ? () => onSaveClient() : undefined}
//       formik={formikInstance}
//     >
//       {renderModalContent()}
//     </OPModal>
//   )
// }

// ClientModal.propTypes = {
//   submitType: PropTypes.string.isRequired,
//   selectedClient: PropTypes.object,
//   visible: PropTypes.bool.isRequired,
//   setVisible: PropTypes.func.isRequired,
//   onSaveClient: PropTypes.func.isRequired,
//   formikInstance: PropTypes.object,
// }

// export default ClientModal

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import OPModal from '../../components/modals/OPModal'
import ClientForm from '../../components/forms/clients/ClientForm'

const ClientModal = ({
  submitType,
  selectedClient,
  visible,
  setVisible,
  onSaveClient,
  formikInstance,
  setFormikInstance,
}) => {
  // Reset formikInstance when modal closes or submitType changes
  useEffect(() => {
    if (!visible) {
      setFormikInstance(null)
    }
  }, [visible, setFormikInstance])

  useEffect(() => {
    // Reset formikInstance when submitType changes
    setFormikInstance(null)
  }, [submitType, setFormikInstance])

  const handleSubmit = () => {
    if (submitType === 'delete') {
      onSaveClient()
    } else if (formikInstance) {
      formikInstance.handleSubmit()
    }
  }

  const renderModalContent = () => {
    if (submitType === 'delete') {
      // return <p>Are you sure you want to delete the client "{selectedClient?.clientname}"?</p>
      return <p>Are you sure you want to delete the client {selectedClient?.clientname}?</p>
    }
    return (
      <ClientForm
        submitType={submitType}
        client={selectedClient}
        onSubmit={onSaveClient}
        setFormikInstance={setFormikInstance}
      />
    )
  }

  return (
    <OPModal
      title={
        submitType === 'create'
          ? 'Create New Client'
          : submitType === 'edit'
            ? 'Edit Client'
            : 'Delete Client'
      }
      buttonText={submitType === 'delete' ? 'Confirm' : 'Submit'}
      visible={visible}
      setVisible={setVisible}
      onClick={handleSubmit}
      formik={formikInstance}
    >
      {renderModalContent()}
    </OPModal>
  )
}

ClientModal.propTypes = {
  submitType: PropTypes.string.isRequired,
  selectedClient: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  onSaveClient: PropTypes.func.isRequired,
  formikInstance: PropTypes.object,
  setFormikInstance: PropTypes.func.isRequired,
}

export default ClientModal
