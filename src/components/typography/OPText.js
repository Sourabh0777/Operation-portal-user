/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react'

const OPText = ({ text, classes }) => {
  return (
    <div>
      <span className={`text-success ${classes}`}>{text}</span>
    </div>
  )
}

export default OPText
