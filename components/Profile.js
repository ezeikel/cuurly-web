import { useContext } from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import Modal from "react-modal";
import { SINGLE_USER_QUERY } from "../apollo/queries";
import PostPreview from "./PostPreview";
import UserAvatar from "./UserAvatar";
import Spinner from "./Spinner";
import UserNumbers from "./UserNumbers";
import UserBio from "./UserBio";
import ProfileNav from "./ProfileNav";
import { AuthContext } from "../context/auth";

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
  grid-template: repeat(auto-fill, minmax(123px, 293px)) / 1fr;
  grid-gap: var(--spacing-tiny);
  @media (min-width: 736px) {
    justify-content: center;
    grid-template-columns: repeat(3, minmax(123px, 293px));
    grid-auto-rows: minmax(123px, 293px);
    grid-gap: var(--spacing-large);
  }
`;

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

const Profile = ({ username }) => {
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
          followerIds={followers.map(follower => follower.id)}
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
            posts.map(post => <PostPreview key={post.id} id={post.id} />)}
        </Posts>
      </PostsWrapper>
    </Wrapper>
  );
};

export default Profile;
