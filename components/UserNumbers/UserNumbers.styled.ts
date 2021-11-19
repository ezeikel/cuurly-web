/* eslint-disable import/prefer-default-export */

import styled from "styled-components";

export const Wrapper = styled.div`
  grid-column: 1 / -1;
  grid-row: 3 / span 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: start;
  grid-column-gap: var(--spacing-large);
  align-items: center;
  border-top: 1px solid #efefef;
  padding: 12px 0;
  @media (min-width: 736px) {
    grid-column: 2 / -1;
    grid-row: 2 / span 1;
    grid-template-columns: repeat(3, auto);
    border-top: none;
    padding: 0;
  }
`;
