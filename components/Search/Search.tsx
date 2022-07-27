import { ReactElement } from "react";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import classNames from "classnames";
import { SEARCH_USERS_QUERY } from "../../apollo/queries";
import SearchDropdown from "../SearchDropdown/SearchDropdown";

type SearchProps = {
  className?: string;
};

const Search = ({ className }: SearchProps): ReactElement => {
  const router = useRouter();
  const [getUsers] = useLazyQuery(SEARCH_USERS_QUERY);

  return (
    <div
      className={classNames("relative flex flex-col w-52", {
        [className]: !!className,
      })}
    >
      <SearchDropdown
        loadOptions={async (inputValue: string) => {
          if (inputValue === "") return null;

          const {
            data: { users },
          } = await getUsers({
            variables: { query: inputValue },
          });

          return users.map((user) => ({
            id: user.id,
            value: user.username,
            label: user.username,
          }));
        }}
        handleChange={(option) => {
          // option selected
          if (option?.value) {
            router.push("/[username]", `/${option.value}`);
          }
        }}
        placeholder="Search"
        noOptionsMessage="No results found"
        instanceId="search"
      />
    </div>
  );
};

export default Search;
