import { withRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { RESET_MUTATION } from "../../apollo/queries";
import formatAPIErrors from "../../utils/formatAPIErrors";
import SubmitButton from "../SubmitButton/SubmitButton";
import { StyledForm } from "./Reset.styled";
import TextInput from "../form/inputs/TextInput/TextInput";

const ResetSchema = Yup.object().shape({
  password: Yup.string().required("Please enter a new password."),
  confirmPassword: Yup.string().required("Please confirm your new password."),
});

const Reset = ({ resetToken, router }) => {
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
          router.push(`/signin`);
        } catch (e) {
          setErrors(formatAPIErrors(e));
        }
      }}
    >
      {({ isSubmitting }) => (
        <StyledForm>
          <div>
            <TextInput name="password" type="password" label="New Password" />
          </div>
          <div>
            <TextInput
              name="confirmPassword"
              type="password"
              label="New Password Confirmation"
            />
          </div>
          <SubmitButton
            text="Reset Password"
            submittingText="Resetting Password"
            disabled={isSubmitting}
          />
        </StyledForm>
      )}
    </Formik>
  );
};

export default withRouter(Reset);
