import Link from "next/link";
import classNames from "classnames";
import Nav from "../Nav/Nav";

type HeaderProps = {
  className?: string;
};

const Header = ({ className }: HeaderProps) => (
  <header
    className={classNames("flex justify-between items-center p-4", className)}
  >
    <Link href="/">
      <h1>Cuurly</h1>
    </Link>
    <Nav />
  </header>
);

export default Header;
