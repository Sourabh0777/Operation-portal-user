/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

const JobTypeSelector = ({ jobTypes, onChange, validationErrors }) => {
  // console.log('🚀 ~ JobTypeSelector ~ validationErrors:', validationErrors)
  const [selectedJobType, setSelectedJobType] = useState(null)
  const [price, setPrice] = useState('')

  const handleJobTypeChange = (selectedOption) => {
    setSelectedJobType(selectedOption)
    onChange({ jobType: selectedOption, price })
  }

  const handlePriceChange = (event) => {
    const inputValue = event.target.value
    setPrice(inputValue)
    onChange({ jobType: selectedJobType, price: inputValue })
  }

  const jobTypeOptions = jobTypes.map((type) => ({
    value: type,
    label: type,
  }))

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: validationErrors?.jobType
        ? 'red'
        : state.isFocused
          ? base.borderColor
          : '#ced4da',
      boxShadow:
        state.isFocused && !validationErrors?.jobType ? '0 0 0 0.2rem rgba(0,123,255,.25)' : 'none',
      '&:hover': {
        borderColor: validationErrors?.jobType ? 'red' : base.borderColor,
      },
    }),
  }

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="jobType" className="form-label text-muted">
          Select Job Type
        </label>
        <Select
          id="jobType"
          options={jobTypeOptions}
          onChange={handleJobTypeChange}
          placeholder="Select job type..."
          styles={customStyles}
        />
        {validationErrors?.jobType && (
          <div className="text-danger" style={{ fontSize: '14px' }}>
            {validationErrors.jobType}
          </div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label text-muted">
          Enter Price
        </label>
        <input
          id="price"
          type="number"
          className={`form-control ${validationErrors?.price ? 'border-danger' : ''}`}
          placeholder="Enter price..."
          value={price}
          onChange={handlePriceChange}
        />
        {validationErrors?.price && (
          <div className="text-danger" style={{ fontSize: '14px' }}>
            {validationErrors.price}
          </div>
        )}
      </div>
    </div>
  )
}

JobTypeSelector.propTypes = {
  jobTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default JobTypeSelector
