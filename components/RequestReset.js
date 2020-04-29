import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import { REQUEST_RESET_MUTATION } from '../apollo/queries'
import formatAPIErrors from '../utils/formatAPIErrors';
import Spinner from './Spinner';
import Form from './styles/Form';
import InputWrapper from './styles/InputWrapper';
import Input from './styles/Input';
import SubmitButton from './styles/SubmitButton';
import FormErrors from './styles/FormErrors';

const ReqeuestResetSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
});

const StyledForm = styled(Form)`
  width: 100%;
`;

const RequestReset = () => (
  <Mutation mutation={REQUEST_RESET_MUTATION}>
    {(requestReset, { error, loading, called }) => (
      <Formik
        initialValues={{ email: '' }}
        validationSchema={ReqeuestResetSchema}
        onSubmit={async (values, { resetForm, setErrors }) => {
          try {
            await requestReset({
              variables: values
            });

            resetForm();
            toast('Thanks! Please check your email for a link to reset your password.');
          } catch(e) {
            setErrors(formatAPIErrors(e));
          }
        }}
      >
        {({
          isSubmitting,
          errors,
          touched
        }) => (
          <StyledForm>
            <InputWrapper>
              <Input>
                <Field
                    name="email"
                    render={({ field }) => <input  className={field.value.length > 0 ? 'dirty' : null} {...field} type="email"/> }
                  />
                <label>Email</label>
              </Input>
            </InputWrapper>
            <FormErrors errors={(touched.username && errors.username) || (touched.password && errors.password)}>
              <ErrorMessage name="username" component="div" />
              <ErrorMessage name="password" component="div" />
            </FormErrors>
            <SubmitButton type="submit" disabled={loading}>
              <span>Send Reset Link</span> {isSubmitting && loading ? <Spinner /> : null}
            </SubmitButton>
          </StyledForm>
        )}
      </Formik>
    )}
  </Mutation>
);

export default RequestReset;
