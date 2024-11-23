"use client";

import Link from "next/link";
import type { DbUserType } from "@cuurly/db";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faCompass,
  faUser,
  faPlusSquare,
} from "@fortawesome/pro-light-svg-icons";

type NavItemsProps = {
  user: DbUserType;
};

type NavItemType = {
  name: string;
  href?: string;
  as?: string;
  icon: IconDefinition;
  onClick?: () => void;
};

const NavItems = ({ user }: NavItemsProps) => {
  const NAV_ITEMS: NavItemType[] = [
    {
      name: "Home",
      href: "/",
      icon: faHome,
    },
    {
      name: "Upload",
      icon: faPlusSquare,
      onClick: () => null,
    },
    {
      name: "Explore",
      href: "/explore",
      icon: faCompass,
    },
    {
      name: "Profile",
      href: "/[username]",
      as: `/${user.username}`,
      icon: faUser,
    },
  ];

  return (
    <ul className="flex gap-x-5 md:gap-x-8">
      {NAV_ITEMS.map(({ name, href, as, icon, onClick }) => (
        <li key={name}>
          {href ? (
            <Link href={href} as={as}>
              <FontAwesomeIcon icon={icon} color="#333" size="lg" />
            </Link>
          ) : (
            <button type="button" onClick={onClick}>
              <FontAwesomeIcon icon={icon} color="#333" size="lg" />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavItems;
