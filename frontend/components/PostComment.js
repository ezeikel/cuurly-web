import { Mutation } from 'react-apollo';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import CurrentUser from "./CurrentUser";
import { SINGLE_POST_QUERY, ADD_COMMENT_MUTATION } from '../apollo/queries';
import Button from './styles/Button';
import Spinner from './Spinner';

const CommentSchema = Yup.object().shape({
  text: Yup.string()
    .required('Comment can not be blank.')
    //.min(1, 'Comment can not be blank.')
});

const PostComment = ({ postId }) => (
  <CurrentUser>
    {({ data: { currentUser } }) => (
      currentUser && currentUser ?
        <Mutation
          mutation={ADD_COMMENT_MUTATION}
          refetchQueries={[{ query: SINGLE_POST_QUERY, variables: { id: postId } }]}
        >
          { (addComment, { error, loading }) => (
            <Formik
              initialValues={{ text: '' }}
              validationSchem={CommentSchema}
              onSubmit={async (values, { resetForm }) => {
                // TODO: Fix issue were user is able to submit empty string as a comment
                try {
                  await addComment({ variables: { ...values, id: postId }});
                  resetForm();
                } catch(e) {
                  console.error(`Formik Error: ${e}`);
                }
              }}
            >
              {({
                isSubmitting,
                errors,
                touched
              }) => (
                <Form>
                  <Field type="text" name="text" placeholder="Add a comment" />
                  <ErrorMessage name="text" />
                  <Button type="submit" disabled={isSubmitting}>Post {isSubmitting ? <Spinner /> : null }</Button>
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