import dynamic from "next/dynamic";
import styled from "styled-components";
import Router from "next/router";
import NProgress from "nprogress";

const Nav = dynamic(() => import("./Nav"));

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

const Header = () => (
  <Wrapper>
    <Nav />
  </Wrapper>
);

export default Header;
