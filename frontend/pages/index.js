import styled from 'styled-components';
import LogoFull from '../components/LogoFull';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const Home = () => (
  <Wrapper>
    <LogoFull fillColor="#000"/>
  </Wrapper>
);

export default Home;
