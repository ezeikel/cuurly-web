import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './Header';
import Meta from './Meta';

const theme = {
  default: {
    textColor: 'var(--color-black)',
    white: 'var(--color-white)',
    maxWidth: '1000px',
    bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)'
  }
};

const StyledPage = styled.div`
  background-color: ${({ theme }) => theme.default.white};
  color: ${({ theme }) => theme.default.textColor};
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.default.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header  theme={theme}/>
          <Inner>
            {this.props.children}
          </Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
