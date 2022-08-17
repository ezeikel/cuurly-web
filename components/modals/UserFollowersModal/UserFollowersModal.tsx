import BaseModal from "../../BaseModal/BaseModal";
import UserList from "../../UserList/UserList";

const UserFollowersModal = ({ isOpen, handleClose, username, followers }) => (
  <BaseModal
    isOpen={isOpen}
    onRequestClose={handleClose}
    contentLabel="User Followers Modal"
    close={handleClose}
  >
    <UserList username={username} users={followers} />
  </BaseModal>
);

export default UserFollowersModal;
