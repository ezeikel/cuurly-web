import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    userz {
      id
      email
      username
      firstName
      lastName
    }
  }
`;

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
                {data.userz.map(user => <li key={user.id}>{user.firstName} || {user.username}</li>)}
              </ul>
            );
          }}
        </Query>
    )
  }
}

export default Users;
