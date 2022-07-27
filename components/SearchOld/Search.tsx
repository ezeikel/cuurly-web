import { useEffect, useState } from "react";
import Router from "next/router";
import { ApolloConsumer } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import debounce from "lodash.debounce";
import Downshift, { resetIdCounter } from "downshift";
import { SEARCH_USERS_QUERY } from "../../apollo/queries";
import blankProfilePicture from "../../utils/blankProfileImage";
import {
  SearchStyles,
  ComboBox,
  DropDown,
  DropdownItem,
  UserPhoto,
  UserInfo,
  Username,
  Name,
} from "./Search.styled";

function routeToUser(user) {
  Router.push(
    {
      pathname: "/[username]",
    },
    `/${user.username}`,
  );
}

const Search = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = debounce(async (e, client) => {
    const {
      target: { value },
    } = e;

    if (!value) return;

    // turn loading on
    setLoading(true);

    // manually query apollo client
    const res = await client.query({
      query: SEARCH_USERS_QUERY,
      variables: {
        searchTerm: value,
      },
    });

    setUsers(res.data.users);
    setLoading(false);
  }, 350);

  useEffect(() => {
    resetIdCounter();
  }, []);

  return (
    <SearchStyles>
      <Downshift
        onChange={routeToUser}
        itemToString={(user) => (user === null ? "" : user.username)}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          highlightedIndex,
          getRootProps,
        }) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <ComboBox {...getRootProps()}>
            <ApolloConsumer>
              {(client) => (
                <input
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...getInputProps({
                    type: "search",
                    placeholder: "Search",
                    id: "search",
                    className: loading ? "loading" : "",
                    onChange: (e) => {
                      e.persist();

                      handleChange(e, client);
                    },
                  })}
                />
              )}
            </ApolloConsumer>
            {isOpen && (
              <DropDown>
                {users.map((user, index) => (
                  <DropdownItem
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...getItemProps({ item: user })}
                    key={user.id}
                    highlighted={index === highlightedIndex}
                  >
                    <UserPhoto>
                      <img
                        src={
                          user.profilePicture?.url.replace(
                            "/upload",
                            "/upload/w_150,h_150,c_lfill,g_face,dpr_2.0",
                          ) || blankProfilePicture()
                        }
                        alt="profile"
                      />
                    </UserPhoto>
                    <UserInfo>
                      <Username>
                        {user.username}
                        {user.verified ? (
                          <FontAwesomeIcon
                            icon={["fas", "badge-check"]}
                            color="#3E9AED"
                            size="sm"
                          />
                        ) : null}
                      </Username>
                      <Name>{user.name}</Name>
                    </UserInfo>
                  </DropdownItem>
                ))}
                {!users.length && !loading && (
                  <DropdownItem>Nothing found for {inputValue}</DropdownItem>
                )}
              </DropDown>
            )}
          </ComboBox>
        )}
      </Downshift>
    </SearchStyles>
  );
};

export default Search;
