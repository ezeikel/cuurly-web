"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import useUser from "@/hooks/api/useUser";

type LikeButtonProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  postId: string;
  postLikes: { user: { id: string } }[];
};

const LikeButton = ({ postLikes }: LikeButtonProps) => {
  const { data: user } = useUser();

  if (!user) return null;

  const liked = postLikes.map((like) => like.user.id).includes(user.id);

  // TODO: reimplement like mutation
  // const mutation = liked ? UNLIKE_POST_MUTATION : LIKE_POST_MUTATION;

  // const [mutateFunc, { loading }] = useMutation(mutation, {
  //   variables: liked
  //     ? {
  //       // either deleting an existing like using the like id
  //       id: postLikes.filter((like) => like.user.id === user.id)[0].id,
  //     }
  //     : // or creating a new like asscoiated with the post id
  //     { id: postId },
  //   refetchQueries: [
  //     // TODO: UI update is really slow - can we have optimistic response for refetchedQuery
  //     { query: SINGLE_POST_QUERY, variables: { id: postId } },
  //     {
  //       query: LIKED_POSTS_QUERY,
  //       variables: { id: user.id },
  //     },
  //     {
  //       query: SINGLE_USER_QUERY,
  //       variables: { id: user.id },
  //     },
  //   ],
  // });

  return (
    <FontAwesomeIcon
      icon={liked ? ["fas", "heart"] : ["fal", "heart"]}
      size="lg"
      onClick={() => {
        // if (!loading) {
        //   mutateFunc();
        // }
      }}
      className={classNames("cursor-pointer", {
        "text-red-500": liked,
      })}
    />
  );
};

export default LikeButton;
