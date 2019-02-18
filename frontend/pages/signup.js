import React from 'react';
import styled from 'styled-components';
import Signup from '../components/Signup';

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: var(--spacing-medium);
  h1 {
    margin: 0;
    font-size: 22px;
  }
`;

const SignupPage = () => (
  <Wrapper>
    <h1>Sign up</h1>
    <Signup />
  </Wrapper>
);

export default SignupPage;
