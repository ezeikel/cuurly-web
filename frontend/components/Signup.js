import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import Spinner from './Spinner';
import Button from './styles/Button';
import { CURRENT_USER_QUERY, SIGNUP_MUTATION } from '../apollo/queries';
import { withRouter } from 'next/router';

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

class Signup extends Component {
  render() {
    const { router } = this.props;

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
                <Form>
                  <Field type="text" name="name" />
                  <ErrorMessage name="name" component="div" />
                  <Field type="email" name="email" />
                  <ErrorMessage name="emaile" component="div" />
                  <Field type="text" name="username" />
                  <ErrorMessage name="username" component="div" />
                  <Field type="password" name="password" />
                  <ErrorMessage name="password" component="div" />
                  <Button type="submit" disabled={isSubmitting}>Submit {isSubmitting ? <Spinner /> : null }</Button>
                </Form>
              )}
            </Formik>
            {loading && <p>Loading...</p>}
            {error && <p>Error :( Please try again</p>}
          </Fragment>
        )}
      </Mutation>
    );
  }
}

export default withRouter(Signup);
