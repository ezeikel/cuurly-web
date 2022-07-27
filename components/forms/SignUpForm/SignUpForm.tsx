import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import formatAPIErrors from "../../../utils/formatAPIErrors";
import { CURRENT_USER_QUERY, SIGNUP_MUTATION } from "../../../apollo/queries";
import Button from "../../Button/Button";
import FormWrapper from "../../form/FormWrapper/FormWrapper";
import TextInput from "../../form/inputs/TextInput/TextInput";

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "That name is too short.")
    .max(50, "That name is too long")
    .required("Please enter a first name."),
  lastName: Yup.string()
    .min(2, "That name is too short.")
    .max(50, "That name is too long")
    .required("Please enter a last name."),
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

const SignUpForm = ({ className }) => {
  const router = useRouter();
  const [signup] = useMutation(SIGNUP_MUTATION, {
    mutation: SIGNUP_MUTATION,
    onCompleted({ signup: { username } }) {
      router.push("/[username]", `/${username}`);
    },
    update(cache, { data: { signin: cachedUser } }) {
      // manually writing to cache to fix homepage conditional redirect not working
      cache.writeQuery({
        query: CURRENT_USER_QUERY,
        data: {
          currentUser: {
            ...cachedUser,
            __typename: "CurrentUser",
          },
        },
      });
    },
  });

  const wrapperClass = classNames("p-8 border border-gray-200 rounded", {
    [className]: className,
  });

  return (
    <FormWrapper className={wrapperClass}>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          password: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          try {
            const {
              data: { signup: user },
            } = await signup({ variables: values });

            if (user) {
              // TODO: track sign up
              // track("Sign up");

              resetForm();

              // take new user to explore page
              // router.push("/[username]", `/${user.username}`);
            }
          } catch (e) {
            const formattedErrors = formatAPIErrors(e);
            setErrors(formattedErrors);
          }

          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col">
            <div className="mb-4">
              <TextInput
                className="mb-4"
                label="First name"
                name="firstName"
                type="text"
              />
              <TextInput
                className="mb-4"
                label="Last name"
                name="lastName"
                type="text"
              />
              <TextInput
                className="mb-4"
                label="email"
                name="email"
                type="email"
              />
              <TextInput
                className="mb-4"
                label="username"
                name="username"
                type="text"
              />
              <TextInput label="password" name="password" type="password" />
            </div>
            <Button
              variant="confirm"
              text="Sign Up"
              submittingText="Signing Up"
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default SignUpForm;
