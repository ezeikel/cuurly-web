import ProfileHeader from "../ProfileHeader/ProfileHeader";
import UserPosts from "../UserPosts/UserPosts";

const Profile = ({ user }) => {
  return (
    <div className="grid gap-y-8 p-8 sm:pt-16 sm:gap-y-12">
      <ProfileHeader user={user} />
      <UserPosts posts={user.posts} />
    </div>
  );
};

export default Profile;
