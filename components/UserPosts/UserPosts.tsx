import PostPreview from "../PostPreview/PostPreview";

const UserPosts = ({ posts }) => {
  return (
    <ul className="grid grid-cols-3 grid-rows-3 gap-6 m-auto">
      {posts.map((post) => (
        <PostPreview
          key={post.id}
          id={post.id}
          className="w-full h-full max-w-xs max-h-[20rem] aspect-square"
        />
      ))}
    </ul>
  );
};

export default UserPosts;
