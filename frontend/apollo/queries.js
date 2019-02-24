import gql from "graphql-tag"

export const CURRENT_CACHED_USER_QUERY = gql`
{
  currentUser @client {
    id
    email
    username
    firstName
    lastName
    permissions
    isAuthenticated
    __typename
  }
}
`;

export const SIGNUP_MUTATION = gql`
  mutation signup(
    $email: String!,
    $firstName: String!,
    $lastName: String!,
    $username: String!,
    $password: String!,
    ) {
    signup(
      email: $email
      firstName: $firstName
      lastName: $lastName
      username: $username
      password: $password
    ) {
      id
      email
      firstName
      lastName
      username
      permissions
    }
  }
`;

export const SIGNIN_MUTATION = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      firstName
      lastName
      username
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