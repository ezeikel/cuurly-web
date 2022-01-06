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
      ...props
    }: TextInputProps,
    ref: RefProps,
  ): ReactElement => {
    const [field] = useField({ ...props, name });

    const wrapperClass = classNames("", {
      [className]: className,
    });

    const inputClass = classNames(
      "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
      {},
    );

    const labelClass = classNames(
      "block text-sm font-medium text-gray-700",
      {},
    );

    return (
      <div className={wrapperClass}>
        {label && (
          <label className={labelClass} htmlFor={name}>
            {label}
          </label>
        )}
        <div className="mt-1">
          <input
            className={inputClass}
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
      </div>
    );
  },
);

export default TextInput;
