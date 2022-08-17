import PostPreview from "../PostPreview/PostPreview";

const UserPosts = ({ posts }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 m-auto">
      {posts.map((post) => (
        <PostPreview key={post.id} id={post.id} className="w-80 h-80" />
      ))}
    </ul>
  );
};

export default UserPosts;
