import Link from "next/link";
import { Query } from "react-apollo";
import { LIKED_POSTS_QUERY } from "../apollo/queries";

const Liked = ({ query }) => (
  <Query query={ LIKED_POSTS_QUERY } variables={{ id: query.id }}>
    {({ data, error, loading }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      return (
        <div>
          <h1>Likes</h1>
          <ul>
            {data.user.likes && data.user.likes.map(like => (
              <div key={like.post.id}>
                <Link href={`/post?id=${like.post.id}`}>
                  <a>{like.post.author.username}</a>
                </Link>
                <img src={like.post.content.url} />
                <span>{like.post.caption}</span>
              </div>
            ))}
          </ul>
        </div>
      );
    }}
  </Query>
);

export default Liked;
