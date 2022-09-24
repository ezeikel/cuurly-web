import { useState } from "react";
import Link from "next/link";
import { useQuery, useMutation } from "@apollo/client";
import { Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Button from "../Button/Button";
import {
  CURRENT_USER_QUERY,
  SINGLE_USER_QUERY,
  UPDATE_USER_MUTATION,
} from "../../apollo/queries";
import {
  Wrapper,
  Edit,
  EditHeader,
  ChangeProfilePicture,
  ActionList,
  Action,
  Content,
  PasswordChange,
  Username,
  StyledForm,
  FormRow,
  FormInput,
  FormLabel,
  ForgotPasswordLink,
} from "./Account.styled";
import ChangeProfilePictureModal from "../modals/ChangeProfilePictureModal/ChangeProfilePictureModal";
import { PHONE_REGEX, GENDER_OPTIONS } from "../../constants";
import useUser from "../../hooks/useUser";
import Avatar from "../Avatar/Avatar";
import Spinner from "../Spinner/Spinner";

function isEqual(a, b) {
  // Create arrays of property names
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length !== bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i + 1) {
    const propName = aProps[i];

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

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old password is required."),
  password: Yup.string().required("Password is required."),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirm is required."),
});

type SingleUser = {
  name: string;
  username: string;
  website: string;
  bio: string;
  email: string;
  phoneNumber: string;
  gender: string;
  profilePicture: {
    url: string;
  };
};

type SingleUserData = {
  user: SingleUser;
};

type SingleUserVars = {
  id: string;
};

const Account = ({ mode }) => {
  const { user: currentUser } = useUser();

  if (!currentUser) return null;

  const [initialEditDetailsValues] = useState({
    name: "",
    username: "",
    website: "",
    bio: "",
    email: "",
    phoneNumber: "",
    gender: "",
    profilePicture: "",
  });
  const [isChangeProfilePictureModalOpen, setIsChangeProfilePictureModalOpen] =
    useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);

  const {
    data: {
      user: {
        name,
        username,
        website,
        bio,
        phoneNumber,
        gender,
        profilePicture,
        email,
      } = {},
    } = {}, // setting default value when destructing as data is undefined when loading - https://github.com/apollographql/react-apollo/issues/3323#issuecomment-523430331
  } = useQuery<SingleUserData, SingleUserVars>(SINGLE_USER_QUERY, {
    variables: { id: currentUser.id },
    fetchPolicy: "cache-and-network",
  });

  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted() {
      toast("Profile Saved.");
    },
    refetchQueries: [
      { query: SINGLE_USER_QUERY, variables: { id: currentUser.id } },
      { query: CURRENT_USER_QUERY },
    ],
  });

  const openChangeProfilePictureModal = () =>
    setIsChangeProfilePictureModalOpen(true);
  const closeChangeProfilePictureModal = () =>
    setIsChangeProfilePictureModalOpen(false);

  const handleChange = (chosenFile) => {
    setFileUrl(URL.createObjectURL(chosenFile));
    setFile(chosenFile);
    closeChangeProfilePictureModal();
  };

  return (
    <Wrapper>
      <ActionList>
        <Action active={mode === "edit"}>
          <Link href="/account?edit">
            <a>Edit Profile</a>
          </Link>
        </Action>
        <Action active={mode === "password-change"}>
          <Link href="/account?password-change">
            <a>Change Password</a>
          </Link>
        </Action>
        <Action disabled active={mode === "manage-access"}>
          <Link href="/account?manage-access">
            <a>Authorized Applications</a>
          </Link>
        </Action>
        <Action disabled active={mode === "email-settingss"}>
          <Link href="/account?email-settings">
            <a>Email and SMS</a>
          </Link>
        </Action>
        <Action disabled active={mode === "contact-history"}>
          <Link href="/account?contact-history">
            <a>Manage Contacts</a>
          </Link>
        </Action>
        <Action disabled active={mode === "privacy-and-security"}>
          <Link href="/account?privacy-and-security">
            <a>Privacy and Security</a>
          </Link>
        </Action>
      </ActionList>
      <Content>
        {mode === "edit" ? (
          <Edit>
            <EditHeader>
              <Avatar
                src={
                  fileUrl ||
                  profilePicture?.url.replace(
                    "/upload",
                    "/upload/w_38,h_38,c_lfill,g_face,dpr_2.0",
                  )
                }
                className="h-8 w-8"
              />
              <ChangeProfilePicture>
                <span>{username}</span>
                <button type="button" onClick={openChangeProfilePictureModal}>
                  Change Profile Photo
                </button>
              </ChangeProfilePicture>
              <ChangeProfilePictureModal
                isOpen={isChangeProfilePictureModalOpen}
                handleClose={closeChangeProfilePictureModal}
                handleChange={handleChange}
              />
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
                  profilePicture: "",
                }}
                validationSchema={EditProfileSchema}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                  const submittedValues = { ...values };

                  // add the updated profile picture to the data to be sent to the mutation
                  if (fileUrl) {
                    submittedValues.profilePicture = file;
                  }

                  // removed values that havent changed
                  Object.keys(values).forEach((field) => {
                    if (
                      initialEditDetailsValues[field] === submittedValues[field]
                    ) {
                      delete submittedValues[field];
                    }
                  });

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
                {({ isSubmitting, initialValues, values }) => {
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
                        <FormInput component="textarea" name="bio" />
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
                              {option.charAt(0) + option.slice(1).toLowerCase()}
                            </option>
                          ))}
                        </FormInput>
                      </FormRow>
                      <FormRow>
                        <Button
                          text="Submit"
                          type="submit"
                          isLoading={isSubmitting}
                          disabled={!fileUrl && isEqual(values, initialValues)}
                        >
                          {`Submit${isSubmitting ? "ting" : ""}`}
                          {isSubmitting ? <Spinner /> : null}
                        </Button>
                      </FormRow>
                      <FormRow>
                        <Link href="/account?action=disable">
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
        ) : null}
        {mode === "password-change" ? (
          <PasswordChange>
            <EditHeader>
              <Avatar
                src={
                  fileUrl ||
                  profilePicture?.url.replace(
                    "/upload",
                    "/upload/w_38,h_38,c_lfill,g_face,dpr_2.0",
                  )
                }
                className="h-8 w-8"
              />
              <Username>
                <span>{username}</span>
              </Username>
            </EditHeader>
            <Formik
              initialValues={{
                oldPassword: "",
                password: "",
                passwordConfirmation: "",
              }}
              validationSchema={ChangePasswordSchema}
              onSubmit={async ({ oldPassword, password }, { resetForm }) => {
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
                    <FormInput type="password" name="passwordConfirmation" />
                  </FormRow>
                  <FormRow>
                    <Button
                      text="Change Password"
                      type="submit"
                      isLoading={isSubmitting}
                    />
                  </FormRow>
                  <FormRow>
                    <Link href="reset-password">
                      <ForgotPasswordLink>Forgot password?</ForgotPasswordLink>
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
};

export default Account;
