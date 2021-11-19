import styled from "styled-components";

type SettingsActionProps = {
  disabled?: boolean;
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 42px;
  align-items: center;
  border-bottom: 1px solid #efefef;
  h1 {
    justify-self: center;
    font-size: 1.6rem;
    line-height: 2.4rem;
    margin: 0;
  }
  svg {
    align-self: center;
    justify-self: center;
    cursor: pointer;
  }
`;

export const ModalBody = styled.div`
  overflow-y: scroll;
`;

export const SettingsActions = styled.ul`
  display: grid;
`;

export const SettingsAction = styled.li<SettingsActionProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 48px;
  padding: 4px 8px;
  line-height: 1.5;
  & + li {
    border-top: 1px solid #efefef;
  }
  span {
    cursor: pointer;
    ${({ disabled }) =>
      disabled
        ? `
    opacity: 0.3;
    pointer-events: none;
  `
        : null}
  }
`;

export const ChangeProfilePhotoForm = styled.form`
  display: flex;
  width: 100%;
  justify-content: center;
  height: 100%;
  label {
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
  }
  input {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    width: 100%;
    opacity: 0;
    cursor: pointer;
  }
`;
