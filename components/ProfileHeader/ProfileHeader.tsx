import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import useUser from "../../hooks/useUser";
import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";
import FollowButton from "../FollowButton/FollowButton";
import UserFollowersModal from "../modals/UserFollowersModal/UserFollowersModal";
import UserFollowingModal from "../modals/UserFollowingModal/UserFollowingModal";
import UserSettingsModal from "../modals/UserSettingsModal/UserSettingsModal";

const ProfileHeader = ({
  user: { id, username, verified, followers, following, name, posts, profile },
}) => {
  const { user } = useUser();
  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);
  const [followersModalIsOpen, setFollowersModalIsOpen] = useState(false);
  const [followingModalIsOpen, setFollowingModalIsOpen] = useState(false);

  const openSettingsModal = () => setSettingsModalIsOpen(true);
  const closeSettingsModal = () => setSettingsModalIsOpen(false);
  const openFollowersModal = () => setFollowersModalIsOpen(true);
  const closeFollowersModal = () => setFollowersModalIsOpen(false);
  const openFollowingModal = () => setFollowingModalIsOpen(true);
  const closeFollowingModal = () => setFollowingModalIsOpen(false);

  const USER_NUMBERS = [
    {
      name: "posts",
      length: posts.length,
    },
    {
      name: "followers",
      length: followers.length,
      clickHandler: followers.length ? openFollowersModal : () => null,
    },
    {
      name: "following",
      length: following.length,
      clickHandler: following.length ? openFollowingModal : () => null,
    },
  ];

  return (
    <>
      <section className="flex justify-center gap-x-16">
        <Avatar
          src={profile.picture?.url}
          context="profile"
          className="w-40 h-40"
        />
        <div>
          <div className="flex gap-x-4 items-center mb-4">
            <div className="flex gap-x-2 items-center">
              <span className="text-3xl">{username}</span>
              {verified ? (
                <FontAwesomeIcon
                  icon={["fas", "badge-check"]}
                  color="#3E9AED"
                  size="lg"
                />
              ) : null}
            </div>
            {user?.id === id ? (
              <Link href="/account?edit" className="p-2 border border-gray-300 rounded">
                Edit profile
              </Link>
            ) : (
              <FollowButton
                username={username}
                userId={id}
                userFollowers={followers?.map((follower) => follower.id)}
              />
            )}
            <FontAwesomeIcon
              onClick={openSettingsModal}
              icon={["fal", "cog"]}
              color="var(--color-black)"
              size="lg"
              className="cursor-pointer"
            />
          </div>
          <ul className="flex gap-x-4 items-center mb-6">
            {USER_NUMBERS.map((number) => (
              <li key={number.name}>
                {number.name === "followers" || number.name === "following" ? (
                  <Button
                    text={`${number.length} ${number.name}`}
                    onClick={number.clickHandler}
                    variant="link"
                    className="first-letter:font-bold"
                  />
                ) : (
                  <span className="first-line:font-bold">
                    {number.length} {number.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
          {/* <UserNumbers
            username={username}
            posts={posts}
            following={following}
            followers={followers}
          /> */}
          <div className="flex flex-col gap-y-0.5">
            <div className="font-bold">{name}</div>
            <div>{profile.bio}</div>
            {profile.website ? (
              <a
                className="text-blue-900 font-bold"
                href={profile.website}
                target="_blank"
                rel="noreferrer"
              >
                {profile.website}
              </a>
            ) : null}
          </div>
        </div>
      </section>
      <UserSettingsModal
        isOpen={settingsModalIsOpen}
        handleClose={closeSettingsModal}
      />
      <UserFollowingModal
        isOpen={followingModalIsOpen}
        handleClose={closeFollowingModal}
        username={username}
        following={following}
      />
      <UserFollowersModal
        isOpen={followersModalIsOpen}
        handleClose={closeFollowersModal}
        username={username}
        followers={followers}
      />
    </>
  );
};

export default ProfileHeader;
