import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { ALL_USERS_QUERY } from '../apollo/queries';

class Users extends Component {
  render() {
    return (
        <Query
          query={ALL_USERS_QUERY}
        >
          {({data, error, loading}) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <ul>
                {data.users.map(user => <li key={user.id}>{user.username}</li>)}
              </ul>
            );
          }}
        </Query>
    )
  }
}

export default Users;
