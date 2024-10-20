import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Reset from "../components/Reset/Reset";

const ResetPage = () => {
  const router = useRouter();
  const { resetToken } = router.query;

  return (
    <div className="grid justify-items-center gap-y-4">
      <div className="text-center">
        <FontAwesomeIcon
          icon={["fal", "key"]}
          className="text-black text-3xl mb-4"
        />
        <h1 className="text-base leading-6 m-0">Set New Password</h1>
        <span className="text-sm leading-[18px] text-[#999999]">
          Enter your new password and we&apos;ll get you back into your account
          in no time!
        </span>
      </div>
      <Reset resetToken={resetToken} />
    </div>
  );
};

export default ResetPage;
