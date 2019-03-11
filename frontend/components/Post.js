import { Component } from 'react';
import { Query } from 'react-apollo';
import { SINGLE_POST_QUERY } from '../apollo/queries';

class Post extends Component {
  render() {
    return (
      <Query query={SINGLE_POST_QUERY} variables={{ id: this.props.id }}>
        {({ data: { post }, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          return (
            <div>
              <div key={post.id}>
                <img src={post.image} />
                <span>{post.caption}</span>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Post;