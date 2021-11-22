import { MouseEvent } from "react";
import Button from "../Button/Button";
import Spinner from "../svgs/Spinner";
import { IconWrapper } from "./SubmitButton.styled";

type SubmitButtonProps = {
  text: string;
  submittingText?: string;
  isSubmitting?: boolean;
  disabled?: boolean;
  onClick?: (event?: MouseEvent) => void;
};

const SubmitButton = ({
  text,
  submittingText,
  isSubmitting,
  disabled,
  onClick,
}: SubmitButtonProps) => (
  <Button
    type="submit"
    text={isSubmitting ? submittingText : text}
    disabled={isSubmitting || disabled}
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
