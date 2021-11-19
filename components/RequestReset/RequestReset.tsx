import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { REQUEST_RESET_MUTATION } from "../../apollo/queries";
import formatAPIErrors from "../../utils/formatAPIErrors";
import Spinner from "../svgs/Spinner";
import SubmitButton from "../SubmitButton/SubmitButton";
import { StyledForm } from "./RequestReset.styled";
import TextInput from "../form/inputs/TextInput/TextInput";

const ReqeuestResetSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const RequestReset = () => {
  const [requestReset, { loading }] = useMutation(REQUEST_RESET_MUTATION);

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={ReqeuestResetSchema}
      onSubmit={async (values, { resetForm, setErrors }) => {
        try {
          await requestReset({
            variables: values,
          });

          resetForm();
          toast(
            "Thanks! Please check your email for a link to reset your password.",
          );
        } catch (e) {
          setErrors(formatAPIErrors(e));
        }
      }}
    >
      {({ isSubmitting }) => (
        <StyledForm>
          <div>
            <TextInput name="email" type="email" label="Email" />
          </div>
          <SubmitButton type="submit" disabled={loading}>
            <span>Send Reset Link</span> &nbsp;
            {isSubmitting && loading ? <Spinner /> : null}
          </SubmitButton>
        </StyledForm>
      )}
    </Formik>
  );
};

export default RequestReset;
