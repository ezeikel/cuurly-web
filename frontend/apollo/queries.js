import gql from "graphql-tag"

export const CURRENT_USER_QUERY = gql`
  query {
    currentUser {
      id
      name
      username
      profilePicture
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
      profilePicture
      bio
      website
      email
      phoneNumber
      followers {
        id
      }
      following {
        id
      }
      posts {
        id
      }
      verified
    }
  }
`;

export const USER_FOLLOWERS_QUERY = gql`
  query USER_FOLLOWERS_QUERY ($id: ID!) {
    followers(id: $id) {
      id
      name
      username
      profilePicture
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
  query USER_FOLLOWING_QUERY ($id: ID!) {
    following(id: $id) {
      id
      name
      username
      profilePicture
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
        profilePicture
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
  query SEARCH_USERS_QUERY($searchTerm: String!) {
    users(
      where: {
        username_contains: $searchTerm,
      }
    ) {
      id
      username
      name
      profilePicture
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
      name
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
     $file: Upload!
     $caption: String!
   ) {
     createPost (
       file: $file
       caption: $caption
     ) {
       id
     }
   }
`;

export const DELETE_POST_MUTATION = gql`
   mutation DELETE_POST_MUTATION (
     $id: ID!
     $publicId: String!
   ) {
     deletePost (
       id: $id
       publicId: $publicId
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

export const LIKE_POST_MUTATION = gql`
   mutation LIKE_POST_MUTATION ($id: ID!) {
     likePost (id: $id) {
       id
     }
   }
`
;
export const UNLIKE_POST_MUTATION = gql`
   mutation UNLIKE_POST_MUTATION ($id: ID!) {
     unlikePost (id: $id) {
       id
     }
   }
`;

export const ADD_COMMENT_MUTATION = gql`
   mutation ADD_COMMENT_MUTATION ($id: ID!, $text: String!) {
     addComment (id: $id, text: $text) {
       id
     }
   }
`
;
export const DELETE_COMMENT_MUTATION = gql`
   mutation DELETE_COMMENT_MUTATION ($id: ID!) {
     deleteComment (id: $id) {
       id
     }
   }
`;
