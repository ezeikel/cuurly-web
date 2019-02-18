import styled from 'styled-components';
import { Field } from 'formik';

const FormInput = styled(Field)`
  appearance: none;
  outline: 0;
  font-size: var(--font-size-small);
  color: var(--color-black);
  padding: var(--spacing-medium);
  border: 1px solid #ecf0f1;
  transition: all 0.3s ease-in-out;
  width: 100%;
`;

export default FormInput;
