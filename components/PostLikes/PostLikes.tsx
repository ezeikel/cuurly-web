import classNames from "classnames";

const PostLikes = ({ likes, className }) => {
  if (!likes || likes.length === 0) {
    return null;
  }

  return likes?.length ? (
    <div
      className={classNames("text-sm", {
        [className]: !!className,
      })}
    >
      {likes.length} like
      {likes.length > 1 ? "s" : null}
    </div>
  ) : null;
};

export default PostLikes;
