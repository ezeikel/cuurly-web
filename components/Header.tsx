import dynamic from "next/dynamic";
import styled from "styled-components";
import Router from "next/router";
import NProgress from "nprogress";
import { useQuery } from "@apollo/client";
import { CURRENT_USER_QUERY } from "../apollo/queries";

NProgress.configure({
  showSpinner: false,
});

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Wrapper = styled.header`
  display: grid;
  justify-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`;

const Header = () => {
  const {
    loading,
    error,
    data: { currentUser } = {}, // setting default value when destructing as data is undefined when loading - https://github.com/apollographql/react-apollo/issues/3323#issuecomment-523430331
  } = useQuery(CURRENT_USER_QUERY);

  if (currentUser) {
    const Nav = dynamic(() => import("./Nav"));
    return (
      <Wrapper>
        <Nav currentUser={currentUser} />
      </Wrapper>
    );
  }

  return <Wrapper></Wrapper>;
};

export default Header;
