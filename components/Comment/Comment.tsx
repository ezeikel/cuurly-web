import Link from "next/link";
import { useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  SINGLE_POST_QUERY,
  DELETE_COMMENT_MUTATION,
} from "../../apollo/queries";
import { Wrapper, StyledAnchor } from "./Comment.styled";
import useUser from "../../hooks/useUser";

const Comment = ({ comment, post }) => {
  const { user: currentUser } = useUser();

  if (!currentUser) return null;

  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: { id: comment.id },
    refetchQueries: [{ query: SINGLE_POST_QUERY, variables: { id: post.id } }],
  });

  const canDelete =
    currentUser.id === comment.writtenBy.id ||
    currentUser.id === post.author.id;

  return (
    <Wrapper canDelete={canDelete}>
      <Link href="/[username]" as={`/${comment.writtenBy.username}`}>
        <StyledAnchor>{comment.writtenBy.username}</StyledAnchor>
      </Link>
      <span>{comment.text}</span>
      {canDelete ? (
        <FontAwesomeIcon
          onClick={() => deleteComment()}
          icon={["fal", "times"]}
          color="#c7c7c7"
          size="lg"
        />
      ) : null}
    </Wrapper>
  );
};

export default Comment;
