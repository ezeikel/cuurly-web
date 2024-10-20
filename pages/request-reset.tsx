import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RequestReset from "../components/RequestReset/RequestReset";

const RequestResetPage = () => (
  <div className="grid justify-items-center gap-y-4">
    <div className="text-center">
      <FontAwesomeIcon
        icon={["fal", "lock"]}
        className="text-black text-4xl mb-4"
      />
      <h1 className="text-base leading-6 m-0">Trouble Logging In?</h1>
      <span className="text-sm leading-[18px] text-gray-500">
        Enter your email address and we&apos;ll send you a link to reset your
        password and get back into your account.
      </span>
    </div>
    <RequestReset />
  </div>
);

export default RequestResetPage;
