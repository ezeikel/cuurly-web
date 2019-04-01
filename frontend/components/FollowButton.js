import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import CurrentUser from "./CurrentUser";
import { SINGLE_USER_QUERY, FOLLOW_MUTATION, UNFOLLOW_MUTATION } from '../apollo/queries';
import Button from './styles/Button';
import Spinner from './Spinner';

const StyledButton = styled(Button)`
  padding: 0 24px;
  height: 100%;
  ${({ mode }) => mode === 'follow' ?
    `
      background-color: #3897f0;
      border-color: #3897f0;
      color: #fff;
    ` :
    null}
`;

const FollowButton = ({ userId, usersFollowers }) => (
  <CurrentUser>
    {({ data: { currentUser } }) => (
      currentUser && currentUser.id !== userId ?
        <Mutation
          mutation={usersFollowers.includes(currentUser.id) ? UNFOLLOW_MUTATION : FOLLOW_MUTATION}
          variables={{ id: userId }}
          refetchQueries={[{ query: SINGLE_USER_QUERY, variables: { id: userId } }, { query: SINGLE_USER_QUERY, variables: { id: currentUser.id } }]}
        >
          { (follow, { error, loading }) => (
            <StyledButton
              mode={usersFollowers.includes(currentUser.id) ? 'unfollow' : 'follow'}
              onClick={follow}
            >
              { loading ? <Spinner /> : usersFollowers.includes(currentUser.id) ? 'Unfollow' : 'Follow' }
            </StyledButton>
          )}
        </Mutation>
      : null
    )}
  </CurrentUser>
);

export default FollowButton;
