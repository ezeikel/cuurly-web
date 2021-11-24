import Link from "next/link";
import SignInForm from "../components/form/forms/SignInForm/SignInForm";

const SigninPage = () => (
  <div className="flex flex-col items-center">
    <div className="max-w-xs">
      <div className="w-full mb-4">
        <h1 className="text-4xl font-bold text-current my-8 text-center">
          Cuurly.
        </h1>
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
