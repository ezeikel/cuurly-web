import { createContext } from "react";
import { useQuery } from "@apollo/client";
import { CURRENT_USER_QUERY } from "../apollo/queries";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const {
    loading,
    error,
    data: { currentUser } = {}, // setting default value when destructing as data is undefined when loading - https://github.com/apollographql/react-apollo/issues/3323#issuecomment-523430331
  } = useQuery(CURRENT_USER_QUERY, {
    pollInterval: 60000, // check every 60 seconds
  });

  return (
    <AuthContext.Provider
      value={{
        loading,
        error,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
