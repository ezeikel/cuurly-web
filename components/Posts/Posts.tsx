import Post from "../Post/Post";

const Posts = ({ posts }) =>
  posts.map((post) => (
    <Post key={post.id} post={post} className="w-86 md:w-96" />
  ));

export default Posts;
