import classNames from "classnames";

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  const wrapperClass = classNames(
    "text-4xl font-extrabold text-center text-gray-900",
    {
      [className]: className,
    },
  );
  return <h1 className={wrapperClass}>Cuurly.</h1>;
};

export default Logo;
