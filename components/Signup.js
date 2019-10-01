import React, { Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import Spinner from './Spinner';
import { CURRENT_USER_QUERY, SIGNUP_MUTATION } from '../apollo/queries';
import { withRouter } from 'next/router';
import formatAPIErrors from '../utils/formatAPIErrors';
import Form from './styles/Form';
import InputWrapper from './styles/InputWrapper';
import Input from './styles/Input';
import SubmitButton from './styles/SubmitButton';
import FormErrors from './styles/FormErrors';

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
              errors,
              touched
            }) => (
              <Form>
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
                <FormErrors errors={ (touched.email && errors.email) || (touched.name && errors.name) || (touched.username && errors.username) || (touched.password && errors.password) }>
                  <ErrorMessage name="email" component="div" />
                  <ErrorMessage name="name" component="div" />
                  <ErrorMessage name="username" component="div" />
                  <ErrorMessage name="password" component="div" />
                </FormErrors>
                <SubmitButton type="submit" disabled={isSubmitting}>Sign Up {isSubmitting ? <Spinner /> : null }</SubmitButton>
              </Form>
            )}
          </Formik>
          {loading && console.log('loading...')}
          {error && console.error({ error })}
        </Fragment>
      )}
    </Mutation>
  )
};

export default withRouter(Signup);
