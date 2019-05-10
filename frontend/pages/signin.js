import Link from 'next/link';
import styled from 'styled-components';
import Signin from '../components/Signin';
import LogoText from '../components/LogoText';
import FormWrapper from '../components/styles/FormWrapper';

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  grid-row-gap: var(--spacing-medium);
  padding: var(--padding-page-wrap);
`;

const Switch = styled.span`
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 1px;
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

const SigninPage = () => (
  <Wrapper>
    <FormWrapper>
      <LogoText fillColor="var(--color-black)" />
      <Signin />
    </FormWrapper>
    <Switch>Don't have an account?  <Link href="/"><a>Sign up</a></Link></Switch>
  </Wrapper>
);

export default SigninPage;
