import Link from "next/link";
import styled from "styled-components";
import Signout from "./Signout";

const Wrapper = styled.ul`
  display: grid;
`;

const Action = styled.li`
  display: grid;
  align-items: center;
  justify-content: space-around;
  min-height: 48px;
  padding: 4px 8px;
  line-height: 1.5;
  & + li {
    border-top: 1px solid #efefef;
  }
  span {
    cursor: pointer;
    ${({ actionType }) =>
      actionType === "negative"
        ? `
    color: var(--color-red);
  `
        : null}
    ${({ disabled }) =>
      disabled
        ? `
    opacity: 0.3;
    pointer-events: none;
  `
        : null}
  }
`;

const SettingsOptions = ({ close }) => {
  return (
    <Wrapper>
      <Action>
        <span>
          <Link href="/account?action=password-change">
            <a>Change Password</a>
          </Link>
        </span>
      </Action>
      <Action disabled>
        <span>Nametag</span>
      </Action>
      <Action disabled>
        <span>Authorized Apps</span>
      </Action>
      <Action disabled>
        <span>Notifications</span>
      </Action>
      <Action disabled>
        <span>Privacy and Security</span>
      </Action>
      <Action>
        <Signout />
      </Action>
      <Action>
        <span onClick={close}>Cancel</span>
      </Action>
    </Wrapper>
  );
};

export default SettingsOptions;
