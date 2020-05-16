import { useState } from "react";
import styled from "styled-components";
import GenericModal from "./Modal";
import NumberOf from "./NumberOf";
import UserList from "./UserList";

const Wrapper = styled.div`
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

const UserNumbers = ({
  singleUser,
  currentUser,
  posts,
  followerIds,
  followers,
  followingIds,
  following,
}) => {
  const [followersModalIsOpen, setFollowersModalIsOpen] = useState(false);
  const [followingModalIsOpen, setFollowingModalIsOpen] = useState(false);

  const openFollowersModal = () => setFollowersModalIsOpen(true);
  const closeFollowersModal = () => setFollowersModalIsOpen(false);

  const openFollowingModal = () => setFollowingModalIsOpen(true);
  const closeFollowingModal = () => setFollowingModalIsOpen(false);

  return (
    <Wrapper>
      <NumberOf name="posts" length={posts.length} />
      <NumberOf
        name="followers"
        length={(followerIds && followerIds.length) || 0}
        clickHandler={openFollowersModal}
      />
      <GenericModal
        isOpen={followersModalIsOpen}
        onRequestClose={closeFollowersModal}
        contentLabel="Followers Modal"
        heading="Followers"
        close={closeFollowersModal}
      >
        <UserList
          users={followers}
          singleUser={singleUser}
          currentUser={currentUser}
        />
      </GenericModal>
      <NumberOf
        name="following"
        length={(followingIds && followingIds.length) || 0}
        clickHandler={openFollowingModal}
      />
      <GenericModal
        isOpen={followingModalIsOpen}
        onRequestClose={closeFollowingModal}
        contentLabel="Following Modal"
        heading="Following"
        close={closeFollowingModal}
      >
        <UserList
          users={following}
          singleUser={singleUser}
          currentUser={currentUser}
        />
      </GenericModal>
    </Wrapper>
  );
};

export default UserNumbers;
