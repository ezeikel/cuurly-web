import React, { Component } from 'react';
import { Link } from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { withAuth } from '../context/auth';
import Spinner from './Spinner';
import Button from './styles/Button';
import Form from './styles/Form';
import FormFields from './styles/FormFields';
import FormActions from './styles/FormActions';
import FieldSet from './styles/FieldSet';
import FormInput from './styles/FormInput';
import FormInputError from './styles/FormInputError';

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
            <FormFields>
              <FieldSet>
                <label>First Name</label>
                {errors.firstName && touched.firstName && <FormInputError>{errors.firstName}</FormInputError>}
                <FormInput type="firstName" name="firstName" placeholder="Kanye West" />
              </FieldSet>
              <FieldSet>
                <label>Last Name</label>
                {errors.lastName && touched.lastName && <FormInputError>{errors.lastName}</FormInputError>}
                <FormInput type="lastName" name="lastName" placeholder="Kanye West" />
              </FieldSet>
              <FieldSet>
                <label>Username</label>
                {errors.username && touched.username && <FormInputError>{errors.username}</FormInputError>}
                <FormInput type="username" name="username" placeholder="yeezy" />
              </FieldSet>
              <FieldSet>
                <label>Email</label>
                {errors.email && touched.email && <FormInputError>{errors.email}</FormInputError>}
                <FormInput type="email" name="email" placeholder="kanye@yeezy.com" />
              </FieldSet>
              <FieldSet>
                <label>Password</label>
                {errors.password && touched.password && <FormInputError>{errors.password}</FormInputError>}
                <FormInput type="password" name="password" />
              </FieldSet>
            </FormFields>
            <FormActions>
              <Button type="submit" disabled={isSubmitting}>
                <span>Sign up</span> {isSubmitting ? <Spinner /> : null}
              </Button>
              <span>Already have an account? <Link to="/signin">Sign in</Link></span>
            </FormActions>
          </Form>
        )}
      </Formik>
    );
  }
}

export default withAuth(Signup);
