import classNames from "classnames";

const FormWrapper = ({ children, className }) => {
  const wrapperClass = classNames("flex flex-col bg-white", {
    [className]: className,
  });

  return <div className={wrapperClass}>{children}</div>;
};

export default FormWrapper;
