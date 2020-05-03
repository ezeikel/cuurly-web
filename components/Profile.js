import { useState, useRef } from "react";
import Link from "next/link";
import Router from "next/router";
import { useQuery } from "@apollo/react-hooks";
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
import Signout from "./Signout";
import blankProfilePicture from "../utils/blankProfileImage";

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

const ReactModalAdapter = ({ className, modalClassName, ...props }) => (
  <Modal className={modalClassName} portalClassName={className} {...props} />
);

const StyledStatsModal = styled(ReactModalAdapter).attrs({
  //https://github.com/styled-components/styled-components/issues/1494
  overlayClassName: "overlay",
  modalClassName: "modal",
})`
  /* Portal styles here (though usually you will have none) */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: grid;
    place-items: center;
  }
  .modal {
    display: grid;
    grid-template-rows: 43px 1fr;
    background-color: var(--color-white);
    min-height: 200px;
    max-height: 400px;
    width: 400px;
    border-radius: 4px;
    outline: 0;
  }
`;

const ModalHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 42px;
  align-items: center;
  border-bottom: 1px solid #efefef;
  h1 {
    justify-self: center;
    font-size: 1.6rem;
    line-height: 2.4rem;
    margin: 0;
  }
  svg {
    align-self: center;
    justify-self: center;
    cursor: pointer;
  }
`;

const ModalBody = styled.div`
  overflow-y: scroll;
`;

const StyledSettingsModal = styled(ReactModalAdapter).attrs({
  //https://github.com/styled-components/styled-components/issues/1494
  overlayClassName: "overlay",
  modalClassName: "modal",
})`
  /* Portal styles here (though usually you will have none) */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: grid;
    place-items: center;
  }
  .modal {
    display: grid;
    background-color: var(--color-white);
    min-height: 200px;
    max-height: 400px;
    width: 400px;
    border-radius: 4px;
    outline: 0;
    overflow-y: scroll;
  }
`;

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

const FollowerList = styled.ul`
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

const SettingsActions = styled.ul`
  display: grid;
`;

const SettingsAction = styled.li`
  display: grid;
  align-items: center;
  justify-content: space-around;
  min-height: 48px;
  padding: 4px 8px;
  line-height: 1.5;
  & + li {
    border-top: 1px solid #efefef;
  }
  span {
    cursor: pointer;
    ${({ actionType }) =>
      actionType === "negative"
        ? `
    color: var(--color-red);
  `
        : null}
    ${({ disabled }) =>
      disabled
        ? `
    opacity: 0.3;
    pointer-events: none;
  `
        : null}
  }
`;

const Website = styled.span`
  a {
    color: #003569;
  }
`;

const Profile = ({ id }) => {
  const [followersModalIsOpen, setFollowersModalIsOpen] = useState(false);
  const [followingModalIsOpen, setFollowingModalIsOpen] = useState(false);
  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);
  const subtitleEl = useRef(null);

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
        profilePicture,
        username,
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
    variables: { id },
  });

  // const {
  //   loading: userFollowingLoading,
  //   error: userFollowingError,
  //   data: { following },
  // } = useQuery(USER_FOLLOWING_QUERY, {
  //   variables: { id },
  // });

  // const {
  //   loading: userFollowersLoading,
  //   error: userFollowersError,
  //   data: { followers },
  // } = useQuery(USER_FOLLOWERS_QUERY, {
  //   variables: { id },
  // });

  const openFollowersModal = () => setFollowersModalIsOpen(true);
  const closeFollowersModal = () => setFollowersModalIsOpen(false);

  const openFollowingModal = () => setFollowingModalIsOpen(true);
  const closeFollowingModal = () => setFollowingModalIsOpen(false);

  const openSettingsModal = () => setSettingsModalIsOpen(true);
  const closeSettingsModal = () => setSettingsModalIsOpen(false);

  Router.onRouteChangeStart = () => {
    closeFollowersModal();
    closeFollowingModal();
  };

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
              usersFollowers={
                followers && followers.map((follower) => follower.id)
              }
            />
          )}
          <StyledFontAwesomeIcon
            onClick={openSettingsModal}
            icon={["fal", "cog"]}
            color="var(--color-black)"
            size="2x"
          />
          <StyledSettingsModal
            isOpen={settingsModalIsOpen}
            onRequestClose={closeSettingsModal}
            contentLabel="Settings Modal"
          >
            <ModalBody>
              <SettingsActions>
                <SettingsAction>
                  <span>
                    <Link href="/account?password-change">
                      <a>Change Password</a>
                    </Link>
                  </span>
                </SettingsAction>
                <SettingsAction disabled={true}>
                  <span>Nametag</span>
                </SettingsAction>
                <SettingsAction disabled={true}>
                  <span>Authorized Apps</span>
                </SettingsAction>
                <SettingsAction disabled={true}>
                  <span>Notifications</span>
                </SettingsAction>
                <SettingsAction disabled={true}>
                  <span>Privacy and Security</span>
                </SettingsAction>
                <SettingsAction>
                  <Signout />
                </SettingsAction>
                <SettingsAction>
                  <span onClick={closeSettingsModal}>Cancel</span>
                </SettingsAction>
              </SettingsActions>
            </ModalBody>
          </StyledSettingsModal>
        </FirstRow>
        <SecondRow>
          <Stat style={{ cursor: "auto" }}>
            <Number>{(posts && posts.length) || 0}</Number> posts
          </Stat>
          <Stat onClick={openFollowersModal}>
            <Number>{(followers && followers.length) || 0}</Number> followers
          </Stat>
          <StyledStatsModal
            isOpen={followersModalIsOpen}
            onRequestClose={closeFollowersModal}
            contentLabel="Followers Modal"
          >
            <ModalHeader>
              <h1 ref={subtitleEl}>Followers</h1>
              <FontAwesomeIcon
                icon={["fal", "times"]}
                color="var(--color-black)"
                size="lg"
                onClick={closeFollowersModal}
              />
            </ModalHeader>
            <ModalBody>
              <FollowerList>
                {followers &&
                  followers.map((follower) => (
                    <FollowerWrapper key={follower.id}>
                      <Follower>
                        <FollowerPhoto>
                          <img
                            src={
                              (follower.profilePicture &&
                                follower.profilePicture.url.replace(
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
                            <Link href={`/user?id=${follower.id}`}>
                              <a>{follower.username}</a>
                            </Link>
                          </span>
                          <span>{follower.name}</span>
                        </FollowerName>
                        <FollowerAction>
                          <FollowButton
                            currentUser={currentUser}
                            userId={follower.id}
                            key={currentUser}
                            usersFollowers={
                              follower &&
                              follower.followers &&
                              follower.followers.map((follower) => follower.id)
                            }
                          />
                        </FollowerAction>
                      </Follower>
                    </FollowerWrapper>
                  ))}
              </FollowerList>
            </ModalBody>
          </StyledStatsModal>
          <Stat onClick={openFollowingModal}>
            <Number>{(following && followers.length) || 0}</Number> following
          </Stat>
          <StyledStatsModal
            isOpen={followingModalIsOpen}
            onRequestClose={closeFollowingModal}
            contentLabel="Following Modal"
          >
            <ModalHeader>
              <h1 ref={subtitleEl}>Following</h1>
              <FontAwesomeIcon
                icon={["fal", "times"]}
                color="var(--color-black)"
                size="lg"
                onClick={closeFollowingModal}
              />
            </ModalHeader>
            <ModalBody>
              <FollowerList>
                {following &&
                  following.map((following) => (
                    <FollowerWrapper key={following.id}>
                      <Follower>
                        <FollowerPhoto>
                          <img
                            src={
                              (following.profilePicture &&
                                following.profilePicture.url.replace(
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
                            <Link href={`/user?id=${following.id}`}>
                              <a>{following.username}</a>
                            </Link>
                          </span>
                          <span>{following.name}</span>
                        </FollowerName>
                        <FollowerAction>
                          <FollowButton
                            currentUser={currentUser}
                            userId={following.id}
                            usersFollowers={
                              following &&
                              following.followers &&
                              following.followers.map((follower) => follower.id)
                            }
                          />
                        </FollowerAction>
                      </Follower>
                    </FollowerWrapper>
                  ))}
              </FollowerList>
            </ModalBody>
          </StyledStatsModal>
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
