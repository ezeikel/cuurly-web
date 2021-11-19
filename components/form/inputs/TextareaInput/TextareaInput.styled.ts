/* eslint-disable import/prefer-default-export */

import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

type TextareaResizeProps = {
  isViewingShared?: boolean;
};

type TextareaProps = {
  isViewingShared?: boolean;
};

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Textarea = styled.textarea<TextareaProps>`
  font-size: var(--font-size-medium);
  line-height: 28px;
  border: solid 1px var(--color-grey);
  border-radius: 4px;
  resize: none;
  padding: var(--spacing-medium);
  ${({ isViewingShared }) =>
    isViewingShared
      ? `
    background-color: #F4F5F8;`
      : ""}
`;

export const TextareaResize = styled(TextareaAutosize)<TextareaResizeProps>`
  font-size: var(--font-size-medium);
  line-height: 28px;
  border: solid 1px var(--color-grey);
  border-radius: 4px;
  resize: none;
  padding: var(--spacing-medium);
  ${({ isViewingShared }) =>
    isViewingShared
      ? `
    background-color: #F4F5F8;`
      : ""}
`;

export const Label = styled.label`
  display: flex;
  font-size: var(--font-size-tiny);
  line-height: 20px;
  margin-bottom: 10px;
  font-weight: 500;
`;

export const HelpText = styled.div`
  display: flex;
  margin: 0 0 var(--spacing-small);

  p {
    font-size: var(--font-size-tiny);
    line-height: 20px;
    color: var(--color-grey);
    margin: 0;
  }
`;
