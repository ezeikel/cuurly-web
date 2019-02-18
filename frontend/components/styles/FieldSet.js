import styled from 'styled-components';

const FieldSet = styled.div`
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-row-gap: var(--spacing-small);
  label {
    font-size: var(--font-size-small);
  }
`;

export default FieldSet;
