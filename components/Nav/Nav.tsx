import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import useUser from "../../hooks/useUser";
import Search from "../Search/Search";

type NavItems = {
  name: string;
  href: string;
  as?: string;
  icon: [IconPrefix, IconName];
}[];

const Nav = () => {
  const { user } = useUser();

  const NAV_ITEMS: NavItems = [
    {
      name: "Home",
      href: "/",
      icon: ["fal", "house"],
    },
    {
      name: "Inbox",
      href: "/inbox",
      icon: ["fal", "paper-plane"],
    },
    {
      name: "Upload",
      href: "/upload",
      icon: ["fal", "square-plus"],
    },
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
      name: "Profile",
      href: "/[username]",
      as: `/${user.username}`,
      icon: ["fal", "user"],
    },
  ];
  return (
    <nav className="flex-1 flex justify-between items-center">
      <Search className="m-auto" />
      <ul className="flex gap-x-8">
        {NAV_ITEMS.map(({ name, href, as, icon }) => (
          <li key={name}>
            <Link href={href} as={as}>
              <a>
                <FontAwesomeIcon icon={icon} color="#333" size="lg" />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
