import { HTMLProps } from "react";
import classNames from "classnames";
import Spinner from "../Spinner/Spinner";

export type ButtonProps = HTMLProps<HTMLButtonElement> & {
  text: string;
  disabled?: boolean;
  type?: "button" | "submit";
  variant?: "primary" | "outline" | "link";
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
  noPadding?: boolean;
};

const Button = ({
  text,
  type = "button",
  variant = "primary",
  isLoading,
  disabled = false,
  onClick,
  className,
  noPadding,
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        "leading-none rounded flex items-center justify-center",
        {
          "bg-blue-500 hover:bg-blue-700 text-white font-bold":
            variant === "primary",
          "border-border-gray-300 border bg-white text-grey-700":
            variant === "outline",
          "border border-transparent": variant === "link",
          "p-2": !noPadding,
          [className]: !!className,
        },
      )}
      type={type === "submit" ? "submit" : "button"}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? <Spinner /> : text}
    </button>
  );
};

export default Button;
