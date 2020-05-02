import styled from "styled-components";

const FormErrors = styled.div`
  font-size: 1.2rem;
  line-height: 1.8rem;
  background-color: var(--color-red);
  color: var(--color-white);
  border-radius: 4px;
  ${({ errors }) =>
    errors
      ? `
    padding: var(--spacing-small);
  `
      : null}
`;

export default FormErrors;
