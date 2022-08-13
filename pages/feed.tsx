import { useQuery } from "@apollo/client";
import { FEED_QUERY } from "../apollo/queries";
import Post from "../components/Post/Post";
import useUser from "../hooks/useUser";

const FeedPage = () => {
  const { user } = useUser();

  const { data: { feed: posts } = {} } = useQuery(FEED_QUERY, {
    variables: { id: user?.id },
    skip: !!user, // wait for currentUser query before executing this one - https://github.com/apollographql/react-apollo/issues/3624#issuecomment-545990545
  });

  if (!user) return null;

  if (!posts?.length)
    return (
      <div className="p-8">
        <h3 className="font-medium text-lg text-center">No posts found.</h3>
      </div>
    );

  return (
    <div className="grid grid-cols-3 gap-4 p-8">
      {posts.map((post) => (
        <Post key={post.id} id={post.id} />
      ))}
    </div>
  );
};

export default FeedPage;
