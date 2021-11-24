import { useRouter } from "next/router";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import formatAPIErrors from "../../../../utils/formatAPIErrors";
import {
  CURRENT_USER_QUERY,
  SIGNIN_MUTATION,
} from "../../../../apollo/queries";
import Button from "../../../Button/Button";
import FormWrapper from "../../FormWrapper/FormWrapper";
import TextInput from "../../inputs/TextInput/TextInput";

const SignInSchema = Yup.object().shape({
  username: Yup.string().required("Please enter a Username."),
  password: Yup.string().required("Please enter a Password."),
});

const SignInForm = ({ className }) => {
  const router = useRouter();
  const [signin] = useMutation(SIGNIN_MUTATION, {
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

  const wrapperClass = classNames("", {
    [className]: className,
  });

  return (
    <FormWrapper className={wrapperClass}>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={SignInSchema}
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
          <Form className="flex flex-col">
            <div className="mb-4">
              <TextInput
                className="mb-4"
                label="Username"
                name="username"
                type="text"
              />
              <TextInput label="Password" name="password" type="password" />
            </div>
            <Button
              variant="confirm"
              text="Sign In"
              submittingText="Signing In"
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
              className="mb-8"
            />
            <Link href="/request-reset">
              <a className="text-blue-800 text-xs text-center">
                Forgot password?
              </a>
            </Link>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default SignInForm;
