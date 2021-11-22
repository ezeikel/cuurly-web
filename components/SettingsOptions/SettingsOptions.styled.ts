import styled from "styled-components";

type ActionProps = {
  disabled?: boolean;
  actionType?: string;
};

export const Wrapper = styled.ul`
  display: grid;
`;

export const Action = styled.li<ActionProps>`
  display: grid;
  align-items: center;
  justify-content: space-around;
  min-height: 48px;
  padding: 4px 8px;
  line-height: 1.5;
  & + li {
    border-top: 1px solid #efefef;
  }
  span {
    cursor: pointer;
    ${({ actionType }) =>
      actionType === "negative"
        ? `
    color: var(--color-red);
  `
        : null}
    ${({ disabled }) =>
      disabled
        ? `
    opacity: 0.3;
    pointer-events: none;
  `
        : null}
  }
`;
