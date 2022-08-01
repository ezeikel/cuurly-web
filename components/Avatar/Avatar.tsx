import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

type AvatarProps = {
  src?: string;
  context?: string;
  className?: string;
};

const Avatar = ({ src, context, className }: AvatarProps) =>
  src ? (
    <img
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
        icon={["fal", "user"]}
        color="#FFFFFF"
        size={context === "profile" ? "3x" : "sm"}
      />
    </div>
  );

export default Avatar;
