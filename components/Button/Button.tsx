import { HTMLProps, MouseEvent, ReactElement, ReactNode } from "react";
import { Wrapper } from "./Button.styled";

export type ButtonProps = HTMLProps<HTMLButtonElement> & {
  text?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (event?: MouseEvent) => void;
  children?: ReactNode;
};

const Button = ({
  text,
  disabled = false,
  type = "button",
  onClick,
  children,
}: ButtonProps): ReactElement => (
  <Wrapper disabled={disabled} onClick={onClick} type={type}>
    {children}
    {text}
  </Wrapper>
);

export default Button;
