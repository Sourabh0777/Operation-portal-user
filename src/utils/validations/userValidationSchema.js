/* eslint-disable prettier/prettier */
import * as yup from 'yup'

export const userValidationSchema = yup.object({
  //   employeeId: yup.string().required('Employee ID is required'),
  //   reportingManagerId: yup.string().required('Reporting Manager ID is required'),
  name: yup.string().required('Name is required'),
  sex: yup.string().required('Sex is required'),
  designation: yup.string().required('Designation is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  mobileNumber: yup.string().nullable(),
  password: yup.string().required('Password is required'),
  emp_type: yup.string().required('Employee type is required'),
  status: yup.string().required('Status is required'),
  doj: yup.date().required('Date of joining is required'),
  experience: yup.string().required('experience field is required'),
})
