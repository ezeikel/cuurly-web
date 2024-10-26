"use client";

import { useSession } from "next-auth/react";
import useUser from "@/hooks/api/useUser";
import SignInButton from "../SignInButton/SignInButton";
import SignOutButton from "../SignOutButton/SignOutButton";

const AuthButton = () => {
  const { status } = useSession();
  const { data: user } = useUser();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (user && status === "authenticated") {
    return (
      <div className="flex items-center gap-2">
        {user.username}
        <SignOutButton className="font-sans" />
      </div>
    );
  }

  return <SignInButton className="font-sans" />;
};

export default AuthButton;
