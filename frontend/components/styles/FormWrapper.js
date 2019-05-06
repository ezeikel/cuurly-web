import styled from 'styled-components';

const FormWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-row-gap: var(--spacing-medium);
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 1px;
  padding: var(--spacing-large);
  max-width: 350px;
  width: 100%;
`;

export default FormWrapper;
