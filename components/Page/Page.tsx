import { useEffect } from "react";
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
import Notification from "../Notification/Notification";
import useUser from "../../hooks/useUser";

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
  const router = useRouter();
  const { pathname } = router;
  const { user, isError, isLoading } = useUser();

  const userAccessPages = pathname === "/sign-up" || pathname === "/sign-in";

  useEffect(() => {
    if (!isError && isLoading) {
      // still trying to fetch user - do nothing
      return;
    }

    if (!user) {
      if (userAccessPages) {
        // ufo is either trying to sign in/up - do nothing
        return;
      }

      // otherwise redirect anonymous to sign in page
      router.replace("/sign-in");
    }
  }, [user, pathname, isError, isLoading, userAccessPages]);

  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen flex flex-col">
        <Meta />
        {pathname === "/" || pathname === "/sign-in" ? null : <Header />}
        <div className="flex flex-col flex-1 bg-gray-50">
          <main className="flex-1 flex flex-col">{children}</main>
          <Notification
            position="bottom-center"
            draggable
            hideProgressBar
            pauseOnHover
            autoClose={3000}
            closeOnClick={false}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Page;
