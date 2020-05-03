import { withRouter } from "next/router";
import Link from "next/link";
import { useMutation } from "@apollo/react-hooks";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import Spinner from "./Spinner";
import { CURRENT_USER_QUERY, SIGNIN_MUTATION } from "../apollo/queries";
import formatAPIErrors from "../utils/formatAPIErrors";
import { SubmitButton, FormErrors } from "./styles";
import TextInput from "./TextInput";

const SigninSchema = Yup.object().shape({
  username: Yup.string().required("Please enter a Username."),
  password: Yup.string().required("Please enter a Password."),
});

const StyledForgotPasswordLink = styled.a`
  align-self: center;
  color: #003569;
  cursor: pointer;
  margin-top: 16px;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  > div + input {
    margin-top: 16px;
  }
`;

const Signin = ({ router }) => {
  const [signin, { data, loading, error }] = useMutation(SIGNIN_MUTATION, {
    onCompleted({ signin: { id } }) {
      router.push(`/feed?id=${id}`);
    },
    update(cache, { data: { signin } }) {
      // manually writing to cache to fix homepage conditional redirect not working
      cache.writeQuery({
        query: CURRENT_USER_QUERY,
        data: {
          currentUser: {
            ...signin,
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
        {({ isSubmitting, touched, errors }) => (
          <StyledForm>
            <TextInput label="Username" name="username" type="text" />
            <TextInput label="Password" name="password" type="text" />
            <FormErrors
              errors={
                (touched.username && errors.username) ||
                (touched.password && errors.password)
              }
            >
              <ErrorMessage name="username" component="div" />
              <ErrorMessage name="password" component="div" />
            </FormErrors>
            <SubmitButton type="submit" disabled={isSubmitting}>
              Sign In {isSubmitting ? <Spinner /> : null}
            </SubmitButton>
            <Link href="/request-reset">
              <StyledForgotPasswordLink>
                Forgot password?
              </StyledForgotPasswordLink>
            </Link>
          </StyledForm>
        )}
      </Formik>
      {loading && console.log("loading...")}
      {error && console.error({ error })}
    </>
  );
};

export default withRouter(Signin);
