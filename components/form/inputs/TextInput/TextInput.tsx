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
    const [field, meta] = useField({ ...props, name });

    // TODO: dirty not always being set resulting in label being in the way
    const isDirty = meta.touched && field.value.length > 0;

    const wrapperClass = classNames(
      "relative flex h-9 rounded border border-gray-200",
      {
        [className]: className,
      },
    );

    const inputClass = classNames(
      "text-base p-2 rounded bg-gray-50 overflow-hidden overflow-ellipsis flex-1 outline-none peer",
      {
        "text-sm pt-4 pb-0.5": isDirty,
      },
    );

    const labelClass = classNames(
      "text-sm leading-9 text-gray-400 origin-left absolute left-2 right-0 h-full pointer-events-none select-none whitespace-nowrap overflow-hidden overflow-ellipsis transition-transform ease-in-out peer-focus:scale-75 peer-focus:-translate-y-2",
      {
        "transform scale-75 -translate-y-2": isDirty,
      },
    );

    return (
      <div className={wrapperClass}>
        <input
          className={inputClass}
          {...field} // eslint-disable-line react/jsx-props-no-spreading
          {...props} // eslint-disable-line react/jsx-props-no-spreading
          onChange={(e) => {
            // custom logic
            if (handleChange) {
              handleChange(e);
            }

            // any onChange prop sent e.g. from downshift
            onChange(e);

            field.onChange(e);
          }}
          ref={ref}
        />
        {label && (
          <label className={labelClass} htmlFor={name}>
            {label}
          </label>
        )}
      </div>
    );
  },
);

export default TextInput;
