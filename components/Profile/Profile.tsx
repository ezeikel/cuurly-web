import { useQuery } from "@apollo/client";
import Modal from "react-modal";
import { SINGLE_USER_QUERY } from "../../apollo/queries";
import PostPreview from "../PostPreview/PostPreview";
import UserAvatar from "../UserAvatar/UserAvatar";
import Spinner from "../svgs/Spinner";
import UserNumbers from "../UserNumbers/UserNumbers";
import UserBio from "../UserBio/UserBio";
import ProfileNav from "../ProfileNav/ProfileNav";
import { Wrapper, Header, PostsWrapper, Posts } from "./Profile.styled";

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

const Profile = ({ username }) => {
  const {
    loading: singleUserLoading,
    data: {
      user: {
        id,
        profilePicture,
        name,
        bio,
        website,
        posts,
        followers,
        following,
        verified,
      } = {},
    } = {},
  } = useQuery(SINGLE_USER_QUERY, {
    variables: { username },
  });

  if (singleUserLoading) return <Spinner />;

  return (
    <Wrapper>
      <Header>
        <UserAvatar photo={profilePicture} />
        <ProfileNav
          id={id}
          username={username}
          verified={verified}
          followerIds={followers?.map((follower) => follower.id)}
        />
        <UserNumbers
          username={username}
          posts={posts}
          following={following}
          followers={followers}
        />
        <UserBio name={name} bio={bio} website={website} />
      </Header>
      <PostsWrapper>
        <Posts>
          {posts &&
            posts.map((post) => <PostPreview key={post.id} id={post.id} />)}
        </Posts>
      </PostsWrapper>
    </Wrapper>
  );
};

export default Profile;
