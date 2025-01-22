/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { CForm, CFormInput, CFormSelect, CFormTextarea, CAlert } from '@coreui/react'
import { clientValidationSchema } from '../../../utils/validations/clientValidationSchema'
import { clientStatus } from '../../../utils/clientStatus'

const ClientForm = ({ submitType, client = {}, onSubmit, setFormikInstance }) => {
  const initialValues = {
    clientname: client?.clientname || '',
    email: client?.email || '',
    mob: client?.mob || '',
    address: client?.address || '',
    extra_info: client?.extra_info || '',
    status: client?.status || 'Active',
    country: client?.country || 'India',
    // price: client?.price || 0,
    currency: client?.currency || 'Rupees',
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={clientValidationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSubmit(values)
          .then(() => {
            resetForm()
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
          <Form id="clientForm">
            <Field name="clientname">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormInput
                    label="Client Name"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                    placeholder="Enter client name"
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

            <Field name="mob">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormInput
                    label="Phone Number"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                    placeholder="Enter phone number"
                  />
                </div>
              )}
            </Field>

            <Field name="address">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormTextarea
                    label="Address"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                    placeholder="Enter address"
                  />
                </div>
              )}
            </Field>

            <Field name="extra_info">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormTextarea
                    label="Extra Info"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                    placeholder="Additional information"
                  />
                </div>
              )}
            </Field>

            <Field name="Status">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormSelect
                    label="Status"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                  >
                    <option value="">Select Status</option>
                    {Object.entries(clientStatus).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </CFormSelect>
                </div>
              )}
            </Field>

            {/* <Field name="price">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormInput
                    label="Price"
                    type="number"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                    placeholder="Enter price"
                  />
                </div>
              )}
            </Field> */}

            <Field name="currency">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormInput
                    label="Currency"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                    placeholder="Enter currency"
                  />
                </div>
              )}
            </Field>

            <Field name="country">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormInput
                    label="Country"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                    placeholder="Enter country"
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

export default ClientForm
