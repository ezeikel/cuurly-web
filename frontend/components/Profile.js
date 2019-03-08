import { Component } from 'react';
import { Query } from 'react-apollo';
import { SINGLE_USER_QUERY } from '../apollo/queries';

class Profile extends Component {
  render() {
    return (
      <Query query={SINGLE_USER_QUERY} variables={{ id: this.props.id}}>
      {({ data: { user: { firstName, lastName, username, posts }}, error, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
        return (
          <div>
            <h1>Welcome to your Profile {firstName} 👋🏿</h1>
            <section>
              <h3>Posts</h3>
              <ul>
                {posts.map(post => (
                  <div key={post.id}>
                    <img src={post.image} />
                    <span>{post.caption}</span>
                  </div>
                ))}
              </ul>

            </section>
          </div>
        );
      }}
      </Query>
    );
  }
}

export default Profile;
