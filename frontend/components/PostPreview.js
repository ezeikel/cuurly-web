import { Component } from "react";
import { Query } from "react-apollo";
import { SINGLE_POST_QUERY } from "../apollo/queries";
import Link from "next/link";

class PostPreview extends Component {
  render() {
    return (
      <Query query={SINGLE_POST_QUERY} variables={{ id: this.props.id }}>
        {({ data: { post }, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;

          return (
            <Link href={`/post?id=${this.props.id}`}>
              <a>
                <div key={post.id}>
                  <img src={post.content.url} />
                  <span>{post.likes.length} likes</span>
                </div>
              </a>
            </Link>
          );
        }}
      </Query>
    );
  }
}

export default PostPreview;
