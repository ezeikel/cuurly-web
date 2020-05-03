import { withRouter } from "next/router";
import { useMutation } from "@apollo/react-hooks";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Spinner from "./Spinner";
import { CURRENT_USER_QUERY, SIGNUP_MUTATION } from "../apollo/queries";
import formatAPIErrors from "../utils/formatAPIErrors";
import TextInput from "./TextInput";
import SubmitButton from "./styles/SubmitButton";
import FormErrors from "./styles/FormErrors";

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
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    mutation: SIGNUP_MUTATION,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    onCompleted({ signup: { id } }) {
      router.push(`/user?id=${id}`);
    },
  });

  return (
    <>
      <Formik
        initialValues={{ email: "", name: "", username: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          console.log({ values });
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
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <TextInput label="name" name="name" type="text" />
            <TextInput label="email" name="email" type="email" />
            <TextInput label="username" name="username" type="text" />
            <TextInput label="password" name="password" type="password" />
            <FormErrors
              errors={
                (touched.email && errors.email) ||
                (touched.name && errors.name) ||
                (touched.username && errors.username) ||
                (touched.password && errors.password)
              }
            >
              <ErrorMessage name="email" component="div" />
              <ErrorMessage name="name" component="div" />
              <ErrorMessage name="username" component="div" />
              <ErrorMessage name="password" component="div" />
            </FormErrors>
            <SubmitButton type="submit" disabled={isSubmitting}>
              Sign Up {isSubmitting ? <Spinner /> : null}
            </SubmitButton>
          </Form>
        )}
      </Formik>
      {loading && console.log("loading...")}
      {error && console.error({ error })}
    </>
  );
};

export default withRouter(Signup);
