import { Component } from 'react';
import { Query } from 'react-apollo';
import { SINGLE_POST_QUERY } from '../apollo/queries';
import LikeButton from './LikeButton';
import PostComment from './PostComment';
import CommentList from './styles/CommentList';
import Comment from './Comment';

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
                <LikeButton postId={this.props.id} postLikes={post.likes} />
                <span>{post.likes.length} likes</span>
                <p>{post.author.username}</p>
                <p>{post.caption}</p>
                <PostComment postId={post.id} />
                <CommentList>
                  {post.comments.map(comment => (
                    <Comment key={comment.id} comment={comment} post={post} />
                  ))}
                </CommentList>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Post;