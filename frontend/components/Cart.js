import gql from 'graphql-tag';

export const LOCAL_STATE_QUERY = gql `
  query {
    cartOpen @client
  }
`;
