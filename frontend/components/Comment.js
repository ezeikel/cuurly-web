import Link from 'next/link';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import CurrentUser from './CurrentUser';
import { SINGLE_POST_QUERY, DELETE_COMMENT_MUTATION } from '../apollo/queries';

const Wrapper = styled.li`
  display: grid;
  grid-template-columns: ${props => props.canDelete ? 'auto 1fr auto' : 'auto 1fr'};
  align-items: center;
  grid-column-gap: var(--spacing-medium);
`;

const Comment = ({ comment, post }) => (
  <CurrentUser>
    {({ data: { currentUser } }) => (
      <Wrapper canDelete={currentUser && currentUser.id && currentUser.id === comment.writtenBy.id || currentUser.id === post.author.id}>
        <h3>
          <Link href={`/user?id=${comment.writtenBy.id}`}>
            <a>{comment.writtenBy.username}</a>
          </Link>
        </h3>
        <span>
          {comment.text}
        </span>
        {
          currentUser && currentUser.id && currentUser.id === comment.writtenBy.id || currentUser.id === post.author.id ?
            <Mutation
              mutation={DELETE_COMMENT_MUTATION}
              variables={{ id: comment.id }}
              refetchQueries={[{ query: SINGLE_POST_QUERY, variables: { id: post.id } }]}
            >
              {(deleteComment, { error, loading }) => (
                <span onClick={deleteComment}>X</span>
              )}
            </Mutation>
          : null
        }
      </Wrapper>
    )}
  </CurrentUser>
);

export default Comment;
