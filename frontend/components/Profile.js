import { Component } from 'react';
import { Query } from 'react-apollo';
import { SINGLE_USER_QUERY } from '../apollo/queries';

class Profile extends Component {
  render() {
    return (
      <Query query={SINGLE_USER_QUERY} variables={{ id: this.props.id}}>
      {({ data: { user: { firstName, lastName, username }}, error, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
        return (
          <div>
            <h1>{firstName}</h1>
            <h1>{lastName}</h1>
            <h3>{username}</h3>
          </div>
        );
      }}
      </Query>
    );
  }
}

export default Profile;
