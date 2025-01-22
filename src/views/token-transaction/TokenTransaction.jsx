/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component'
import FilterInput from '../../components/filter/FilterInput'
import debounce from 'lodash.debounce'
import { useSelector } from 'react-redux'
import { selectCurrentUserType } from '../../redux/fratures/auth/authSlice'
import { useGetJobTokenReceiptsQuery } from '../../redux/fratures/jobTokenReceipt/jobTokenReceiptApi'

const TokenTransaction = () => {
  const [filterText, setFilterText] = useState('')
  const [debouncedFilterText, setDebouncedFilterText] = useState('')
  const [reportType, setReportType] = useState('daily')
  const [dateInput, setDateInput] = useState('')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [monthInput, setMonthInput] = useState('')
  const [yearInput, setYearInput] = useState('')

  const startDate =
    reportType === 'daily' ? dateInput : reportType === 'weekly' ? dateRange.start : ''
  const endDate = reportType === 'weekly' ? dateRange.end : ''

  // Extract year and monthIndex for 'monthly' reportType
  let year, monthIndex
  if (reportType === 'monthly' && monthInput) {
    const [inputYear, inputMonth] = monthInput.split('-')
    year = parseInt(inputYear, 10) // Extract year
    monthIndex = parseInt(inputMonth, 10) - 1 // Convert month to 0-indexed
  }

  const {
    data: tokenData,
    isLoading,
    isError,
  } = useGetJobTokenReceiptsQuery({
    startDate,
    type: reportType,
    endDate,
    monthIndex: reportType === 'monthly' ? monthIndex : undefined,
    year: reportType === 'monthly' ? year : reportType === 'yearly' ? yearInput : undefined,
  })

  console.log('🚀 ~ ProductionReport ~ filteredJobs:', reportType, year, tokenData)

  const userType = useSelector(selectCurrentUserType)

  const columns = useMemo(
    () => [
      {
        name: 'ID',
        selector: (row) => row.id,
        sortable: true,
      },
      {
        name: 'Job ID',
        selector: (row) => row.job_id,
        sortable: true,
      },
      {
        name: 'Client',
        selector: (row) => row?.job?.client?.clientname,
        sortable: true,
      },
      {
        name: 'User',
        selector: (row) => row.user?.name,
        sortable: true,
      },
      {
        name: 'Date',
        selector: (row) => new Date(row?.created_at)?.toDateString(),
        sortable: true,
      },
    ],
    [],
  )

  const filteredData = useMemo(() => {
    if (!tokenData?.data) return []
    if (!filterText.trim()) return tokenData?.data

    return tokenData?.data?.filter((item) =>
      ['id', 'job_id', 'client.clientname', 'user.name'].some((key) => {
        const value = key.split('.').reduce((obj, prop) => obj?.[prop], item)
        return value?.toLowerCase().includes(filterText.toLowerCase())
      }),
    )
  }, [tokenData, filterText])

  const handleFilterChange = (value) => {
    setFilterText(value)
  }

  const handleReportTypeChange = (e) => {
    setReportType(e.target.value)
    updateDateInputs(e.target.value)
  }

  const handleDateChange = (e) => {
    setDateInput(e.target.value)
  }

  const handleDateRangeChange = (key, value) => {
    setDateRange((prev) => ({ ...prev, [key]: value }))
  }

  const handleMonthChange = (e) => {
    setMonthInput(e.target.value)
  }

  const handleYearChange = (e) => {
    setYearInput(e.target.value)
  }

  const updateDateInputs = (type) => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const day = currentDate.getDate().toString().padStart(2, '0')

    switch (type) {
      case 'daily':
        setDateInput(`${year}-${month}-${day}`)
        break
      case 'weekly':
        const startOfWeek = new Date(currentDate)
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
        const startYear = startOfWeek.getFullYear()
        const startMonth = (startOfWeek.getMonth() + 1).toString().padStart(2, '0')
        const startDay = startOfWeek.getDate().toString().padStart(2, '0')
        setDateRange({
          start: `${startYear}-${startMonth}-${startDay}`,
          end: `${year}-${month}-${day}`,
        })
        break
      case 'monthly':
        setMonthInput(`${year}-${month}`)
        break
      case 'yearly':
        setYearInput(year.toString())
        break
    }
  }

  useEffect(() => {
    updateDateInputs(reportType)
  }, [])

  const ExpandedComponent = ({ data }) => (
    <div className=" d-flex justify-content-center py-4">
      <a href={data?.screenshot_url?.replace('\\', '/')} target="_blank" rel="noopener noreferrer">
        View Screenshot
      </a>
    </div>
  )

  return (
    <div>
      <div className="mb-3 row gx-3 align-items-center">
        <div className="col-12 col-lg-6">
          <FilterInput
            value={filterText}
            onChange={handleFilterChange}
            placeholder="Filter token..."
          />
        </div>
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

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        expandableRows
        expandableRowsComponent={ExpandedComponent}
      />
    </div>
  )
}

export default TokenTransaction
