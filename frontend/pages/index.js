import Link from 'next/link';
import styled from 'styled-components';
import LogoFull from '../components/LogoFull';
import Button from '../components/styles/Button';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const Home = () => (
  <Wrapper>
    <LogoFull fillColor="#000"/>
    <Button>
      <Link href="/signin"><a>Sign in</a></Link>
    </Button>
  </Wrapper>
);

export default Home;
