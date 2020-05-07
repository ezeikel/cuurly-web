import { useQuery } from "@apollo/client";
import { ALL_USERS_QUERY } from "../apollo/queries";

const Users = () => {
  const {
    loading,
    error,
    data: { users } = {}, // setting default value when destructing as data is undefined when loading - https://github.com/apollographql/react-apollo/issues/3323#issuecomment-523430331
  } = useQuery(ALL_USERS_QUERY);

  return (
    <ul>
      {data.users.map((user) => (
        <li key={user.id}>{user.username}</li>
      ))}
    </ul>
  );
};

export default Users;
