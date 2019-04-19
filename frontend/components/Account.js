import { Fragment, useState } from "react";
import Link from "next/link";
import { Query, Mutation } from "react-apollo";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from 'react-toastify';
import * as Yup from "yup";
import Spinner from "./Spinner";
import Button from "./styles/Button";
import { CURRENT_USER_QUERY, SINGLE_USER_QUERY, UPDATE_USER_MUTATION } from "../apollo/queries";

const GENDER_OPTIONS = [
  'MALE',
  'FEMALE',
  'NON BINARY',
  'NOT SPECIFIED'
];

const PHONE_REGEX = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

function isEqual(a, b) {
  // Create arrays of property names
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length != bProps.length) {
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];

    // If values of same property are not equal,
    // objects are not equivalent
    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true;
}

// TODO: Need to validate only on changed fields
const EditProfileSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required.'),
  username: Yup.string()
    .required('Username is required.'),
  website: Yup.string(),
  bio: Yup.string(),
  email: Yup.string()
    .email('Invalid email'),
  phoneNumber: Yup.string()
    .matches(PHONE_REGEX, 'Phone number is not valid.'),
  gender: Yup.string()
    .required('Gender is required.')
});

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required('Old password is required.'),
  password: Yup.string()
    .required('Password is required.'),
  passwordConfirm: Yup.string()
    .required('Password confirm is required.'),
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

const StyledForm = styled(Form)`
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
  select {
    height: 38px;
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
  transition: border 0.2s ease-in-out;
  &:focus {
    border: 1px solid #b2b2b2;
  }
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

const notify = () => toast('Profile Saved.');

const Account = ({ query, id }) => {
  const [content] = query;
  const [initialEditDetailsValues, setInitialEditDetailsValues] = useState({
    name: "",
    username: "",
    website: "",
    bio: "",
    email: "",
    phoneNumber: "",
    gender: ""
  });

  return (
    <Query
      query={SINGLE_USER_QUERY}
      variables={{ id }}
      fetchPolicy="cache-and-network" // TODO: Fix for not getting the updated information on page reload after Mutation and refetchQueries
    >
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
                <Mutation
                  mutation={UPDATE_USER_MUTATION}
                  refetchQueries={[{ query: SINGLE_USER_QUERY, variables: { id } }]}
                  onCompleted={() => {
                    notify();
                  }}
                >
                  {(updateUser, { error, loading }) => (
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
                            onSubmit={async (values, { setSubmitting, setErrors }) => {
                              const submittedValues = {...values};

                              try {
                                for(const field in values) {
                                  if (initialEditDetailsValues[field] === submittedValues[field]) {
                                    delete submittedValues[field];
                                  }
                                }

                                if (submittedValues.phoneNumber) {
                                  submittedValues.phoneNumber = parseInt(submittedValues.phoneNumber, 10);
                                }

                                await updateUser({ variables: submittedValues });

                                setSubmitting(false);
                              } catch (e) {
                                setErrors(e);
                              }
                            }}
                          >
                            {({ isSubmitting, initialValues, touched, dirty, values }) => {
                              let emptyValues = true;

                              for (const key in initialEditDetailsValues) {
                                if (initialEditDetailsValues[key] === null || initialEditDetailsValues[key] === "") {
                                  emptyValues = true;
                                } else {
                                  emptyValues = false;
                                  break;
                                }
                              }

                              if (emptyValues) {
                                setInitialEditDetailsValues({...initialValues});
                              }

                              return (
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
                                    <FormInput component="select" name="gender" value={values.gender} >
                                      {
                                        GENDER_OPTIONS.map(option => (
                                          <option key={option} value={option.replace(/\s/g, '')} >
                                            {option.charAt(0) + option.slice(1).toLowerCase()}
                                          </option>
                                        ))
                                      }

                                    </FormInput>
                                  </FormRow>
                                  <FormRow>
                                    <Button type="submit" disabled={ isSubmitting || isEqual((() => {
                                      // convert phoneNumber from string to number for comparison in isEqual()
                                      if (values.phoneNumber) {
                                        values.phoneNumber = parseInt(values.phoneNumber, 10)
                                      }

                                      return values;
                                    })(), initialValues)} >
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
                              )
                            }}
                          </Formik>
                        </div>
                      </Edit>
                    </Fragment>
                  )}
                </Mutation>
              ) : null}
              {content === "password-change" ? (
                <Mutation
                mutation={UPDATE_USER_MUTATION}
                refetchQueries={[{ query: CURRENT_USER_QUERY },  { query: SINGLE_USER_QUERY, variables: { id } }]}
                >
                  {(updateUser, { error, loading }) => (
                    <Fragment>
                      <PasswordChange>
                        <EditHeader>
                          <ProfilePicture>
                            <img src={profilePicture} />
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
                              await updateUser({ variables: values });

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
                      {loading && <p>Loading...</p>}
                      {error && <p>Error :( Please try again</p>}
                    </Fragment>
                  )}
                </Mutation>
              ) : null}
            </Content>
          </Wrapper>
        );
      }}
    </Query>
  );
};

export default Account;
