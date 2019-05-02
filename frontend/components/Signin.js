import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Spinner from './Spinner';
import Button from './styles/Button';
import { CURRENT_USER_QUERY, SIGNIN_MUTATION } from '../apollo/queries';
import { withRouter } from 'next/router';
import styled from 'styled-components';
import formatAPIErrors from '../utils/formatAPIErrors';
import FormError from './styles/FormError';

const SigninSchema = Yup.object().shape({
  username: Yup.string()
    .required('Please enter a Username.'),
  password: Yup.string()
    .required('Please enter a Password.')
});

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr) repeat(3, auto);
  grid-row-gap: var(--spacing-small);
`;

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

const StyledButton = styled(Button)`
  grid-row: 3 / -1;
  grid-column: 1 / -1;
  background-color: #3897f0;
  border: 1px solid #3897f0;
  border-radius: 4px;
  color: #fff;
  position: relative;
`;

const StyledForgotPasswordLink = styled.a`
  justify-self: center;
  color: #003569;
  cursor: pointer;
`;

class Signin extends Component {
  render() {
    const { router } = this.props;

    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        onCompleted={({ signin: { id } }) => router.push(`/feed?id=${id}`)}
        update={(cache, { data: { signin } }) => {
          // manually writing to cache to fix homepage conditional redirect not working
          cache.writeQuery({
            query: CURRENT_USER_QUERY,
            data: {
              currentUser: {
                ...signin,
                __typename: 'CurrentUser'
              }
          }})
        }}
      >
        {(signin, { error, loading }) => (
          <Fragment>
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={SigninSchema}
              onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
                try {
                  await signin({ variables: values });
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
                errors,
                touched
              }) => (
                <StyledForm>
                  <InputWrapper>
                    <Input>
                      <Field
                          name="username"
                          render={({ field }) => <input className={field.value.length > 0 ? 'dirty' : null} {...field} /> }
                        />
                      <label>Username</label>
                    </Input>
                  </InputWrapper>
                  <InputWrapper>
                    <Input>
                      <Field
                          name="password"
                          render={({ field }) => <input  className={field.value.length > 0 ? 'dirty' : null} {...field} type="password"/> }
                        />
                      <label>Password</label>
                    </Input>
                  </InputWrapper>
                  <StyledFormError errors={ (touched.username && errors.username) || (touched.password && errors.password) }>
                    <ErrorMessage name="username" component="div" />
                    <ErrorMessage name="password" component="div" />
                  </StyledFormError>
                  <StyledButton type="submit" disabled={isSubmitting}>Sign In {isSubmitting ? <Spinner /> : null }</StyledButton>
                  <Link href="/request-reset">
                    <StyledForgotPasswordLink>Forgot password?</StyledForgotPasswordLink>
                  </Link>
                </StyledForm>
              )}
            </Formik>
            {loading && console.log('loading...')}
            {error && console.error({ error })}
          </Fragment>
        )}
      </Mutation>
    );
  }
}

export default withRouter(Signin);
