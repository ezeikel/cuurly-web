import React from 'react';
import { Mutation } from 'react-apollo';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
//import { REQUEST_RESET_MUTATION } from '../apollo/queries'
import Spinner from './Spinner';
import Button from './styles/Button';
// import Form from './styles/Form';
// import FormFields from './styles/FormFields';
// import FormActions from './styles/FormActions';
// import FieldSet from './styles/FieldSet';
// import FormInput from './styles/FormInput';
// import FormInputError from './styles/FormInputError';
// import { formatFormErrors } from '../utils/formatFormErrors';
// import SuccessMessage from './styles/SuccessMessage';

const ReqeuestResetSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
});

const RequestReset = () => (
  <Formik
    initialValues={{ email: '' }}
    validationSchema={ReqeuestResetSchema}
    onSubmit={async (values, { resetForm, setErrors }) => {
      try {
        await reset({
          variables: values
        });

        resetForm();
      } catch(e) {
        setErrors(formatFormErrors(e));
      }
    }}
  >
    {({
      isSubmitting,
      errors,
      touched
    }) => (
      <Form>
        <div>
          {/* {!error && !loading && called && <SuccessMessage>Success! Check your email for a reset link!</SuccessMessage>} */}
          <div>
            <label htmlFor="email">Email</label>
            {errors.email && touched.email && <div>{errors.email}</div>}
            <Field type="email" name="email" placeholder="kanye@yeezy.com" />
          </div>
        </div>
        <div>
          <Button type="submit">
            <span>Reset password</span> {isSubmitting && loading ? <Spinner /> : null}
          </Button>
        </div>
      </Form>
    )}
  </Formik>
);

export default RequestReset;
