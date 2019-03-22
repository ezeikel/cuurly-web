import Link from "next/link";
import { Component } from 'react';
import { Query } from 'react-apollo';
import { SINGLE_POST_QUERY } from '../apollo/queries';
import LikeButton from './LikeButton';
import PostComment from './PostComment';
import CommentList from './styles/CommentList';
import Comment from './Comment';
import DeletePost from './DeletePost';

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
                <img src={post.content.url} />
                <LikeButton postId={this.props.id} postLikes={post.likes} />
                <p>{post.likes.length} likes</p>
                <Link href={`/user?id=${post.author.id}`}>
                  <a>{post.author.username}</a>
                </Link>
                <p>{post.caption}</p>
                <PostComment postId={post.id} />
                <DeletePost postId={post.id} />
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