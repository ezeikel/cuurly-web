/* eslint-disable import/prefer-default-export */

import styled from "styled-components";

type WrapperProps = {
  verified: boolean;
};

export const Wrapper = styled.span<WrapperProps>`
  font-size: 28px;
  line-height: 32px;
  ${({ verified }) =>
    verified
      ? `
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: var(--spacing-small);
    place-items: center;
  `
      : null}
`;
