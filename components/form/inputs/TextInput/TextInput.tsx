import { InputHTMLAttributes, ReactElement } from "react";
import { useField } from "formik";
import classNames from "classnames";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  className?: string;
};

const TextInput = ({
  name,
  label,
  className,
  ...props
}: TextInputProps): ReactElement => {
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
    "text-base p-2 rounded bg-gray-50 overflow-hidden overflow-ellipsis flex-1 outline-none",
    {
      "text-sm pt-4 pb-0.5": isDirty,
    },
  );

  const labelClass = classNames(
    "text-sm leading-9 text-gray-400 origin-left absolute left-2 right-0 h-full pointer-events-none select-none whitespace-nowrap overflow-hidden overflow-ellipsis transition-transform ease-in-out",
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
      />
      {label && (
        <label className={labelClass} htmlFor={name}>
          {label}
        </label>
      )}
    </div>
  );
};

export default TextInput;
