import { Mutation } from "react-apollo";
import { withRouter } from 'next/router';
import CurrentUser from "./CurrentUser";
import { DELETE_POST_MUTATION, SINGLE_POST_QUERY, LIKED_POSTS_QUERY } from '../apollo/queries';
import Button from "./styles/Button";

const DeletePost = ({ post, router }) => {
  return (
    <CurrentUser>
      {({ data: { currentUser } }) => (
        currentUser && currentUser.id === post.author.id ?
          <Mutation
            mutation={DELETE_POST_MUTATION}
            variables={{ id: post.id, publicId: post.content.publicId }}
            refetchQueries={[{ query: SINGLE_POST_QUERY, variables: { id: post.id } }, { query: LIKED_POSTS_QUERY, variables: { id: currentUser.id } }]}
            onCompleted={() => {
              // TODO: Get access to Formik methods here
              //resetForm();

              // redirect to user feed
              router.push(`/user?id=${currentUser.id}`);
            }}
          >
            { deletePost => <Button onClick={deletePost}>Delete</Button> }
          </Mutation>
          : null
      )}
    </CurrentUser>
  )
};

export default withRouter(DeletePost);
