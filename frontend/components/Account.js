import Link from "next/link";
import styled from "styled-components";
import { Fragment } from "react";
import Button from "./styles/Button";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 236px 1fr;
  background-color: var(--color-white);
  border: 1px solid #dbdbdb;
`;

const Edit = styled.article`
  display: grid;
  grid-row-gap: var(--spacing-large);
`;

const EditHeader = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: var(--spacing-large);
  align-items: center;
`;

const ProfilePicture = styled.div`
  display: grid;
  img {
    width: 38px;
    height: 38px;
  }
`;

const ChangeProfilePicture = styled.div`
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

const ActionList = styled.ul`
  border-right: 1px solid #dbdbdb;
`;

const Action = styled.li`
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

const Content = styled.article`
  padding: var(--spacing-large) var(--spacing-large) var(--spacing-large) 124px;
`;

const PasswordChange = styled.article`
  display: grid;
  grid-row-gap: var(--spacing-large);
`;

const Username = styled.div`
  display: grid;
  align-items: center;
  font-size: 2rem;
  line-height: 2.2rem;
`;

const Form = styled.form`
  display: grid;
  grid-row-gap: var(--spacing-medium);
  label {
    display: grid;
    align-items: center;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-column-gap: var(--spacing-large);
  button {
    grid-column: 2 / span 1;
    background-color: #3897f0;
    border: 1px solid #3897f0;
    color: #fff;
  }
`;

const FormInput = styled.input`
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
`;

const FormLabel = styled.label`
  font-size: 1.6rem;
  line-height: 1.8rem;
`;

const ForgotPasswordLink = styled.a`
  grid-column: 2 / span 1;
  color: #3897f0;
  font-size: 1.4rem;
  line-height: 1.8rem;
`;

const Account = ({ query }) => {
  const [content] = query;

  return (
    <Wrapper>
      <ActionList>
        <Action active={content === "edit"}>
          <Link href="/account?edit">
            <a>Edit Profile</a>
          </Link>
        </Action>
        <Action active={content === "password-change"}>
          <Link href="/account?password-change">
            <a>Change Password</a>
          </Link>
        </Action>
        <Action disabled={true} active={content === "manage-access"}>
          <Link href="/account?manage-access">
            <a>Authorized Applications</a>
          </Link>
        </Action>
        <Action disabled={true} active={content === "email-settingss"}>
          <Link href="/account?email-settings">
            <a>Email and SMS</a>
          </Link>
        </Action>
        <Action disabled={true} active={content === "contact-history"}>
          <Link href="/account?contact-history">
            <a>Manage Contacts</a>
          </Link>
        </Action>
        <Action disabled={true} active={content === "privacy-and-security"}>
          <Link href="/account?privacy-and-security">
            <a>Privacy and Security</a>
          </Link>
        </Action>
      </ActionList>
      <Content>
        {content === "edit" ? (
          <Fragment>
            <Edit>
              <EditHeader>
                <ProfilePicture>
                  <img src="https://instagram.fbho1-1.fna.fbcdn.net/vp/65547464af3e7b33703032d5b5fb5232/5D0566F1/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fbho1-1.fna.fbcdn.net" />
                  {/* <form>
                      <input type="file" accept="image/jpeg,image/png" />
                    </form> */}
                </ProfilePicture>
                <ChangeProfilePicture>
                  <span>username</span>
                  <span>Change Profile Photo</span>
                </ChangeProfilePicture>
              </EditHeader>
              <div>
                <Form>
                  <FormRow>
                    <FormLabel>Name</FormLabel>
                    <FormInput type="text" />
                  </FormRow>
                  <FormRow>
                    <FormLabel>Username</FormLabel>
                    <FormInput type="text" />
                  </FormRow>
                  <FormRow>
                    <FormLabel>Website</FormLabel>
                    <FormInput type="text" />
                  </FormRow>
                  <FormRow>
                    <FormLabel>Bio</FormLabel>
                    <FormInput type="text" />
                  </FormRow>
                  <FormRow>
                    <FormLabel>Email</FormLabel>
                    <FormInput type="email" />
                  </FormRow>
                  <FormRow>
                    <FormLabel>Phone Number</FormLabel>
                    <FormInput type="tel" />
                  </FormRow>
                  <FormRow>
                    <FormLabel>Gender</FormLabel>
                    <FormInput type="text" />
                  </FormRow>
                  <FormRow>
                    <Button type="submit">Submit</Button>
                  </FormRow>
                  <FormRow>
                    <Link href="/account?disable">
                      <ForgotPasswordLink>Temporarily disable my account</ForgotPasswordLink>
                    </Link>
                  </FormRow>
                </Form>
              </div>
            </Edit>
          </Fragment>
        ) : null}
        {content === "password-change" ? (
          <PasswordChange>
            <EditHeader>
              <ProfilePicture>
                <img src="https://instagram.fbho1-1.fna.fbcdn.net/vp/65547464af3e7b33703032d5b5fb5232/5D0566F1/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fbho1-1.fna.fbcdn.net" />
                {/* <form>
                      <input type="file" accept="image/jpeg,image/png" />
                    </form> */}
              </ProfilePicture>
              <Username>
                <span>username</span>
              </Username>
            </EditHeader>
            <Form>
              <FormRow>
                <FormLabel>Old Password</FormLabel>
                <FormInput type="password" />
              </FormRow>
              <FormRow>
                <FormLabel>New Password</FormLabel>
                <FormInput type="password" />
              </FormRow>
              <FormRow>
                <FormLabel>Confirm New Password</FormLabel>
                <FormInput type="password" />
              </FormRow>
              <FormRow>
                <Button type="sbmit">Change Password</Button>
              </FormRow>
              <FormRow>
                <Link href="reset-password">
                  <ForgotPasswordLink>Forgot password?</ForgotPasswordLink>
                </Link>
              </FormRow>
            </Form>
          </PasswordChange>
        ) : null}
      </Content>
    </Wrapper>
  );
};

export default Account;
