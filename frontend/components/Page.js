import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Header from './Header';
import Meta from './Meta';

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
  default: {
    textColor: 'var(--color-black)',
    white: 'var(--color-white)',
    maxWidth: '1000px',
    bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)'
  }
};

const StyledPage = styled.div`
  display: grid;
  grid-template-rows: 80px 1fr;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.default.white};
  color: ${({ theme }) => theme.default.textColor};
`;

const Wrapper = styled.div`
  background-color: #fafafa;
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.default.maxWidth};
  margin: 0 auto;
  padding: var(--spacing-medium);
  width: 100%;
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header/>
          <Wrapper>
            <Inner>
              {this.props.children}
            </Inner>
          </Wrapper>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
