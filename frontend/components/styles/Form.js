import styled from 'styled-components';
import { Form } from 'formik';

const FieldSet = styled(Form)`
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-row-gap: var(--spacing-small);
`;

export default FieldSet;
