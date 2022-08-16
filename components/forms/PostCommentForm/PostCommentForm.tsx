import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import classNames from "classnames";
import {
  SINGLE_POST_QUERY,
  ADD_COMMENT_MUTATION,
} from "../../../apollo/queries";
import useUser from "../../../hooks/useUser";
import TextareaInput from "../../form/inputs/formik/TextareaInput/TextareaInput";
import Button from "../../Button/Button";

const CommentSchema = Yup.object().shape({
  text: Yup.string().required("Comment can not be blank."),
  // .min(1, 'Comment can not be blank.')
});

const PostCommentForm = ({ postId }) => {
  const { user } = useUser();

  if (!user) return null;

  const [addComment] = useMutation(ADD_COMMENT_MUTATION, {
    refetchQueries: [{ query: SINGLE_POST_QUERY, variables: { id: postId } }],
  });

  return (
    <Formik
      initialValues={{ text: "" }}
      validationSchema={CommentSchema}
      onSubmit={async ({ text }, { resetForm }) => {
        try {
          await addComment({
            variables: { text, id: postId },
          });
          resetForm();
        } catch (e) {
          console.error(`Formik Error: ${e}`);
        }
      }}
    >
      {({ touched, dirty }) => (
        <Form className="relative flex">
          <TextareaInput
            name="text"
            placeholder="Add a comment..."
            noBorder
            autoResize
            minRows={1}
            className="text-sm"
          />
          <Button
            text="Post"
            variant="link"
            type="submit"
            noPadding
            disabled={!dirty || !touched}
            className={classNames("text-sm pr-4 py-4", {
              "opacity-50": !dirty || !touched,
            })}
          />
        </Form>
      )}
    </Formik>
  );
};

export default PostCommentForm;
