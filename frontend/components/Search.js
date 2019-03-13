import { Component } from 'react';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import Downshift, { resetIdCounter } from 'downshift';
import { SEARCH_USERS_QUERY } from '../apollo/queries';

const Wrapper = styled.div`
  display: grid;
  place-items: center;
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
      <Downshift
        onChange={routeToUser}
        userToString={user => (user === null ? '' : user.username)}
      >
        {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
          <div>
            <ApolloConsumer>
              {client => (
                <input
                  {...getInputProps({
                    type: 'search',
                    placeholder: 'search for user',
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
              <div>
                {this.state.users.map((user, index) => (
                  <div
                    {...getItemProps({ item: user })}
                    key={user.id}
                    highlighted={index === highlightedIndex}
                  >
                  {user.username}
                  </div>
                ))}
                {!this.state.users.length && !this.state.loading &&
                  <div>
                    Nothing found for {inputValue}
                  </div>
                }
              </div>
            )}
          </div>
        )}
      </Downshift>
    )
  }
}

const Search = () => (
  <Wrapper>
    <input type="text" />
  </Wrapper>
);

export default AutoComplete;
