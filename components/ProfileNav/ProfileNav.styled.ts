/* eslint-disable import/prefer-default-export */

import styled from "styled-components";

export const Wrapper = styled.div`
  grid-column: 2 / -1;
  grid-row: 1 / span 1;
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: 1fr 1fr;
  grid-row-gap: var(--spacing-medium);
  grid-column-gap: var(--spacing-medium);
  justify-content: start;
  align-items: center;
  span {
  }
  button {
    grid-row: 2 / -1;
    grid-column: 1 / -1;
  }
  svg {
  }
  @media (min-width: 736px) {
    grid-template-rows: 1fr;
    grid-column-gap: var(--spacing-large);
    button {
      grid-row: auto;
      grid-column: auto;
    }
  }
`;
