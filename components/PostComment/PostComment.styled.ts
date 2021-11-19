import styled from "styled-components";
import { Form, Field } from "formik";

export const StyledField = styled(Field)`
  border: 0;
  outline: 0;
  font-size: 1.4rem;
  line-height: 1.8rem;
  ::placeholder {
    color: #999999;
  }
`;

export const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  cursor: pointer;
`;
