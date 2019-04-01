import Link from 'next/link';
import styled from 'styled-components';
import LogoFull from '../components/LogoFull';
import Button from '../components/styles/Button';
import Signin from '../components/Signin';
import Signup from '../components/Signup';

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
`;

const FormWrapper = styled.div`
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 1px;
  margin: 0 0 10px;
  padding: var(--spacing-large);
  max-width: 350px;
  width: 100%;
`;

const Switch = styled.span`
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 1px;
  margin: 0 0 10px;
  padding: var(--spacing-medium);
  max-width: 350px;
  width: 100%;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: start;
  grid-column-gap: var(--spacing-tiny);
  a {
    color: #003569;
    font-weight: bold;
  }
`;

const Home = ({ query }) => (
  <Wrapper>
    <FormWrapper>
      {
        query.mode === 'signin' ?
          <Signin /> :
          <Signup />
      }
    </FormWrapper>
    {
      query.mode === 'signin' ?
        <Switch>Don't have an account? <Link href="/?mode=signup"><a>Sign up</a></Link></Switch> :
        <Switch>Have an account? <Link href="/?mode=signin"><a>Sign in</a></Link></Switch>
    }
  </Wrapper>
);

export default Home;
