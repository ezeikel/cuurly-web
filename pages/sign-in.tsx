import Link from "next/link";
import SignInForm from "../components/form/forms/SignInForm/SignInForm";
import Logo from "../components/Logo/Logo";

const SigninPage = () => (
  <div className="flex flex-col items-center">
    <div className="max-w-xs">
      <div className="w-full mb-4">
        <Logo className="my-8" />
        <SignInForm className="w-full" />
      </div>
      <div className="w-full text-xs rounded bg-white p-8 border border-gray-200 text-center">
        Don&apos;t have an account? &nbsp;
        <Link href="/sign-up">
          <a className="text-blue-800">Sign up</a>
        </Link>
      </div>
    </div>
  </div>
);

export default SigninPage;
