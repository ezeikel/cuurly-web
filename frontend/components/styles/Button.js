import styled from 'styled-components';

const Button = styled.button`
  background-color: transparent;
  border: 1px solid #dbdbdb;
  color: var(--color-black);
  border-radius: 4px;
  outline: 0;
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  font-weight: 600;
  padding: 5px 9px;
  text-align: center;
  text-transform: inherit;
  text-overflow: ellipsis;
  user-select: none;
  white-space: nowrap;
  font-size: 14px;
  line-height: 18px;
  ${({ disabled }) => disabled  ?
  `
    opacity: 0.5;
    cursor: not-allowed;
  ` : null }
`;

export default Button;
