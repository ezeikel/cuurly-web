import Link from "next/link";
import { useQuery, useMutation } from "@apollo/client";
import {
  CURRENT_USER_QUERY,
  SINGLE_POST_QUERY,
  DELETE_COMMENT_MUTATION,
} from "../../apollo/queries";
import { Wrapper, StyledAnchor, StyledFontAwesomeIcon } from "./Comment.styled";

const Comment = ({ comment, post }) => {
  const {
    loading: currentUserLoading,
    error: currentUserError,
    data: { currentUser } = {}, // setting default value when destructing as data is undefined when loading - https://github.com/apollographql/react-apollo/issues/3323#issuecomment-523430331
  } = useQuery(CURRENT_USER_QUERY);

  if (!currentUser) return null;

  const [
    deleteComment,
    { data, loading: deleteCommentLoading, error: deleteCommentError },
  ] = useMutation(DELETE_COMMENT_MUTATION, {
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
        <StyledFontAwesomeIcon
          onClick={deleteComment}
          icon={["fal", "times"]}
          color="#c7c7c7"
          size="lg"
        />
      ) : null}
    </Wrapper>
  );
};

export default Comment;
