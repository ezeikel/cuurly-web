import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/pro-light-svg-icons";
import classNames from "classnames";
import Image from "next/future/image";

type AvatarProps = {
  src?: string;
  context?: string;
  className?: string;
};

const Avatar = ({ src, context, className }: AvatarProps) =>
  src ? (
    <Image
      src={src}
      alt="avatar"
      className={classNames("rounded-full", {
        [className]: !!className,
      })}
    />
  ) : (
    <div
      className={classNames(
        "flex items-center justify-center rounded-full bg-slate-300 p-2",
        {
          [className]: !!className,
        },
      )}
    >
      <FontAwesomeIcon
        icon={faUser}
        color="#FFFFFF"
        size={context === "profile" ? "3x" : "sm"}
      />
    </div>
  );

export default Avatar;
