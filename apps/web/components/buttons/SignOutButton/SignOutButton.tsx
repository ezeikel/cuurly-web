"use client";

import { signOut } from "next-auth/react";

type SignOutButtonProps = {
  className?: string;
};

const SignOutButton = ({ className }: SignOutButtonProps) => (
  <button
    onClick={(e) => {
      e.preventDefault();
      signOut();
    }}
    className={className}
    type="button"
  >
    Sign out
  </button>
);

export default SignOutButton;
