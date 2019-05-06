import React from 'react';
import { Mutation } from 'react-apollo';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import { REQUEST_RESET_MUTATION } from '../apollo/queries'
import formatAPIErrors from '../utils/formatAPIErrors';
import Spinner from './Spinner';
import Form from './styles/Form';
import InputWrapper from './styles/InputWrapper';
import Input from './styles/Input';
import SubmitButton from './styles/SubmitButton';
import FormErrors from './styles/FormErrors';
import SuccessMessage from './styles/SuccessMessage';

const ReqeuestResetSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
});

const RequestReset = () => (
  <Mutation mutation={REQUEST_RESET_MUTATION}>
    {(requestReset, { error, loading, called }) => (
      <Formik
        initialValues={{ email: '' }}
        validationSchema={ReqeuestResetSchema}
        onSubmit={async (values, { resetForm, setErrors }) => {
          try {
            await requestReset({
              variables: values
            });

            resetForm();
            toast('Check your email for a reset link.');
          } catch(e) {
            setErrors(formatAPIErrors(e));
          }
        }}
      >
        {({
          isSubmitting,
          errors,
          touched
        }) => (
          <Form>
            <InputWrapper>
              <Input>
                <Field
                    name="email"
                    render={({ field }) => <input  className={field.value.length > 0 ? 'dirty' : null} {...field} type="email"/> }
                  />
                <label>Email</label>
              </Input>
            </InputWrapper>
            <FormErrors errors={(touched.username && errors.username) || (touched.password && errors.password)}>
              <ErrorMessage name="username" component="div" />
              <ErrorMessage name="password" component="div" />
            </FormErrors>
            <SubmitButton type="submit" disabled={loading}>
              <span>Reset password</span> {isSubmitting && loading ? <Spinner /> : null}
            </SubmitButton>
          </Form>
        )}
      </Formik>
    )}
  </Mutation>
);

export default RequestReset;
