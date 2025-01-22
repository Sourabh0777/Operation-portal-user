/* eslint-disable prettier/prettier */
import React from 'react'
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

const PrevDashboard = () => {
  const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger']
  const cardData = [
    {
      title: 'Card 1',
      description: 'This is the description for card 1.',
      imageUrl: 'https://via.placeholder.com/150',
      buttonText: 'Read More',
      buttonLink: '#',
    },
    {
      title: 'Card 2',
      description: 'This is the description for card 2.',
      imageUrl: 'https://via.placeholder.com/150',
      buttonText: 'Learn More',
      buttonLink: '#',
    },
    {
      title: 'Card 3',
      description: 'This is the description for card 3.',
      imageUrl: 'https://via.placeholder.com/150',
      buttonText: 'Explore',
      buttonLink: '#',
    },
  ]
  const actions = [
    { href: '#', label: 'Action' },
    { href: '#', label: 'Another action' },
    { href: '#', label: 'Something else here' },
    { type: 'divider' },
    { href: '#', label: 'Separated link' },
  ]
  const buttonData = [
    { id: 1, color: 'primary', state: 'active', btnData: 'Button 1' },
    { id: 2, color: 'secondary', state: 'active', btnData: 'Button 2' },
    { id: 3, color: 'success', state: 'disabled', btnData: 'Button 3' },
    { id: 4, color: 'danger', state: 'active', btnData: 'Button 4' },
  ]

  const handleButtonClick = (id) => {
    console.log(`Button with ID ${id} clicked`)
  }

  const selectOptions = [
    { value: '1', label: 'One' },
    { value: '2', label: 'Two' },
    { value: '3', label: 'Three' },
  ]

  const handleSelectChange = (event) => {
    console.log(`Selected value: ${event.target.value}`)
  }

  const switchData = [
    {
      id: 'formSwitchCheckDefault',
      label: 'Default switch checkbox input',
      defaultChecked: false,
      disabled: false,
    },
    {
      id: 'formSwitchCheckChecked',
      label: 'Checked switch checkbox input',
      defaultChecked: true,
      disabled: false,
    },
    {
      id: 'formSwitchCheckDisabled',
      label: 'Disabled switch checkbox input',
      defaultChecked: false,
      disabled: true,
    },
    {
      id: 'formSwitchCheckCheckedDisabled',
      label: 'Disabled checked switch checkbox input',
      defaultChecked: true,
      disabled: true,
    },
  ]
  const checkData = [
    {
      id: 'btn-check-1',
      button: { color: 'danger' },
      autoComplete: 'off',
      label: 'Single toggle 1',
    },
    // {
    //   id: 'btn-check-2',
    //   button: { color: 'danger' },
    //   autoComplete: 'off',
    //   label: 'Single toggle 2',
    // },
  ]
  const radioData = [
    {
      button: { color: 'success', variant: 'outline' },
      type: 'radio',
      name: 'options-outlined',
      id: 'success-outlined',
      autoComplete: 'off',
      label: 'Radio Success',
      defaultChecked: true,
    },
    {
      button: { color: 'danger', variant: 'outline' },
      type: 'radio',
      name: 'options-outlined',
      id: 'danger-outlined',
      autoComplete: 'off',
      label: 'Radio Danger',
      defaultChecked: false,
    },
  ]
  const rangeData = [
    {
      min: 0,
      max: 5,
      step: 0.5,
      defaultValue: 3,
      id: 'customRange1',
    },
    {
      defaultValue: 10,
      id: 'customRange2',
    },
    {
      min: 0,
      max: 5,
      step: 0.5,
      defaultValue: 3,
      id: 'customRange1',
    },
    {
      min: 0,
      max: 5,
      step: 0.5,
      defaultValue: 3,
      id: 'customRange1',
    },
    {
      min: 0,
      max: 5,
      step: 0.5,
      defaultValue: 3,
      id: 'customRange1',
    },
    {
      min: 0,
      max: 5,
      step: 0.5,
      defaultValue: 3,
      id: 'customRange1',
    },
  ]
  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

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
    },
  ]

  const widgetData = [
    {
      value: '$98.111,00',
      title: 'Widget Title 1',
      progress: { color: 'warning', value: 89.9 },
      text: 'Lorem ipsum dolor sit amet enim.',
    },
    {
      value: '$45.222,00',
      title: 'Widget Title 2',
      progress: { color: 'success', value: 76.5 },
      text: 'Consectetur adipiscing elit.',
    },
    {
      value: '$12.345,00',
      title: 'Widget Title 3',
      progress: { color: 'danger', value: 50 },
      text: 'Nulla volutpat aliquam velit.',
    },
    {
      value: '$67.890,00',
      title: 'Widget Title 4',
      progress: { color: 'info', value: 92 },
      text: 'Phasellus iaculis neque.',
    },
  ]

  const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

  const widgetChartData = [
    {
      value: '1,123',
      title: 'Widget Chart 1 (Bar)',
      chartType: 'bar', // Bar chart
      chartData: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M'],
        datasets: [
          {
            backgroundColor: '#e55353',
            borderColor: 'transparent',
            borderWidth: 1,
            data: Array(15)
              .fill(0)
              .map(() => random(40, 100)),
          },
        ],
      },
      chartOptions: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
      },
    },
    {
      value: '2,345',
      title: 'Widget Chart 2 (Bar)',
      chartType: 'bar', // Bar chart
      chartData: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M'],
        datasets: [
          {
            backgroundColor: '#f9b115',
            borderColor: 'transparent',
            borderWidth: 1,
            data: Array(15)
              .fill(0)
              .map(() => random(40, 100)),
          },
        ],
      },
      chartOptions: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
      },
    },
    {
      value: '3,567',
      title: 'Widget Chart 3 (Line)',
      chartType: 'line', // Line chart
      chartData: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M'],
        datasets: [
          {
            backgroundColor: 'transparent',
            borderColor: '#00c2e0',
            borderWidth: 2,
            data: Array(15)
              .fill(0)
              .map(() => random(40, 100)),
          },
        ],
      },
      chartOptions: {
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.4,
          },
          point: {
            radius: 0,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
      },
    },
    {
      value: '4,789',
      title: 'Widget Chart 4 (Line)',
      chartType: 'line', // Line chart
      chartData: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M'],
        datasets: [
          {
            backgroundColor: 'transparent',
            borderColor: '#f9b115',
            borderWidth: 2,
            data: Array(15)
              .fill(0)
              .map(() => random(40, 100)),
          },
        ],
      },
      chartOptions: {
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.4,
          },
          point: {
            radius: 0,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
      },
    },
  ]

  const widgetStatsListData = [
    {
      icon: cilSettings,
      title: 'Income',
      value: '$1,999.50',
      color: 'primary',
    },
    {
      icon: cilUser,
      title: 'Users',
      value: '1,250',
      color: 'info',
    },
    {
      icon: cilMoon,
      title: 'Night Mode',
      value: 'Active',
      color: 'warning',
    },
    {
      icon: cilBell,
      title: 'Notifications',
      value: '3 New Alerts',
      color: 'danger',
    },
  ]

  const widgetStatsCData = [
    {
      icon: cilPeople,
      value: '87.500',
      title: 'Visitors',
      progressColor: 'info',
      progressValue: 75,
    },
    {
      icon: cilUserFollow,
      value: '385',
      title: 'New Clients',
      progressColor: 'success',
      progressValue: 75,
    },
    {
      icon: cilBasket,
      value: '1238',
      title: 'Products sold',
      progressColor: 'warning',
      progressValue: 75,
    },
    {
      icon: cilChartPie,
      value: '28%',
      title: 'Returning Visitors',
      progressColor: 'primary',
      progressValue: 75,
    },
    {
      icon: cilSpeedometer,
      value: '5:34:11',
      title: 'Avg. Time',
      progressColor: 'danger',
      progressValue: 75,
    },
  ]

  const barCharts = [
    {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: '#f87979',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
        },
      ],
    },
    {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Quarterly Sales',
          backgroundColor: '#4e73df',
          data: [120, 150, 170, 200],
        },
      ],
    },
  ]

  const lineCharts = [
    {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(220, 220, 220, 0.2)',
          borderColor: 'rgba(220, 220, 220, 1)',
          pointBackgroundColor: 'rgba(220, 220, 220, 1)',
          pointBorderColor: '#fff',
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
          ],
        },
        {
          label: 'My Second dataset',
          backgroundColor: 'rgba(151, 187, 205, 0.2)',
          borderColor: 'rgba(151, 187, 205, 1)',
          pointBackgroundColor: 'rgba(151, 187, 205, 1)',
          pointBorderColor: '#fff',
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
          ],
        },
      ],
    },
  ]

  const doughnutCharts = [
    {
      labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
      datasets: [
        {
          backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
          data: [40, 20, 80, 10],
        },
      ],
    },
  ]

  const pieCharts = [
    {
      labels: ['Red', 'Green', 'Yellow'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    },
  ]

  const polarCharts = [
    {
      labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
      datasets: [
        {
          data: [11, 16, 7, 3, 14],
          backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB'],
        },
      ],
    },
  ]

  const radarCharts = [
    {
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(220, 220, 220, 0.2)',
          borderColor: 'rgba(220, 220, 220, 1)',
          pointBackgroundColor: 'rgba(220, 220, 220, 1)',
          pointBorderColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220, 220, 220, 1)',
          data: [65, 59, 90, 81, 56, 55, 40],
        },
        {
          label: 'My Second dataset',
          backgroundColor: 'rgba(151, 187, 205, 0.2)',
          borderColor: 'rgba(151, 187, 205, 1)',
          pointBackgroundColor: 'rgba(151, 187, 205, 1)',
          pointBorderColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(151, 187, 205, 1)',
          data: [28, 48, 40, 19, 96, 27, 100],
        },
      ],
    },
  ]

  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <div>
        <h2>Widget Display</h2>
        <WidgetDisplay widgets={widgetData} />
      </div>
      <div>
        <h2>Widget Chart Display</h2>
        <WidgetChartDisplay widgets={widgetChartData} />
      </div>
      <div>
        <h2>Widget Stats List</h2>
        <WidgetStatsList widgets={widgetStatsListData} />
      </div>
      <div>
        <h2>Widget Stats C List</h2>
        <WidgetStatsCList widgets={widgetStatsCData} />
      </div>
      <OPText text={'Operations portal'} classes={'h3 text-danger'} />
      <h2>Buttons Outline</h2>
      <ButtonOutline buttonList={buttonData} onClick={handleButtonClick} />
      <div>
        <h2>Dropdown Buttons</h2>
        <ButtonDropdown colors={colors} actions={actions} />
      </div>
      <h2>Select Dropdown</h2>
      <SelectOptions
        options={selectOptions}
        onChange={handleSelectChange}
        defaultOption="Open this select menu"
      />
      <h2>Switch Component</h2>
      <SwitchComponent switches={switchData} />
      <h2>Toggle switch</h2>
      <ToggleSwitch toggleData={checkData} />

      <h2> Radio Toggle</h2>
      <RadioToggle radios={radioData} />
      <h2>Bar Chart</h2>
      <BarChart charts={barCharts} />
      <h2>Line Chart</h2>
      <LineChart charts={lineCharts} />
      <h2>Doughnut Chart</h2>
      <DoughnutChart charts={doughnutCharts} />
      <h2>Pie Chart</h2>
      <PieChart charts={pieCharts} />
      <h2>Polar Area Chart</h2>
      <PolarAreaChart charts={polarCharts} />
      <h2>Radar Charts</h2>
      <RadarChart charts={radarCharts} />
      <h2> Range Slider</h2>
      <RangeSlider ranges={rangeData} />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
              <div className="small text-body-secondary">January - July 2023</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChart />
        </CCardBody>
        <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center"
          >
            {progressExample.map((item, index, items) => (
              <CCol
                className={classNames({
                  'd-none d-xl-block': index + 1 === items.length,
                })}
                key={index}
              >
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold text-truncate">
                  {item.value} ({item.percent}%)
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>
      <WidgetsBrand className="mb-4" withCharts />
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Traffic {' & '} Sales</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-body-secondary text-truncate small">New Clients</div>
                        <div className="fs-5 fw-semibold">9,123</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          Recurring Clients
                        </div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow>
                  <hr className="mt-0" />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-body-secondary small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info" value={item.value1} />
                        <CProgress thin color="danger" value={item.value2} />
                      </div>
                    </div>
                  ))}
                </CCol>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Pageviews</div>
                        <div className="fs-5 fw-semibold">78,623</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Organic</div>
                        <div className="fs-5 fw-semibold">49,123</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.value} />
                      </div>
                    </div>
                  ))}

                  <div className="mb-5"></div>

                  {progressGroupExample3.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-body-secondary small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow>

              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Country
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Usage</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Payment Method
                    </CTableHeaderCell>
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
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex justify-content-between text-nowrap">
                          <div className="fw-semibold">{item.usage.value}%</div>
                          <div className="ms-3">
                            <small className="text-body-secondary">{item.usage.period}</small>
                          </div>
                        </div>
                        <CProgress thin color={item.usage.color} value={item.usage.value} />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.payment.icon} />
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

export default PrevDashboard
