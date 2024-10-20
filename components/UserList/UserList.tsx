import Link from "next/link";
import Avatar from "../Avatar/Avatar";
import FollowButton from "../FollowButton/FollowButton";

const UserList = ({ username, users }) => {
  if (!users) return null;

  return (
    <ul className="grid">
      {users.map((user) => (
        <li key={user.id} className="grid">
          <div className="grid grid-cols-[auto_1fr_auto] gap-x-2 items-center p-2 sm:p-4">
            <Avatar
              src={user.profilePicture?.url.replace(
                "/upload",
                "/upload/w_30,h_30,c_lfill,g_face,dpr_2.0",
              )}
              className="h-8 w-8"
            />
            <div className="grid grid-rows-2 text-sm leading-[1.8rem]">
              <span>
                <Link href="/[username]" as={`/${user.username}`}>
                  <a>{user.username}</a>
                </Link>
              </span>
              <span>{user.name}</span>
            </div>
            <div className="grid">
              <FollowButton
                username={username}
                userId={user.id}
                userFollowers={user.followers?.map((follower) => follower.id)}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
