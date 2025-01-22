import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
  cilPlus,
  cilList,
  cilChart,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import OPText from '../../components/typography/OPText'
import ReactImg from 'src/assets/images/react.jpg'
import ButtonOutline from '../../components/buttons/ButtonOutline'
import ButtonDropdown from '../../components/buttons/ButtonDropdown'
import SelectOptions from '../../components/forms/SelectOptions'
import SwitchComponent from '../../components/forms/SwitchComponent'
import ToggleSwitch from '../../components/forms/ToggleSwitch'
import { data } from 'autoprefixer'
import RadioToggle from '../../components/forms/RadioToggle'
import RangeSlider from 'src/components/forms/RangeSlider.js'
import WidgetDisplay from '../../components/widgets/WidgetDisplay'
import WidgetChartDisplay from '../../components/widgets/WidgetChartDisplay'
import WidgetStatsList from '../../components/widgets/WidgetStatsList'
import { cilSettings, cilMoon, cilBell } from '@coreui/icons'
import WidgetStatsCList from '../../components/widgets/WidgetStatsCList'
import { cilUserFollow, cilBasket, cilChartPie, cilSpeedometer } from '@coreui/icons'

import BarChart from '../../components/forms/charts/BarChart'
import LineChart from '../../components/forms/charts/LineChart'
import DoughnutChart from '../../components/forms/charts/DoughnutChart'
import PieChart from '../../components/forms/charts/PieChart'
import PolarAreaChart from '../../components/forms/charts/PolarAreaChart'
import RadarChart from '../../components/forms/charts/RadarChart'
import DashboardBoxWidget from '../widgets/DashboardBoxWidgets'
import Filters from './Filters'

const Dashboard = () => {
  const [filterText, setFilterText] = useState('')
  const [debouncedFilterText, setDebouncedFilterText] = useState('')
  const [reportType, setReportType] = useState('daily')
  const [dateInput, setDateInput] = useState('')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [monthInput, setMonthInput] = useState('')
  const [yearInput, setYearInput] = useState('')
  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

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

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
      userType: 'Admin',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
      userType: 'Marketing',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2023' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
      userType: 'Admin',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2023' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
      userType: 'Admin',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
      userType: 'Sales',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
      userType: 'Sales',
    },
  ]

  const widgetStatsCData = [
    {
      icon: cilPeople,
      value: '87',
      title: 'Clients',
      progressColor: 'info',
      progressValue: 100,
    },
    {
      icon: cilList,
      value: '385',
      title: 'New Jobs',
      progressColor: 'success',
      progressValue: 100,
    },
    {
      icon: cilChart,
      value: '123',
      title: 'Completed',
      progressColor: 'warning',
      progressValue: 100,
    },
    {
      icon: cilChartPie,
      value: '28',
      title: 'Pending',
      progressColor: 'primary',
      progressValue: 100,
    },
    {
      icon: cilSpeedometer,
      value: '99%',
      title: 'Success Rate',
      progressColor: 'danger',
      progressValue: 100,
    },
  ]

  return (
    <>
      <DashboardBoxWidget className="mb-4" />
      <div>
        <Filters
          dateInput={dateInput}
          dateRange={dateRange}
          handleDateChange={handleDateChange}
          handleDateRangeChange={handleDateRangeChange}
          handleMonthChange={handleMonthChange}
          handleReportTypeChange={handleReportTypeChange}
          handleYearChange={handleYearChange}
          monthInput={monthIndex}
          yearInput={year}
          reportType={reportType}
        />
      </div>
      <div className=" mb-4">
        <WidgetStatsCList widgets={widgetStatsCData} />
      </div>

      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Revenue
              </h4>
              <div className="small text-body-secondary">January - July 2023</div>
            </CCol>
            {/* <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
            </CCol> */}
          </CRow>
          <MainChart />
        </CCardBody>
      </CCard>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Type
                    </CTableHeaderCell>
                    {/* <CTableHeaderCell className="bg-body-tertiary">Usage</CTableHeaderCell> */}
                    {/* <CTableHeaderCell className="bg-body-tertiary text-center">
                      Payment Method
                    </CTableHeaderCell> */}
                    <CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-body-secondary text-nowrap">
                          <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                          {item.user.registered}
                        </div>
                      </CTableDataCell>
                      {/* <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                      </CTableDataCell> */}
                      {/* <CTableDataCell>
                        <div className="d-flex justify-content-between text-nowrap">
                          <div className="fw-semibold">{item.usage.value}%</div>
                          <div className="ms-3">
                            <small className="text-body-secondary">{item.usage.period}</small>
                          </div>
                        </div>
                        <CProgress thin color={item.usage.color} value={item.usage.value} />
                      </CTableDataCell> */}
                      <CTableDataCell className="text-center">
                        {/* <CIcon size="xl" icon={item?.userType} /> */}
                        <div className="fw-semibold text-nowrap">{item?.userType}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-body-secondary text-nowrap">Last login</div>
                        <div className="fw-semibold text-nowrap">{item.activity}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
