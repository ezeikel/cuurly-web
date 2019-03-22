import { Mutation } from "react-apollo";
import CurrentUser from "./CurrentUser";
import { DELETE_POST_MUTATION, SINGLE_POST_QUERY, LIKED_POSTS_QUERY } from '../apollo/queries';
import Button from "./styles/Button";

const DeletePost = ({ postId }) => (
  <CurrentUser>
    {({ data: { currentUser } }) => (
      currentUser ?
        <Mutation
          mutation={DELETE_POST_MUTATION}
          variables={{ id: postId }}
          refetchQueries={[{ query: SINGLE_POST_QUERY, variables: { id: postId } }, { query: LIKED_POSTS_QUERY, variables: { id: currentUser.id } }]}
        >
          { deletePost => <Button onClick={deletePost}>Delete</Button> }
        </Mutation>
        : null
    )}
  </CurrentUser>
);

export default DeletePost;