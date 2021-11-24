import classNames from "classnames";

const FormWrapper = ({ children, className }) => {
  const wrapperClass = classNames(
    "flex flex-col rounded bg-white p-8 border border-gray-200",
    {
      [className]: className,
    },
  );

  return <div className={wrapperClass}>{children}</div>;
};

export default FormWrapper;
