import "@fortawesome/fontawesome-svg-core/styles.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { library, config } from "@fortawesome/fontawesome-svg-core";
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
import { useApollo } from "../apollo/client";
import "video.js/dist/video-js.css";
import "react-toastify/dist/ReactToastify.min.css";
import "tailwindcss/tailwind.css"; // eslint-disable-line import/no-extraneous-dependencies
import Page from "../components/Page/Page";
import "../main.css";

config.autoAddCss = false; /* eslint-disable import/first */

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

const MyApp = ({ Component, pageProps, err }: AppProps & { err: any }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Page>
        {/* Workaround for https://github.com/vercel/next.js/issues/8592 */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} err={err} />
      </Page>
    </ApolloProvider>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await MyApp.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
