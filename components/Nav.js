import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Search from "./Search";
import LogoImage from "./LogoImage";
import LogoText from "./LogoText";
import { useQuery } from "@apollo/react-hooks";
import { CURRENT_USER_QUERY } from "../apollo/queries";

const Wrapper = styled.nav`
  width: 100%;
  max-width: ${({ theme }) => theme.default.maxWidth};
  font-family: var(--default-font-family);
  font-style: normal;
  color: ${({ theme }) => theme.default.textColor};
  display: grid;
  grid-template-columns: auto auto 1fr;
  grid-column-gap: var(--spacing-large);
  align-content: center;
  justify-items: center;
  padding: var(--spacing-medium);
  @media (min-width: 736px) {
    grid-template-columns: auto 4fr auto 1fr;
  }
`;

const NavActions = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: var(--spacing-medium);
  align-items: center;
  justify-items: center;
  font-size: 1.8rem;
  @media (min-width: 736px) {
    grid-column-gap: var(--spacing-large);
  }
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
  display: none;
  @media (min-width: 736px) {
    display: block;
  }
`;

const Upload = styled.div`
  display: grid;
  justify-self: end;
`;

const Nav = ({ theme }) => {
  const {
    loading,
    error,
    data: { currentUser } = {}, // setting default value when destructing as data is undefined when loading - https://github.com/apollographql/react-apollo/issues/3323#issuecomment-523430331
  } = useQuery(CURRENT_USER_QUERY);

  if (!currentUser) return null;

  return (
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
          <FontAwesomeIcon
            icon={["fal", "compass"]}
            color="var(--color-black)"
            size="lg"
          />
        </li>
        <li>
          <Link href={`/notifications?id=${currentUser.id}`}>
            <a>
              <FontAwesomeIcon
                icon={["fal", "bell"]}
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
              icon={["fal", "arrow-to-top"]}
              color="var(--color-black)"
              size="lg"
            />
          </a>
        </Link>
      </Upload>
    </Wrapper>
  );
};

export default Nav;
