import { useRouter } from "next/router";
import Post from "../../components/Post/Post";

const PostPage = () => {
  const router = useRouter();
  const { postId } = router.query;

  if (!postId) return null;

  return (
    <div className="flex p-4 items-center justify-center md:h-full">
      <Post
        id={postId as string}
        mediaClasses="w-full md:w-[600px] md:h-[600px]"
      />
    </div>
  );
};

export default PostPage;
