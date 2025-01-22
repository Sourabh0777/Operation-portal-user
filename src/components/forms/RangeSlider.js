/* eslint-disable react/prop-types */
import React from 'react'
import { CFormLabel, CFormRange } from '@coreui/react'

// eslint-disable-next-line react/prop-types
const RangeSlider = ({ ranges }) => {
  return (
    <div className="mb-4">
      {ranges.map((range, index) => (
        <CFormRange
          key={index}
          min={range.min}
          max={range.max}
          step={range.step}
          defaultValue={range.defaultValue}
          id={range.id}
        />
      ))}
    </div>
  )
}

export default RangeSlider
