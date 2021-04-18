import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import styled, { ThemeProvider } from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTimes,
  faCompass,
  faBell,
  faPaperPlane,
  faUser,
  faArrowToTop,
  faLock,
  faKey,
  faHeart as falHeart,
  faCog,
} from "@fortawesome/pro-light-svg-icons";
import {
  faComment,
  faBadgeCheck,
  faHeart as fasHeart,
  faPlay,
} from "@fortawesome/pro-solid-svg-icons";
import { faInboxOut, faEllipsisH } from "@fortawesome/pro-regular-svg-icons";
import "video.js/dist/video-js.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import GlobalStyle from "../GlobalStyle";
import Meta from "./Meta";
import { AuthContextProvider } from "../context/auth";

const Header = dynamic(() => import("./Header"));

library.add(
  faTimes,
  faCompass,
  faBell,
  faPaperPlane,
  faUser,
  faArrowToTop,
  faLock,
  faKey,
  falHeart,
  faCog,
  faComment,
  faBadgeCheck,
  fasHeart,
  faPlay,
  faInboxOut,
  faEllipsisH,
);

const theme = {
  red: "#FF0000",
  black: "#393939",
  grey: "#3A3A3A",
  lightgrey: "#E1E1E1",
  offWhite: "#EDEDED",
  maxWidth: "1000px",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)",
  default: {
    textColor: "var(--color-black)",
    white: "var(--color-white)",
    maxWidth: "1000px",
    bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)",
  },
};

const StyledPage = styled.div`
  display: grid;
  grid-template-rows: ${({ pathname }) =>
    pathname === "/" || pathname === "/signin" ? `1fr` : `80px 1fr`};
  min-height: 100vh;
  background-color: ${({ theme }) => theme.default.white};
  color: ${({ theme }) => theme.default.textColor};
`;

const Wrapper = styled.div`
  background-color: #fafafa;
`;

const Inner = styled.main`
  max-width: ${({ theme }) => theme.default.maxWidth};
  margin: 0 auto;
  width: 100%;
`;

const StyledToastContainer = styled(ToastContainer).attrs({
  className: "toast-container",
  toastClassName: "toast",
  bodyClassName: "body",
  progressClassName: "progress",
})`
  /* .toast-container */
  bottom: 0;
  left: 0;
  padding: 0;
  margin: 0;
  width: 100%;
  .toast {
    background-color: var(--color-black);
    margin: 0;
    cursor: auto;
  }
  button[aria-label="close"] {
    display: none;
  }
  .toast {
    background-color: var(--color-black);
  }
  .body {
    background-color: var(--color-black);
    color: var(--color-white);
    font-family: var(--default-font-family);
    margin: 0;
    display: grid;
    align-items: center;
  }
`;

const Page = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <StyledPage pathname={pathname}>
          <Meta />
          <AuthContextProvider>
            {pathname === "/" || pathname === "/signin" ? null : <Header />}
            <Wrapper>
              <Inner>{children}</Inner>
              <StyledToastContainer
                position="bottom-center"
                draggable
                hideProgressBar
                pauseOnHover
                autoClose={3000}
                closeOnClick={false}
              />
            </Wrapper>
            {/* <Footer /> */}
          </AuthContextProvider>
        </StyledPage>
      </ThemeProvider>
    </>
  );
};

export default Page;
