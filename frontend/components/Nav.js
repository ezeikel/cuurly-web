import { Fragment } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import CurrentUser from './CurrentUser';
import Signout from './Signout';
import Search from './Search';

const Wrapper = styled.nav`
  font-family: var(--default-font-family);
  font-style: normal;
  color: ${({ theme }) => theme.default.textColor};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-content: center;
  padding: var(--spacing-medium) var(--spacing-huge);
  background-color: var(--color-white);
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
`;

const NavActions = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  justify-items: end;
`;

const LogoWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: var(--spacing-large);
  align-items: center;
`;

const Logo = styled.span`
  font-size: 3.2rem;
  text-transform: uppercase;
  font-weight: bold;
`;

const Nav = ({ theme }) => (
  <CurrentUser>
    {({ data: { currentUser } }) => (
      currentUser
      ?
        <Wrapper theme={theme}>
          <LogoWrapper>
            <Link href={`/feed?id=${currentUser.id}`}>
              <a>
                <Logo>Crownd</Logo>
              </a>
            </Link>
            <Signout />
          </LogoWrapper>
          <Search />
          <NavActions>
            <li><Link href={`/explore?id=${currentUser.id}`}><a>Explore</a></Link></li>
            <li><Link href={`/liked?id=${currentUser.id}`}><a>Liked</a></Link></li>
            <li><Link href={`/user?id=${currentUser.id}`}><a>Profile</a></Link></li>
            <li>
              <Link href='/upload'><button>Post</button></Link>
            </li>
          </NavActions>
        </Wrapper>
      : null
    )}
  </CurrentUser>
);

export default Nav;
