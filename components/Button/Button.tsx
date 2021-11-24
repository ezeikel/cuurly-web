import { HTMLProps, MouseEvent, ReactElement, ReactNode } from "react";
import classNames from "classnames";
import Spinner from "../svgs/Spinner";

export type ButtonProps = HTMLProps<HTMLButtonElement> & {
  text?: string;
  isSubmitting?: boolean;
  submittingText?: string;
  disabled?: boolean;
  variant?: "default" | "confirm" | "cancel" | "link";
  onClick?: (event?: MouseEvent) => void;
  children?: ReactNode;
  className?: string;
};

const Button = ({
  text,
  isSubmitting = false,
  submittingText,
  variant = "default",
  disabled = false,
  onClick,
  children,
  className,
}: ButtonProps): ReactElement => {
  const buttonClass = classNames(
    "bg-blue-500 hover:bg-blue-700 text-white font-bold leading-none p-2 rounded flex items-center justify-center",
    {
      [className]: className,
    },
  );

  const renderButton = () => {
    if (variant === "confirm") {
      return (
        <button
          className={buttonClass}
          disabled={disabled}
          onClick={onClick}
          type="submit"
        >
          {isSubmitting ? submittingText : text}
          {isSubmitting ? (
            <Spinner className="ml-4 h-4 w-4" fill="#FFFFFF" />
          ) : null}
        </button>
      );
    }

    return (
      <button
        className={buttonClass}
        disabled={disabled}
        onClick={onClick}
        type="button"
      >
        {children}
        {text}
      </button>
    );
  };

  return renderButton();
};

export default Button;
