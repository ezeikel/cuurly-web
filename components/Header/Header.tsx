import Link from "next/link";
import classNames from "classnames";
import useUser from "../../hooks/useUser";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";

const Header = ({ className }) => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <header
      className={classNames("flex justify-between items-center p-4", {
        [className]: !!className,
      })}
    >
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <Nav />
    </header>
  );
};

export default Header;
