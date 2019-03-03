import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from '../apollo/queries';

const CurrentUser = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    { payload => props.children(payload)}
  </Query>
);

CurrentUser.propTypes = {
  children: PropTypes.func.isRequired
};

export default CurrentUser;
