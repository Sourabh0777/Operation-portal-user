/* eslint-disable react/prop-types */
import React from 'react'
import { CFormCheck } from '@coreui/react'

const ToggleSwitch = ({ toggleData }) => {
  return (
    <div className="mb-4">
      {toggleData.map((data, index) => (
        <CFormCheck
          key={index}
          id={data.id}
          button={data.button}
          autoComplete={data.autoComplete}
          label={data.label}
        />
      ))}
    </div>
  )
}

export default ToggleSwitch
