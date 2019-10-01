import { withRouter } from 'next/router';
import { Mutation } from 'react-apollo';
import { SIGNOUT_MUTATION, CURRENT_USER_QUERY } from '../apollo/queries';
import styled from 'styled-components';

const Wrapper = styled.span`
  cursor: pointer;
`;

const Signout = ({ router }) => (
  <Mutation
    mutation={SIGNOUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    update={cache => {
      // manually writing to cache to fix homepage conditional redirect not working
      cache.writeQuery({
        query: CURRENT_USER_QUERY,
        data: { currentUser: null }
      });
    }}
    onCompleted={() => router.push(`/`)}
  >
    {signout => <Wrapper onClick={signout}>Sign Out</Wrapper>}
  </Mutation>
);

export default withRouter(Signout);
