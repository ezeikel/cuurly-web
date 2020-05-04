import Link from "next/link";
import { withRouter } from "next/router";
import styled from "styled-components";
import Signup from "../components/Signup";
import { useQuery } from "react-apollo";
import { CURRENT_USER_QUERY } from "../apollo/queries";
import LogoText from "../components/LogoText";
import FormWrapper from "../components/styles/FormWrapper";

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

const Home = ({ router }) => {
  const {
    loading,
    error,
    data: { currentUser } = {}, // setting default value when destructing as data is undefined when loading - https://github.com/apollographql/react-apollo/issues/3323#issuecomment-523430331
  } = useQuery(CURRENT_USER_QUERY);

  if (currentUser) {
    // if logged in redirect to user feed
    router.push(`/feed?id=${currentUser.id}`);
    return null;
  }

  return (
    <Wrapper>
      <FormWrapper>
        <LogoText fillColor="var(--color-black)" />
        <Signup />
      </FormWrapper>
      <Switch>
        Have an account?{" "}
        <Link href="/signin">
          <a>Sign in</a>
        </Link>
      </Switch>
    </Wrapper>
  );
};

export default withRouter(Home);
