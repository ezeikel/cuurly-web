/* eslint-disable import/prefer-default-export */

import styled from "styled-components";

export const Wrapper = styled.div`
  grid-row: 1 / span 2;
  grid-column: 1 / span 1;
  display: grid;
  width: 77px;
  height: 77px;
  img {
    border-radius: 50%;
  }
  @media (min-width: 736px) {
    width: 150px;
    height: 150px;
    grid-row: 1 / -1;
  }
`;
