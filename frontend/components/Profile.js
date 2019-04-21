import { useState, useRef } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from 'react-modal';
import { SINGLE_USER_QUERY, USER_FOLLOWING_QUERY, USER_FOLLOWERS_QUERY } from '../apollo/queries';
import FollowButton from './FollowButton';
import PostPreview from './PostPreview';
import CurrentUser from './CurrentUser';
import Button from './styles/Button';
import Signout from './Signout';

const BLANK_PROFILE_PICTURE = 'https://instagram.fbho1-1.fna.fbcdn.net/vp/65547464af3e7b33703032d5b5fb5232/5D0566F1/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fbho1-1.fna.fbcdn.net';

const Wrapper = styled.div`
  display: grid;
  padding-top: 60px;
  grid-row-gap: var(--spacing-huge);
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: var(--spacing-huge);
`;

const Username = styled.span`
  font-size: 28px;
  line-height: 32px;
  ${({ verified }) => verified ?
  `
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: var(--spacing-small);
    place-items: center;
  ` : null }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const UserPhoto = styled.div`
  display: grid;
  width: 150px;
  height: 150px;
  img {
    border-radius: 50%;
  }
`;

const UserInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: repeat(2, auto) 1fr;
  grid-row-gap: var(--spacing-large);
`;

const FirstRow = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / span 1;
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: start;
  grid-column-gap: var(--spacing-large);
  align-items: center;
`;

const SecondRow = styled.div`
  grid-column: 1 / -1;
  grid-row: 2 / span 1;
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: start;
  grid-column-gap: var(--spacing-large);
  align-items: center;
`;

const Stat = styled.div`
  font-size: 1.6rem;
  line-height: 1.8rem;
  cursor: pointer;
`;

const Number = styled.span`
  font-weight: bold;
`;

const ThirdRow = styled.div`
  grid-column: 1 / -1;
  grid-row: 3 / span 1;
  display: grid;
  grid-template-rows: repeat(3, auto);
  font-size: 1.6rem;
  line-height: 2.4rem;
`;

const Name = styled.span`
  font-weight: bold;
`;

const PostsWrapper = styled.div`
  display: grid;
`;

const Posts = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 350px);
  grid-auto-rows: 350px;
  grid-gap: var(--spacing-large);
`;

const StyledFollowButton = styled(FollowButton)`
  padding: 0 24px;
`;

const ReactModalAdapter = ({ className, modalClassName, ...props }) => (
  <Modal
    className={modalClassName}
    portalClassName={className}
    {...props}
  />
);

const StyledStatsModal = styled(ReactModalAdapter).attrs({ //https://github.com/styled-components/styled-components/issues/1494
  overlayClassName: 'overlay',
  modalClassName: 'modal'
})`
  /* Portal styles here (though usually you will have none) */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0, 0.5);
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
  modalClassName: "modal"
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

if (typeof (window) !== 'undefined') {
  Modal.setAppElement('body');
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
  span  {
    cursor: pointer;
  ${({ actionType }) => actionType === 'negative' ?
    `
    color: var(--color-red);
  ` : null}
  ${({ disabled }) => disabled ?
    `
    opacity: 0.3;
    pointer-events: none;
  ` : null}
  }
`;

const Profile = ({ id }) => {
  const [followersModalIsOpen, setFollowersModalIsOpen] = useState(false);
  const [followingModalIsOpen, setFollowingModalIsOpen] = useState(false);
  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);
  const subtitleEl = useRef(null);

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
    <CurrentUser>
      {({ data: { currentUser } }) => (
        <Query query={SINGLE_USER_QUERY} variables={{ id }}>
          {({ data: { user: { id, profilePicture, username, name, bio, website, posts, followers, following, verified }}, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;

            return (
              <Wrapper>
                <Header>
                  <UserPhoto>
                    <img src={profilePicture && profilePicture.url.replace('/upload', '/upload/w_150,h_150,c_lfill,g_face,dpr_2.0') || BLANK_PROFILE_PICTURE } />
                  </UserPhoto>
                  <UserInfo>
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
                          userId={id}
                          usersFollowers={followers.map(
                            follower => follower.id
                          )}
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
                              <span onClick={closeSettingsModal}>
                                Cancel
                              </span>
                            </SettingsAction>
                          </SettingsActions>
                        </ModalBody>
                      </StyledSettingsModal>
                    </FirstRow>
                    <SecondRow>
                      <Stat style={{ cursor: "auto" }}>
                        <Number>{posts.length}</Number> posts
                      </Stat>
                      <Stat onClick={openFollowersModal}>
                        <Number>{followers.length}</Number>{" "}
                        followers
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
                          <Query
                            query={USER_FOLLOWERS_QUERY}
                            variables={{ id }}
                          >
                            {({
                              data: { followers },
                              error,
                              loading
                            }) => {
                              if (loading) return <p>Loading...</p>;
                              if (error)
                                return (
                                  <p>Error: {error.message}</p>
                                );

                              return (
                                <FollowerList>
                                  {followers.map(follower => (
                                    <FollowerWrapper
                                      key={follower.id}
                                    >
                                      <Follower>
                                        <FollowerPhoto>
                                          <img
                                            src={
                                              follower.profilePicture.url
                                            }
                                            alt="profile-pic"
                                          />
                                        </FollowerPhoto>
                                        <FollowerName>
                                          <span>
                                            <Link
                                              href={`/user?id=${
                                                follower.id
                                              }`}
                                            >
                                              <a>
                                                {follower.username}
                                              </a>
                                            </Link>
                                          </span>
                                          <span>
                                            {follower.name}
                                          </span>
                                        </FollowerName>
                                        <FollowerAction>
                                          <FollowButton
                                            userId={follower.id}
                                            usersFollowers={follower.followers.map(
                                              follower =>
                                                follower.id
                                            )}
                                          />
                                        </FollowerAction>
                                      </Follower>
                                    </FollowerWrapper>
                                  ))}
                                </FollowerList>
                              );
                            }}
                          </Query>
                        </ModalBody>
                      </StyledStatsModal>
                      <Stat onClick={openFollowingModal}>
                        <Number>{following.length}</Number>{" "}
                        following
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
                          <Query
                            query={USER_FOLLOWING_QUERY}
                            variables={{ id }}
                          >
                            {({
                              data: { following },
                              error,
                              loading
                            }) => {
                              if (loading) return <p>Loading...</p>;
                              if (error)
                                return (
                                  <p>Error: {error.message}</p>
                                );

                              return (
                                <FollowerList>
                                  {following.map(following => (
                                    <FollowerWrapper
                                      key={following.id}
                                    >
                                      <Follower>
                                        <FollowerPhoto>
                                          <img
                                            src={
                                              following.profilePicture.url
                                            }
                                            alt="profile-pic"
                                          />
                                        </FollowerPhoto>
                                        <FollowerName>
                                          <span>
                                            <Link
                                              href={`/user?id=${
                                                following.id
                                              }`}
                                            >
                                              <a>
                                                {following.username}
                                              </a>
                                            </Link>
                                          </span>
                                          <span>
                                            {following.name}
                                          </span>
                                        </FollowerName>
                                        <FollowerAction>
                                          <FollowButton
                                            userId={following.id}
                                            usersFollowers={following.followers.map(
                                              follower =>
                                                follower.id
                                            )}
                                          />
                                        </FollowerAction>
                                      </Follower>
                                    </FollowerWrapper>
                                  ))}
                                </FollowerList>
                              );
                            }}
                          </Query>
                        </ModalBody>
                      </StyledStatsModal>
                    </SecondRow>
                    <ThirdRow>
                      <Name>{name}</Name>
                      <span>{bio}</span>
                      <span>{website}</span>
                    </ThirdRow>
                  </UserInfo>
                </Header>
                <PostsWrapper>
                  <Posts>
                    {posts.map(post => (
                      <PostPreview key={post.id} id={post.id} />
                    ))}
                  </Posts>
                </PostsWrapper>
              </Wrapper>
            );
          }}
        </Query>
      )}
    </CurrentUser>
  );
}

export default Profile;
