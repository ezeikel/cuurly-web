import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import * as Sentry from "@sentry/nextjs";
import { CURRENT_USER_QUERY } from "../apollo/queries";

const useUser = () => {
  const {
    loading,
    error,
    data: { currentUser: user } = {}, // setting default value when destructing as data is undefined when loading - https://github.com/apollographql/react-apollo/issues/3323#issuecomment-523430331
  } = useQuery(CURRENT_USER_QUERY);

  useEffect(() => {
    if (user) {
      Sentry.configureScope((scope) => {
        scope.setUser({
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        });
      });
    }
  }, [user]);

  return {
    user,
    isLoading: loading,
    isError: error,
  };
};

export default useUser;
