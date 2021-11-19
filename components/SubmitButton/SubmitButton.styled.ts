/* eslint-disable import/prefer-default-export */

import styled from "styled-components";
import { rotateKeyFrame } from "../../GlobalStyle";

export const IconWrapper = styled.span`
  display: flex;
  svg {
    margin-right: var(--spacing-small);
    animation: ${rotateKeyFrame} ease-in-out 1.2s infinite;
  }
`;
