import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  ReactElement,
} from "react";
import { useField } from "formik";
import classNames from "classnames";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  noBorder?: boolean;
};

type RefProps = {
  current: HTMLInputElement;
};

const TextInput = forwardRef(
  (
    {
      name,
      label,
      handleChange,
      className,
      onChange,
      noBorder,
      ...props
    }: TextInputProps,
    ref: RefProps,
  ): ReactElement => {
    const [field] = useField({ ...props, name });

    return (
      <div
        className={classNames("", {
          [className]: className,
        })}
      >
        {label ? (
          <label
            className={classNames(
              "block text-sm font-medium text-gray-700 mb-1",
              {},
            )}
            htmlFor={name}
          >
            {label}
          </label>
        ) : null}
        <input
          className={classNames(
            "appearance-none block w-full px-4 py-3 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
            {
              "border border-gray-300 shadow-sm": !noBorder,
              [className]: !!className,
            },
          )}
          {...field} // eslint-disable-line react/jsx-props-no-spreading
          {...props} // eslint-disable-line react/jsx-props-no-spreading
          onChange={(e) => {
            // custom onChange logic
            if (handleChange) {
              handleChange(e);
            }

            // any onChange prop sent from another library e.g. downshift
            if (onChange) {
              onChange(e);
            }

            field.onChange(e);
          }}
          ref={ref}
        />
      </div>
    );
  },
);

export default TextInput;
