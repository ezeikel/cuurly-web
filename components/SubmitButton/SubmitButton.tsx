import { MouseEvent } from "react";
import Button from "../Button/Button";
import Spinner from "../svgs/Spinner";
import { IconWrapper } from "./SubmitButton.styled";

type SubmitButtonProps = {
  backgroundColor?: string;
  text: string;
  submittingText?: string;
  isSubmitting?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: (event?: MouseEvent) => void;
};

const SubmitButton = ({
  backgroundColor = "var(--color-red)",
  text,
  submittingText,
  isSubmitting,
  disabled,
  className,
  onClick,
}: SubmitButtonProps) => (
  <Button
    type="submit"
    title={isSubmitting ? submittingText : text}
    disabled={isSubmitting || disabled}
    backgroundColor={isSubmitting ? "var(--color-light)" : backgroundColor}
    textColor={isSubmitting ? "var(--color-grey)" : "var(--color-white)"}
    className={className}
    onClick={onClick}
  >
    {isSubmitting && (
      <IconWrapper>
        <Spinner />
      </IconWrapper>
    )}
  </Button>
);

export default SubmitButton;
