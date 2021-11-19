import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { ThemeProvider } from "styled-components";
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
import Meta from "../Meta";
import { AuthContextProvider } from "../../contexts/auth";
import { StyledPage, Wrapper, Inner } from "./Page.styled";
import Notification from "../Notification/Notification";

const Header = dynamic(() => import("../Header/Header"));

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

const Page = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <StyledPage pathname={pathname}>
        <Meta />
        <AuthContextProvider>
          {pathname === "/" || pathname === "/signin" ? null : <Header />}
          <Wrapper>
            <Inner>{children}</Inner>
            <Notification
              position="bottom-center"
              draggable
              hideProgressBar
              pauseOnHover
              autoClose={3000}
              closeOnClick={false}
            />
          </Wrapper>
        </AuthContextProvider>
      </StyledPage>
    </ThemeProvider>
  );
};

export default Page;
