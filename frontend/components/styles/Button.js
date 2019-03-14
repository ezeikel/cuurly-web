import styled from 'styled-components';

const Button = styled.button`
  display: grid;
  place-items: center;
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  font-family: var(--default-font-family);
  font-size: 1.6rem;
  &[type="submit"] {
    &[disabled] {
      opacity: 0.7;
      text-decoration: line-through;
    }
  }
  a {
    color: var(--color-white);
    padding: var(--spacing-medium) var(--spacing-large);
  }
`;

export default Button;
