/* eslint-disable react/prop-types */
import React from 'react'
import { CFormSelect } from '@coreui/react'

const SelectOptions = ({ options, onChange, defaultOption }) => {
  return (
    <CFormSelect className="mb-4" aria-label="Select menu" onChange={onChange}>
      {defaultOption && <option>{defaultOption}</option>}
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </CFormSelect>
  )
}

export default SelectOptions
