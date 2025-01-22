/* eslint-disable react/prop-types */
import React from 'react'
import { CFormSwitch } from '@coreui/react'

const SwitchComponent = ({ switches }) => {
  return (
    <div>
      {switches.map((switchData, index) => (
        <CFormSwitch
          className="mb-4"
          key={index}
          id={switchData.id}
          label={switchData.label}
          defaultChecked={switchData.defaultChecked}
          disabled={switchData.disabled}
        />
      ))}
    </div>
  )
}

export default SwitchComponent
