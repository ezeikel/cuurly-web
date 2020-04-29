import { withRouter } from 'next/router';
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
  grid-template-rows: ${({ pathname }) => pathname === '/' || pathname === '/signin' ? `1fr` : `80px 1fr`};
  min-height: 100vh;
  background-color: ${({ theme }) => theme.default.white};
  color: ${({ theme }) => theme.default.textColor};
`;

const Wrapper = styled.div`
  background-color: #fafafa;
`;

const Inner = styled.main`
  max-width: ${({ theme }) => theme.default.maxWidth};
  margin: 0 auto;
  width: 100%;
`;

const Page = ({ children, router: { pathname } }) => (
  <ThemeProvider theme={theme}>
    <StyledPage pathname={pathname}>
      <Meta />
      {
        pathname === '/' || pathname === '/signin' ?
        null :
        <Header/>
      }
      <Wrapper>
        <Inner>
          {children}
        </Inner>
      </Wrapper>
    </StyledPage>
  </ThemeProvider>
);


export default withRouter(Page);
