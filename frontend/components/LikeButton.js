import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import CurrentUser from "./CurrentUser";
import { SINGLE_POST_QUERY, LIKE_POST_MUTATION, UNLIKE_POST_MUTATION } from '../apollo/queries';
import Button from './styles/Button';

const StyledButton = styled(Button)`
  background-color: ${props => props.mode === 'like' ? 'var(--color-green)' : 'var(--color-red)'};
  padding: var(--spacing-small) var(--spacing-medium);
`;

// TODO: Unlike mutation requires the Like ID to be passed. Either find a way to get it or to find the LIke via the post id and user id

const LikeButton = ({ postId, postLikes }) => (
  <CurrentUser>
    {({ data: { currentUser } }) => (
      currentUser && currentUser ?
        <Mutation
          mutation={postLikes.includes(currentUser.id) ? UNLIKE_POST_MUTATION : LIKE_POST_MUTATION}
          variables={{ id: postId }}
          refetchQueries={[{ query: SINGLE_POST_QUERY, variables: { id: postId } }]}
        >
          { like => <StyledButton mode={postLikes.includes(currentUser.id) ? 'unlike' : 'like'} onClick={like}>{ postLikes.includes(currentUser.id) ? 'Unlike' : 'Like' }</StyledButton> }
        </Mutation>
      : null
    )}
  </CurrentUser>
);

export default LikeButton;