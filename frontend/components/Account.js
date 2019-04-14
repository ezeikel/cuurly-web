import { Fragment } from "react";
import Link from "next/link";
import { Query, Mutation } from "react-apollo";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Spinner from "./Spinner";
import Button from "./styles/Button";
import { SINGLE_USER_QUERY } from "../apollo/queries";

const EditProfileSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required"),
  username: Yup.string()
    .required("Required"),
  website: Yup.string()
    .required("Required"),
  bio: Yup.string()
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  phoneNumber: Yup.string()
    .email("Invalid email")
    .required("Required"),
  gender: Yup.string()
    .email("Invalid email")
    .required("Required")
});

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Required"),
  password: Yup.string()
    .required("Required"),
  oldPassword: Yup.string()
    .required("Required"),
});

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

const StyledForm = styled.form`
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

const FormInput = styled(Field)`
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

const Account = ({ query, id }) => {
  const [content] = query;

  return (
    <Query query={SINGLE_USER_QUERY} variables={{ id }}>
      {({ data: { user: { profilePicture, username, name, bio, email, phoneNumber, gender, website, posts, followers, following, verified } }, error, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;

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
              <Action
                disabled={true}
                active={content === "manage-access"}
              >
                <Link href="/account?manage-access">
                  <a>Authorized Applications</a>
                </Link>
              </Action>
              <Action
                disabled={true}
                active={content === "email-settingss"}
              >
                <Link href="/account?email-settings">
                  <a>Email and SMS</a>
                </Link>
              </Action>
              <Action
                disabled={true}
                active={content === "contact-history"}
              >
                <Link href="/account?contact-history">
                  <a>Manage Contacts</a>
                </Link>
              </Action>
              <Action
                disabled={true}
                active={content === "privacy-and-security"}
              >
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
                        <img src={profilePicture} />
                        {/* <form>
                            <input type="file" accept="image/jpeg,image/png" />
                          </form> */}
                      </ProfilePicture>
                      <ChangeProfilePicture>
                        <span>{username}</span>
                        <span>Change Profile Photo</span>
                      </ChangeProfilePicture>
                    </EditHeader>
                    <div>
                      <Formik
                        initialValues={{
                          name: name || "",
                          username: username || "",
                          website: website || "",
                          bio: bio || "",
                          email: email || "",
                          phoneNumber: phoneNumber || "",
                          gender: gender || ""
                        }}
                        validationSchema={EditProfileSchema}
                        onSubmit={async (values, { resetForm }) => {
                          try {
                            // TODO: Edit user details Mutation
                            resetForm();
                          } catch (e) {
                            console.error(`Formik Error: ${e}`);
                          }
                        }}
                      >
                        {({ isSubmitting }) => (
                          <StyledForm>
                            <FormRow>
                              <FormLabel>Name</FormLabel>
                              <FormInput type="text" name="name" />
                            </FormRow>
                            <FormRow>
                              <FormLabel>Username</FormLabel>
                              <FormInput type="text" name="username" />
                            </FormRow>
                            <FormRow>
                              <FormLabel>Website</FormLabel>
                              <FormInput type="text" name="website" />
                            </FormRow>
                            <FormRow>
                              <FormLabel>Bio</FormLabel>
                              <FormInput type="text" name="bio" />
                            </FormRow>
                            <FormRow>
                              <FormLabel>Email</FormLabel>
                              <FormInput type="email" name="email" />
                            </FormRow>
                            <FormRow>
                              <FormLabel>Phone Number</FormLabel>
                              <FormInput
                                type="tel"
                                name="phoneNumber"
                              />
                            </FormRow>
                            <FormRow>
                              <FormLabel>Gender</FormLabel>
                              <FormInput type="text" name="gender" />
                            </FormRow>
                            <FormRow>
                              <Button
                                type="submit"
                                disabled={isSubmitting}
                              >
                                {`Submit${isSubmitting ? 'ting' : ''}`}
                                {isSubmitting ? <Spinner /> : null}
                              </Button>
                            </FormRow>
                            <FormRow>
                              <Link href="/account?disable">
                                <ForgotPasswordLink>
                                  Temporarily disable my account
                                </ForgotPasswordLink>
                              </Link>
                            </FormRow>
                          </StyledForm>
                        )}
                      </Formik>
                    </div>
                  </Edit>
                </Fragment>
              ) : null}
              {content === "password-change" ? (
                <PasswordChange>
                  <EditHeader>
                    <ProfilePicture>
                      <img src={profilePicture} />
                      {/* <form>
                            <input type="file" accept="image/jpeg,image/png" />
                          </form> */}
                    </ProfilePicture>
                    <Username>
                      <span>{username}</span>
                    </Username>
                  </EditHeader>
                  <Formik
                    initialValues={{
                      oldPassword: "",
                      password: "",
                      passwordConfirm: ""
                    }}
                    validationSchema={ChangePasswordSchema}
                    onSubmit={async (values, { resetForm }) => {
                      try {
                        // TODO: Update password Mutation
                        resetForm();
                      } catch (e) {
                        console.error(`Formik Error: ${e}`);
                      }
                    }}
                  >
                    {({ isSubmitting }) => (
                      <StyledForm>
                        <FormRow>
                          <FormLabel>Old Password</FormLabel>
                          <FormInput
                            type="password"
                            name="oldPassword"
                          />
                        </FormRow>
                        <FormRow>
                          <FormLabel>New Password</FormLabel>
                          <FormInput type="password" name="password" />
                        </FormRow>
                        <FormRow>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormInput
                            type="password"
                            name="confirmPassword"
                          />
                        </FormRow>
                        <FormRow>
                          <Button type="submit" disabled={isSubmitting}>
                            Change Password
                            {isSubmitting ? <Spinner /> : null}
                          </Button>
                        </FormRow>
                        <FormRow>
                          <Link href="reset-password">
                            <ForgotPasswordLink>
                              Forgot password?
                            </ForgotPasswordLink>
                          </Link>
                        </FormRow>
                      </StyledForm>
                    )}
                  </Formik>
                </PasswordChange>
              ) : null}
            </Content>
          </Wrapper>
        );
      }}
    </Query>
  );
};

export default Account;
