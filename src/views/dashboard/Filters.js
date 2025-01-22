/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react'
import FilterInput from '../../components/filter/FilterInput'

const Filters = ({
  reportType,
  handleReportTypeChange,
  dateInput,
  handleDateChange,
  dateRange,
  handleDateRangeChange,
  monthInput,
  handleMonthChange,
  yearInput,
  handleYearChange,
}) => {
  return (
    <div className="mb-3 row gx-3 align-items-center">
      <div className="col-12 col-lg-6 d-flex align-items-center">
        <select className="form-select me-3" value={reportType} onChange={handleReportTypeChange}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        {reportType === 'daily' && (
          <input
            type="date"
            className="form-control"
            value={dateInput}
            onChange={handleDateChange}
          />
        )}
        {reportType === 'weekly' && (
          <div className="d-flex align-items-center">
            <input
              type="date"
              className="form-control me-2"
              value={dateRange.start}
              onChange={(e) => handleDateRangeChange('start', e.target.value)}
            />
            <input
              type="date"
              className="form-control"
              value={dateRange.end}
              onChange={(e) => handleDateRangeChange('end', e.target.value)}
            />
          </div>
        )}
        {reportType === 'monthly' && (
          <input
            type="month"
            className="form-control"
            value={monthInput}
            onChange={handleMonthChange}
          />
        )}
        {reportType === 'yearly' && (
          <input
            type="number"
            className="form-control"
            placeholder="Year"
            value={yearInput}
            onChange={handleYearChange}
          />
        )}
      </div>
    </div>
  )
}

export default Filters
