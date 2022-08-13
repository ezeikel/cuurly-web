import React, { ChangeEvent, InputHTMLAttributes } from "react";
import { useField } from "formik";
import TextareaAutosize from "react-textarea-autosize";

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
    <div className="relative flex flex-col w-full h-full">
      {label ? (
        <label
          className="flex mb-3 font-medium"
          htmlFor={props.id || props.name}
        >
          {label}
        </label>
      ) : null}
      {autoResize ? (
        <TextareaAutosize
          className="rounded p-4 border border-gray-300 focus:outline-none focus:border-blue-500 resize-none"
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
        <textarea
          className="rounded p-4 border border-gray-300 focus:outline-none focus:border-blue-500 resize-none"
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
    </div>
  );
};

export default TextareaInput;
