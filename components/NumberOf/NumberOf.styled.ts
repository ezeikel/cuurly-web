import styled from "styled-components";

type WrapperProps = {
  disableClick?: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  font-size: 1.6rem;
  line-height: 1.8rem;
  cursor: ${({ disableClick }) => (disableClick ? "auto" : "pointer")};
  display: grid;
  grid-template-rows: 1fr 1fr;
  place-items: center;
  color: #999;
  @media (min-width: 736px) {
    display: block;
    color: var(--color-black);
  }
`;

export const Number = styled.span`
  font-weight: bold;
  color: var(--color-black);
`;
