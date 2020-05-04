import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { CURRENT_USER_QUERY } from "../apollo/queries";
import Account from "../components/Account";

const Wrapper = styled.article`
  display: grid;
  padding: var(--padding-page-wrap);
`;

const AccountPage = ({ query }) => {
  const {
    loading,
    error,
    data: { currentUser } = {}, // setting default value when destructing as data is undefined when loading - https://github.com/apollographql/react-apollo/issues/3323#issuecomment-523430331
  } = useQuery(CURRENT_USER_QUERY);

  if (!currentUser) return null;

  return (
    <Wrapper>
      <Account query={Object.keys(query)} id={currentUser.id} />
    </Wrapper>
  );
};

export default AccountPage;
