import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import useUser from "../../hooks/useUser";
import Logo from "../Logo/Logo";
import SearchForm from "../form/forms/SearchForm/SearchForm";

const Header = ({ className }) => {
  const { user } = useUser();

  const wrapperClass = classNames("flex justify-between items-center p-4", {
    [className]: className,
  });

  if (!user) return null;

  return (
    <header className={wrapperClass}>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <nav className="flex-1 flex justify-around items-center">
        <SearchForm />
        <ul className="flex">
          <li>
            <Link href="explore">
              <a>
                <FontAwesomeIcon
                  icon={["fal", "compass"]}
                  color="#333"
                  size="lg"
                />
              </a>
            </Link>
          </li>
          <li className="ml-8">
            <Link href="/notifications">
              <a>
                <FontAwesomeIcon
                  icon={["fal", "bell"]}
                  color="#333"
                  size="lg"
                />
              </a>
            </Link>
          </li>
          <li className="ml-8">
            <Link href="/inbox">
              <a>
                <FontAwesomeIcon
                  icon={["fal", "paper-plane"]}
                  color="#333"
                  size="lg"
                />
              </a>
            </Link>
          </li>
          <li className="ml-8">
            <Link href="/[username]" as={`/${user.username}`}>
              <a>
                <FontAwesomeIcon
                  icon={["fal", "user"]}
                  color="#333"
                  size="lg"
                />
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
