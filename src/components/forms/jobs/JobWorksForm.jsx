// /* eslint-disable prettier/prettier */
// /* eslint-disable react/prop-types */
// import React, { useMemo } from 'react'
// import { Formik, Form, Field } from 'formik'
// import * as yup from 'yup'
// import { CForm, CFormInput, CFormTextarea, CFormSelect, CAlert } from '@coreui/react'
// import { jobworksValidationSchema } from '../../../utils/validations/jobWorkValidationSchema'
// import { useGetClientsQuery } from '../../../redux/fratures/clients/clientsApi'
// import Select from 'react-select/base'
// import { jobtypes } from '../../../utils/jobTypes'

// const JobWorksForm = ({ submitType, job = {}, onSubmit, setFormikInstance }) => {
//   const { data: clientsResponse, isLoading, error } = useGetClientsQuery()

//   const clients = clientsResponse?.data || []

//   const initialValues = {
//     jobnumber: job?.jobnumber || '',
//     jobtype: job?.jobtype || '',
//     category: job?.category || '',
//     client_id: job?.client_id || '',
//     receive_date: job?.receive_date || '',
//     deadline: job?.deadline || '',
//     words: job?.words || '',
//     requirement: job?.requirement || '',
//     drive_link: job?.drive_link || '',
//     user_id: job?.user_id || '',
//     status: job?.status || 'Pending',
//     extra_notes: job?.extra_notes || '',
//     attachment: null,
//     price: job?.price || '',
//   }

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={jobworksValidationSchema}
//       onSubmit={(values, { setSubmitting, resetForm }) => {
//         onSubmit(values)
//           .then(() => {
//             resetForm()
//           })
//           .catch((err) => {
//             console.error('Error submitting form:', err)
//           })
//           .finally(() => setSubmitting(false))
//       }}
//     >
//       {(formik) => {
//         React.useEffect(() => {
//           setFormikInstance(formik)
//         }, [])

//         return (
//           <Form id="jobworksForm">
//             {/* Job Number */}
//             <Field name="jobnumber">
//               {({ field, meta }) => (
//                 <div className="mb-3">
//                   <CFormInput
//                     label="Job Number"
//                     {...field}
//                     invalid={meta.touched && Boolean(meta.error)}
//                     feedbackInvalid={meta.error}
//                     placeholder="Enter job number"
//                   />
//                 </div>
//               )}
//             </Field>
//             {/* Job Type */}
//             {/* <Field name="jobtype">
//               {({ field, meta }) => (
//                 <div className="mb-3">
//                   <CFormSelect
//                     label="Job Type"
//                     {...field}
//                     invalid={meta.touched && Boolean(meta.error)}
//                   >
//                     <option value="">Select Job Type</option>
//                     <option value="TYPE1">Type 1</option>
//                     <option value="TYPE2">Type 2</option>
//                   </CFormSelect>
//                 </div>
//               )}
//             </Field> */}
//             <Field name="jobtype">
//               {({ field, meta }) => (
//                 <div className="mb-3">
//                   <CFormSelect
//                     label="Job Type"
//                     {...field}
//                     invalid={meta.touched && Boolean(meta.error)}
//                   >
//                     <option value="">Select Job Type</option>
//                     {Object.entries(jobtypes).map(([key, value]) => (
//                       <option key={key} value={key}>
//                         {value}
//                       </option>
//                     ))}
//                   </CFormSelect>
//                 </div>
//               )}
//             </Field>
//             {/* Category */}
//             <Field name="category">
//               {({ field, meta }) => (
//                 <div className="mb-3">
//                   <CFormInput
//                     label="Category"
//                     {...field}
//                     invalid={meta.touched && Boolean(meta.error)}
//                     feedbackInvalid={meta.error}
//                     placeholder="Enter category"
//                   />
//                 </div>
//               )}
//             </Field>
//             {/* Client ID */}
//             <Field name="client_id">
//               {({ field, meta }) => (
//                 <div className="mb-3">
//                   <CFormSelect
//                     label="Client"
//                     {...field}
//                     invalid={meta.touched && Boolean(meta.error)}
//                     feedbackInvalid={meta.error}
//                     disabled={isLoading}
//                   >
//                     <option value="">Select Client</option>
//                     {clients.map((client) => (
//                       <option key={client.id} value={client.id}>
//                         {client.clientname}{' '}
//                       </option>
//                     ))}
//                   </CFormSelect>
//                   {error && (
//                     <div className="text-danger mt-1">Error loading clients. Please try again.</div>
//                   )}
//                   {isLoading && <div className="text-muted mt-1">Loading clients...</div>}
//                 </div>
//               )}
//             </Field>

//             {/* <Field name="client_id">
//               {({ field, meta }) => (
//                 <div className="mb-3">
//                   <label htmlFor="client_id" className="form-label">
//                     Client
//                   </label>
//                   <Select
//                     {...field}
//                     id="client_id"
//                     name="client_id"
//                     options={clients.map((client) => ({
//                       value: client.id,
//                       label: client.clientname,
//                     }))}
//                     isSearchable
//                     isDisabled={isLoading}
//                     onChange={(selectedOption) => {
//                       field.onChange({ target: { name: field.name, value: selectedOption.value } })
//                     }}
//                     onBlur={field.onBlur}
//                     className={meta.touched && meta.error ? 'is-invalid' : ''}
//                     placeholder="Select Client"
//                   />

//                   {meta.touched && meta.error && (
//                     <div className="text-danger mt-1">{meta.error}</div>
//                   )}
//                   {error && (
//                     <div className="text-danger mt-1">Error loading clients. Please try again.</div>
//                   )}
//                   {isLoading && <div className="text-muted mt-1">Loading clients...</div>}
//                 </div>
//               )}
//             </Field> */}
//             {/* Receive Date */}
//             <Field name="receive_date">
//               {({ field, meta }) => (
//                 <div className="mb-3">
//                   <CFormInput
//                     label="Receive Date"
//                     type="date"
//                     {...field}
//                     invalid={meta.touched && Boolean(meta.error)}
//                     feedbackInvalid={meta.error}
//                   />
//                 </div>
//               )}
//             </Field>
//             {/* Deadline */}
//             <Field name="deadline">
//               {({ field, meta }) => (
//                 <div className="mb-3">
//                   <CFormInput
//                     label="Deadline"
//                     type="date"
//                     {...field}
//                     invalid={meta.touched && Boolean(meta.error)}
//                     feedbackInvalid={meta.error}
//                   />
//                 </div>
//               )}
//             </Field>
//             {/* Words */}
//             <Field name="words">
//               {({ field, meta }) => (
//                 <div className="mb-3">
//                   <CFormInput
//                     label="Words"
//                     {...field}
//                     invalid={meta.touched && Boolean(meta.error)}
//                     feedbackInvalid={meta.error}
//                     placeholder="Enter words"
//                   />
//                 </div>
//               )}
//             </Field>
//             {/* Requirement */}
//             <Field name="requirement">
//               {({ field, meta }) => (
//                 <div className="mb-3">
//                   <CFormTextarea
//                     label="Requirement"
//                     {...field}
//                     invalid={meta.touched && Boolean(meta.error)}
//                     feedbackInvalid={meta.error}
//                     placeholder="Enter requirement"
//                   />
//                 </div>
//               )}
//             </Field>
//             {/* Drive Link */}
//             <Field name="drive_link">
//               {({ field, meta }) => (
//                 <div className="mb-3">
//                   <CFormInput
//                     label="Drive Link"
//                     {...field}
//                     invalid={meta.touched && Boolean(meta.error)}
//                     feedbackInvalid={meta.error}
//                     placeholder="Enter drive link (optional)"
//                   />
//                 </div>
//               )}
//             </Field>
//             <Field name="extra_notes">
//               {({ field, meta }) => (
//                 <div className="mb-3">
//                   <CFormTextarea
//                     label="Extra Notes"
//                     {...field}
//                     invalid={meta.touched && Boolean(meta.error)}
//                     feedbackInvalid={meta.error}
//                     placeholder="Enter any additional notes"
//                   />
//                 </div>
//               )}
//             </Field>
//             {/* Status */}
//             {/* <Field name="status">
//               {({ field, meta }) => (
//                 <div className="mb-3">
//                   <CFormSelect
//                     label="Status"
//                     {...field}
//                     invalid={meta.touched && Boolean(meta.error)}
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Completed">Completed</option>
//                     <option value="In Progress">In Progress</option>
//                   </CFormSelect>
//                 </div>
//               )}
//             </Field> */}
//             {/* Price */}
//             {/* <Field name="price">
//               {({ field, meta }) => (
//                 <div className="mb-3">
//                   <CFormInput
//                     label="Price"
//                     type="number"
//                     step="0.01"
//                     {...field}
//                     invalid={meta.touched && Boolean(meta.error)}
//                     feedbackInvalid={meta.error}
//                     placeholder="Enter price"
//                   />
//                 </div>
//               )}
//             </Field> */}
//             {/* Attachment */}
//             <Field name="attachment">
//               {({ field, form, meta }) => (
//                 <div className="mb-3">
//                   <CFormInput
//                     label="Attachment"
//                     type="file"
//                     multiple
//                     onChange={(event) => {
//                       const files = event.currentTarget.files
//                       form.setFieldValue(field.name, files) // Set files in Formik state
//                     }}
//                     invalid={meta.touched && Boolean(meta.error)}
//                     feedbackInvalid={meta.error}
//                   />
//                 </div>
//               )}
//             </Field>
//             {formik.errors.submit && <CAlert color="danger">{formik.errors.submit}</CAlert>}
//           </Form>
//         )
//       }}
//     </Formik>
//   )
// }

// export default JobWorksForm
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { CFormInput, CFormTextarea, CFormSelect, CAlert } from '@coreui/react'
import { jobworksValidationSchema } from '../../../utils/validations/jobWorkValidationSchema'
import { useGetClientsQuery } from '../../../redux/fratures/clients/clientsApi'
import { jobtypes } from '../../../utils/jobTypes'

const JobWorksForm = ({ submitType, job = {}, onSubmit, setFormikInstance }) => {
  const { data: clientsResponse, isLoading, error } = useGetClientsQuery()

  const clients = clientsResponse?.data || []

  const initialValues = {
    jobnumber: job?.jobnumber || '',
    jobtype: job?.jobtype || '',
    category: job?.category || '',
    client_id: job?.client_id || '',
    receive_date: job?.receive_date || '',
    deadline: job?.deadline ? job.deadline.split('T')[0] : '',
    words: job?.words || '',
    requirement: job?.requirement || '',
    drive_link: job?.drive_link || '',
    user_id: job?.user_id || '',
    status: job?.status || 'Pending',
    extra_notes: job?.extra_notes || '',
    attachment: null,
    price: job?.price || '',
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={jobworksValidationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log('val', values)

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
      {/* {(formik) => {
        useEffect(() => {
          setFormikInstance(formik)
        }, [formik]) */}
      {(formik) => {
        useEffect(() => {
          setFormikInstance(formik)
        }, [])

        return (
          <Form id="jobworksForm">
            {/* Job Number */}
            {/* <Field name="jobnumber">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormInput
                    label="Job Number"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                    placeholder="Enter job number"
                  />
                </div>
              )}
            </Field> */}
            {/* Job Type */}
            <Field name="jobtype">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormSelect
                    label="Job Type"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                  >
                    <option value="">Select Job Type</option>
                    {Object.entries(jobtypes).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </CFormSelect>
                </div>
              )}
            </Field>
            {/* Category */}
            <Field name="category">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormInput
                    label="Category"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                    placeholder="Enter category"
                  />
                </div>
              )}
            </Field>
            {/* Client ID */}
            <Field name="client_id">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormSelect
                    label="Client"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                    disabled={isLoading}
                  >
                    <option value="">Select Client</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.clientname}{' '}
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

            {/* Conditionally Render Fields Based on submitType */}
            {submitType === 'create' && (
              <>
                {/* Receive Date */}
                <Field name="receive_date">
                  {({ field, meta }) => (
                    <div className="mb-3">
                      <CFormInput
                        label="Receive Date"
                        type="date"
                        {...field}
                        invalid={meta.touched && Boolean(meta.error)}
                        feedbackInvalid={meta.error}
                      />
                    </div>
                  )}
                </Field>
              </>
            )}

            {/* Deadline */}
            <Field name="deadline">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormInput
                    label="Deadline"
                    type="date"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                  />
                </div>
              )}
            </Field>
            {/* Words */}
            <Field name="words">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormInput
                    label="Words"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                    placeholder="Enter words"
                  />
                </div>
              )}
            </Field>
            {/* Requirement */}
            <Field name="requirement">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormTextarea
                    label="Requirement"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                    placeholder="Enter requirement"
                  />
                </div>
              )}
            </Field>
            {/* Drive Link */}
            <Field name="drive_link">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormInput
                    label="Drive Link"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                    placeholder="Enter drive link (optional)"
                  />
                </div>
              )}
            </Field>
            {/* Extra Notes */}
            <Field name="extra_notes">
              {({ field, meta }) => (
                <div className="mb-3">
                  <CFormTextarea
                    label="Extra Notes"
                    {...field}
                    invalid={meta.touched && Boolean(meta.error)}
                    feedbackInvalid={meta.error}
                    placeholder="Enter any additional notes"
                  />
                </div>
              )}
            </Field>
            {/* Attachment */}
            {submitType === 'create' ? (
              <Field name="attachment">
                {({ field, form, meta }) => (
                  <div className="mb-3">
                    <CFormInput
                      label="Attachment"
                      type="file"
                      multiple
                      onChange={(event) => {
                        const files = event.currentTarget.files
                        form.setFieldValue(field.name, files) // Set files in Formik state
                      }}
                      invalid={meta.touched && Boolean(meta.error)}
                      feedbackInvalid={meta.error}
                    />
                  </div>
                )}
              </Field>
            ) : null}
            {formik.errors.submit && <CAlert color="danger">{formik.errors.submit}</CAlert>}
          </Form>
        )
      }}
    </Formik>
  )
}

export default JobWorksForm
