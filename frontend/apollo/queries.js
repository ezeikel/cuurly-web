import gql from "graphql-tag"

export const CURRENT_USER_QUERY = gql`
  query {
    currentUser {
      id
      firstName
      lastName
      username
      email
      permissions
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
  query SINGLE_USER_QUERY($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
      username
      posts {
        id
        image
        caption
      }
    }
  }
`;

export const SINGLE_POST_QUERY = gql`
  query SINGLE_POST_QUERY($id: ID!) {
    post(id: $id) {
        id
        image
        caption
    }
  }
`;

export const FEED_QUERY = gql`
  query FEED_QUERY($id: ID!) {
    feed(id: $id) {
      id
      image
      caption
      author {
        id
        username
      }
    }
  }
`;

export const SEARCH_USERS_QUERY = gql`
  query SEARCH_USERS_QUERY($searchTerm: String!) {
    users(
      where: {
        username_contains: $searchTerm,
      }
    ) {
      id
      username
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
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
  mutation SIGNIN_MUTATION($username: String!, $password: String!) {
    signin(username: $username, password: $password) {
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
  mutation SIGNOUT_MUTATION {
    signout {
      message
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
   mutation CREATE_POST_MUTATION (
     $caption: String!
     $image: String
     $largeImage: String
   ) {
     createPost (
       caption: $caption
       image: $image
       largeImage: $largeImage
     ) {
       id
     }
   }
`;
