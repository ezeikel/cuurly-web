import { Component } from 'react';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import Downshift, { resetIdCounter } from 'downshift';

const Wrapper = styled.div`
  display: grid;
  place-items: center;
`;

const Search = () => (
  <Wrapper>
    <input type="text" />
  </Wrapper>
);

export default Search;
