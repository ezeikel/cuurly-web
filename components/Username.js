import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div`
  font-size: 28px;
  line-height: 32px;
  ${({ verified }) =>
    verified
      ? `
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: var(--spacing-small);
    place-items: center;
  `
      : null}
`;

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
