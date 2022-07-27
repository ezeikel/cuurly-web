import gql from "graphql-tag";

// TODO: use fragments where it makes sense

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    currentUser {
      id
      firstName
      lastName
      username
      profile {
        picture {
          url
        }
      }
      role
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
  query SINGLE_USER_QUERY($id: ID, $username: String, $email: String) {
    user(id: $id, username: $username, email: $email) {
      id
      firstName
      lastName
      username
      profile {
        picture {
          url
        }
      }
      bio
      website
      email
      phoneNumber
      gender
      followers {
        id
        firstName
        lastName
        username
        profile {
          picture {
            url
          }
        }
        verified
        followers {
          id
        }
        following {
          id
        }
      }
      following {
        id
        firstName
        lastName
        username
        profile {
          picture {
            url
          }
        }
        verified
        followers {
          id
        }
        following {
          id
        }
      }
      posts {
        id
      }
      verified
    }
  }
`;

export const USER_FOLLOWERS_QUERY = gql`
  query USER_FOLLOWERS_QUERY($id: ID, $username: String, $email: String) {
    followers(id: $id, username: $username, email: $email) {
      id
      firstName
      lastName
      username
      profile {
        picture {
          url
        }
      }
      verified
      followers {
        id
      }
      following {
        id
      }
    }
  }
`;

export const USER_FOLLOWING_QUERY = gql`
  query USER_FOLLOWING_QUERY($id: ID, $username: String, $email: String) {
    following(id: $id, username: $username, email: $email) {
      id
      firstName
      lastName
      username
      profile {
        picture {
          url
        }
      }
      verified
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
      content {
        url
        publicId
      }
      caption
      author {
        id
        username
        profile {
          picture {
            url
          }
        }
      }
      likes {
        id
        user {
          id
        }
      }
      comments {
        id
        text
        writtenBy {
          id
          username
        }
      }
      createdAt
    }
  }
`;

export const FEED_QUERY = gql`
  query FEED_QUERY($id: ID!) {
    feed(id: $id) {
      id
    }
  }
`;

export const EXPLORE_QUERY = gql`
  query EXPLORE_QUERY($id: ID!) {
    explore(id: $id) {
      id
    }
  }
`;

export const SEARCH_USERS_QUERY = gql`
  query SEARCH_USERS_QUERY($query: String!) {
    users(query: $query) {
      id
      username
      firstName
      lastName
      profile {
        picture {
          url
        }
      }
      verified
    }
  }
`;

export const LIKED_POSTS_QUERY = gql`
  query LIKED_POSTS_QUERY($id: ID!) {
    user(id: $id) {
      id
      likes {
        id
        post {
          id
          content {
            url
          }
          caption
          author {
            id
            username
          }
          likes {
            id
          }
        }
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
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
      role
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
      profile {
        picture {
          url
        }
      }
      role
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

export const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

export const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      username
      firstName
      lastName
      role
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation CREATE_POST_MUTATION($file: Upload!, $caption: String!) {
    createPost(file: $file, caption: $caption) {
      id
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation DELETE_POST_MUTATION($id: ID!, $publicId: String!) {
    deletePost(id: $id, publicId: $publicId) {
      id
    }
  }
`;

export const FOLLOW_MUTATION = gql`
  mutation FOLLOW_MUTATION($id: ID!) {
    follow(id: $id) {
      id
    }
  }
`;
export const UNFOLLOW_MUTATION = gql`
  mutation FOLLOW_MUTATION($id: ID!) {
    unfollow(id: $id) {
      id
    }
  }
`;

export const LIKE_POST_MUTATION = gql`
  mutation LIKE_POST_MUTATION($id: ID!) {
    likePost(id: $id) {
      id
    }
  }
`;

export const UNLIKE_POST_MUTATION = gql`
  mutation UNLIKE_POST_MUTATION($id: ID!) {
    unlikePost(id: $id) {
      id
    }
  }
`;

export const ADD_COMMENT_MUTATION = gql`
  mutation ADD_COMMENT_MUTATION($id: ID!, $text: String!) {
    addComment(id: $id, text: $text) {
      id
    }
  }
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation DELETE_COMMENT_MUTATION($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION(
    $firstName: String
    $lastName: String
    $username: String
    $profilePicture: Upload
    $website: String
    $bio: String
    $email: String
    $phoneNumber: String
    $gender: String
    $oldPassword: String
    $password: String
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      profilePicture: $profilePicture
      website: $website
      bio: $bio
      email: $email
      phoneNumber: $phoneNumber
      gender: $gender
      oldPassword: $oldPassword
      password: $password
    ) {
      id
    }
  }
`;
