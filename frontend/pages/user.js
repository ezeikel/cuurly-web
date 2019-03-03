import styled from 'styled-components';
import Profile from '../components/Profile';

const Wrapper = styled.div`
  display: grid;
`;

const SignupPage = ({ query }) => (
  <Wrapper>
    <Profile id={query.id} />
  </Wrapper>
);

export default SignupPage;
