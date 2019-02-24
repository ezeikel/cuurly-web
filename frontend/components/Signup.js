import React, { Component } from 'react';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { withAuth } from '../context/auth';
import Spinner from './Spinner';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too short')
    .max(50, 'Too long')
    .required('Required'),
  lastName: Yup.string()
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
    const { signup } = this.props;

    return (
      <Formik
        initialValues={{ email: '', firstName: '', lastName: '', username: '', password: '' }}
        validationSchema={SignupSchema}
        onSubmit={async (values, actions) => {
          await signup(values, actions);
        }}
      >
        {({
          isSubmitting,
          errors,
          touched
        }) => (
          <Form>
            <Field type="text" name="firstName" />
            <ErrorMessage name="firstName" component="div" />
            <Field type="text" name="lastName" />
            <ErrorMessage name="lastName" component="div" />
            <Field type="email" name="email" />
            <ErrorMessage name="emaile" component="div" />
            <Field type="text" name="username" />
            <ErrorMessage name="username" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>Submit</button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default withAuth(Signup);
