import { Mutation } from "react-apollo";
import { withRouter } from 'next/router';
import CurrentUser from "./CurrentUser";
import { DELETE_POST_MUTATION, SINGLE_USER_QUERY, LIKED_POSTS_QUERY } from '../apollo/queries';
import Button from "./styles/Button";
import { Fragment } from "react";

const DeletePost = ({ post, router }) => {
  return (
    <CurrentUser>
      {({ data: { currentUser } }) => (
        currentUser && currentUser.id === post.author.id ?
          <Mutation
            mutation={DELETE_POST_MUTATION}
            variables={{ id: post.id, publicId: post.content.publicId }}
            refetchQueries = {
              [{
                query: LIKED_POSTS_QUERY,
                variables: {
                  id: currentUser.id
                }
              }, {
                query: SINGLE_USER_QUERY,
                variables: {
                  id: currentUser.id
                }
              }]
            }
            onCompleted={() => router.push(`/user?id=${currentUser.id}`)}
          >
            {(deletePost, { error, loading }) => (
              <Fragment>
                <Button onClick={deletePost}>Delete</Button>
                {loading && <p>Loading...</p>}
                {error && <p>Error :( Please try again</p>}
              </Fragment>
            )}
          </Mutation>
          : null
      )}
    </CurrentUser>
  )
};

export default withRouter(DeletePost);
