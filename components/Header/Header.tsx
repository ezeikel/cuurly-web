import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import useUser from "../../hooks/useUser";
import Logo from "../Logo/Logo";
import SearchForm from "../form/forms/SearchForm/SearchForm";

type NavItems = {
  name: string;
  href: string;
  icon: [IconPrefix, IconName];
}[];

const NAV_ITEMS: NavItems = [
  {
    name: "Explore",
    href: "/explore",
    icon: ["fal", "compass"],
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: ["fal", "bell"],
  },
  {
    name: "Inbox",
    href: "/inbox",
    icon: ["fal", "paper-plane"],
  },
  {
    name: "Profile",
    href: "/[username]",
    icon: ["fal", "user"],
  },
];

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
        <ul className="flex gap-x-8">
          {NAV_ITEMS.map(({ name, href, icon }) => (
            <li key={name}>
              <Link href={href}>
                <a>
                  <FontAwesomeIcon icon={icon} color="#333" size="lg" />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
