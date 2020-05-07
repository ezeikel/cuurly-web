import styled from "styled-components";
import Profile from "../components/Profile";

const Wrapper = styled.div`
  display: grid;
`;

const UserPage = ({ query }) => {
  const { username } = query;

  return (
    <Wrapper>
      <Profile username={username} />
    </Wrapper>
  );
};

export default UserPage;
