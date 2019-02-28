import gql from "graphql-tag"

export const CURRENT_CACHED_USER_QUERY = gql`
{
  currentUser @client {
    id
    firstName
    lastName
    username
    email
    permissions
    isAuthenticated
    __typename
  }
}
`;

export const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      firstName
      lastName
      username
      email
    }
  }
`;

export const SINGLE_USER_QUERY = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
      username
      email
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signup(
    $firstName: String!,
    $lastName: String!,
    $username: String!,
    $email: String!,
    $password: String!,
    ) {
    signup(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      id
      firstName
      lastName
      username
      email
      permissions
    }
  }
`;

export const SIGNIN_MUTATION = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      firstName
      lastName
      username
      email
      permissions
    }
  }
`;

export const SIGNOUT_MUTATION = gql`
  mutation signout {
    signout {
      message
    }
  }
`;
