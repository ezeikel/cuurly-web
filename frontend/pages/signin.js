import Link from 'next/link';
import styled from 'styled-components';
import Signin from '../components/Signin';

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: var(--spacing-medium);
  h1 {
    margin: 0;
    font-size: 2.2rem;
  }
`;

const SigninPage = () => (
  <Wrapper>
    <h1>Sign in</h1>
    <Signin />
    <span>Don't have an account? <Link href="signup"><a>Sign up</a></Link></span>
  </Wrapper>
);

export default SigninPage;
