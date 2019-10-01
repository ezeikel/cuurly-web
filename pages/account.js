import styled from 'styled-components';
import CurrentUser from "../components/CurrentUser";
import Account from '../components/Account';

const Wrapper = styled.article`
  display: grid;
  padding: var(--padding-page-wrap);
`;

const AccountPage = ({ query }) => {
  return (
    <CurrentUser>
      {({ data: { currentUser } }) => (
        <Wrapper>
          <Account query={Object.keys(query)} id={currentUser.id} />
        </Wrapper>
      )}
    </CurrentUser>
  );
};

export default AccountPage;
