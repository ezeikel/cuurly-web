"use client";

import { signIn } from "next-auth/react";

type SignInButtonProps = {
  text?: string;
  className?: string;
};

const SignInButton = ({ text, className }: SignInButtonProps) => (
  <button onClick={() => signIn("google")} className={className} type="button">
    {text || "Sign in"}
  </button>
);

export default SignInButton;
