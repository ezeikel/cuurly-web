import { useContext } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../contexts/auth";
import LogoImage from "../svgs/LogoImage";
import LogoText from "../svgs/LogoText";
import {
  Wrapper,
  NavActions,
  LogoWrapper,
  StyledSearch,
  Upload,
} from "./Nav.styled";

const Nav = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Wrapper>
      <LogoWrapper>
        <Link href="/">
          <a>
            <LogoImage fill="var(--color-black)" />
          </a>
        </Link>
        <Link href="/">
          <a>
            <LogoText fill="var(--color-black)" />
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
          <Link href="/">
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
          <Link href="/">
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
          <Link href="/[username]" as={`/${currentUser.username}`}>
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
