import React, { ChangeEvent, InputHTMLAttributes } from "react";
import { useField } from "formik";
import TextareaAutosize from "react-textarea-autosize";
import classNames from "classnames";

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
  noBorder?: boolean;
};

const TextareaInput = ({
  label,
  helpText,
  autoResize,
  minRows,
  handleChange,
  className,
  noBorder,
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
          className={classNames(
            "rounded p-4 focus:outline-none focus:border-blue-500 resize-none",
            {
              "border border-gray-300 shadow-sm": !noBorder,
              [className]: !!className,
            },
          )}
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
          className={classNames(
            "rounded p-4 focus:outline-none focus:border-blue-500 resize-none",
            {
              "border border-gray-300 shadow-sm": !noBorder,
              [className]: !!className,
            },
          )}
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
