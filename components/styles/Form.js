import styled from 'styled-components';
import { Form } from 'formik';

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: var(--spacing-small);
`;

export default StyledForm;