import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useQuery, useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "../apollo/queries";
import { SINGLE_POST_QUERY, ADD_COMMENT_MUTATION } from "../apollo/queries";
import styled from "styled-components";

const CommentSchema = Yup.object().shape({
  text: Yup.string().required("Comment can not be blank."),
  //.min(1, 'Comment can not be blank.')
});

const StyledField = styled(Field)`
  border: 0;
  outline: 0;
  font-size: 1.4rem;
  line-height: 1.8rem;
  ::placeholder {
    color: #999999;
  }
`;

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  cursor: pointer;
`;

const PostComment = ({ postId }) => {
  const {
    loading: currentUserLoading,
    error: currentUserError,
    data: { currentUser } = {}, // setting default value when destructing as data is undefined when loading - https://github.com/apollographql/react-apollo/issues/3323#issuecomment-523430331
  } = useQuery(CURRENT_USER_QUERY);

  if (!currentUser) return null;

  const [
    addComment,
    { data, loading: addCommentLoading, error: addCommentError },
  ] = useMutation(ADD_COMMENT_MUTATION, {
    refetchQueries: [{ query: SINGLE_POST_QUERY, variables: { id: postId } }],
  });

  return (
    <Formik
      initialValues={{ text: "" }}
      validationSchem={CommentSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await addComment({
            variables: { ...values, id: postId },
          });
          resetForm();
        } catch (e) {
          console.error(`Formik Error: ${e}`);
        }
      }}
    >
      {({ isSubmitting }) => (
        <StyledForm>
          <StyledField type="text" name="text" placeholder="Add a comment..." />
          <ErrorMessage name="text" />
        </StyledForm>
      )}
    </Formik>
  );
};

export default PostComment;
