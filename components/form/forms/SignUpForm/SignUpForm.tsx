import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import formatAPIErrors from "../../../../utils/formatAPIErrors";
import {
  CURRENT_USER_QUERY,
  SIGNUP_MUTATION,
} from "../../../../apollo/queries";
import Button from "../../../Button/Button";
import FormWrapper from "../../FormWrapper/FormWrapper";
import TextInput from "../../inputs/TextInput/TextInput";

const SignUpSchema = Yup.object().shape({
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

const SignUpForm = ({ className }) => {
  const router = useRouter();
  const [signup] = useMutation(SIGNUP_MUTATION, {
    mutation: SIGNUP_MUTATION,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    onCompleted({ signup: { username } }) {
      router.push("/[username]", `/${username}`);
    },
  });

  const wrapperClass = classNames("", {
    [className]: className,
  });

  return (
    <FormWrapper className={wrapperClass}>
      <Formik
        initialValues={{ email: "", name: "", username: "", password: "" }}
        validationSchema={SignUpSchema}
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
          <Form className="flex flex-col">
            <div className="mb-4">
              <TextInput
                className="mb-4"
                label="name"
                name="name"
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
