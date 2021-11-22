/* eslint-disable import/prefer-default-export */

import styled from "styled-components";

export const ToastWrapper = styled.div`
  flex: auto;
  display: flex;
  justify-content: space-between;
`;

export const Message = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 8px;
  }
`;

export const CloseButtonWrapper = styled.span`
  display: flex;
  align-items: center;
  font-size: var(--font-size-tiny);
  line-height: 20px;
  color: #357433;
  cursor: pointer;
  svg {
    margin-left: 8px;
  }
`;
