import { useContext, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GenericModal from "../GenericModal/GenericModal";
import SettingsOptions from "../SettingsOptions/SettingsOptions";
import Username from "../Username/Username";
import Button from "../Button/Button";
import FollowButton from "../FollowButton/FollowButton";
import { AuthContext } from "../../contexts/auth";
import { Wrapper } from "./ProfileNav.styled";

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const ProfileNav = ({ id, username, verified, followerIds }) => {
  const { currentUser } = useContext(AuthContext);
  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);
  const openSettingsModal = () => setSettingsModalIsOpen(true);
  const closeSettingsModal = () => setSettingsModalIsOpen(false);

  return (
    <Wrapper>
      <Username user={{ username, verified }} />
      {currentUser?.id === id ? (
        <Button>
          <Link href="/account?edit">
            <a>Edit profile</a>
          </Link>
        </Button>
      ) : (
        <FollowButton
          username={username}
          userId={id}
          userFollowers={followerIds}
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
    </Wrapper>
  );
};

export default ProfileNav;
