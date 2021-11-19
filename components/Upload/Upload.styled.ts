import styled from "styled-components";
import TextareaInput from "../form/inputs/TextareaInput/TextareaInput";
import Button from "../Button/Button";

export const Wrapper = styled.div`
  display: grid;
  background-color: var(--color-white);
  border-radius: 10px;
`;

export const FormWrapper = styled.div`
  display: grid;
`;

export const Dropzone = styled.section`
  display: grid;
  place-items: center;
  border: 1px dashed
    ${({ isDragActive }) => (isDragActive ? "var(--color-white)" : "#efefef")};
  transition: background-color 0.2s ease-in-out;
  background-color: ${({ isDragActive }) =>
    isDragActive ? "var(--color-primary-lighter)" : "var(--color-white)"};
  padding: var(--spacing-gargantuan);
  outline: 0;
`;

export const StyledInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  overflow: 0;
  z-index: -1;
`;

export const DropzoneText = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  color: var(--color-white);
  text-align: center;
  span:first-of-type {
    font-size: 3.6rem;
  }
`;

export const FormDetails = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 375px 1fr 1fr 1fr;
  grid-gap: var(--spacing-medium);
  padding: var(--spacing-medium);
`;

export const Preview = styled.div`
  grid-row: 1 / 1;
  grid-column: 1 / 1;
  display: grid;
  place-items: center;
  border: 1px solid #efefef;
  background-color: #efefef;
  img {
    max-height: 100%;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export const StyledTextBox = styled(TextareaInput)`
  grid-row: 1 / span 3;
  grid-column: 2 / -1;
  height: 100%;
  display: grid;
  place-items: center;
  padding: var(--spacing-medium);
  border: 1px solid #efefef;
  font-size: 1.8rem;
`;

export const StyledButton = styled(Button)`
  grid-column: 2 / -1;
  grid-row: 4 / -1;
  justify-self: center;
`;
