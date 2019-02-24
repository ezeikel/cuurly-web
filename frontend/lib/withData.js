import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint, prodEndpoint } from '../config';
import { CURRENT_CACHED_USER_QUERY } from '../apollo/queries';

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
    // local data
    clientState: {
      resolvers: {
        Query: {
          currentUser: (_, args, { cache }) => {
            return { currentUser } = cache.readQuery({ query: CURRENT_CACHED_USER_QUERY });
          }
        },
        Mutation: {}
      },
      defaults: {
        currentUser: {
          __typename: 'CurrentUser',
          id: '',
          email: '',
          username: '',
          firstName: '',
          lastName: '',
          permissions: [],
          isAuthenticated: false
        }
      }
    }
  });
}

export default withApollo(createClient);