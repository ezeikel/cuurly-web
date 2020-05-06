import Link from "next/link";
import styled from "styled-components";
import blankProfilePicture from "../utils/blankProfileImage";
import FollowButton from "./FollowButton";

const Wrapper = styled.ul`
  display: grid;
`;

const FollowerWrapper = styled.li`
  display: grid;
`;

const Follower = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-column-gap: var(--spacing-small);
  align-items: center;
  padding: 8px 16px;
`;

const FollowerPhoto = styled.div`
  display: grid;
  width: 30px;
  height: 30px;
  img {
    border-radius: 50%;
  }
`;

const FollowerName = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  font-size: 1.4rem;
  line-height: 1.8rem;
`;

const FollowerAction = styled.div`
  display: grid;
`;

const UserList = ({ users, currentUser }) => {
  if (!users) return null;

  return (
    <Wrapper>
      {users.map((user) => (
        <FollowerWrapper key={user.id}>
          <Follower>
            <FollowerPhoto>
              <img
                src={
                  (user.profilePicture &&
                    user.profilePicture.url.replace(
                      "/upload",
                      "/upload/w_30,h_30,c_lfill,g_face,dpr_2.0"
                    )) ||
                  blankProfilePicture()
                }
                alt="profile-pic"
              />
            </FollowerPhoto>
            <FollowerName>
              <span>
                <Link href={`/user?id=${user.id}`}>
                  <a>{user.username}</a>
                </Link>
              </span>
              <span>{user.name}</span>
            </FollowerName>
            <FollowerAction>
              <FollowButton
                currentUser={currentUser}
                userId={user.id}
                userList={
                  user.followers &&
                  user.followers.map((follower) => follower.id)
                }
              />
            </FollowerAction>
          </Follower>
        </FollowerWrapper>
      ))}
    </Wrapper>
  );
};

export default UserList;
