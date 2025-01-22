/* eslint-disable react/prop-types */
import React from 'react'
import { CFormCheck } from '@coreui/react'

const RadioToggle = ({ radios }) => {
  return (
    <div className="mb-4">
      {radios.map((radio, index) => (
        <CFormCheck
          key={index}
          button={radio.button}
          type="radio"
          name={radio.name}
          id={radio.id}
          autoComplete={radio.autoComplete}
          label={radio.label}
          defaultChecked={radio.defaultChecked}
        />
      ))}
    </div>
  )
}

export default RadioToggle
