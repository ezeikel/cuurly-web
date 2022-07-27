import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import blankProfilePicture from "../../utils/blankProfileImage";

const SearchDropdown = ({
  users,
  loading,
  inputValue,
  getItemProps,
  highlightedIndex,
}) => {
  const getDropdownItemClass = (index) => {
    return classNames("flex p-2 items-center bg-white", {
      "bg-gray-100": index === highlightedIndex,
    });
  };

  if (!users.length && !loading) {
    return <div>No results found</div>;
  }

  return (
    <>
      {users.map((user, index) => (
        <li
          className={getDropdownItemClass(index)}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...getItemProps({
            item: user,
            index,
          })}
          key={user.id}
        >
          <div className="h-8 w-8">
            <img
              className="rounded"
              src={
                user.profilePicture?.url.replace(
                  "/upload",
                  "/upload/w_150,h_150,c_lfill,g_face,dpr_2.0",
                ) || blankProfilePicture()
              }
              alt="profile"
            />
          </div>
          <div className="ml-2">
            <div>
              {user.username}
              {user.verified ? (
                <FontAwesomeIcon
                  icon={["fas", "badge-check"]}
                  color="#3E9AED"
                  size="sm"
                />
              ) : null}
            </div>
            <div>{user.name}</div>
          </div>
        </li>
      ))}
    </>
  );
};

export default SearchDropdown;
