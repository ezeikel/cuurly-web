import React, { Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import Spinner from './Spinner';
import Button from './styles/Button';
import { CURRENT_USER_QUERY, SIGNUP_MUTATION } from '../apollo/queries';
import { withRouter } from 'next/router';
import styled from 'styled-components';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
  username: Yup.string()
    .min(2, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(9, 'Too short')
    .required('Required')
});

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 8px;
  position: relative;
  height: 36px;
  margin: 0;
  min-width: 0;
`;

const Input = styled.div`
  display: grid;
  label {
    color: #999;
    font-size: 12px;
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
    font-size: 16px;
    line-height: 18px;
    border: 0;
    flex: 1 0 0;
    margin: 0;
    outline: 0;
    overflow: hidden;
    padding: 9px 0 7px 8px;
    text-overflow: ellipsis;
    background: #fafafa;
    &.dirty {
      font-size: 12px;
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
            onSubmit={async (values, { resetForm }) => {
              try {
                await signup({ variables: values });
                resetForm();
              } catch(e) {
                console.error(`Formik Error: ${e}`);
              }
            }}
          >
            {({
              isSubmitting
            }) => (
              <StyledForm>
                <InputWrapper>
                  <Input>
                    <Field
                        name="name"
                        render={({ field }) => <input className={field.value.length > 0 ? 'dirty' : null} {...field} /> }
                      />
                    <label>Name</label>
                    {/* <ErrorMessage name="emaile" component="div" /> */}
                  </Input>
                </InputWrapper>
                <InputWrapper>
                  <Input>
                    <Field
                      name="email"
                      render={({ field }) => <input className={field.value.length > 0 ? 'dirty' : null} {...field} type="email" /> }
                    />
                    <label>Email</label>
                    {/* <ErrorMessage name="emaile" component="div" /> */}
                  </Input>
                </InputWrapper>
                <InputWrapper>
                  <Input>
                    <Field
                        name="username"
                        render={({ field }) => <input className={field.value.length > 0 ? 'dirty' : null} {...field} /> }
                      />
                    <label>Username</label>
                    {/* <ErrorMessage name="username" component="div" /> */}
                  </Input>
                </InputWrapper>
                <InputWrapper>
                  <Input>
                    <Field
                        name="password"
                        render={({ field }) => {
                          debugger;
                          return (
                            <input className={field.value.length > 0 ? 'dirty' : null} {...field} type="password" />
                          )
                         } }
                      />
                    <label>Password</label>
                    {/* <ErrorMessage name="password" component="div" /> */}
                  </Input>
                </InputWrapper>
                <StyledButton type="submit" disabled={isSubmitting}>Submit {isSubmitting ? <Spinner /> : null }</StyledButton>
              </StyledForm>
            )}
          </Formik>
          {loading && <p>Loading...</p>}
          {error && <p>Error :( Please try again</p>}
        </Fragment>
      )}
    </Mutation>
  )
};

export default withRouter(Signup);
