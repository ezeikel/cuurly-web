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
    onCompleted={() => router.push(`/`)}
  >
    {signout => <Wrapper onClick={signout}>Sign Out</Wrapper>}
  </Mutation>
);

export default withRouter(Signout);
