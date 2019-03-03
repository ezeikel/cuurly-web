import Link from 'next/link';
import styled from 'styled-components';
import Signup from '../components/Signup';

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: var(--spacing-medium);
  h1 {
    margin: 0;
    font-size: 2.2rem;
  }
`;

const SignupPage = () => (
  <Wrapper>
    <h1>Sign up</h1>
    <Signup />
    <span>Have an account? <Link href="/signin"><a>Sign in</a></Link></span>
  </Wrapper>
);

export default SignupPage;
