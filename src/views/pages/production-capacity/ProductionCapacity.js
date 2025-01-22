/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component'
import FilterInput from '../../../components/filter/FilterInput'
import debounce from 'lodash.debounce'
import { useSelector } from 'react-redux'
import { useGetProductionCapacityQuery } from '../../../redux/fratures/jobFIlter/jobFilterApi'
import { selectCurrentUserType } from '../../../redux/fratures/auth/authSlice'

const ProductionCapacity = () => {
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
    data: productionCapacity,
    isLoading,
    isError,
  } = useGetProductionCapacityQuery({
    startDate,
    type: reportType,
    endDate,
    monthIndex: reportType === 'monthly' ? monthIndex : undefined,
    year: reportType === 'monthly' ? year : reportType === 'yearly' ? yearInput : undefined,
  })

  console.log('🚀 ~ ProductionReport ~ filteredJobs:', reportType, productionCapacity)

  const userType = useSelector(selectCurrentUserType)

  const columns = useMemo(
    () => [
      {
        name: 'Team Leader',
        selector: (row) => row?.reportingManager,
        sortable: true,
      },
      {
        name: 'Total Projects',
        selector: (row) => row.totalProjects,
        sortable: true,
      },
      {
        name: 'Total Completed',
        selector: (row) => row.totalCompleted,
        sortable: true,
      },
      {
        name: 'Fresh Jobs',
        selector: (row) => row.freshJobs,
        sortable: true,
      },
      {
        name: 'Reworks',
        selector: (row) => row.reworks,
        sortable: true,
      },
      {
        name: 'Total Revenue',
        selector: (row) => `${row.totalRevenue.toLocaleString()}`,
        sortable: true,
      },
    ],
    [userType],
  )

  const filteredData = useMemo(() => {
    if (!productionCapacity?.data) return []
    if (!filterText.trim()) return productionCapacity.data

    return productionCapacity?.data?.filter((item) =>
      ['teamLeader'].some((key) => item[key]?.toLowerCase().includes(filterText?.toLowerCase())),
    )
  }, [productionCapacity, filterText])

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

  // useEffect(() => {
  //   const debounceFilter = debounce(() => {
  //     setDebouncedFilterText(filterText)
  //   }, 500)

  //   debounceFilter()

  //   return () => {
  //     debounceFilter.cancel()
  //   }
  // }, [filterText])

  useEffect(() => {
    updateDateInputs(reportType)
  }, [])

  return (
    <div>
      <div className="mb-3 row gx-3 align-items-center">
        <div className="col-12 col-lg-6">
          <FilterInput
            value={filterText}
            onChange={handleFilterChange}
            placeholder="Filter by team leader..."
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

      <DataTable columns={columns} data={filteredData} pagination highlightOnHover />
    </div>
  )
}

export default ProductionCapacity
