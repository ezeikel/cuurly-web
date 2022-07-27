import classNames from "classnames";

type FormWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

const FormWrapper = ({ children, className }: FormWrapperProps) => {
  const wrapperClass = classNames("flex flex-col bg-white", {
    [className]: className,
  });

  return <div className={wrapperClass}>{children}</div>;
};

export default FormWrapper;
