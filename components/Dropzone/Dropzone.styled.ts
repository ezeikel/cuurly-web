import styled from "styled-components";

type WrapperProps = {
  isMobile: boolean;
};

type TextWrapperProps = {
  isMobile: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  padding: ${({ isMobile }) =>
    isMobile ? "var(--spacing-small)" : "var(--spacing-medium)"};
  background-color: #f2f8fb;
  border: 2px dashed var(--color-blue);
  border-radius: 4px;
  outline: 0;
  margin-bottom: var(--spacing-medium);
  cursor: pointer;
`;

export const StyledInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  overflow: 0;
  z-index: -1;
`;

export const TextWrapper = styled.div<TextWrapperProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  > div {
    &:first-of-type {
      font-family: var(--font-family-secondary);
      font-size: 1.8rem;
      line-height: 24px;
      color: var(--color-blue);

      margin-bottom: ${({ isMobile }) =>
        isMobile ? "0" : "var(--spacing-small)"};
    }
    &:nth-of-type(2) {
      font-size: 1.2rem;
      line-height: 16px;
      color: var(--color-grey);
    }
  }
`;
