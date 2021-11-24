import Link from "next/link";
import SignUpForm from "../components/form/forms/SignUpForm/SignUpForm";

const SignUpPage = () => (
  <div className="flex flex-col items-center">
    <div className="max-w-xs">
      <div className="w-full mb-4">
        <h1 className="text-4xl font-bold text-current my-8 text-center">
          Cuurly.
        </h1>
        <SignUpForm className="w-full" />
      </div>
      <div className="w-full text-xs rounded bg-white p-8 border border-gray-200 text-center">
        Have an account? &nbsp;
        <Link href="/sign-in">
          <a className="text-blue-800">Sign in</a>
        </Link>
      </div>
    </div>
  </div>
);

export default SignUpPage;
