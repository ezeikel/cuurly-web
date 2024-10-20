import BaseModal from "../../BaseModal/BaseModal";

const ChangeProfilePictureModal = ({ isOpen, handleClose, handleChange }) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Change Profile Picture Modal"
      close={handleClose}
    >
      <div className="flex flex-col">
        <header className="grid grid-cols-[1fr_42px] items-center border-b border-gray-200">
          <h1 className="justify-self-center text-xl leading-9 m-0">Change Profile Photo</h1>
        </header>
        <div className="overflow-y-scroll">
          <ul className="grid">
            <li className="flex justify-center items-center min-h-[48px] p-1 border-b border-gray-200">
              <form className="flex w-full justify-center h-full">
                <label htmlFor="file" className="flex justify-center relative w-full cursor-pointer">
                  Upload Photo
                  <input
                    id="file"
                    accept="image/jpeg,image/png"
                    type="file"
                    onChange={(e) => handleChange(e.target.files[0])}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer"
                  />
                </label>
              </form>
            </li>
            <li className="flex justify-center items-center min-h-[48px] p-1 border-b border-gray-200">
              <span className="opacity-30 pointer-events-none">Remove Current Photo</span>
            </li>
            <li className="flex justify-center items-center min-h-[48px] p-1">
              <button type="button" onClick={handleClose} className="cursor-pointer">
                Cancel
              </button>
            </li>
          </ul>
        </div>
      </div>
    </BaseModal>
  );
};

export default ChangeProfilePictureModal;
