import classNames from "classnames";
import useUser from "../../hooks/useUser";
import LikeButton from "../LikeButton/LikeButton";

const PostInteractions = ({ post, className }) => {
  const { user } = useUser();

  return (
    <div
      className={classNames({
        [className]: !!className,
      })}
    >
      {user ? <LikeButton postId={post.id} postLikes={post.likes} /> : null}
    </div>
  );
};

export default PostInteractions;
