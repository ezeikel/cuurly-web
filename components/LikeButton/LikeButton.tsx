import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@apollo/client";
import classNames from "classnames";
import {
  SINGLE_POST_QUERY,
  LIKE_POST_MUTATION,
  UNLIKE_POST_MUTATION,
  LIKED_POSTS_QUERY,
  SINGLE_USER_QUERY,
} from "../../apollo/queries";
import useUser from "../../hooks/useUser";

const LikeButton = ({ postId, postLikes }) => {
  const { user } = useUser();

  const liked = postLikes.map((like) => like.user.id).includes(user.id);

  const mutation = liked ? UNLIKE_POST_MUTATION : LIKE_POST_MUTATION;

  const [mutateFunc, { loading }] = useMutation(mutation, {
    variables: liked
      ? {
          // either deleting an existing like using the like id
          id: postLikes.filter((like) => like.user.id === user.id)[0].id,
        }
      : // or creating a new like asscoiated with the post id
        { id: postId },
    refetchQueries: [
      // TODO: UI update is really slow - can we have optimistic response for refetchedQuery
      { query: SINGLE_POST_QUERY, variables: { id: postId } },
      {
        query: LIKED_POSTS_QUERY,
        variables: { id: user.id },
      },
      {
        query: SINGLE_USER_QUERY,
        variables: { id: user.id },
      },
    ],
  });

  if (!user) return null;

  return (
    <FontAwesomeIcon
      icon={liked ? ["fas", "heart"] : ["fal", "heart"]}
      size="lg"
      onClick={() => {
        if (!loading) {
          mutateFunc();
        }
      }}
      className={classNames("cursor-pointer", {
        "text-red-500": liked,
      })}
    />
  );
};

export default LikeButton;
