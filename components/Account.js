import { Fragment, useState } from "react";
import Link from "next/link";
import { Query, Mutation } from "react-apollo";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Modal from "react-modal";
import Spinner from "./Spinner";
import Button from "./styles/Button";
import {
  CURRENT_USER_QUERY,
  SINGLE_USER_QUERY,
  UPDATE_USER_MUTATION,
} from "../apollo/queries";
import blankProfilePicture from "../utils/blankProfileImage";

const GENDER_OPTIONS = ["MALE", "FEMALE", "NON BINARY", "NOT SPECIFIED"];

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
  name: Yup.string().required("Name is required."),
  username: Yup.string().required("Username is required."),
  website: Yup.string(),
  bio: Yup.string(),
  email: Yup.string().email("Invalid email"),
  phoneNumber: Yup.string().matches(PHONE_REGEX, "Phone number is not valid."),
  gender: Yup.string().required("Gender is required."),
});

function equalTo(ref, msg) {
  return this.test({
    name: "equalTo",
    exclusive: false,
    message: msg || "${path} must be the same as ${reference}",
    params: {
      reference: ref.path,
    },
    test: function (value) {
      return value === this.resolve(ref);
    },
  });
}

Yup.addMethod(Yup.string, "equalTo", equalTo);

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old password is required."),
  password: Yup.string().required("Password is required."),
  passwordConfirm: Yup.string()
    .equalTo(Yup.ref("password"))
    .required("Password confirm is required."),
});

ChangePasswordSchema.validate(
  {
    password: "Password12",
    passwordConfirm: "Password123",
  },
  {
    abortEarly: false,
  }
)
  .then(() => console.log("ok, arguments"))
  .catch((error) => console.log("failed", error));

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
    border-radius: 50%;
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
  textarea {
    resize: none;
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

const ChangeProfilePhotoForm = styled.form`
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

const ReactModalAdapter = ({ className, modalClassName, ...props }) => (
  <Modal className={modalClassName} portalClassName={className} {...props} />
);

const StyledChangeProfilePictureModal = styled(ReactModalAdapter).attrs({
  //https://github.com/styled-components/styled-components/issues/1494
  overlayClassName: "overlay",
  modalClassName: "modal",
})`
  /* Portal styles here (though usually you will have none) */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: grid;
    place-items: center;
  }
  .modal {
    display: grid;
    grid-template-rows: 43px 1fr;
    background-color: var(--color-white);
    min-height: 200px;
    max-height: 400px;
    width: 400px;
    border-radius: 4px;
    outline: 0;
  }
`;

const ModalHeader = styled.header`
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

const ModalBody = styled.div`
  overflow-y: scroll;
`;

const SettingsActions = styled.ul`
  display: grid;
`;

const SettingsAction = styled.li`
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

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

const Account = ({ query, id }) => {
  const [content] = query;
  const [initialEditDetailsValues, setInitialEditDetailsValues] = useState({
    name: "",
    username: "",
    website: "",
    bio: "",
    email: "",
    phoneNumber: "",
    gender: "",
  });
  const [
    changeProfilePictureModalIsOpen,
    setCangeProfilePictureModalIsOpen,
  ] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);

  const openChangeProfilePictureModal = () =>
    setCangeProfilePictureModalIsOpen(true);
  const closeChangeProfilePictureModal = () =>
    setCangeProfilePictureModalIsOpen(false);

  const handleChange = (file) => {
    setFileUrl(URL.createObjectURL(file));
    setFile(file);
    closeChangeProfilePictureModal();
  };

  return (
    <Query
      query={SINGLE_USER_QUERY}
      variables={{ id }}
      fetchPolicy="cache-and-network" // TODO: Fix for not getting the updated information on page reload after Mutation and refetchQueries
    >
      {({
        data: {
          user: {
            profilePicture,
            username,
            name,
            bio,
            email,
            phoneNumber,
            gender,
            website,
            posts,
            followers,
            following,
            verified,
          } = {},
        } = {},
        error,
        loading,
      }) => {
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
                  refetchQueries={[
                    { query: SINGLE_USER_QUERY, variables: { id } },
                  ]}
                  onCompleted={() => {
                    toast("Profile Saved.");
                  }}
                >
                  {(updateUser, { error, loading }) => (
                    <Fragment>
                      <Edit>
                        <EditHeader>
                          <ProfilePicture>
                            <img
                              src={
                                fileUrl ||
                                (profilePicture &&
                                  profilePicture.url.replace(
                                    "/upload",
                                    "/upload/w_38,h_38,c_lfill,g_face,dpr_2.0"
                                  )) ||
                                blankProfilePicture()
                              }
                            />
                            {/* <form>
                                <input type="file" accept="image/jpeg,image/png" />
                              </form> */}
                          </ProfilePicture>
                          <ChangeProfilePicture>
                            <span>{username}</span>
                            <span onClick={openChangeProfilePictureModal}>
                              Change Profile Photo
                            </span>
                          </ChangeProfilePicture>
                          <StyledChangeProfilePictureModal
                            isOpen={changeProfilePictureModalIsOpen}
                            onRequestClose={closeChangeProfilePictureModal}
                            contentLabel="Change Profile Picture Modal"
                          >
                            <ModalHeader>
                              <h1>Change Profile Photo</h1>
                            </ModalHeader>
                            <ModalBody>
                              <SettingsActions>
                                <SettingsAction>
                                  <ChangeProfilePhotoForm>
                                    <label>
                                      Upload Photo
                                      <input
                                        accept="image/jpeg,image/png"
                                        type="file"
                                        onChange={(e) =>
                                          handleChange(e.target.files[0])
                                        }
                                      />
                                    </label>
                                  </ChangeProfilePhotoForm>
                                </SettingsAction>
                                <SettingsAction disabled={true}>
                                  <span>Remove Current Photo</span>
                                </SettingsAction>
                                <SettingsAction>
                                  <span
                                    onClick={closeChangeProfilePictureModal}
                                  >
                                    Cancel
                                  </span>
                                </SettingsAction>
                              </SettingsActions>
                            </ModalBody>
                          </StyledChangeProfilePictureModal>
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
                              gender: gender || "",
                            }}
                            validationSchema={EditProfileSchema}
                            onSubmit={async (
                              values,
                              { setSubmitting, setErrors }
                            ) => {
                              const submittedValues = { ...values };

                              // add the updated profile picture to the data to be sent to the mutation
                              if (fileUrl) {
                                submittedValues.profilePicture = file;
                              }

                              // removed values that havent changed
                              for (const field in values) {
                                if (
                                  initialEditDetailsValues[field] ===
                                  submittedValues[field]
                                ) {
                                  delete submittedValues[field];
                                }
                              }

                              try {
                                await updateUser({
                                  variables: submittedValues,
                                });
                              } catch (e) {
                                setErrors(e);
                              }

                              setSubmitting(false);
                            }}
                          >
                            {({
                              isSubmitting,
                              initialValues,
                              touched,
                              dirty,
                              values,
                            }) => {
                              let emptyValues = true;

                              for (const key in initialEditDetailsValues) {
                                if (
                                  initialEditDetailsValues[key] === null ||
                                  initialEditDetailsValues[key] === ""
                                ) {
                                  emptyValues = true;
                                } else {
                                  emptyValues = false;
                                  break;
                                }
                              }

                              if (emptyValues) {
                                setInitialEditDetailsValues({
                                  ...initialValues,
                                });
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
                                    <FormInput
                                      component="textarea"
                                      name="bio"
                                    />
                                  </FormRow>
                                  <FormRow>
                                    <FormLabel>Email</FormLabel>
                                    <FormInput type="email" name="email" />
                                  </FormRow>
                                  <FormRow>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormInput type="tel" name="phoneNumber" />
                                  </FormRow>
                                  <FormRow>
                                    <FormLabel>Gender</FormLabel>
                                    <FormInput
                                      component="select"
                                      name="gender"
                                      value={values.gender}
                                    >
                                      {GENDER_OPTIONS.map((option) => (
                                        <option
                                          key={option}
                                          value={option.replace(/\s/g, "")}
                                        >
                                          {option.charAt(0) +
                                            option.slice(1).toLowerCase()}
                                        </option>
                                      ))}
                                    </FormInput>
                                  </FormRow>
                                  <FormRow>
                                    <Button
                                      type="submit"
                                      disabled={
                                        isSubmitting ||
                                        (!fileUrl &&
                                          isEqual(values, initialValues))
                                      }
                                    >
                                      {`Submit${isSubmitting ? "ting" : ""}`}
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
                              );
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
                  refetchQueries={[
                    { query: CURRENT_USER_QUERY },
                    { query: SINGLE_USER_QUERY, variables: { id } },
                  ]}
                >
                  {(updateUser, { error, loading }) => (
                    <Fragment>
                      <PasswordChange>
                        <EditHeader>
                          <ProfilePicture>
                            <img
                              src={
                                (profilePicture &&
                                  profilePicture.url.replace(
                                    "/upload",
                                    "/upload/w_38,h_38,c_lfill,g_face,dpr_2.0"
                                  )) ||
                                blankProfilePicture()
                              }
                            />
                          </ProfilePicture>
                          <Username>
                            <span>{username}</span>
                          </Username>
                        </EditHeader>
                        <Formik
                          initialValues={{
                            oldPassword: "",
                            password: "",
                            passwordConfirm: "",
                          }}
                          validationSchema={ChangePasswordSchema}
                          onSubmit={async (
                            { oldPassword, password },
                            { resetForm }
                          ) => {
                            try {
                              await updateUser({
                                variables: { oldPassword, password },
                              });
                              resetForm();
                              toast("Password Updated.");
                            } catch (e) {
                              console.error(`Formik Error: ${e}`);
                            }
                          }}
                        >
                          {({ isSubmitting }) => (
                            <StyledForm>
                              <FormRow>
                                <FormLabel>Old Password</FormLabel>
                                <FormInput type="password" name="oldPassword" />
                              </FormRow>
                              <FormRow>
                                <FormLabel>New Password</FormLabel>
                                <FormInput type="password" name="password" />
                              </FormRow>
                              <FormRow>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormInput
                                  type="password"
                                  name="passwordConfirm"
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
