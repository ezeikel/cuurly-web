import React, { Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import Spinner from './Spinner';
import Button from './styles/Button';
import { CURRENT_USER_QUERY, SIGNUP_MUTATION } from '../apollo/queries';
import { withRouter } from 'next/router';
import styled from 'styled-components';
import formatAPIErrors from '../utils/formatAPIErrors';
import FormError from './styles/FormError';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'That name is too short.')
    .max(50, 'That name is too long')
    .required('Please enter a name.'),
  username: Yup.string()
    .min(2, 'That username is too short.')
    .max(50, 'That username is too long.')
    .required('Please enter a username.'),
  email: Yup.string()
    .email('That email is invalid. Please try again.')
    .required('Please enter an email.'),
  password: Yup.string()
    .min(9, 'That password is too short.')
    .required('Please enter a password.')
});

const InputWrapper = styled.div`
  display: grid;
`;

const Input = styled.div`
  display: grid;
  grid-template-columns: 1fr 8px;
  position: relative;
  height: 36px;
  margin: 0;
  min-width: 0;
  label {
    color: #999;
    font-size: 1.4rem;
    height: 36px;
    left: 8px;
    line-height: 36px;
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    right: 0;
    text-overflow: ellipsis;
    transform-origin: left;
    transition: transform ease-out .1s;
    user-select: none;
    white-space: nowrap;
  }
  input {
    font-size: 1.6rem;
    line-height: 1.8rem;
    border: 0;
    flex: 1 0 0;
    margin: 0;
    outline: 0;
    overflow: hidden;
    padding: 9px 0 7px 8px;
    text-overflow: ellipsis;
    background: #fafafa;
    &.dirty {
      font-size: 1.2rem;
      & + label {
        transform: scale(.83333) translateY(-12px);
      }
    }
    &:focus {
      & + label {
        transform: scale(.83333) translateY(-12px);
      }
    }
  }
`;

const StyledFormError = styled(FormError)`
  ${({ errors }) => !errors ?
    `
    padding: 0;
  ` : null}
`;

const StyledForm = styled(Form)`
  display: grid;
  grid-template-rows: repeat(4, 36px) auto;
  grid-row-gap: var(--spacing-small);
`;

const StyledButton = styled(Button)`
  display: grid;
  background-color: #3897f0;
  border: 1px solid #3897f0;
  border-radius: 4px;
  color: #fff;
  position: relative;
`;

const Signup = ({ router }) => {
  return (
    <Mutation
      mutation={SIGNUP_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      onCompleted={({ signup: { id } }) => router.push(`/user?id=${id}`)}
    >
      {(signup, { error, loading }) => (
        <Fragment>
          <Formik
            initialValues={{ email: '', name: '', username: '', password: '' }}
            validationSchema={SignupSchema}
            onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
              try {
                await signup({ variables: values });
                resetForm();
              } catch(e) {
                const formattedErrors = formatAPIErrors(e);
                setErrors(formattedErrors);
              }

              setSubmitting(false);
            }}
          >
            {({
              isSubmitting,
              errors
            }) => (
              <StyledForm>
                <InputWrapper>
                  <Input>
                    <Field
                        name="name"
                        render={({ field }) => <input className={field.value.length > 0 ? 'dirty' : null} {...field} />}
                      />
                    <label>Name</label>
                  </Input>
                </InputWrapper>
                <InputWrapper>
                  <Input>
                    <Field
                      name="email"
                      render={({ field }) => <input className={field.value.length > 0 ? 'dirty' : null} {...field} type="email" />}
                    />
                    <label>Email</label>
                  </Input>
                </InputWrapper>
                <InputWrapper>
                  <Input>
                    <Field
                        name="username"
                        render={({ field }) => <input className={field.value.length > 0 ? 'dirty' : null} {...field} />}
                      />
                    <label>Username</label>
                  </Input>
                </InputWrapper>
                <InputWrapper>
                  <Input>
                    <Field
                        name="password"
                        render={({ field }) => <input className={field.value.length > 0 ? 'dirty' : null} {...field} type="password" />}
                      />
                    <label>Password</label>
                  </Input>
                </InputWrapper>
                <StyledFormError errors={ errors.email || errors.name || errors.username || errors.password}>
                  <ErrorMessage name="email" component="div" />
                  <ErrorMessage name="name" component="div" />
                  <ErrorMessage name="username" component="div" />
                  <ErrorMessage name="password" component="div" />
                </StyledFormError>
                <StyledButton type="submit" disabled={isSubmitting}>Sign Up {isSubmitting ? <Spinner /> : null }</StyledButton>
              </StyledForm>
            )}
          </Formik>
          {loading && <p>Loading...</p>}
          {error && console.log({ error })}
        </Fragment>
      )}
    </Mutation>
  )
};

export default withRouter(Signup);
