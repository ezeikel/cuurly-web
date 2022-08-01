import Link from "next/link";
import Avatar from "../Avatar/Avatar";
import FollowButton from "../FollowButton/FollowButton";
import {
  Wrapper,
  FollowerWrapper,
  Follower,
  FollowerName,
  FollowerAction,
} from "./UserList.styled";

const UserList = ({ username, users }) => {
  if (!users) return null;

  return (
    <Wrapper>
      {users.map((user) => (
        <FollowerWrapper key={user.id}>
          <Follower>
            <Avatar
              src={user.profilePicture?.url.replace(
                "/upload",
                "/upload/w_30,h_30,c_lfill,g_face,dpr_2.0",
              )}
              className="h-8 w-8"
            />
            <FollowerName>
              <span>
                <Link href="/[username]" as={`/${user.username}`}>
                  <a>{user.username}</a>
                </Link>
              </span>
              <span>{user.name}</span>
            </FollowerName>
            <FollowerAction>
              <FollowButton
                username={username}
                userId={user.id}
                userFollowers={user.followers?.map((follower) => follower.id)}
              />
            </FollowerAction>
          </Follower>
        </FollowerWrapper>
      ))}
    </Wrapper>
  );
};

export default UserList;
