import { Mutation } from 'react-apollo';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import CurrentUser from "./CurrentUser";
import { SINGLE_POST_QUERY, ADD_COMMENT_MUTATION } from '../apollo/queries';
import Button from './styles/Button';

const CommentSchema = Yup.object().shape({
  text: Yup.string()
    .required('Required')
});

const PostComment = ({ postId }) => (
  <CurrentUser>
    {({ data: { currentUser } }) => (
      currentUser && currentUser ?
        <Mutation
          mutation={ADD_COMMENT_MUTATION}
          refetchQueries={[{ query: SINGLE_POST_QUERY, variables: { id: postId } }]}
        >
          { (addComment, {error, loading }) => (
            <Formik
              initialValues={{ text: '' }}
              validationSchem={CommentSchema}
              onSubmit={async values => {
                await addComment({ variables: { ...values, id: postId }});
              }}
            >
              {({
                isSubmitting,
                errors,
                touched
              }) => (
                <Form>
                  <Field type="text" name="text" type="text" placeholder="Add a comment" />
                  <Button type="submit" disabled={isSubmitting}>Post</Button>
                </Form>
              )}
            </Formik>
          )}
        </Mutation>
      : null
    )}
  </CurrentUser>
);

export default PostComment;