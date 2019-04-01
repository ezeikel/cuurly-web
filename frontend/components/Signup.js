import React, { Component, Fragment } from 'react';
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

const StyledForm = styled(Form)`
  display: grid;
  grid-template-rows: repeat(4, 1fr) auto;
  grid-row-gap: var(--spacing-small);
`;

const Name = styled.div`
  grid-row: 1 / span 1;
  grid-column: 1 / -1;
  display: grid;
  grid-row-gap: var(--spacing-small);
`;

const Email = styled.div`
  grid-row: 2 / span 1;
  grid-column: 1 / -1;
  display: grid;
  grid-row-gap: var(--spacing-small);
`;

const Username = styled.div`
  grid-row: 3 / span 1;
  grid-column: 1 / -1;
  display: grid;
  grid-row-gap: var(--spacing-small);
`;

const Password = styled.div`
  grid-row: 4 / span 1;
  grid-column: 1 / -1;
  display: grid;
  grid-row-gap: var(--spacing-small);
`;

const StyledButton = styled(Button)`
  grid-row: 5 / -1;
  grid-column: 1 / -1;
  display: grid;
  background-color: #3897f0;
  border: 1px solid #3897f0;
  border-radius: 4px;
  color: #fff;
  position: relative;
`;

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
                <StyledForm>
                  <Name>
                    <label>Name</label>
                    <Field type="text" name="name" />
                    <ErrorMessage name="name" component="div" />
                  </Name>
                  <Email>
                    <label>Email</label>
                    <Field type="email" name="email" />
                    <ErrorMessage name="emaile" component="div" />
                  </Email>
                  <Username>
                    <label>Username</label>
                    <Field type="text" name="username" />
                    <ErrorMessage name="username" component="div" />
                  </Username>
                  <Password>
                    <label>Password</label>
                    <Field type="password" name="password" />
                    <ErrorMessage name="password" component="div" />
                  </Password>
                  <StyledButton type="submit" disabled={isSubmitting}>Submit {isSubmitting ? <Spinner /> : null }</StyledButton>
                </StyledForm>
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
