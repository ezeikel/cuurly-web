import ProfileHeader from "../ProfileHeader/ProfileHeader";
import UserPosts from "../UserPosts/UserPosts";

const Profile = ({ user }) => {
  return (
    <div className="flex flex-col p-8 gap-y-10">
      <ProfileHeader user={user} />
      <UserPosts posts={user.posts} />
    </div>
  );
};

export default Profile;
