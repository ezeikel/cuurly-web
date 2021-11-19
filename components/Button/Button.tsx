import { HTMLProps, MouseEvent, ReactElement, ReactNode } from "react";
import { Wrapper } from "./Button.styled";

export type ButtonProps = HTMLProps<HTMLButtonElement> & {
  variant?: string;
  title?: string;
  backgroundColor?: string;
  border?: string;
  textColor?: string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: (event?: MouseEvent) => void;
};

const Button = ({
  variant = "default",
  title,
  backgroundColor = "var(--color-blue)",
  border = "none",
  textColor = "var(--color-white)",
  disabled = false,
  className,
  children,
  type = "button",
  onClick,
}: ButtonProps): ReactElement => (
  <Wrapper
    variant={variant}
    textColor={textColor}
    backgroundColor={backgroundColor}
    border={border}
    disabled={disabled}
    className={className}
    type={type}
    onClick={onClick}
  >
    {children}
    {title}
  </Wrapper>
);

export default Button;
