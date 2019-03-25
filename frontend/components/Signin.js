import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import Spinner from './Spinner';
import Button from './styles/Button';
import { CURRENT_USER_QUERY, SIGNIN_MUTATION } from '../apollo/queries';
import { withRouter } from 'next/router';

const SigninSchema = Yup.object().shape({
  username: Yup.string()
    .required('Required'),
  password: Yup.string()
    .required('Required')
});

class Signin extends Component {
  render() {
    const { router } = this.props;

    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        onCompleted={({ signin: { id } }) => router.push(`/feed?id=${id}`)}
      >
        {(signin, { error, loading }) => (
          <Fragment>
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={SigninSchema}
              onSubmit={async (values, { resetForm }) => {
                try {
                  await signin({ variables: values });
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

export default withRouter(Signin);
