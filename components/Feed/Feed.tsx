import Posts from "../Posts/Posts";

const Feed = ({ posts }) => {
  if (!posts?.length) {
    return (
      <div className="p-8">
        <h3 className="font-medium text-lg text-center">No posts found.</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-8 p-8 items-center">
      <Posts posts={posts} />
    </div>
  );
};

export default Feed;
