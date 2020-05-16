import { useQuery } from "@apollo/client";
import styled from "styled-components";
import Modal from "react-modal";
import {
  SINGLE_USER_QUERY,
  USER_FOLLOWING_QUERY,
  USER_FOLLOWERS_QUERY,
  CURRENT_USER_QUERY,
} from "../apollo/queries";
import PostPreview from "./PostPreview";
import UserAvatar from "./UserAvatar";
import Spinner from "./Spinner";
import UserNumbers from "./UserNumbers";
import UserBio from "./UserBio";
import ProfileNav from "./ProfileNav";

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: var(--spacing-large);
  padding: 30px 16px 24px;
  @media (min-width: 736px) {
    padding-top: 60px;
    grid-row-gap: var(--spacing-huge);
  }
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  grid-template-rows: repeat(2, auto) 1fr;
  grid-row-gap: var(--spacing-large);
  grid-column-gap: var(--spacing-large);
  @media (min-width: 736px) {
    grid-column-gap: var(--spacing-huge);
  }
`;

const PostsWrapper = styled.div`
  display: grid;
`;

const Posts = styled.ul`
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  grid-gap: var(--spacing-tiny);
  @media (min-width: 736px) {
    grid-gap: var(--spacing-large);
  }
`;

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

const Profile = ({ username }) => {
  const {
    loading: currentUserLoading,
    error: currentUserError,
    data: { currentUser } = {}, // setting default value when destructing as data is undefined when loading - https://github.com/apollographql/react-apollo/issues/3323#issuecomment-523430331
  } = useQuery(CURRENT_USER_QUERY);

  const {
    loading: singleUserLoading,
    error: singleUserError,
    data: {
      user: {
        id,
        profilePicture,
        name,
        bio,
        website,
        posts,
        followers: followerIds,
        following: followingIds,
        verified,
      } = {},
    } = {},
  } = useQuery(SINGLE_USER_QUERY, {
    variables: { username },
  });

  const {
    loading: userFollowingLoading,
    error: userFollowingError,
    data: { following } = {},
  } = useQuery(USER_FOLLOWING_QUERY, {
    variables: { username },
  });

  const {
    loading: userFollowersLoading,
    error: userFollowersError,
    data: { followers } = {},
  } = useQuery(USER_FOLLOWERS_QUERY, {
    variables: { username },
  });

  if (singleUserLoading || currentUserLoading) return <Spinner />;

  return (
    <Wrapper>
      <Header>
        <UserAvatar photo={profilePicture} />
        <ProfileNav
          id={id}
          currentUser={currentUser}
          username={username}
          verified={verified}
          followerIds={followerIds}
        />
        <UserNumbers
          currentUser={currentUser}
          singleUser={username} // TODO: Put singleUser in context and rename to username to be whoever we are currently looking at
          posts={posts}
          following={following}
          followers={followers}
          followingIds={followingIds}
          followerIds={followerIds}
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
