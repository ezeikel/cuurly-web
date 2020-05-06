import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import { LIKED_POSTS_QUERY } from "../apollo/queries";

const Liked = ({ query }) => {
  const {
    loading,
    error,
    data: { user } = {}, // setting default value when destructing as data is undefined when loading - https://github.com/apollographql/react-apollo/issues/3323#issuecomment-523430331
  } = useQuery(LIKED_POSTS_QUERY, {
    variables: { id: query.id },
  });

  if (!user) return null;

  if (!user.likes || user.likes.length === 0) return <span>No likes yet.</span>;

  return (
    <div>
      <h1>Likes</h1>
      <ul>
        {user.likes.map((like) => (
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
};

export default Liked;
