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
    } = {},
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
    (<div className="grid grid-cols-[236px_1fr] bg-white border border-[#dbdbdb]">
      <ul className="border-r border-[#dbdbdb]">
        <li className={`border-l-2 ${mode === "edit" ? "border-l-[#262626] font-semibold" : "border-l-transparent hover:bg-[#fafafa] hover:border-l-[#dbdbdb]"} text-base leading-5 py-4 px-4 pl-8 cursor-pointer transition-all duration-200`}>
          <Link href="/account?edit">
            Edit Profile
          </Link>
        </li>
        <li className={`border-l-2 ${mode === "password-change" ? "border-l-[#262626] font-semibold" : "border-l-transparent hover:bg-[#fafafa] hover:border-l-[#dbdbdb]"} text-base leading-5 py-4 px-4 pl-8 cursor-pointer transition-all duration-200`}>
          <Link href="/account?password-change">
            Change Password
          </Link>
        </li>
        <li className="border-l-2 border-l-transparent hover:bg-[#fafafa] hover:border-l-[#dbdbdb] text-base leading-5 py-4 px-4 pl-8 cursor-pointer transition-all duration-200 opacity-30 pointer-events-none">
          <Link href="/account?manage-access">
            Authorized Applications
          </Link>
        </li>
        <li className="border-l-2 border-l-transparent hover:bg-[#fafafa] hover:border-l-[#dbdbdb] text-base leading-5 py-4 px-4 pl-8 cursor-pointer transition-all duration-200 opacity-30 pointer-events-none">
          <Link href="/account?email-settings">
            Email and SMS
          </Link>
        </li>
        <li className="border-l-2 border-l-transparent hover:bg-[#fafafa] hover:border-l-[#dbdbdb] text-base leading-5 py-4 px-4 pl-8 cursor-pointer transition-all duration-200 opacity-30 pointer-events-none">
          <Link href="/account?contact-history">
            Manage Contacts
          </Link>
        </li>
        <li className="border-l-2 border-l-transparent hover:bg-[#fafafa] hover:border-l-[#dbdbdb] text-base leading-5 py-4 px-4 pl-8 cursor-pointer transition-all duration-200 opacity-30 pointer-events-none">
          <Link href="/account?privacy-and-security">
            Privacy and Security
          </Link>
        </li>
      </ul>
      <div className="p-8 pl-[124px]">
        {mode === "edit" ? (
          <div className="grid gap-y-8">
            <div className="grid grid-cols-[auto_1fr] gap-x-8 items-center">
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
              <div className="grid grid-rows-2 gap-y-1">
                <span className="text-2xl leading-[2.2rem]">{username}</span>
                <button
                  type="button"
                  onClick={openChangeProfilePictureModal}
                  className="text-sm leading-[1.8rem] font-semibold text-[#3897f0]"
                >
                  Change Profile Photo
                </button>
              </div>
              <ChangeProfilePictureModal
                isOpen={isChangeProfilePictureModalOpen}
                handleClose={closeChangeProfilePictureModal}
                handleChange={handleChange}
              />
            </div>
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

                  if (fileUrl) {
                    submittedValues.profilePicture = file;
                  }

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
                    (<form className="grid gap-y-4">
                      <div className="grid grid-cols-[1fr_4fr] gap-x-8 items-center">
                        <label className="text-base leading-[1.8rem]">Name</label>
                        <input type="text" name="name" className="bg-[#fafafa] rounded-md border border-[#efefef] text-[#262626] flex-grow text-sm leading-[30px] p-1 px-3 outline-none transition-border duration-200 focus:border-[#b2b2b2]" />
                      </div>
                      <div className="grid grid-cols-[1fr_4fr] gap-x-8 items-center">
                        <label className="text-base leading-[1.8rem]">Username</label>
                        <input type="text" name="username" className="bg-[#fafafa] rounded-md border border-[#efefef] text-[#262626] flex-grow text-sm leading-[30px] p-1 px-3 outline-none transition-border duration-200 focus:border-[#b2b2b2]" />
                      </div>
                      <div className="grid grid-cols-[1fr_4fr] gap-x-8 items-center">
                        <label className="text-base leading-[1.8rem]">Website</label>
                        <input type="text" name="website" className="bg-[#fafafa] rounded-md border border-[#efefef] text-[#262626] flex-grow text-sm leading-[30px] p-1 px-3 outline-none transition-border duration-200 focus:border-[#b2b2b2]" />
                      </div>
                      <div className="grid grid-cols-[1fr_4fr] gap-x-8 items-center">
                        <label className="text-base leading-[1.8rem]">Bio</label>
                        <textarea name="bio" className="bg-[#fafafa] rounded-md border border-[#efefef] text-[#262626] flex-grow text-sm leading-[30px] p-1 px-3 outline-none transition-border duration-200 focus:border-[#b2b2b2] resize-none" />
                      </div>
                      <div className="grid grid-cols-[1fr_4fr] gap-x-8 items-center">
                        <label className="text-base leading-[1.8rem]">Email</label>
                        <input type="email" name="email" className="bg-[#fafafa] rounded-md border border-[#efefef] text-[#262626] flex-grow text-sm leading-[30px] p-1 px-3 outline-none transition-border duration-200 focus:border-[#b2b2b2]" />
                      </div>
                      <div className="grid grid-cols-[1fr_4fr] gap-x-8 items-center">
                        <label className="text-base leading-[1.8rem]">Phone Number</label>
                        <input type="tel" name="phoneNumber" className="bg-[#fafafa] rounded-md border border-[#efefef] text-[#262626] flex-grow text-sm leading-[30px] p-1 px-3 outline-none transition-border duration-200 focus:border-[#b2b2b2]" />
                      </div>
                      <div className="grid grid-cols-[1fr_4fr] gap-x-8 items-center">
                        <label className="text-base leading-[1.8rem]">Gender</label>
                        <select
                          name="gender"
                          value={values.gender}
                          className="bg-[#fafafa] rounded-md border border-[#efefef] text-[#262626] flex-grow text-sm leading-[30px] p-1 px-3 outline-none transition-border duration-200 focus:border-[#b2b2b2] h-[38px]"
                        >
                          {GENDER_OPTIONS.map((option) => (
                            <option
                              key={option}
                              value={option.replace(/\s/g, "")}
                            >
                              {option.charAt(0) + option.slice(1).toLowerCase()}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="grid grid-cols-[1fr_4fr] gap-x-8">
                        <Button
                          text="Submit"
                          type="submit"
                          isLoading={isSubmitting}
                          disabled={!fileUrl && isEqual(values, initialValues)}
                          className="col-start-2 bg-[#3897f0] border border-[#3897f0] text-white"
                        >
                          {`Submit${isSubmitting ? "ting" : ""}`}
                          {isSubmitting ? <Spinner /> : null}
                        </Button>
                      </div>
                      <div className="grid grid-cols-[1fr_4fr] gap-x-8">
                        <Link href="/account?action=disable" className="col-start-2 text-[#3897f0] text-sm leading-[1.8rem]">
                          Temporarily disable my account
                        </Link>
                      </div>
                    </form>)
                  );
                }}
              </Formik>
            </div>
          </div>
        ) : null}
        {mode === "password-change" ? (
          <div className="grid gap-y-8">
            <div className="grid grid-cols-[auto_1fr] gap-x-8 items-center">
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
              <div className="text-2xl leading-8">
                <span>{username}</span>
              </div>
            </div>
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
                <form className="grid gap-y-4">
                  <div className="grid grid-cols-[1fr_4fr] gap-x-8 items-center">
                    <label className="text-base leading-[1.8rem]">Old Password</label>
                    <input type="password" name="oldPassword" className="bg-[#fafafa] rounded-md border border-[#efefef] text-[#262626] flex-grow text-sm leading-[30px] p-1 px-3 outline-none transition-border duration-200 focus:border-[#b2b2b2]" />
                  </div>
                  <div className="grid grid-cols-[1fr_4fr] gap-x-8 items-center">
                    <label className="text-base leading-[1.8rem]">New Password</label>
                    <input type="password" name="password" className="bg-[#fafafa] rounded-md border border-[#efefef] text-[#262626] flex-grow text-sm leading-[30px] p-1 px-3 outline-none transition-border duration-200 focus:border-[#b2b2b2]" />
                  </div>
                  <div className="grid grid-cols-[1fr_4fr] gap-x-8 items-center">
                    <label className="text-base leading-[1.8rem]">Confirm New Password</label>
                    <input type="password" name="passwordConfirmation" className="bg-[#fafafa] rounded-md border border-[#efefef] text-[#262626] flex-grow text-sm leading-[30px] p-1 px-3 outline-none transition-border duration-200 focus:border-[#b2b2b2]" />
                  </div>
                  <div className="grid grid-cols-[1fr_4fr] gap-x-8">
                    <Button
                      text="Change Password"
                      type="submit"
                      isLoading={isSubmitting}
                      className="col-start-2 bg-[#3897f0] border border-[#3897f0] text-white"
                    />
                  </div>
                  <div className="grid grid-cols-[1fr_4fr] gap-x-8">
                    <Link href="reset-password" className="col-start-2 text-[#3897f0] text-sm leading-[1.8rem]">
                      Forgot password?
                    </Link>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        ) : null}
      </div>
    </div>)
  );
};

export default Account;
