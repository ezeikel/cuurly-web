import styled from "styled-components";

type InputProps = {
  dirty: boolean;
};

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 8px;
  position: relative;
  height: 36px;
  margin: 0;
  min-width: 0;
  & + div {
    margin-top: 16px;
  }
`;

export const Input = styled.input<InputProps>`
  font-size: 1.6rem;
  line-height: 1.8rem;
  border: 0;
  flex: 1 0 0;
  margin: 0;
  outline: 0;
  overflow: hidden;
  padding: 9px 0 7px 8px;
  text-overflow: ellipsis;
  background: #fafafa;
  border-radius: 4px;
  ${({ dirty }) =>
    dirty
      ? `
    font-size: 1.2rem;
      & + label {
        transform: scale(0.83333) translateY(-12px);
      }
  `
      : null}
  &:focus {
    & + label {
      transform: scale(0.83333) translateY(-12px);
    }
  }
`;

export const Label = styled.label`
  color: #999;
  font-size: 1.4rem;
  height: 36px;
  left: 8px;
  line-height: 36px;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  right: 0;
  text-overflow: ellipsis;
  transform-origin: left;
  transition: transform ease-out 0.1s;
  user-select: none;
  white-space: nowrap;
`;
