import styled from "styled-components";
import Profile from "../components/Profile";

const Wrapper = styled.div`
  display: grid;
`;

const UserPage = ({ query }) => (
  <Wrapper>
    <Profile username={query.username} />
  </Wrapper>
);

export default UserPage;
