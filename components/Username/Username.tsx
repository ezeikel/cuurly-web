import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Wrapper } from "./Username.styled";

const Username = ({ user: { username, verified } }) => {
  return (
    <Wrapper verified={verified}>
      {username}
      {verified ? (
        <FontAwesomeIcon
          icon={["fas", "badge-check"]}
          color="#3E9AED"
          size="xs"
        />
      ) : null}
    </Wrapper>
  );
};

export default Username;
