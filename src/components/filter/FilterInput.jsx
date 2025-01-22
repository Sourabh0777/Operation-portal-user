/* eslint-disable prettier/prettier */
// FilterInput.js
import React from 'react'
import PropTypes from 'prop-types'

const FilterInput = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="form-control form-control-sm rounded bg-transparent border-muted px-3 py-2"
    />
  )
}

FilterInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

FilterInput.defaultProps = {
  placeholder: 'Filter...',
}

export default FilterInput
