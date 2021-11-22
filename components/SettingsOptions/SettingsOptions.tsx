import Link from "next/link";
import Signout from "../Signout/Signout";
import { Wrapper, Action } from "./SettingsOptions.styled";

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
        <button type="button" onClick={() => close()}>
          Cancel
        </button>
      </Action>
    </Wrapper>
  );
};

export default SettingsOptions;
