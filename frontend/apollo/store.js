import { CURRENT_CACHED_USER_QUERY } from "./queries";

export const defaults = {
  currentUser: {
    __typename: "CurrentUser",
    id: "",
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    permissions: [],
    isAuthenticated: false
  }
};

export const resolvers = {
  Query: {
    currentUser: (_, args, { cache }) => {
      const { currentUser } = cache.readQuery({ query: CURRENT_CACHED_USER_QUERY });
      return currentUser;
    }
  },
  Mutation: {}
};
