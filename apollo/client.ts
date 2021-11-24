import { useMemo } from "react";
import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "apollo-link-error";
import merge from "deepmerge";
import isEqual from "lodash.isequal";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient;

// errors from the server
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  // fixes issue with cookies not being passed in headers.
  // adding headers to context when creating the client

  // eslint-disable-next-line no-new
  new ApolloLink((operation, forward) => {
    operation.setContext({
      headers,
    });

    return forward(operation);
  });
});

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: ApolloLink.from([authLink, errorLink, uploadLink]),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient(); // eslint-disable-line no-underscore-dangle, @typescript-eslint/naming-convention

  // if page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s)),
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  // for SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // create new Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const addApolloState = (client, pageProps) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract(); // eslint-disable-line no-param-reassign
  }

  return pageProps;
};

export const useApollo = (initialState) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};
