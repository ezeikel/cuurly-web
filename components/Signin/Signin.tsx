import { withRouter } from "next/router";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";
import { CURRENT_USER_QUERY, SIGNIN_MUTATION } from "../../apollo/queries";
import formatAPIErrors from "../../utils/formatAPIErrors";
import TextInput from "../form/inputs/TextInput/TextInput";
import { StyledForgotPasswordLink, StyledForm } from "./Signin.styled";
import SubmitButton from "../SubmitButton/SubmitButton";

const SigninSchema = Yup.object().shape({
  username: Yup.string().required("Please enter a Username."),
  password: Yup.string().required("Please enter a Password."),
});

const Signin = ({ router }) => {
  const [signin, { loading, error }] = useMutation(SIGNIN_MUTATION, {
    onCompleted() {
      router.push(
        {
          pathname: "/feed",
        },
        "/",
      );
    },
    update(cache, { data: { signin: cachedSignin } }) {
      // manually writing to cache to fix homepage conditional redirect not working
      cache.writeQuery({
        query: CURRENT_USER_QUERY,
        data: {
          currentUser: {
            ...cachedSignin,
            __typename: "CurrentUser",
          },
        },
      });
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={SigninSchema}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          try {
            await signin({ variables: values });
            resetForm();
          } catch (e) {
            const formattedErrors = formatAPIErrors(e);
            setErrors(formattedErrors);
          }

          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <StyledForm>
            <TextInput label="Username" name="username" type="text" />
            <TextInput label="Password" name="password" type="password" />
            <SubmitButton
              text="Sign In"
              submittingText="Signing In"
              disabled={isSubmitting}
            />
            <Link href="/request-reset">
              <StyledForgotPasswordLink>
                Forgot password?
              </StyledForgotPasswordLink>
            </Link>
          </StyledForm>
        )}
      </Formik>
      {loading && <span>Loading...</span>}
      {error && console.error({ error })}
    </>
  );
};

export default withRouter(Signin);
