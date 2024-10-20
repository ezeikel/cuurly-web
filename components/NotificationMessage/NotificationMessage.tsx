const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    className="fill-[#357433]"
  >
    <g fill="none" fillRule="evenodd">
      <g fill="#357433" fillRule="nonzero">
        <g>
          <path
            d="M619 12c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0 1.5c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5 6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5zm2.188 3.776c.3 0 .54.24.54.54 0 .143-.055.267-.165.376l-1.804 1.811 1.798 1.791c.109.11.164.233.164.39 0 .3-.24.54-.54.54-.158 0-.287-.061-.39-.164l-1.798-1.798-1.79 1.798c-.103.11-.24.164-.39.164-.301 0-.54-.24-.54-.54 0-.15.054-.28.157-.383l1.798-1.798-1.798-1.804c-.103-.103-.158-.233-.158-.376 0-.301.24-.533.54-.533.15 0 .274.047.376.157l1.805 1.798 1.812-1.805c.116-.116.232-.164.383-.164z"
            transform="translate(-1011 -204) translate(400 192)"
          />
        </g>
      </g>
    </g>
  </svg>
);

type NotificationMessageProps = {
  type: string;
  message: string;
  closeToast?: () => void;
};

const NotificationMessage = ({
  type,
  message,
  closeToast,
}: NotificationMessageProps) => (
  <div className="flex justify-between">
    <div className="flex items-center">
      {message}
    </div>
    {type === "success" ||
      (type === "delete" && (
        <span
          className="flex items-center text-[var(--font-size-tiny)] leading-5 text-[#357433] cursor-pointer"
          onClick={closeToast}
        >
          Hide
          <CloseIcon />
        </span>
      ))}
  </div>
);

export default NotificationMessage;
