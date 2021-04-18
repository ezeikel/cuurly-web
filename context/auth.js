import { useQuery } from "@apollo/client";
import { createContext } from "react";
import { CURRENT_USER_QUERY } from "../apollo/queries";

// create context
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const {
    loading,
    error,
    data: { currentUser } = {}, // setting default value when destructing as data is undefined when loading - https://github.com/apollographql/react-apollo/issues/3323#issuecomment-523430331
  } = useQuery(CURRENT_USER_QUERY);

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
