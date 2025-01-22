/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
// ClientModal.js
import React from 'react'
import PropTypes from 'prop-types'
import OPModal from '../../components/modals/OPModal'
import JobWorksForm from '../../components/forms/jobs/JobWorksForm'

const JobModal = ({
  submitType,
  selectedJob,
  visible,
  setVisible,
  onSaveJob,
  formikInstance,
  setFormikInstance,
}) => {
  const renderModalContent = () => {
    if (submitType === 'delete') {
      return <p>Are you sure you want to delete the job "{selectedJob?.jobnumber}"?</p>
    }
    if (submitType === 'reject') {
      return <p>Are you sure you want to reject the job "{selectedJob?.jobnumber}"?</p>
    }
    return (
      <JobWorksForm
        submitType={submitType}
        job={selectedJob}
        onSubmit={onSaveJob}
        setFormikInstance={setFormikInstance}
      />
    )
  }

  return (
    <OPModal
      title={
        submitType === 'create'
          ? 'Create New Job'
          : submitType === 'edit'
            ? 'Edit Job'
            : submitType === 'reject'
              ? 'Reject Job'
              : 'Delete Job'
      }
      buttonText={submitType === 'delete' || submitType === 'reject' ? 'Confirm' : 'Submit'}
      visible={visible}
      setVisible={setVisible}
      onClick={submitType === 'delete' || submitType === 'reject' ? () => onSaveJob() : undefined}
      formik={formikInstance}
    >
      {renderModalContent()}
    </OPModal>
  )
}

JobModal.propTypes = {
  submitType: PropTypes.string.isRequired,
  selectedJob: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  onSaveJob: PropTypes.func.isRequired,
  formikInstance: PropTypes.object,
}

export default JobModal
