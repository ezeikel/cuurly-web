import { getFeed } from "@/app/actions";

const Feed = async () => {
  const posts = await getFeed();

  if (!posts?.length) {
    return (
      <div className="p-8">
        <h3 className="font-medium text-lg text-center">No posts found.</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-8 p-8 items-center">
      <p>Feed</p>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.id}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
