import { HTMLProps, MouseEvent } from "react";
import classNames from "classnames";
import Spinner from "../Spinner/Spinner";

export type ButtonProps = HTMLProps<HTMLButtonElement> & {
  text: string;
  disabled?: boolean;
  type?: "button" | "submit";
  variant?: "primary" | "outline" | "link";
  isLoading?: boolean;
  onClick?: (event?: MouseEvent) => void;
  className?: string;
};

const Button = ({
  text,
  type = "button",
  variant = "primary",
  isLoading,
  disabled = false,
  onClick,
  className,
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        "font-bold leading-none p-2 rounded flex items-center justify-center",
        {
          "bg-blue-500 hover:bg-blue-700 text-white": variant === "primary",
          "border-border-gray-300 border bg-white text-grey-700":
            variant === "outline",
          "border border-transparent text-blue-700": variant === "link",
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
