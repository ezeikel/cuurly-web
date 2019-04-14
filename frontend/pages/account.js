import styled from 'styled-components';
import Account from '../components/Account';

const Wrapper = styled.article`
  display: grid;
`;

const AccountPage = ({ query }) => {
  return (
    <Wrapper>
      <Account query={Object.keys(query)} />
    </Wrapper>
  );
};

export default AccountPage;
