import { Fragment } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import CurrentUser from './CurrentUser';
import Signout from './Signout';

const Wrapper = styled.header`
  font-family: var(--default-font-family);
  font-style: normal;
  color: ${({ theme }) => theme.default.textColor};
`;

const Header = ({ theme }) => (
    <CurrentUser>
      {({ data: { currentUser } }) => (
        <Wrapper theme={theme}>
          {
            currentUser
              ?
                <Fragment>
                  <span>{`Hello ${currentUser.firstName}`}</span>
                  <Signout />
                </Fragment>
              : <Link href="/signin"><a>Sign in</a></Link>
          }
        </Wrapper>
      )}
    </CurrentUser>
);

export default Header;
