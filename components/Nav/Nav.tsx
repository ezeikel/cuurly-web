import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import useUser from "../../hooks/useUser";
import SearchBox from "../SearchBox/SearchBox";
import CreatePostModal from "../modals/CreatePostModal/CreatePostModal";

type NavItems = {
  name: string;
  href?: string;
  as?: string;
  icon: [IconPrefix, IconName];
  onClick?: () => void;
}[];

const Nav = () => {
  const { user } = useUser();
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  const openCreatePostModal = () => setIsCreatePostModalOpen(true);
  const closeCreatePostModal = () => setIsCreatePostModalOpen(false);

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
      icon: ["fal", "square-plus"],
      onClick: () => openCreatePostModal(),
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
    <>
      <nav className="md:flex-1 flex justify-between items-center sm:justify-end">
        <SearchBox className="m-auto hidden md:block" />
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
      </nav>
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        handleClose={closeCreatePostModal}
      />
    </>
  );
};

export default Nav;
