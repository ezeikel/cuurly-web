import React, { createContext, Component } from 'react';
import { withApollo, Query } from 'react-apollo';
import { withRouter } from 'next/router';
import {
  CURRENT_CACHED_USER_QUERY,
  SIGNIN_MUTATION,
  SIGNOUT_MUTATION,
  SIGNUP_MUTATION,
} from '../apollo/queries';

// create React context
export const AuthContext = createContext();

class Provider extends Component {
  state = {
    signup: async ({ email, fullName, username, password }, { setSubmitting, setErrors, resetForm }) => {
      try {
        const { client, history } = this.props;

        await client.mutate({
          mutation: SIGNUP_MUTATION,
          variables: { email, fullName, username, password },
          update: async (cache, { data: { signup:user } }) => {
            this._updateCurrentUser(cache, { ...user, isAuthenticated: true });

            resetForm();

            // redirect to homepage
            history.push('/');
          }
        });
      } catch (e) {
        setErrors(formatFormErrors(e));
      }
      setSubmitting(false);
    },
    signin: async ({ email, password }, { setSubmitting, setErrors, resetForm }) => {
      // get full user details using cookie set in browser after SIGNIN_MUTATION
      try {
        const { client, history } = this.props;

        // manually firing off mutation and pull id from response
        await client.mutate({
          mutation: SIGNIN_MUTATION,
          variables: { email, password },
          update: async (cache, { data: { signin:user } }) => {
            this._updateCurrentUser(cache, { ...user, isAuthenticated: true });

            // exposed by Formik
            resetForm();

            // redirect to homepage
            history.push('/');
          }
        });
      } catch (e) {
        // send erros back to Formik form
        setErrors(formatFormErrors(e));
      }
      setSubmitting(false);
    },
    signout: async () => {

      if (result.value) {
        try {
          const { client, history } = this.props;

          // trigger res.clearCookie() on the server
          await client.mutate({
            mutation: SIGNOUT_MUTATION,
            update: async(cache, { data: { signout: { message } }}) => {
              // redirect to homepage
              history.push('/');

              // reset cache to its defaults
              await client.resetStore();
            }
          });

        } catch (e) {}
      }

    }
  };

  async componentDidMount() {
    const { client } = this.props;
    /**
     * When component is mounted
     * you can get the user from cache
     * verify token validity etc
     */
    const {
      data: { currentUser }
    } = await client.query({ query: CURRENT_CACHED_USER_QUERY });
    console.log({ currentUser });
  }

  render() {
    // pass apollo/auth functions stored in Component state as context value
    return <AuthContext.Provider value={{ ...this.state }} {...this.props} />;
  }

  _updateCurrentUser(cache, user) {
    const data = {
      currentUser: {
        ...user,
        __typename: 'CurrentUser'
      }
    };

    console.log({ data });
    cache.writeData({ data });
  }
}

// withApollo() will create a new component which passes in an instance of ApolloClient as a client prop
export const AuthProvider = withApollo(withRouter(Provider));

// consumer for AuthContext
export const AuthConsumer = props => <AuthContext.Consumer {...props} />;

// withAuth hoc passes down original props and currentUser and context as props to new wrapped component
export const withAuth = WrappedComponent => props => (
  <Query
    query={CURRENT_CACHED_USER_QUERY}
    fetchPolicy='cache-only'
  >
    {({ data: { currentUser } }) => (
      <AuthConsumer>
        {ctx => <WrappedComponent {...props} currentUser={currentUser} {...ctx} />}
      </AuthConsumer>
    )}
  </Query>
);