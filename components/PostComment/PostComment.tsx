import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useQuery, useMutation } from "@apollo/client";
import {
  CURRENT_USER_QUERY,
  SINGLE_POST_QUERY,
  ADD_COMMENT_MUTATION,
} from "../../apollo/queries";
import { StyledField, StyledForm } from "./PostComment.styled";

const CommentSchema = Yup.object().shape({
  text: Yup.string().required("Comment can not be blank."),
  //.min(1, 'Comment can not be blank.')
});

const PostComment = ({ postId }) => {
  const {
    data: { currentUser } = {}, // setting default value when destructing as data is undefined when loading - https://github.com/apollographql/react-apollo/issues/3323#issuecomment-523430331
  } = useQuery(CURRENT_USER_QUERY);

  if (!currentUser) return null;

  const [addComment] = useMutation(ADD_COMMENT_MUTATION, {
    refetchQueries: [{ query: SINGLE_POST_QUERY, variables: { id: postId } }],
  });

  return (
    <Formik
      initialValues={{ text: "" }}
      validationSchema={CommentSchema}
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
      {() => (
        <StyledForm>
          <StyledField type="text" name="text" placeholder="Add a comment..." />
          <ErrorMessage name="text" />
        </StyledForm>
      )}
    </Formik>
  );
};

export default PostComment;
