import Link from "next/link";
import SignUpForm from "../components/forms/SignUpForm/SignUpForm";
import Logo from "../components/Logo/Logo";

const SignUpPage = () => (
  <div className="flex flex-col items-center">
    <div className="max-w-xs">
      <div className="w-full mb-4">
        <Logo className="my-8" />
        <SignUpForm className="w-full" />
      </div>
      <div className="w-full text-xs rounded bg-white p-8 border border-gray-200 text-center">
        Have an account? &nbsp;
        <Link href="/sign-in" className="text-blue-800">
          Sign in
        </Link>
      </div>
    </div>
  </div>
);

export default SignUpPage;
