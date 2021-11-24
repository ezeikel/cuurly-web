import styled from "styled-components";
import { Form } from "formik";

export const StyledForgotPasswordLink = styled.a`
  align-self: center;
  color: #003569;
  cursor: pointer;
  margin-top: 16px;
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  > div + input {
    margin-top: 16px;
  }
`;
