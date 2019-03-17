import React, { Component } from 'react';
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
        onCompleted={({ signup: { id } }) => {
          //resetForm();

          // redirect to homepage
          router.push(`/user?id=${id}`);
        }}
      >
        {(signup, { error, loading }) => (
          <Formik
            initialValues={{ email: '', name: '', username: '', password: '' }}
            validationSchema={SignupSchema}
            onSubmit={async values => {
              //await signup(values, actions);
              await signup({ variables: values })
            }}
          >
            {({
              isSubmitting,
              errors,
              touched
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
                <Button type="submit" disabled={isSubmitting}>Submit</Button>
              </Form>
            )}
          </Formik>
        )}
      </Mutation>
    );
  }
}

export default withRouter(Signup);
