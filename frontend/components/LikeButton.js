import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import CurrentUser from "./CurrentUser";
import {
  SINGLE_POST_QUERY,
  LIKE_POST_MUTATION,
  UNLIKE_POST_MUTATION,
  LIKED_POSTS_QUERY,
  SINGLE_USER_QUERY
} from '../apollo/queries';
import Button from './styles/Button';

const StyledButton = styled(Button)`
  background-color: ${props => props.mode === 'like' ? 'var(--color-green)' : 'var(--color-red)'};
  padding: var(--spacing-small) var(--spacing-medium);
`;

const LikeButton = ({ postId, postLikes }) => (
  <CurrentUser>
    {({ data: { currentUser } }) => {
      const mutate = postLikes.map(like => like.user.id).includes(currentUser.id) ? 'unlikePost' : 'likePost';
      const id = postLikes.map(like => like.user.id).includes(currentUser.id) ? postLikes.filter(like  => like.user.id === currentUser.id)[0].id : postId;

      return currentUser ?
        <Mutation SINGLE_USER_QUERY
          mutation={postLikes.map(like => like.user.id).includes(currentUser.id) ? UNLIKE_POST_MUTATION : LIKE_POST_MUTATION}
          variables={postLikes.map(like => like.user.id).includes(currentUser.id) ? { id: postLikes.filter(like  => like.user.id === currentUser.id)[0].id } : { id: postId }}
          optimisticResponse={{ // https://www.apollographql.com/docs/react/features/optimistic-ui
            __typeName: 'Mutation',
              [mutate]: {
                __typename: 'Like',
                id
              }
          }}
          refetchQueries={[{ query: SINGLE_POST_QUERY, variables: { id: postId } }, { query: LIKED_POSTS_QUERY, variables: { id: currentUser.id } }, { query: SINGLE_USER_QUERY, variables: { id: currentUser.id } } ]}
        >
          { (mutate, {loading, error }) => <StyledButton mode={postLikes.map(like => like.user.id).includes(currentUser.id) ? 'unlike' : 'like'} onClick={mutate} disabled={loading}>{ postLikes.map(like => like.user.id).includes(currentUser.id) ? 'Unlike' : 'Like' }</StyledButton> }
        </Mutation>
      : null
    }}
  </CurrentUser>
);

export default LikeButton;
