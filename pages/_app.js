import { ApolloProvider } from "@apollo/client";
import * as Sentry from "@sentry/browser";
import { useApollo } from "../apollo/client";
import Page from "../components/Page";

Sentry.init({
  enabled: process.env.NODE_ENV === "production",
  environment: process.env.NODE_ENV,
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  release: process.env.SENTRY_RELEASE,
});

const MyApp = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
};

export default MyApp;
