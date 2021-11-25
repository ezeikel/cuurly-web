import classNames from "classnames";

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  const wrapperClass = classNames(
    "text-4xl font-bold text-current text-center",
    {
      [className]: className,
    },
  );
  return <h1 className={wrapperClass}>Cuurly.</h1>;
};

export default Logo;
