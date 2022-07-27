import { useRouter } from "next/router";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import formatAPIErrors from "../../../utils/formatAPIErrors";
import { CURRENT_USER_QUERY, SIGNIN_MUTATION } from "../../../apollo/queries";
import Button from "../../Button/Button";
import TextInput from "../../form/inputs/TextInput/TextInput";

const SignInSchema = Yup.object().shape({
  username: Yup.string().required("Please enter a Username."),
  password: Yup.string().required("Please enter a Password."),
});

const SignInForm = () => {
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
  });

  return (
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
        <Form className="space-y-6">
          <TextInput
            className="mb-4"
            label="Username"
            name="username"
            type="text"
          />
          <TextInput label="Password" name="password" type="password" />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/request-reset">
                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </Link>
            </div>
          </div>

          <Button
            variant="confirm"
            text="Sign In"
            submittingText="Signing In"
            disabled={isSubmitting}
            isSubmitting={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          />
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
