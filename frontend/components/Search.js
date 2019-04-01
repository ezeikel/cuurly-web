import { Component } from 'react';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import styled, { keyframes } from 'styled-components';
import debounce from 'lodash.debounce';
import Downshift, { resetIdCounter } from 'downshift';
import { SEARCH_USERS_QUERY } from '../apollo/queries';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const glow = keyframes `
  from {
    box-shadow: 0 0 0px yellow;
  }
  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`;

const SearchStyles = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 215px;
  input {
    display: flex;
    justify-items: center;
    width: 100%;
    padding: 6px;
    border: solid 1px #dbdbdb;
    outline: 0;
    font-size: 1.6rem;
    background-color: #fafafa;
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`;

const ComboBox = styled.div`
  width: 215px;
`;

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  border: 1px solid ${props => props.theme.lightgrey};
  width: 215px;
`;

const DropDownItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: var(--spacing-small);
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  background: ${props => (props.highlighted ? '#f7f7f7' : 'white')};
  padding: 8px 14px;
  transition: all 0.2s;
  font-size: 1.4rem;
  line-height: 2.2rem;
  width: 100%;
  cursor: pointer;
  img {
    margin-right: 10px;
  }
`;

const UserPhoto = styled.div`
  display: grid;
  width: 32px;
  height: 32px;
  img {
    border-radius: 50%;
  }
`;

const UserInfo = styled.div`
  display: grid;
  grid-template-rows: auto auto;
`;

const Username = styled.span`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: start;
  align-items: center;
  grid-column-gap: var(--spacing-tiny);
`;

const Name = styled.span`
  display: grid;
  color: #999999;
`;

function routeToUser(user) {
  Router.push({
    pathname: '/user',
    query: {
      id: user.id
    }
  });
}

class AutoComplete extends Component {
  state = {
    users: [],
    loading: false
  };

  onChange = debounce(async (e, client) => {
    const { target: { value } } = e;

    if (!value) return;

    // turn loading on
    this.setState({
      loading: true
    });

    // manually query apollo client
    const res = await client.query({
      query: SEARCH_USERS_QUERY,
      variables: {
        searchTerm: value
      }
    });

    this.setState({
      users: res.data.users,
      loading: false
    })
  }, 350);

  render() {
    resetIdCounter();

    return (
      <SearchStyles>
        <Downshift
          onChange={routeToUser}
          itemToString={user => (user === null ? '' : user.username)}
        >
          {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex, getRootProps }) => (
            <ComboBox {...getRootProps()}>
              <ApolloConsumer>
                {client => (
                  <input
                    {...getInputProps({
                      type: 'search',
                      placeholder: 'Search',
                      id: 'search',
                      className: this.state.loading ? 'loading' : '',
                      onChange: e => {
                        e.persist();

                        this.onChange(e, client);
                      }
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
                      <img src={user.profilePicture} />
                    </UserPhoto>
                    <UserInfo>
                      <Username>
                        {user.username}
                        {user.verified ?
                          <FontAwesomeIcon icon={["fas", "badge-check"]} color="#3E9AED" size="sm" />
                          : null
                        }
                      </Username>
                      <Name>
                        {user.name}
                      </Name>

                    </UserInfo>
                    </DropDownItem>
                  ))}
                  {!this.state.users.length && !this.state.loading &&
                    <DropDownItem>
                      Nothing found for {inputValue}
                    </DropDownItem>
                  }
                </DropDown>
              )}
            </ComboBox>
          )}
        </Downshift>
      </SearchStyles>
    )
  }
}

export default AutoComplete;
