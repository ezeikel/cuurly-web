import { ToastContainer } from "react-toastify";

const Notification = () => {
  return (
    <ToastContainer
      className="fixed bottom-0 left-0 p-0 m-0 w-full"
      toastClassName="bg-black cursor-auto m-0"
      bodyClassName="bg-black text-white font-[var(--default-font-family)] m-0 grid items-center"
      progressClassName="progress"
      closeButton={false}
    />
  );
};

export default Notification;
