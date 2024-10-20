import Link from "next/link";
import { useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import {
  SINGLE_POST_QUERY,
  DELETE_COMMENT_MUTATION,
} from "../../apollo/queries";
import useUser from "../../hooks/useUser";

const Comment = ({ comment, post }) => {
  const { user: currentUser } = useUser();

  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: { id: comment.id },
    refetchQueries: [{ query: SINGLE_POST_QUERY, variables: { id: post.id } }],
  });

  const canDelete =
    currentUser?.id === comment.writtenBy.id ||
    currentUser?.id === post.author.id;

  if (!currentUser) return null;

  return (
    <div className="flex gap-x-3 items-center">
      <div className={classNames("flex gap-x-1 items-center")}>
        <Link href="/[username]" as={`/${comment.writtenBy.username}`} className="text-sm font-bold">
          {comment.writtenBy.username}
        </Link>
        <span className="text-sm">{comment.text}</span>
      </div>
      {canDelete ? (
        <FontAwesomeIcon
          onClick={() => deleteComment()}
          icon={["fal", "times"]}
          color="#c7c7c7"
          size="sm"
          className="cursor-pointer"
        />
      ) : null}
    </div>
  );
};

export default Comment;
