import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import CurrentUser from "./CurrentUser";
import { SINGLE_USER_QUERY, FOLLOW_MUTATION, UNFOLLOW_MUTATION } from '../apollo/queries';
import Button from './styles/Button';

const StyledButton = styled(Button)`
  background-color: ${props => props.mode === 'follow' ? 'var(--color-green)' : 'var(--color-red)'};
  padding: var(--spacing-small) var(--spacing-medium);
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
          { follow => <StyledButton mode={usersFollowers.includes(currentUser.id) ? 'unfollow' : 'follow'} onClick={follow}>{ usersFollowers.includes(currentUser.id) ? 'Unfollow' : 'Follow' }</StyledButton> }
        </Mutation>
      : null
    )}
  </CurrentUser>
);

export default FollowButton;
