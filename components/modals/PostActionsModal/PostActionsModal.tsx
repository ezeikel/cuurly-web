import classNames from "classnames";
import Link from "next/link";
import useUser from "../../../hooks/useUser";
import BaseModal from "../../BaseModal/BaseModal";
import Button from "../../Button/Button";
import DeletePost from "../../DeletePost/DeletePost";

const PostActionsModal = ({ post, isOpen, handleClose }) => {
  const { user } = useUser();

  const isCurrentUsersPost = user.id === post.author.id;

  const MENU_ITEMS = [
    {
      id: 1,
      type: "link",
      label: "Go to post",
      href: "/post/[postId]",
      as: `/post/${post.id}`,
    },
    {
      id: 2,
      type: "button",
      label: "Copy link",
      // eslint-disable-next-line no-alert
      onClick: () => alert("Link copied!"),
    },
    {
      id: 3,
      type: "component",
      component: <DeletePost className="text-red-500" post={post} noPadding />,
      notAvailable: !isCurrentUsersPost,
    },
    {
      id: 4,
      type: "button",
      label: "Unfollow",
      // eslint-disable-next-line no-alert
      onClick: () => alert("Unfollowed!"),
      className: "text-red-500",
      notAvailable: isCurrentUsersPost,
    },
    {
      id: 5,
      type: "button",
      label: "Cancel",
      onClick: handleClose,
    },
  ];

  if (!post.id || !user) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      close={handleClose}
      autoWidth
      contentLabel="Post Actions"
      padding={0}
      noPadding
      autoHeight
      width="30%"
    >
      <div className="overflow-y-auto">
        <ul className="flex flex-col text-center divide-y divide-gray-200">
          {MENU_ITEMS.map((item) => {
            if (item.notAvailable) {
              return null;
            }

            return (
              <li
                key={item.id}
                className="flex items-center justify-center p-4"
              >
                {/* eslint-disable-next-line no-nested-ternary */}
                {item.type === "link" ? (
                  <Link href={item.href} as={item.as} className={classNames({
                    [item.className]: !!item.className,
                  })}>
                    {item.label}
                  </Link>
                ) : // eslint-disable-next-line no-nested-ternary
                  item.type === "button" ? (
                    <Button
                      text={item.label}
                      onClick={item.onClick}
                      variant="link"
                      className={classNames({
                        [item.className]: !!item.className,
                      })}
                      noPadding
                    />
                  ) : item.type === "component" ? (
                    item.component
                  ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </BaseModal>
  );
};

export default PostActionsModal;
