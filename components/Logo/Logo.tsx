import classNames from "classnames";

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => (
  <h1
    className={classNames(
      "text-2xl md:text-4xl font-extrabold text-center text-gray-900",
      {
        [className]: className,
      },
    )}
  >
    Cuurly
  </h1>
);

export default Logo;
