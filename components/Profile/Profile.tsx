import { useQuery } from "@apollo/client";
import { SINGLE_USER_QUERY } from "../../apollo/queries";
import Spinner from "../svgs/Spinner";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import UserPosts from "../UserPosts/UserPosts";

const Profile = ({ username }) => {
  const { loading: loadingUser, data: { user } = {} } = useQuery(
    SINGLE_USER_QUERY,
    {
      variables: { username },
    },
  );

  if (loadingUser) return <Spinner />;

  return (
    <div className="flex flex-col p-8 gap-y-10">
      <ProfileHeader user={user} />
      <UserPosts posts={user.posts} />
    </div>
  );
};

export default Profile;
