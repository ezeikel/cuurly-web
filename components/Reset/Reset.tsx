import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { RESET_MUTATION } from "../../apollo/queries";
import formatAPIErrors from "../../utils/formatAPIErrors";
import TextInput from "../form/inputs/formik/TextInput/TextInput";
import Button from "../Button/Button";

const ResetSchema = Yup.object().shape({
  password: Yup.string().required("Please enter a new password."),
  confirmPassword: Yup.string().required("Please confirm your new password."),
});

const Reset = ({ resetToken }) => {
  const router = useRouter();
  const [reset] = useMutation(RESET_MUTATION);

  return (
    <Formik
      initialValues={{ password: "", confirmPassword: "" }}
      validationSchema={ResetSchema}
      onSubmit={async (values, { resetForm, setErrors }) => {
        try {
          await reset({
            variables: {
              ...values,
              resetToken,
            },
          });

          resetForm();
          toast("Your password has been reset.");
          router.push("/sign-in");
        } catch (e) {
          setErrors(formatAPIErrors(e));
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="w-full">
          <div className="mb-4">
            <TextInput name="password" type="password" label="New Password" />
          </div>
          <div className="mb-4">
            <TextInput
              name="confirmPassword"
              type="password"
              label="New Password Confirmation"
            />
          </div>
          <Button text="Reset Password" isLoading={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
};

export default Reset;
