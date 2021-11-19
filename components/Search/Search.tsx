import { Component } from "react";
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
  DropDownItem,
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

class AutoComplete extends Component {
  state = {
    users: [],
    loading: false,
  };

  onChange = debounce(async (e, client) => {
    const {
      target: { value },
    } = e;

    if (!value) return;

    // turn loading on
    this.setState({
      loading: true,
    });

    // manually query apollo client
    const res = await client.query({
      query: SEARCH_USERS_QUERY,
      variables: {
        searchTerm: value,
      },
    });

    this.setState({
      users: res.data.users,
      loading: false,
    });
  }, 350);

  render() {
    resetIdCounter();

    return (
      <SearchStyles className={this.props.className}>
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
            <ComboBox {...getRootProps()}>
              <ApolloConsumer>
                {(client) => (
                  <input
                    {...getInputProps({
                      type: "search",
                      placeholder: "Search",
                      id: "search",
                      className: this.state.loading ? "loading" : "",
                      onChange: (e) => {
                        e.persist();

                        this.onChange(e, client);
                      },
                    })}
                  />
                )}
              </ApolloConsumer>
              {isOpen && (
                <DropDown>
                  {this.state.users.map((user, index) => (
                    <DropDownItem
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
                    </DropDownItem>
                  ))}
                  {!this.state.users.length && !this.state.loading && (
                    <DropDownItem>Nothing found for {inputValue}</DropDownItem>
                  )}
                </DropDown>
              )}
            </ComboBox>
          )}
        </Downshift>
      </SearchStyles>
    );
  }
}

export default AutoComplete;
