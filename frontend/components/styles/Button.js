import styled from 'styled-components';

const Button = styled.button`
  padding: var(--spacing-medium);
  font-family: var(--default-font-family);
  font-size: var(--font-size-small);
  border: 1px solid #E0E0E0;
  border-radius: 2px;
  cursor: pointer;
  transition: all 400ms ease;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgb(245, 245, 245);
  }
  span {
    flex: 1 1 auto;
  }
  svg {
    flex: 0 1 auto;
  }
`;

export default Button;
