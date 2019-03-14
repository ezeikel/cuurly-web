import { Component } from 'react';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import styled, { keyframes } from 'styled-components';
import debounce from 'lodash.debounce';
import Downshift, { resetIdCounter } from 'downshift';
import { SEARCH_USERS_QUERY } from '../apollo/queries';

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
  input {
    width: 100%;
    padding: 10px;
    border: 0;
    font-size: 2rem;
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`;

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  border: 1px solid ${props => props.theme.lightgrey};
`;

const DropDownItem = styled.div `
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  background: ${props => (props.highlighted ? '#f7f7f7' : 'white')};
  padding: 1rem;
  transition: all 0.2s;
  ${props => (props.highlighted ? 'padding-left: 2rem;' : null)};
  display: flex;
  align-items: center;
  border-left: 10px solid ${props => (props.highlighted ? props.theme.lightgrey : 'white')};
  img {
    margin-right: 10px;
  }
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
    // turn loading on
    this.setState({
      loading: true
    });
    // manually query apollo client
    const res = await client.query({
      query: SEARCH_USERS_QUERY,
      variables: {
        searchTerm: e.target.value
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
          {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
            <div>
              <ApolloConsumer>
                {client => (
                  <input
                    {...getInputProps({
                      type: 'search',
                      placeholder: 'Search for User',
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
                    {user.username}
                    </DropDownItem>
                  ))}
                  {!this.state.users.length && !this.state.loading &&
                    <DropDownItem>
                      Nothing found for {inputValue}
                    </DropDownItem>
                  }
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
      </SearchStyles>
    )
  }
}

export default AutoComplete;
