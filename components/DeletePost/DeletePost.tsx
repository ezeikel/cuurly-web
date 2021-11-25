import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import {
  DELETE_POST_MUTATION,
  SINGLE_USER_QUERY,
  LIKED_POSTS_QUERY,
} from "../../apollo/queries";
import useUser from "../../hooks/useUser";

const DeletePost = ({ post }) => {
  const router = useRouter();
  const { user } = useUser();

  if (!user || user.id !== post.author.id) return null;

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: { id: post.id, publicId: post.content.publicId },
    onCompleted() {
      router.push("/[username]", `/${user.username}`);
    },
    refetchQueries: [
      {
        query: LIKED_POSTS_QUERY,
        variables: {
          id: user.id,
        },
      },
      {
        query: SINGLE_USER_QUERY,
        variables: {
          id: user.id,
        },
      },
    ],
  });

  return (
    <button type="button" onClick={() => deletePost()}>
      Delete
    </button>
  );
};

export default DeletePost;
