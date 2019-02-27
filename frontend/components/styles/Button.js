import styled from 'styled-components';

const Button = styled.button`
  display: grid;
  place-items: center;
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: var(--spacing-medium) var(--spacing-large);
  border: none;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  font-family: var(--default-font-family);
  font-size: 1.6rem;
  &:hover {
    background-color: var(--color-secondary);
  }
  &[type="submit"] {
    &[disabled] {
      opacity: 0.7;
      text-decoration: line-through;
    }
  }
`;

export default Button;
