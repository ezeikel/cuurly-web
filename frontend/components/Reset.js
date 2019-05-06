import React from 'react';
import { withRouter } from 'next/router';
import { Mutation } from 'react-apollo';
import { Formik, Field, ErrorMessage } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import { RESET_MUTATION } from '../apollo/queries'
import formatAPIErrors from '../utils/formatAPIErrors';
import Spinner from './Spinner';
import Form from './styles/Form';
import InputWrapper from './styles/InputWrapper';
import Input from './styles/Input';
import SubmitButton from './styles/SubmitButton';
import FormErrors from './styles/FormErrors';

const ResetSchema = Yup.object().shape({
  password: Yup.string()
    .required('Please enter a new password.'),
  confirmPassword: Yup.string()
    .required('Please confirm your new password.')
});

const StyledForm = styled(Form)`
  width: 100%;
`;

const Reset = ({ resetToken, router }) => (
  <Mutation mutation={RESET_MUTATION}>
    {(reset, { error, loading, called }) => (
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={ResetSchema}
        onSubmit={async (values, { resetForm, setErrors }) => {
          try {
            await reset({
              variables: {
                ...values,
                resetToken
              }
            });

            resetForm();
            toast('Your password has been reset.');
            router.push(`/signin`)
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
          <StyledForm>
            <InputWrapper>
              <Input>
                <Field
                    name="password"
                    render={({ field }) => <input className={field.value.length > 0 ? 'dirty' : null} {...field} type="password"/> }
                  />
                <label>New Password</label>
              </Input>
            </InputWrapper>
            <InputWrapper>
              <Input>
                <Field
                    name="confirmPassword"
                    render={({ field }) => <input  className={field.value.length > 0 ? 'dirty' : null} {...field} type="password"/> }
                  />
                <label>New Password Confirmation</label>
              </Input>
            </InputWrapper>
            <FormErrors errors={ (touched.password && errors.password) || (touched.confirmPassword && errors.confirmPassword) }>
              <ErrorMessage name="password" component="div" />
              <ErrorMessage name="confirmPassword" component="div" />
            </FormErrors>
            <SubmitButton type="submit" disabled={isSubmitting}>Reset Password{isSubmitting ? <Spinner /> : null }</SubmitButton>
          </StyledForm>
        )}
      </Formik>
    )}
  </Mutation>
);

export default withRouter(Reset);
