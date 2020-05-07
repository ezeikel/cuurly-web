import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import {
  SINGLE_USER_QUERY,
  USER_FOLLOWING_QUERY,
  USER_FOLLOWERS_QUERY,
  CURRENT_USER_QUERY,
} from "../apollo/queries";
import FollowButton from "./FollowButton";
import PostPreview from "./PostPreview";
import Button from "./styles/Button";
import blankProfilePicture from "../utils/blankProfileImage";
import GenericModal from "./Modal";
import UserList from "./UserList";
import SettingsOptions from "./SettingsOptions";

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

const Username = styled.span`
  font-size: 28px;
  line-height: 32px;
  ${({ verified }) =>
    verified
      ? `
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: var(--spacing-small);
    place-items: center;
  `
      : null}
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const UserPhoto = styled.div`
  grid-row: 1 / span 2;
  grid-column: 1 / span 1;
  display: grid;
  width: 77px;
  height: 77px;
  img {
    border-radius: 50%;
  }
  @media (min-width: 736px) {
    width: 150px;
    height: 150px;
    grid-row: 1 / -1;
  }
`;

const FirstRow = styled.div`
  grid-column: 2 / -1;
  grid-row: 1 / span 1;
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: 1fr 1fr;
  grid-row-gap: var(--spacing-medium);
  grid-column-gap: var(--spacing-medium);
  justify-content: start;
  align-items: center;
  span {
  }
  button {
    grid-row: 2 / -1;
    grid-column: 1 / -1;
  }
  svg {
  }
  @media (min-width: 736px) {
    grid-template-rows: 1fr;
    grid-column-gap: var(--spacing-large);
    button {
      grid-row: auto;
      grid-column: auto;
    }
  }
`;

const SecondRow = styled.div`
  grid-column: 1 / -1;
  grid-row: 3 / span 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: start;
  grid-column-gap: var(--spacing-large);
  align-items: center;
  border-top: 1px solid #efefef;
  padding: 12px 0;
  @media (min-width: 736px) {
    grid-column: 2 / -1;
    grid-row: 2 / span 1;
    grid-template-columns: repeat(3, auto);
    border-top: none;
    padding: 0;
  }
`;

const Stat = styled.div`
  font-size: 1.6rem;
  line-height: 1.8rem;
  cursor: pointer;
  display: grid;
  grid-template-rows: 1fr 1fr;
  place-items: center;
  color: #999;
  @media (min-width: 736px) {
    display: block;
    color: var(--color-black);
  }
`;

const Number = styled.span`
  font-weight: bold;
  color: var(--color-black);
`;

const ThirdRow = styled.div`
  grid-column: 1 / -1;
  grid-row: 2 / span 1;
  display: grid;
  grid-template-rows: repeat(3, auto);
  font-size: 1.6rem;
  line-height: 2.4rem;
  @media (min-width: 736px) {
    grid-column: 2 / -1;
    grid-row: 3 / span 1;
  }
`;

const Name = styled.span`
  font-weight: bold;
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

const StyledFollowButton = styled(FollowButton)`
  padding: 0 24px;
`;

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

const Website = styled.span`
  a {
    color: #003569;
  }
`;

const Profile = ({ username }) => {
  const [followersModalIsOpen, setFollowersModalIsOpen] = useState(false);
  const [followingModalIsOpen, setFollowingModalIsOpen] = useState(false);
  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);

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
        followers: followersIds,
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

  const openFollowersModal = () => setFollowersModalIsOpen(true);
  const closeFollowersModal = () => setFollowersModalIsOpen(false);

  const openFollowingModal = () => setFollowingModalIsOpen(true);
  const closeFollowingModal = () => setFollowingModalIsOpen(false);

  const openSettingsModal = () => setSettingsModalIsOpen(true);
  const closeSettingsModal = () => setSettingsModalIsOpen(false);

  return (
    <Wrapper>
      <Header>
        <UserPhoto>
          <img
            src={
              (profilePicture &&
                profilePicture.url.replace(
                  "/upload",
                  "/upload/w_150,h_150,c_lfill,g_face,dpr_2.0"
                )) ||
              blankProfilePicture()
            }
          />
        </UserPhoto>
        <FirstRow>
          <Username verified={verified}>
            {username}
            {verified ? (
              <FontAwesomeIcon
                icon={["fas", "badge-check"]}
                color="#3E9AED"
                size="xs"
              />
            ) : null}
          </Username>
          {currentUser && currentUser.id === id ? (
            <Button>
              <Link href="/account?edit">
                <a>Edit profile</a>
              </Link>
            </Button>
          ) : (
            <StyledFollowButton
              currentUser={currentUser}
              userId={id}
              userList={
                followersIds && followersIds.map((follower) => follower.id)
              }
            />
          )}
          <StyledFontAwesomeIcon
            onClick={openSettingsModal}
            icon={["fal", "cog"]}
            color="var(--color-black)"
            size="2x"
          />
          <GenericModal
            isOpen={settingsModalIsOpen}
            onRequestClose={closeSettingsModal}
            contentLabel="Settings Modal"
            close={closeSettingsModal}
          >
            <SettingsOptions close={closeSettingsModal} />
          </GenericModal>
        </FirstRow>
        <SecondRow>
          <Stat style={{ cursor: "auto" }}>
            <Number>{(posts && posts.length) || 0}</Number> posts
          </Stat>
          <Stat onClick={openFollowersModal}>
            <Number>{(followersIds && followersIds.length) || 0}</Number>{" "}
            followers
          </Stat>
          <GenericModal
            isOpen={followersModalIsOpen}
            onRequestClose={closeFollowersModal}
            contentLabel="Followers Modal"
            heading="Followers"
            close={closeFollowersModal}
          >
            <UserList users={followers} currentUser={currentUser} />
          </GenericModal>
          <Stat onClick={openFollowingModal}>
            <Number>{(followingIds && followingIds.length) || 0}</Number>{" "}
            following
          </Stat>
          <GenericModal
            isOpen={followingModalIsOpen}
            onRequestClose={closeFollowingModal}
            contentLabel="Following Modal"
            heading="Following"
            close={closeFollowingModal}
          >
            <UserList users={following} currentUser={currentUser} />
          </GenericModal>
        </SecondRow>
        <ThirdRow>
          <Name>{name}</Name>
          <span>{bio}</span>
          <Website>
            <a href={website} target="_blank">
              {website}
            </a>
          </Website>
        </ThirdRow>
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
