import dynamic from "next/dynamic";
import BaseModal from "../../BaseModal/BaseModal";

// TOOD: i think this is to fix issue with heic - maybe a better solution now
const CreatePostForm = dynamic(
  () => import("../../CreatePostForm/CreatePostForm"),
  {
    ssr: false,
  },
);

const CreatePostModal = ({ isOpen, handleClose }) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Change Profile Picture Modal"
      close={handleClose}
    >
      <CreatePostForm />
    </BaseModal>
  );
};

export default CreatePostModal;
