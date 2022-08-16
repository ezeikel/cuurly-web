/* eslint-disable import/prefer-default-export */
import { gql } from "@apollo/client";

export const CORE_POST_FIELDS = gql`
  fragment CorePostFields on Post {
    id
    media {
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
      verified
    }
    likes {
      id
      user {
        id
        username
      }
    }
    comments {
      id
      text
      writtenBy {
        id
        username
      }
      createdAt
    }
    createdAt
  }
`;
