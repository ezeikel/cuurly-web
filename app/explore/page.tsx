import { getExploreFeed } from "../actions";

const ExplorePage = async () => {
  const posts = await getExploreFeed();

  return (
    <div className="grid gap-6">
      <h1 className="text-4xl font-bold">Explore Page</h1>
      {posts?.length ? (
        posts.map((post) => (
          <div key={post.id}>
            <p>{post.id}</p>
          </div>
        ))
      ) : (
        <span>No posts found.</span>
      )}
    </div>
  );
};

export default ExplorePage;
