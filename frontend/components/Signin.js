import React, { Component } from 'react';
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
        onCompleted={({ signin: { id } }) => {
          // TODO: Get access to Formik methods here
          //resetForm();

          // redirect to user feed
          router.push(`/feed?id=${id}`);
        }}
      >
        {(signin, { error, loading }) => (
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={SigninSchema}
            onSubmit={async values => {
              //await signup(values, actions);
              await signin({ variables: values })
            }}
          >
            {({
              isSubmitting,
              errors,
              touched
            }) => (
              <Form>
                <Field type="text" name="username" />
                <ErrorMessage name="username" component="div" />
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
                <Button type="submit" disabled={isSubmitting}>Submit</Button>
              </Form>
            )}
          </Formik>
        )}
      </Mutation>
    );
  }
}

export default withRouter(Signin);
