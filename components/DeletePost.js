import { Mutation } from "react-apollo";
import { withRouter } from "next/router";
import { useQuery } from "react-apollo";
import {
  DELETE_POST_MUTATION,
  SINGLE_USER_QUERY,
  LIKED_POSTS_QUERY,
  CURRENT_USER_QUERY,
} from "../apollo/queries";
import { Fragment } from "react";

const DeletePost = ({ post, router }) => {
  const {
    loading,
    error,
    data: { currentUser } = {}, // setting default value when destructing as data is undefined when loading - https://github.com/apollographql/react-apollo/issues/3323#issuecomment-523430331
  } = useQuery(CURRENT_USER_QUERY);

  if (!currentUser && currentUser.id !== post.author.id) return null;

  return (
    <Mutation
      mutation={DELETE_POST_MUTATION}
      variables={{ id: post.id, publicId: post.content.publicId }}
      refetchQueries={[
        {
          query: LIKED_POSTS_QUERY,
          variables: {
            id: currentUser.id,
          },
        },
        {
          query: SINGLE_USER_QUERY,
          variables: {
            id: currentUser.id,
          },
        },
      ]}
      onCompleted={() => router.push(`/user?id=${currentUser.id}`)}
    >
      {(deletePost, { error, loading }) => (
        <Fragment>
          <span onClick={deletePost}>Delete</span>
          {loading && <p>Loading...</p>}
          {error && <p>Error :( Please try again</p>}
        </Fragment>
      )}
    </Mutation>
  );
};

export default withRouter(DeletePost);
