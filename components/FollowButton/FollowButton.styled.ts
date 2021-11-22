/* eslint-disable import/prefer-default-export */

import styled from "styled-components";
import Button from "../Button/Button";

type StyledButtonProps = {
  mode: string;
};

export const Wrapper = styled(Button)<StyledButtonProps>`
  height: 100%;
  ${({ mode }) =>
    mode === "follow"
      ? `
      background-color: #3897f0;
      border-color: #3897f0;
      color: #fff;
    `
      : null}
`;
