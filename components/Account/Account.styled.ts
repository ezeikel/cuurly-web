import styled from "styled-components";
import { Form, Field } from "formik";

type ActionProps = {
  active: boolean;
  disabled: boolean;
};

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 236px 1fr;
  background-color: var(--color-white);
  border: 1px solid #dbdbdb;
`;

export const Edit = styled.article`
  display: grid;
  grid-row-gap: var(--spacing-large);
`;

export const EditHeader = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: var(--spacing-large);
  align-items: center;
`;

export const ProfilePicture = styled.div`
  display: grid;
  img {
    width: 38px;
    height: 38px;
    border-radius: 50%;
  }
`;

export const ChangeProfilePicture = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: var(--spacing-tiny);
  span:first-of-type {
    font-size: 2rem;
    line-height: 2.2rem;
  }
  span:nth-of-type(2) {
    font-size: 1.4rem;
    line-height: 1.8rem;
    font-weight: 600;
    color: #3897f0;
  }
`;

export const ActionList = styled.ul`
  border-right: 1px solid #dbdbdb;
`;

export const Action = styled.li<ActionProps>`
  display: grid;
  border-left: 2px solid transparent;
  font-size: 1.6rem;
  line-height: 2rem;
  padding: var(--spacing-medium) var(--spacing-medium) var(--spacing-medium)
    var(--spacing-large);
  cursor: pointer;
  transition: border-left-color 0.2s ease-in-out,
    background-color 0.2s ease-in-out;
  &:hover {
    background-color: #fafafa;
    border-left-color: #dbdbdb;
  }
  ${({ active }) =>
    active
      ? `
    color: #262626;
    border-left-color: #262626;
    font-weight: 600;
    &:hover {
      background-color: #fff;
      border-left-color: #262626;
    }
  `
      : null}
  ${({ disabled }) =>
    disabled
      ? `
    opacity: 0.3;
    pointer-events: none;
  `
      : null}
`;

export const Content = styled.article`
  padding: var(--spacing-large) var(--spacing-large) var(--spacing-large) 124px;
`;

export const PasswordChange = styled.article`
  display: grid;
  grid-row-gap: var(--spacing-large);
`;

export const Username = styled.div`
  display: grid;
  align-items: center;
  font-size: 2rem;
  line-height: 2.2rem;
`;

export const StyledForm = styled(Form)`
  display: grid;
  grid-row-gap: var(--spacing-medium);
  label {
    display: grid;
    align-items: center;
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-column-gap: var(--spacing-large);
  button {
    grid-column: 2 / span 1;
    background-color: #3897f0;
    border: 1px solid #3897f0;
    color: #fff;
  }
  select {
    height: 38px;
  }
  textarea {
    resize: none;
  }
`;

export const FormInput = styled(Field)`
  background: #fafafa;
  border-radius: 6px;
  border: 1px solid #efefef;
  color: #262626;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  font-size: 14px;
  line-height: 30px;
  margin: 0;
  overflow: visible;
  padding: 4px 12px;
  outline: 0;
  transition: border 0.2s ease-in-out;
  &:focus {
    border: 1px solid #b2b2b2;
  }
`;

export const FormLabel = styled.label`
  font-size: 1.6rem;
  line-height: 1.8rem;
`;

export const ForgotPasswordLink = styled.a`
  grid-column: 2 / span 1;
  color: #3897f0;
  font-size: 1.4rem;
  line-height: 1.8rem;
`;
