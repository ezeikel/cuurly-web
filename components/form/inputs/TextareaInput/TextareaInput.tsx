import React, { ChangeEvent, InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  Wrapper,
  Textarea,
  TextareaResize,
  Label,
  HelpText,
} from "./TextareaInput.styled";

type TextareaInputProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  id?: string;
  label?: string;
  placeholder?: string;
  helpText?: string;
  autoResize?: boolean;
  name: string;
  autoFocus?: boolean;
  minRows?: number;
  handleChange?: (e: ChangeEvent) => void;
  className?: string;
};

const TextareaInput = ({
  label,
  helpText,
  autoResize,
  minRows,
  handleChange,
  className,
  style, // BUG: TypeScript bug. Maybe related to https://github.com/Andarist/react-textarea-autosize/issues/269
  ...props
}: TextareaInputProps) => {
  const [field] = useField(props);

  return (
    <Wrapper className={`input-wrapper input-wrapper--textarea ${className}`}>
      {label && <Label htmlFor={props.id || props.name}>{label}</Label>}
      {helpText && (
        <HelpText>
          <p>{helpText}</p>
        </HelpText>
      )}
      {autoResize ? (
        <TextareaResize
          className="input input--textarea"
          minRows={minRows || 4}
          onChange={(e) => {
            // custom logic
            if (handleChange) {
              handleChange(e);
            }

            field.onChange(e);
          }}
          {...field} // eslint-disable-line react/jsx-props-no-spreading
          {...props} // eslint-disable-line react/jsx-props-no-spreading
        />
      ) : (
        <Textarea
          className="input input--textarea"
          onChange={(e) => {
            // custom logic
            if (handleChange) {
              handleChange(e);
            }

            field.onChange(e);
          }}
          {...field} // eslint-disable-line react/jsx-props-no-spreading
          {...props} // eslint-disable-line react/jsx-props-no-spreading
        />
      )}
    </Wrapper>
  );
};

export default TextareaInput;
