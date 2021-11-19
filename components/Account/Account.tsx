import { useContext, useState } from "react";
import Link from "next/link";
import { useQuery, useMutation } from "@apollo/client";
import { Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Modal from "react-modal";
import Spinner from "../svgs/Spinner";
import Button from "../Button/Button";
import {
  CURRENT_USER_QUERY,
  SINGLE_USER_QUERY,
  UPDATE_USER_MUTATION,
} from "../../apollo/queries";
import blankProfilePicture from "../../utils/blankProfileImage";
import { AuthContext } from "../../contexts/auth";
import {
  Wrapper,
  Edit,
  EditHeader,
  ProfilePicture,
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

// FIXME: not sure why this is here
// ChangePasswordSchema.validate(
//   {
//     password: "Password12",
//     passwordConfirm: "Password123",
//   },
//   {
//     abortEarly: false,
//   },
// )
//   .then(() => console.log("ok, arguments"))
//   .catch(error => console.log("failed", error));

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

const Account = ({ mode }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return null;

  const [initialEditDetailsValues] = useState({
    name: "",
    username: "",
    website: "",
    bio: "",
    email: "",
    phoneNumber: "",
    gender: "",
  });
  const [isChangeProfilePictureModalOpen, setIsChangeProfilePictureModalOpen] =
    useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);

  const {
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
      } = {},
    } = {}, // setting default value when destructing as data is undefined when loading - https://github.com/apollographql/react-apollo/issues/3323#issuecomment-523430331
  } = useQuery(SINGLE_USER_QUERY, {
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

  const handleChange = (file) => {
    setFileUrl(URL.createObjectURL(file));
    setFile(file);
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
              <ProfilePicture>
                <img
                  src={
                    fileUrl ||
                    profilePicture?.url.replace(
                      "/upload",
                      "/upload/w_38,h_38,c_lfill,g_face,dpr_2.0",
                    ) ||
                    blankProfilePicture()
                  }
                  alt="profile"
                />
                {/* <form>
                                <input type="file" accept="image/jpeg,image/png" />
                              </form> */}
              </ProfilePicture>
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
                }}
                validationSchema={EditProfileSchema}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                  const submittedValues = { ...values };

                  // add the updated profile picture to the data to be sent to the mutation
                  if (fileUrl) {
                    submittedValues.profilePicture = file;
                  }

                  // removed values that havent changed
                  for (const field in values) {
                    if (
                      initialEditDetailsValues[field] === submittedValues[field]
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
                {({ isSubmitting, initialValues, values }) => {
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

                  // FIX: this causes maximum update depth error
                  // if (emptyValues) {
                  //   setInitialEditDetailsValues({
                  //     ...initialValues,
                  //   });
                  // }

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
                          type="submit"
                          disabled={
                            isSubmitting ||
                            (!fileUrl && isEqual(values, initialValues))
                          }
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
              <ProfilePicture>
                <img
                  src={
                    (profilePicture &&
                      profilePicture.url.replace(
                        "/upload",
                        "/upload/w_38,h_38,c_lfill,g_face,dpr_2.0",
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
                    <FormInput type="password" name="passwordConfirm" />
                  </FormRow>
                  <FormRow>
                    <Button type="submit" disabled={isSubmitting}>
                      Change Password
                      {isSubmitting ? <Spinner /> : null}
                    </Button>
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
