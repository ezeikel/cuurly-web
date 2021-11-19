import GenericModal from "../../GenericModal/GenericModal";
import {
  Wrapper,
  ModalHeader,
  ModalBody,
  SettingsActions,
  SettingsAction,
  ChangeProfilePhotoForm,
} from "./ChangeProfilePictureModal.styled";

const ChangeProfilePictureModal = ({ isOpen, handleClose, handleChange }) => {
  return (
    <GenericModal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Change Profile Picture Modal"
      close={handleClose}
    >
      <Wrapper>
        <ModalHeader>
          <h1>Change Profile Photo</h1>
        </ModalHeader>
        <ModalBody>
          <SettingsActions>
            <SettingsAction>
              <ChangeProfilePhotoForm>
                <label htmlFor="file">
                  Upload Photo
                  <input
                    id="file"
                    accept="image/jpeg,image/png"
                    type="file"
                    onChange={(e) => handleChange(e.target.files[0])}
                  />
                </label>
              </ChangeProfilePhotoForm>
            </SettingsAction>
            <SettingsAction disabled>
              <span>Remove Current Photo</span>
            </SettingsAction>
            <SettingsAction>
              <button type="button" onClick={handleClose}>
                Cancel
              </button>
            </SettingsAction>
          </SettingsActions>
        </ModalBody>
      </Wrapper>
    </GenericModal>
  );
};

export default ChangeProfilePictureModal;
