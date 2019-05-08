import Link from 'next/link';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CurrentUser from './CurrentUser';
import Search from './Search';
import LogoImage from './LogoImage';
import LogoText from './LogoText';

const Wrapper = styled.nav`
  width: 100%;
  max-width: ${({ theme }) => theme.default.maxWidth};
  font-family: var(--default-font-family);
  font-style: normal;
  color: ${({ theme }) => theme.default.textColor};
  display: grid;
  grid-template-columns: auto 4fr auto 1fr;
  align-content: center;
  padding: var(--spacing-medium);
`;

const NavActions = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: var(--spacing-medium);
  align-items: center;
  justify-items: center;
  font-size: 1.8rem;
`;

const LogoWrapper = styled.div`
  display: grid;
  grid-template-columns: 32px 120px;
  grid-column-gap: var(--spacing-small);
  align-items: center;
  a {
    height: 32px;
    svg {
      width: 100%;
      height: 100%;
    }
  }
`;

const StyledSearch = styled(Search)`
  width: 100%;
`;

const Upload = styled.div`
  display: grid;
  justify-self: end;
`;

const UploadIcon = styled(FontAwesomeIcon)`
`;

const Nav = ({ theme }) => (
  <CurrentUser>
    {({ data: { currentUser } }) =>
      currentUser ? (
        <Wrapper theme={theme}>
          <LogoWrapper>
            <Link href={`/`}>
              <a>
                <LogoImage fillColor="var(--color-black)" />
              </a>
            </Link>
            <Link href={`/`}>
              <a>
                <LogoText fillColor="var(--color-black)" />
              </a>
            </Link>
          </LogoWrapper>
          <StyledSearch />
          <NavActions>
            <li>
              <Link href={`/explore?id=${currentUser.id}`}>
                <a>
                  <FontAwesomeIcon
                    icon={["fal", "compass"]}
                    color="var(--color-black)"
                    size="lg"
                  />
                </a>
              </Link>
            </li>
            <li>
              <Link href={`/liked?id=${currentUser.id}`}>
                <a>
                  <FontAwesomeIcon
                    icon={["fal", "heart"]}
                    color="var(--color-black)"
                    size="lg"
                  />
                </a>
              </Link>
            </li>
            <li>
              <Link href={`/messages?id=${currentUser.id}`}>
                <a>
                  <FontAwesomeIcon
                    icon={["fal", "paper-plane"]}
                    color="var(--color-black)"
                    size="lg"
                  />
                </a>
              </Link>
            </li>
            <li>
              <Link href={`/user?id=${currentUser.id}`}>
                <a>
                  <FontAwesomeIcon
                    icon={["fal", "user"]}
                    color="var(--color-black)"
                    size="lg"
                  />
                </a>
              </Link>
            </li>
          </NavActions>
          <Upload>
            <Link href="/upload">
              <a>
                <FontAwesomeIcon
                  icon={["fal", "camera"]}
                  color="var(--color-black)"
                  size="lg"
                />
              </a>
            </Link>
          </Upload>
        </Wrapper>
      ) : null
    }
  </CurrentUser>
);

export default Nav;
