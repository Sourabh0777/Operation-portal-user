/* eslint-disable prettier/prettier */
import * as yup from 'yup'
/* eslint-disable prettier/prettier */
export const clientValidationSchema = yup.object({
  clientname: yup
    .string()
    .required('Client name is required')
    .max(255, 'Client name cannot exceed 255 characters'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required')
    .max(255, 'Email cannot exceed 255 characters'),
  mob: yup
    .string()
    .required('Phone number is required')
    .matches(/^\+?[0-9]{10,15}$/, 'Enter a valid phone number'),
  address: yup.string().max(500, 'Address cannot exceed 500 characters'),
  extra_info: yup.string().max(500, 'Extra info cannot exceed 500 characters'),
  status: yup
    .string()
    .oneOf(['Active', 'Inactive'], 'Invalid status')
    .required('Status is required'),
  country: yup
    .string()
    .required('Country is required')
    .max(255, 'Country cannot exceed 255 characters'),
  currency: yup
    .string()
    .required('Currency is required')
    .max(20, 'Currency cannot exceed 20 characters'),
})
