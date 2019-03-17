import gql from "graphql-tag"

export const CURRENT_USER_QUERY = gql`
  query {
    currentUser {
      id
      name
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
      name
      username
      email
    }
  }
`;

export const SINGLE_USER_QUERY = gql`
  query SINGLE_USER_QUERY($id: ID!) {
    user(id: $id) {
      id
      name
      username
      posts {
        id
        image
        caption
      }
      followers {
        id
      }
      following {
        id
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
        author {
          username
        }
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
    $name: String!,
    $username: String!,
    $email: String!,
    $password: String!,
    ) {
    signup(
      name: $name
      username: $username
      email: $email
      password: $password
    ) {
      id
      name
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
      name      username
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

export const FOLLOW_MUTATION = gql`
   mutation FOLLOW_MUTATION ($id: ID!) {
     follow (id: $id) {
       id
     }
   }
`
;
export const UNFOLLOW_MUTATION = gql`
   mutation FOLLOW_MUTATION ($id: ID!) {
     unfollow (id: $id) {
       id
     }
   }
`;
