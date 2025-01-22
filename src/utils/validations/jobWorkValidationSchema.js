import * as yup from 'yup'

export const jobworksValidationSchema = yup.object().shape({
  // jobnumber: yup.string().required('Job number is required'),
  jobtype: yup.string().required('Job type is required'),
  category: yup.string().required('Category is required'),
  client_id: yup.number().required('Client ID is required').positive().integer(),
  // receive_date: yup.date().required('Receive date is required'),
  deadline: yup.date().required('Deadline is required'),
  words: yup.string().required('Words field is required'),
  requirement: yup.string().required('Requirement is required'),
  drive_link: yup.string().url('Must be a valid URL').nullable(),
  // extra_notes: yup.string().max(1000, 'Extra notes cannot exceed 1000 characters').nullable(),

  // user_id: yup.number().required('User ID is required').positive().integer(),
  user_id: yup.number().positive().integer(),
  // price: yup
  //   .number()
  //   .typeError('Price must be a valid number')
  //   .positive('Price must be a positive value')
  //   .required('Price is required'),
  // status: yup.string().required('Status is required'),
  extra_notes: yup.string().nullable(),
  // attachment: yup.string().required('Attachment is required'),
})
