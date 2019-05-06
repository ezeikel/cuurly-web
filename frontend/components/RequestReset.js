import React from 'react';
import { Mutation } from 'react-apollo';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { REQUEST_RESET_MUTATION } from '../apollo/queries'
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
    {(reset, { error, loading, called }) => (
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
            {!error && !loading && called && <SuccessMessage>Success! Check your email for a reset link!</SuccessMessage>}
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
