import { withRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CURRENT_USER_QUERY, SIGNUP_MUTATION } from "../../apollo/queries";
import formatAPIErrors from "../../utils/formatAPIErrors";
import TextInput from "../form/inputs/TextInput/TextInput";
import SubmitButton from "../SubmitButton/SubmitButton";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "That name is too short.")
    .max(50, "That name is too long")
    .required("Please enter a name."),
  username: Yup.string()
    .min(2, "That username is too short.")
    .max(50, "That username is too long.")
    .required("Please enter a username."),
  email: Yup.string()
    .email("That email is invalid. Please try again.")
    .required("Please enter an email."),
  password: Yup.string()
    .min(9, "That password is too short.")
    .required("Please enter a password."),
});

const Signup = ({ router }) => {
  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    mutation: SIGNUP_MUTATION,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    onCompleted({ signup: { username } }) {
      router.push("/[username]", `/${username}`);
    },
  });

  return (
    <>
      <Formik
        initialValues={{ email: "", name: "", username: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          try {
            await signup({ variables: values });
            resetForm();
          } catch (e) {
            const formattedErrors = formatAPIErrors(e);
            setErrors(formattedErrors);
          }

          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <TextInput label="name" name="name" type="text" />
            <TextInput label="email" name="email" type="email" />
            <TextInput label="username" name="username" type="text" />
            <TextInput label="password" name="password" type="password" />
            <SubmitButton
              text="Sign Up"
              submittingText="Signing Up"
              disabled={isSubmitting}
            />
          </Form>
        )}
      </Formik>
      {loading && <span>loading...</span>}
      {error && console.error({ error })}
    </>
  );
};

export default withRouter(Signup);
