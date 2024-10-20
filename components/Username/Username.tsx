import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Username = ({ user: { username, verified } }) => {
  return (
    <span className={`text-[28px] leading-[32px] ${verified ? 'grid grid-cols-[auto_auto] gap-x-[var(--spacing-small)] place-items-center' : ''}`}>
      {username}
      {verified && (
        <FontAwesomeIcon
          icon={["fas", "badge-check"]}
          color="#3E9AED"
          size="xs"
        />
      )}
    </span>
  );
};

export default Username;
