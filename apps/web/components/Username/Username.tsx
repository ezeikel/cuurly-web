import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBadgeCheck } from "@fortawesome/pro-solid-svg-icons";

type UsernameProps = {
  user: {
    username: string;
    verified: boolean;
  };
};

const Username = ({ user: { username, verified } }: UsernameProps) => {
  return (
    <span
      className={`text-[28px] leading-[32px] ${
        verified
          ? "grid grid-cols-[auto_auto] gap-x-[var(--spacing-small)] place-items-center"
          : ""
      }`}
    >
      {username}
      {verified ? (
        <FontAwesomeIcon icon={faBadgeCheck} color="#3E9AED" size="xs" />
      ) : null}
    </span>
  );
};

export default Username;
