/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { CFormInput, CFormSelect, CAlert, CFormTextarea } from '@coreui/react'
import { userValidationSchema } from '../../../utils/validations/userValidationSchema'
import { users_emp_type } from '../../../utils/userEmployeeTypes'
import {
  useGetEmployeeProfileByIdQuery,
  useGetEmployeeProfilesQuery,
} from '../../../redux/fratures/employee/employeeApi'
import { data } from 'autoprefixer'

const UserForm = ({ submitType, user = {}, onSubmit, setFormikInstance }) => {
  const { data: employeeResponse, isLoading, error, refetch } = useGetEmployeeProfilesQuery()
  const employees = employeeResponse?.data || []
  useEffect(() => {
    if (submitType === 'create' || submitType === 'update') {
      refetch()
    }
  }, [submitType])

  // const empData = emp?.data

  console.log('inituser', user)

  const initialValues = {
    // employeeId: user?.employeeId || '',
    reportingManagerId: user?.reportingManagerId || '',
    name: user?.name || '',
    sex: user?.sex || 'Male',
    designation: user?.designation || '',
    email: user?.email || '',
    mobileNumber: user?.mobileNumber || '',
    password: '', // Do not pre-fill passwords for security reasons
    emp_type: user?.emp_type || 'Admin',
    status: user?.status || 'Active',
    doj: user?.employeeprofile?.doj ? user?.employeeprofile?.doj.split('T')[0] : '',
    type_speed: user?.employeeprofile?.type_speed || '',
    experience: user?.employeeprofile?.experience || '',
    area_of_exp: user?.employeeprofile?.area_of_exp || '',
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={userValidationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSubmit(values)
          .then(() => {
            resetForm()
            refetch()
          })
          .catch((err) => {
            console.error('Error submitting form:', err)
          })
          .finally(() => setSubmitting(false))
      }}
    >
      {(formik) => {
        React.useEffect(() => {
          setFormikInstance(formik)
        }, [])

        return (
          <Form id="userForm">
            {/* <Field name="employeeId">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormInput
                    label="Employee ID"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                    placeholder="Enter employee ID"
                  />
                </div>
              )}
            </Field>
*/}

            {/* <Field name="reportingManagerId">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormInput
                    label="Reporting Manager ID"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                    placeholder="Enter reporting manager ID"
                  />
                </div>
              )}
            </Field> */}
            <Field name="reportingManagerId">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormSelect
                    label="Reporting Manager"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                    disabled={isLoading}
                  >
                    <option value="">Select Reporting Manager</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.user?.name}{' '}
                      </option>
                    ))}
                  </CFormSelect>
                  {error && (
                    <div className="text-danger mt-1">Error loading clients. Please try again.</div>
                  )}
                  {isLoading && <div className="text-muted mt-1">Loading clients...</div>}
                </div>
              )}
            </Field>

            <Field name="name">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormInput
                    label="Name"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                    placeholder="Enter name"
                  />
                </div>
              )}
            </Field>

            <Field name="sex">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormSelect label="Sex" {...field} invalid={meta.touched && Boolean(meta.error)}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </CFormSelect>
                </div>
              )}
            </Field>

            <Field name="designation">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormInput
                    label="Designation"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                    placeholder="Enter designation"
                  />
                </div>
              )}
            </Field>

            <Field name="email">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormInput
                    label="Email"
                    type="email"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                    placeholder="Enter email"
                  />
                </div>
              )}
            </Field>

            <Field name="mobileNumber">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormInput
                    label="Mobile Number"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                    placeholder="Enter mobile number"
                  />
                </div>
              )}
            </Field>

            <Field name="password">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormInput
                    label="Password"
                    type="password"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                    placeholder="Enter password"
                  />
                </div>
              )}
            </Field>

            <Field name="emp_type">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormSelect
                    label="Employee Type"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                  >
                    <option value="">Select Status</option>
                    {Object.entries(users_emp_type).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </CFormSelect>
                </div>
              )}
            </Field>

            <Field name="status">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormSelect
                    label="Status"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </CFormSelect>
                </div>
              )}
            </Field>

            <Field name="doj">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormInput
                    label="Date of Joining"
                    type="date"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                  />
                </div>
              )}
            </Field>

            <Field name="type_speed">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormInput
                    label="Type Speed"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                    placeholder="Enter type speed"
                  />
                </div>
              )}
            </Field>

            <Field name="experience">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormInput
                    label="Experience"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                    placeholder="Enter experience"
                  />
                </div>
              )}
            </Field>

            <Field name="area_of_exp">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormTextarea
                    label="Area of Expertise"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                    placeholder="Enter area of expertise"
                  />
                </div>
              )}
            </Field>

            {formik.errors.submit && <CAlert color="danger">{formik.errors.submit}</CAlert>}
          </Form>
        )
      }}
    </Formik>
  )
}

export default UserForm
