import { withRouter } from 'next/router';
import { Mutation } from 'react-apollo';
import { SIGNOUT_MUTATION, CURRENT_USER_QUERY } from '../apollo/queries';

const Signout = ({ router }) => (
  <Mutation
    mutation={SIGNOUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    onCompleted={() => router.push(`/`)}
  >
    {signout => <span onClick={signout}>Sign Out</span>}
  </Mutation>
);

export default withRouter(Signout);
