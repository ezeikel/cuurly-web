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

const ResetSchema = Yup.object().shape({
  password: Yup.string()
    .required('Required'),
  passwordConfirm: Yup.string()
    .required('Required')
});

const RequestReset = () => (
  <Mutation mutation={REQUEST_RESET_MUTATION}>
    {(reset, { error, loading, called }) => (
      <Formik
        initialValues={{ password: '', passwordConfirm: '' }}
        validationSchema={ResetSchema}
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
            <InputWrapper>
              <Input>
                <Field
                    name="password"
                    render={({ field }) => <input className={field.value.length > 0 ? 'dirty' : null} {...field} type="password"/> }
                  />
                <label>Password</label>
              </Input>
            </InputWrapper>
            <InputWrapper>
              <Input>
                <Field
                    name="passwordConfirm"
                    render={({ field }) => <input  className={field.value.length > 0 ? 'dirty' : null} {...field} type="password"/> }
                  />
                <label>Confirm Password</label>
              </Input>
            </InputWrapper>
            <FormErrors errors={ (touched.password && errors.password) || (touched.passwordConfirm && errors.passwordConfirm) }>
              <ErrorMessage name="password" component="div" />
              <ErrorMessage name="passwordConfirm" component="div" />
            </FormErrors>
            <SubmitButton type="submit" disabled={isSubmitting}>Reset Password{isSubmitting ? <Spinner /> : null }</SubmitButton>
          </Form>
        )}
      </Formik>
    )}
  </Mutation>
);

export default RequestReset;
