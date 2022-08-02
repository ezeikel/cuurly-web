import { ReactElement, CSSProperties, useState } from "react";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import { ClearIndicatorProps, components, ControlProps } from "react-select";
import AsyncSelect from "react-select/async";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SEARCH_USERS_QUERY } from "../../apollo/queries";
import { customStyles } from "./SearchBox.styles";
import Avatar from "../Avatar/Avatar";

type SearchProps = {
  className?: string;
};

const Control = ({ children, ...props }: ControlProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <components.Control {...props}>
    <FontAwesomeIcon
      icon={["fal", "magnifying-glass"]}
      color="#333"
      size="1x"
      className="mr-2"
    />
    {children}
  </components.Control>
);

const ClearIndicator = (props: ClearIndicatorProps) => {
  const {
    children = (
      <FontAwesomeIcon icon={["fal", "times"]} color="#333" size="1x" />
    ),
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restInnerProps}
      ref={ref}
      style={getStyles("clearIndicator", props) as CSSProperties}
    >
      <div style={{ padding: "0px 5px" }}>{children}</div>
    </div>
  );
};

// should be using OptionProps here but extra properties on data are causing errors
const Option = (props) => {
  const { data } = props;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <components.Option {...props}>
      <div className="flex items-center gap-x-2 cursor-pointer">
        <Avatar src={data.avatar} className="h-8 w-8" />
        <div>
          <div className="flex items-center gap-x-1 font-medium">
            {data.label}
            {data.verified ? (
              <FontAwesomeIcon
                icon={["fas", "badge-check"]}
                color="#3E9AED"
                size="sm"
              />
            ) : null}
          </div>
          <div className="text-slate-500">{data.name}</div>
        </div>
      </div>
    </components.Option>
  );
};

const SearchBox = ({ className }: SearchProps): ReactElement => {
  const router = useRouter();
  const [getUsers] = useLazyQuery(SEARCH_USERS_QUERY);
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div
      className={classNames("relative flex flex-col w-52", {
        [className]: !!className,
      })}
    >
      <div>
        <AsyncSelect
          value={selectedOption}
          styles={customStyles}
          placeholder="Search"
          // TODO: should be able to use an Option type from react-select instead of object
          onChange={(option: {
            label: string;
            value: string;
            avatar?: string;
            verified?: boolean;
          }) => {
            setSelectedOption(option);

            if (option?.value) {
              router.push("/[username]", `/${option.value}`);
            }
          }}
          components={{
            Control,
            ClearIndicator,
            Option,
          }}
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
              name: `${user.firstName} ${user.lastName}`,
              avatar: user.profilePicture?.url.replace(
                "/upload",
                "/upload/w_150,h_150,c_lfill,g_face,dpr_2.0",
              ),
              verified: user.verified,
            }));
          }}
          noOptionsMessage={() => "No results found"}
          instanceId="search"
          isClearable
        />
      </div>
    </div>
  );
};

export default SearchBox;
