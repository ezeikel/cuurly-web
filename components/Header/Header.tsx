import { useContext, useEffect, FunctionComponent } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import { AuthContext } from "../../contexts/auth";
import { Wrapper } from "./Header.styled";

const Header: FunctionComponent = () => {
  const router = useRouter();

  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
    });

    const handleRouteChangeStart = () => {
      NProgress.start();
    };

    const handleRouteChangeComplete = () => {
      NProgress.done();
    };

    const handleRouteChangeError = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, []);

  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return null;

  const Nav = dynamic(() => import("../Nav/Nav"));

  return (
    <Wrapper>
      <Nav />
    </Wrapper>
  );
};

export default Header;
