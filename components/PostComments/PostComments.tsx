import classNames from "classnames";
import PostComment from "../PostComment/PostComment";

const PostComments = ({ post, className }) => {
  if (!post.comments || post.comments.length === 0) {
    return null;
  }

  return (
    <div
      className={classNames("flex flex-col gap-y-1", {
        [className]: !!className,
      })}
    >
      {post.comments?.map((comment) => (
        <PostComment key={comment.id} comment={comment} post={post} />
      ))}
    </div>
  );
};

export default PostComments;
