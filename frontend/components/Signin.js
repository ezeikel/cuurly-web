import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import Spinner from './Spinner';
import Button from './styles/Button';
import { CURRENT_USER_QUERY, SIGNIN_MUTATION } from '../apollo/queries';
import { withRouter } from 'next/router';
import styled from 'styled-components';

const SigninSchema = Yup.object().shape({
  username: Yup.string()
    .required('Required'),
  password: Yup.string()
    .required('Required')
});

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  grid-row-gap: var(--spacing-small);
`;

const Username = styled.div`
  grid-row: 1 / span 1;
  grid-column: 1 / -1;
  display: grid;
  grid-row-gap: var(--spacing-small);
`;

const Password = styled.div`
  grid-row: 2 / span 1;
  grid-column: 1 / -1;
  display: grid;
  grid-row-gap: var(--spacing-small);
`;

const StyledButton = styled(Button)`
  grid-row: 3 / -1;
  grid-column: 1 / -1;
  display: grid;
  background-color: #3897f0;
  border: 1px solid #3897f0;
  border-radius: 4px;
  color: #fff;
  position: relative;
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
                <StyledForm>
                  <Username>
                    <label>Username</label>
                    <Field type="text" name="username" />
                    {/* <ErrorMessage name="username" component="div" /> */}
                  </Username>
                  <Password>
                    <label>Password</label>
                    <Field type="password" name="password" />
                    {/* <ErrorMessage name="password" component="div" /> */}
                  </Password>
                  <StyledButton type="submit" disabled={isSubmitting}>Sign In {isSubmitting ? <Spinner /> : null }</StyledButton>
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

export default withRouter(Signin);
