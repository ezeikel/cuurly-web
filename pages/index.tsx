import { FunctionComponent, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import Signup from "../components/Signup/Signup";
import LogoText from "../components/svgs/LogoText";
import useUser from "../hooks/useUser";

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  grid-row-gap: var(--spacing-medium);
  padding: var(--padding-page-wrap);
`;

const Switch = styled.span`
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 1px;
  padding: var(--spacing-medium);
  max-width: 350px;
  width: 100%;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: start;
  grid-column-gap: var(--spacing-tiny);
  a {
    color: #003569;
    font-weight: bold;
  }
`;

const IndexPage: FunctionComponent = () => {
  const router = useRouter();
  const { user: currentUser } = useUser();

  useEffect(() => {
    if (currentUser) {
      // if logged in redirect to user feed
      router.push(
        {
          pathname: "/feed",
        },
        "/",
      );
    }
  }, [currentUser]);

  return (
    <Wrapper>
      <div>
        <LogoText fill="var(--color-black)" />
        <Signup />
      </div>
      <Switch>
        Have an account?{" "}
        <Link href="/signin">
          <a>Sign in</a>
        </Link>
      </Switch>
    </Wrapper>
  );
};

export default IndexPage;
