import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Spinner from './Spinner';
import { CURRENT_USER_QUERY, SIGNIN_MUTATION } from '../apollo/queries';
import { withRouter } from 'next/router';
import styled from 'styled-components';
import formatAPIErrors from '../utils/formatAPIErrors';
import Form from './styles/Form';
import InputWrapper from './styles/InputWrapper';
import Input from './styles/Input';
import SubmitButton from './styles/SubmitButton';
import FormErrors from './styles/FormErrors';

const SigninSchema = Yup.object().shape({
  username: Yup.string()
    .required('Please enter a Username.'),
  password: Yup.string()
    .required('Please enter a Password.')
});

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
                <Form>
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
                  <FormErrors errors={ (touched.username && errors.username) || (touched.password && errors.password) }>
                    <ErrorMessage name="username" component="div" />
                    <ErrorMessage name="password" component="div" />
                  </FormErrors>
                  <SubmitButton type="submit" disabled={isSubmitting}>Sign In {isSubmitting ? <Spinner /> : null }</SubmitButton>
                  <Link href="/request-reset">
                    <StyledForgotPasswordLink>Forgot password?</StyledForgotPasswordLink>
                  </Link>
                </Form>
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
