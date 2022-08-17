import classNames from "classnames";
import Link from "next/link";
import BaseModal from "../../BaseModal/BaseModal";
import Button from "../../Button/Button";

const UserSettingsModal = ({ isOpen, handleClose }) => {
  type MenuItem = {
    id: number;
    type: "link" | "button" | "component";
    label: string;
    href?: string;
    as?: string;
    onClick?: () => void;
    className?: string;
    notAvailable?: boolean;
    component?: React.ReactNode;
  };

  const MENU_ITEMS: MenuItem[] = [
    {
      id: 1,
      type: "link",
      label: "Change Password",
      href: "/account?action=password-change",
    },
    {
      id: 2,
      type: "button",
      label: "Log out",
      // eslint-disable-next-line no-alert
      onClick: () => alert("Log out!"),
    },
    {
      id: 3,
      type: "button",
      label: "Cancel",
      onClick: handleClose,
    },
  ];
  return (
    <BaseModal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="User Settings Modal"
      close={handleClose}
      padding={0}
      noPadding
      autoWidth
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
                  <Link href={item.href} as={item.as}>
                    <a
                      className={classNames({
                        [item.className]: !!item.className,
                      })}
                    >
                      {item.label}
                    </a>
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

export default UserSettingsModal;
