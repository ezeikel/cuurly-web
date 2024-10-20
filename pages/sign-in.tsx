import Link from "next/link";
import SignInForm from "../components/forms/SignInForm/SignInForm";
import Logo from "../components/Logo/Logo";

const SigninPage = () => (
  <div className="min-h-full flex flex-col justify-top py-12 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <Logo className="" />
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Log in to your account
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="font-medium text-indigo-600 hover:text-indigo-500">
          get one here
        </Link>
      </p>
    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <SignInForm />
      </div>
    </div>
  </div>
);

export default SigninPage;
