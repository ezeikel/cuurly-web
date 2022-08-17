import BaseModal from "../../BaseModal/BaseModal";
import UserList from "../../UserList/UserList";

const UserFollowingModal = ({ isOpen, handleClose, username, following }) => (
  <BaseModal
    isOpen={isOpen}
    onRequestClose={handleClose}
    contentLabel="User Following Modal"
    close={handleClose}
  >
    <UserList username={username} users={following} />
  </BaseModal>
);

export default UserFollowingModal;
