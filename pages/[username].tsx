import { FunctionComponent } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Profile from "../components/Profile";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfilePage: FunctionComponent = () => {
  const router = useRouter();
  const { username } = router.query;

  if (!username) return null;

  return (
    <Wrapper>
      <Profile username={username} />
    </Wrapper>
  );
};

export default ProfilePage;
