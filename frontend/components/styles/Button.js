import styled from 'styled-components';

const Wrapper = styled.button`
  display: grid;
  place-items: center;
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: var(--spacing-medium) var(--spacing-large);
  &[type="submit"] {
    transition: background-color 0.3s ease-in-out;

    &[disabled] {
      opacity: 0.7;
      text-decoration: line-through;
    }
  }
`;

export default Wrapper;
