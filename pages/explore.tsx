import { useQuery } from "@apollo/client";
import { EXPLORE_QUERY } from "../apollo/queries";
import Post from "../components/Post/Post";
import useUser from "../hooks/useUser";

const ExplorePage = () => {
  const { user } = useUser();

  const {
    data: { explore: posts } = {},
  } = useQuery(EXPLORE_QUERY, {
    variables: { id: user?.id },
    skip: !!user,
  });

  if (!user) return null;

  if (!posts?.length) return <span>No posts found.</span>;

  return (
    <div className="grid gap-6">
      <h1 className="text-4xl font-bold m-0">Explore.</h1>
      {posts.map((post) => (
        <Post key={post.id} id={post.id} />
      ))}
    </div>
  );
};

export default ExplorePage;
